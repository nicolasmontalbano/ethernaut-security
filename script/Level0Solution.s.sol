// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {Level0} from "../src/levels/Level0.sol";

contract Level0Solution is Script {
    Level0 public level0 = Level0(0xe51CB17aE5f1027a50769a7bB97a1eD238B154D3);

    function run() external {
        string memory password = level0.password();

        console2.log("Level instance:", address(level0));
        console2.log("Password:", password);
        console2.log("Cleared before:", level0.getCleared());

        require(!level0.getCleared(), "Level is already cleared");

        vm.startBroadcast();
        level0.authenticate(password);
        vm.stopBroadcast();

        require(level0.getCleared(), "Authentication failed");
        console2.log("Cleared after:", level0.getCleared());
    }
}
