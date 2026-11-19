// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";

import {Level0} from "../src/levels/Level0.sol";

contract Level0Test is Test {
    Level0 private level;

    function setUp() public {
        level = new Level0("ethernaut0");
    }

    function testInitialState() public view {
        assertEq(level.password(), "ethernaut0");
        assertFalse(level.getCleared());
    }

    function testAuthenticateWithStoredPassword() public {
        string memory storedPassword = level.password();

        level.authenticate(storedPassword);

        assertTrue(level.getCleared());
    }

    function testWrongPasswordDoesNotClearLevel() public {
        level.authenticate("wrong-password");

        assertFalse(level.getCleared());
    }
}
