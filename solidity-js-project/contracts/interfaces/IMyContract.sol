// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMyContract {
    function setValue(uint256 value) external;
    function getValue() external view returns (uint256);
    event ValueChanged(uint256 newValue);
}