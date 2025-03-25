// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public name;
    uint public value;

    event ValueChanged(uint newValue);

    constructor(string memory _name, uint _initialValue) {
        name = _name;
        value = _initialValue;
    }

    function setValue(uint _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function getValue() public view returns (uint) {
        return value;
    }
}