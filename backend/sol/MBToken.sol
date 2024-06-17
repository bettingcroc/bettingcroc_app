// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCROCoken is ERC20{
    constructor(uint256 initialSupply) ERC20("BCROCoken", "BCROC")  {
        _mint(msg.sender, initialSupply);
    }
    function burn(uint256 amount)public{
        _burn(msg.sender,amount);
    }
}