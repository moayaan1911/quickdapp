// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleUSD (SUSD)
 * @dev ERC20 token with airdrop functionality for DeFi ecosystem
 * @notice Main utility token used across all SimpleDefi platforms
 */
contract SimpleUSD is ERC20, Ownable {
    // Constants from UI requirements
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18; // 1,000,000 SUSD
    uint256 public constant AIRDROP_AMOUNT = 1000 * 10 ** 18; // 1000 SUSD per user
    uint256 public constant AIRDROP_COOLDOWN = 24 hours; // 24 hour cooldown

    // Airdrop tracking
    mapping(address => uint256) public lastAirdropClaim;
    mapping(address => uint256) public totalClaimed;
    uint256 public totalAirdropsClaimed;

    // Events for UI integration
    event AirdropClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event AirdropFailed(address indexed user, string reason);

    // Custom errors for better gas efficiency
    error SimpleUSD__MaxSupplyExceeded();
    error SimpleUSD__AirdropNotAvailable();
    error SimpleUSD__AirdropCooldownActive();
    error SimpleUSD__ZeroAddress();

    constructor() ERC20("SimpleUSD", "SUSD") Ownable(msg.sender) {
        // Mint initial supply to owner for distribution
        _mint(msg.sender, MAX_SUPPLY);
    }

    /**
     * @dev Claim airdrop tokens (UI Claim Tab function)
     * @notice Users can claim 1000 SUSD once every 24 hours
     */
    function claimAirdrop() external {
        if (msg.sender == address(0)) revert SimpleUSD__ZeroAddress();

        // Check if user is in cooldown period (skip check for first-time claimers)
        if (lastAirdropClaim[msg.sender] != 0 && lastAirdropClaim[msg.sender] + AIRDROP_COOLDOWN > block.timestamp) {
            emit AirdropFailed(msg.sender, "Cooldown period active");
            revert SimpleUSD__AirdropCooldownActive();
        }

        // Check if we have enough tokens left for airdrop
        if (balanceOf(owner()) < AIRDROP_AMOUNT) {
            emit AirdropFailed(msg.sender, "Insufficient tokens available");
            revert SimpleUSD__AirdropNotAvailable();
        }

        // Transfer tokens from owner to user
        _transfer(owner(), msg.sender, AIRDROP_AMOUNT);

        // Update airdrop tracking
        lastAirdropClaim[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += AIRDROP_AMOUNT;
        totalAirdropsClaimed += AIRDROP_AMOUNT;

        emit AirdropClaimed(msg.sender, AIRDROP_AMOUNT, block.timestamp);
    }

    /**
     * @dev Check if user can claim airdrop (UI helper function)
     * @param user Address to check
     * @return canClaim Whether user can claim
     * @return timeLeft Seconds remaining in cooldown (0 if can claim)
     */
    function canClaimAirdrop(address user) external view returns (bool canClaim, uint256 timeLeft) {
        // First-time claimers can always claim
        if (lastAirdropClaim[user] == 0) {
            return (true, 0);
        }

        if (lastAirdropClaim[user] + AIRDROP_COOLDOWN <= block.timestamp) {
            return (true, 0);
        } else {
            uint256 cooldownEnd = lastAirdropClaim[user] + AIRDROP_COOLDOWN;
            return (false, cooldownEnd - block.timestamp);
        }
    }

    /**
     * @dev Get user's airdrop statistics (UI display function)
     * @param user Address to check
     * @return claimed Total amount claimed by user
     * @return lastClaim Timestamp of last claim
     * @return nextClaim Timestamp when user can claim next
     */
    function getAirdropStats(address user)
        external
        view
        returns (uint256 claimed, uint256 lastClaim, uint256 nextClaim)
    {
        claimed = totalClaimed[user];
        lastClaim = lastAirdropClaim[user];

        if (lastClaim == 0) {
            nextClaim = block.timestamp; // Can claim immediately if never claimed
        } else {
            nextClaim = lastClaim + AIRDROP_COOLDOWN;
        }
    }

    /**
     * @dev Get global airdrop statistics (UI analytics)
     * @return totalDistributed Total SUSD distributed via airdrops
     * @return remainingForAirdrops Remaining SUSD available for airdrops
     */
    function getGlobalAirdropStats() external view returns (uint256 totalDistributed, uint256 remainingForAirdrops) {
        totalDistributed = totalAirdropsClaimed;
        remainingForAirdrops = balanceOf(owner());
    }

    /**
     * @dev Emergency function to mint more tokens if needed (owner only)
     * @param to Address to mint tokens to
     * @param amount Amount to mint
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        if (totalSupply() + amount > MAX_SUPPLY) revert SimpleUSD__MaxSupplyExceeded();
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens to reduce supply
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Override decimals to ensure 18 decimals (standard for DeFi)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
