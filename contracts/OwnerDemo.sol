pragma solidity ^0.5.0;

contract OwnerDemo {
	
	event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

	address public owner;

	constructor() public {
		owner = msg.sender;
	}

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function transferOwner(address newOwner)
		public
		onlyOwner
	{
		owner = newOwner;
		emit OwnershipTransferred(msg.sender, newOwner);
	}

}
