pragma solidity ^0.5.0;


contract Token {
	
	address public owner;
	mapping (address => uint256) public balanceOf;

	constructor() public {
		owner = msg.sender;
	}
    
	function deposit(uint256 _value) public returns (bool success) {
        balanceOf[msg.sender] += _value;
        return true;
    }
	
	function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
    
	function totalSupply() public view returns (uint) {
        return address(this).balance;
    }

}
