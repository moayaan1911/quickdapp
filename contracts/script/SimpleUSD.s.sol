// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {SimpleUSD} from "src/SimpleUSD.sol";

/**
 * @title Deploy SimpleUSD
 * @dev Deployment script for SimpleUSD token
 */
contract DeploySimpleUSD is Script {
    function run() public returns (SimpleUSD) {
        return deployContract();
    }

    function deployContract() public returns (SimpleUSD) {
        vm.startBroadcast();
        SimpleUSD simpleUSD = new SimpleUSD();
        vm.stopBroadcast();
        return simpleUSD;
    }
}
