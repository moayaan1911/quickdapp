// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DeploySimpleUSD} from "script/SimpleUSD.s.sol";
import {SimpleUSD} from "src/SimpleUSD.sol";

contract SimpleUSDTest is Test {
    SimpleUSD public simpleUSD;
    address public owner;

    // Test users
    address public ALICE = makeAddr("alice");
    address public BOB = makeAddr("bob");
    address public CHARLIE = makeAddr("charlie");

    // Constants from contract
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;
    uint256 public constant AIRDROP_AMOUNT = 1000 * 10 ** 18;
    uint256 public constant AIRDROP_COOLDOWN = 24 hours;

    function setUp() public {
        DeploySimpleUSD deployer = new DeploySimpleUSD();
        simpleUSD = deployer.run();
        owner = simpleUSD.owner();
    }

    // Basic ERC20 functionality tests
    function testTokenMetadata() public view {
        assertEq(simpleUSD.name(), "SimpleUSD");
        assertEq(simpleUSD.symbol(), "SUSD");
        assertEq(simpleUSD.decimals(), 18);
    }

    function testInitialSupply() public view {
        assertEq(simpleUSD.totalSupply(), MAX_SUPPLY);
        assertEq(simpleUSD.balanceOf(owner), MAX_SUPPLY);
    }

    function testTransfer() public {
        uint256 transferAmount = 100 * 10 ** 18;

        vm.prank(owner);
        simpleUSD.transfer(ALICE, transferAmount);

        assertEq(simpleUSD.balanceOf(ALICE), transferAmount);
        assertEq(simpleUSD.balanceOf(owner), MAX_SUPPLY - transferAmount);
    }

    function testAllowanceAndTransferFrom() public {
        uint256 allowanceAmount = 500 * 10 ** 18;
        uint256 transferAmount = 200 * 10 ** 18;

        // Give Alice some tokens first
        vm.prank(owner);
        simpleUSD.transfer(ALICE, allowanceAmount);

        // Alice approves Bob to spend her tokens
        vm.prank(ALICE);
        simpleUSD.approve(BOB, allowanceAmount);

        // Bob transfers from Alice to Charlie
        vm.prank(BOB);
        simpleUSD.transferFrom(ALICE, CHARLIE, transferAmount);

        assertEq(simpleUSD.balanceOf(CHARLIE), transferAmount);
        assertEq(simpleUSD.balanceOf(ALICE), allowanceAmount - transferAmount);
        assertEq(simpleUSD.allowance(ALICE, BOB), allowanceAmount - transferAmount);
    }

    // Airdrop functionality tests
    function testAirdropClaim() public {
        uint256 initialBalance = simpleUSD.balanceOf(ALICE);

        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        assertEq(simpleUSD.balanceOf(ALICE), initialBalance + AIRDROP_AMOUNT);
        assertEq(simpleUSD.totalClaimed(ALICE), AIRDROP_AMOUNT);
        assertTrue(simpleUSD.lastAirdropClaim(ALICE) > 0);
    }

    function testAirdropClaimEvent() public {
        vm.expectEmit(true, false, false, true);
        emit SimpleUSD.AirdropClaimed(ALICE, AIRDROP_AMOUNT, block.timestamp);

        vm.prank(ALICE);
        simpleUSD.claimAirdrop();
    }

    function testAirdropCooldown() public {
        // Alice claims first airdrop
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        // Try to claim again immediately - should fail
        vm.prank(ALICE);
        vm.expectRevert(SimpleUSD.SimpleUSD__AirdropCooldownActive.selector);
        simpleUSD.claimAirdrop();

        // Fast forward 24 hours
        vm.warp(block.timestamp + AIRDROP_COOLDOWN);

        // Should be able to claim again
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        assertEq(simpleUSD.totalClaimed(ALICE), AIRDROP_AMOUNT * 2);
    }

    function testCanClaimAirdropHelper() public {
        // Initially should be able to claim
        (bool canClaim, uint256 timeLeft) = simpleUSD.canClaimAirdrop(ALICE);
        assertTrue(canClaim);
        assertEq(timeLeft, 0);

        // After claiming, should not be able to claim
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        (canClaim, timeLeft) = simpleUSD.canClaimAirdrop(ALICE);
        assertFalse(canClaim);
        assertTrue(timeLeft > 0);

        // After cooldown, should be able to claim again
        vm.warp(block.timestamp + AIRDROP_COOLDOWN);
        (canClaim, timeLeft) = simpleUSD.canClaimAirdrop(ALICE);
        assertTrue(canClaim);
        assertEq(timeLeft, 0);
    }

    function testGetAirdropStats() public {
        // Before any claims
        (uint256 claimed, uint256 lastClaim, uint256 nextClaim) = simpleUSD.getAirdropStats(ALICE);
        assertEq(claimed, 0);
        assertEq(lastClaim, 0);
        assertEq(nextClaim, block.timestamp);

        // After first claim
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        (claimed, lastClaim, nextClaim) = simpleUSD.getAirdropStats(ALICE);
        assertEq(claimed, AIRDROP_AMOUNT);
        assertEq(lastClaim, block.timestamp);
        assertEq(nextClaim, block.timestamp + AIRDROP_COOLDOWN);
    }

    function testGetGlobalAirdropStats() public {
        // Initially no airdrops distributed
        (uint256 totalDistributed, uint256 remainingForAirdrops) = simpleUSD.getGlobalAirdropStats();
        assertEq(totalDistributed, 0);
        assertEq(remainingForAirdrops, MAX_SUPPLY);

        // After Alice claims
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        (totalDistributed, remainingForAirdrops) = simpleUSD.getGlobalAirdropStats();
        assertEq(totalDistributed, AIRDROP_AMOUNT);
        assertEq(remainingForAirdrops, MAX_SUPPLY - AIRDROP_AMOUNT);
    }

    function testMultipleUsersAirdrop() public {
        // Alice claims
        vm.prank(ALICE);
        simpleUSD.claimAirdrop();

        // Bob claims
        vm.prank(BOB);
        simpleUSD.claimAirdrop();

        // Charlie claims
        vm.prank(CHARLIE);
        simpleUSD.claimAirdrop();

        assertEq(simpleUSD.balanceOf(ALICE), AIRDROP_AMOUNT);
        assertEq(simpleUSD.balanceOf(BOB), AIRDROP_AMOUNT);
        assertEq(simpleUSD.balanceOf(CHARLIE), AIRDROP_AMOUNT);

        (uint256 totalDistributed,) = simpleUSD.getGlobalAirdropStats();
        assertEq(totalDistributed, AIRDROP_AMOUNT * 3);
    }

    function testBurnTokens() public {
        uint256 burnAmount = 100 * 10 ** 18;

        // Give Alice some tokens
        vm.prank(owner);
        simpleUSD.transfer(ALICE, burnAmount);

        uint256 initialTotalSupply = simpleUSD.totalSupply();
        uint256 aliceInitialBalance = simpleUSD.balanceOf(ALICE);

        vm.prank(ALICE);
        simpleUSD.burn(burnAmount);

        assertEq(simpleUSD.totalSupply(), initialTotalSupply - burnAmount);
        assertEq(simpleUSD.balanceOf(ALICE), aliceInitialBalance - burnAmount);
    }

    function testEmergencyMint() public {
        uint256 mintAmount = 1000 * 10 ** 18;
        uint256 burnAmount = 2000 * 10 ** 18; // Burn more than we mint to make room

        // First burn some tokens to make room for emergency mint
        vm.prank(owner);
        simpleUSD.burn(burnAmount);

        uint256 supplyAfterBurn = simpleUSD.totalSupply();

        vm.prank(owner);
        simpleUSD.emergencyMint(ALICE, mintAmount);

        assertEq(simpleUSD.totalSupply(), supplyAfterBurn + mintAmount);
        assertEq(simpleUSD.balanceOf(ALICE), mintAmount);
    }

    function testEmergencyMintOnlyOwner() public {
        vm.prank(ALICE);
        vm.expectRevert();
        simpleUSD.emergencyMint(BOB, 1000 * 10 ** 18);
    }

    function testEmergencyMintMaxSupplyCheck() public {
        vm.prank(owner);
        vm.expectRevert(SimpleUSD.SimpleUSD__MaxSupplyExceeded.selector);
        simpleUSD.emergencyMint(ALICE, 1); // Should exceed MAX_SUPPLY since all tokens are already minted
    }

    function testAirdropZeroAddress() public {
        vm.prank(address(0));
        vm.expectRevert(SimpleUSD.SimpleUSD__ZeroAddress.selector);
        simpleUSD.claimAirdrop();
    }

    function testAirdropInsufficientTokens() public {
        // Transfer all tokens away from owner
        vm.prank(owner);
        simpleUSD.transfer(ALICE, MAX_SUPPLY);

        vm.prank(BOB);
        vm.expectRevert(SimpleUSD.SimpleUSD__AirdropNotAvailable.selector);
        simpleUSD.claimAirdrop();
    }

    // Fuzzing tests
    function testFuzzTransfer(uint256 amount) public {
        amount = bound(amount, 0, MAX_SUPPLY);

        vm.prank(owner);
        simpleUSD.transfer(ALICE, amount);

        assertEq(simpleUSD.balanceOf(ALICE), amount);
        assertEq(simpleUSD.balanceOf(owner), MAX_SUPPLY - amount);
    }

    function testFuzzBurn(uint256 amount) public {
        amount = bound(amount, 0, 10000 * 10 ** 18);

        // Give Alice tokens to burn
        vm.prank(owner);
        simpleUSD.transfer(ALICE, amount);

        uint256 initialTotalSupply = simpleUSD.totalSupply();

        vm.prank(ALICE);
        simpleUSD.burn(amount);

        assertEq(simpleUSD.totalSupply(), initialTotalSupply - amount);
        assertEq(simpleUSD.balanceOf(ALICE), 0);
    }
}
