// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DOJFund {

    struct UserMessage {
        address senderAddress;
        string message;
        uint256 amount;
        uint256 timestamp;
    }

    struct UserDetails {
        string cid;
        address payable userAddress;
    }

    mapping(address => UserMessage[]) private _messagesByAddress;
    mapping(string => UserDetails) private _cidByUsername;
    mapping(address => UserDetails) private _cidByAddress; 

    function getProfile(string memory username) public view returns (UserDetails memory) {
        require(bytes(username).length > 0, "Username cannot be empty");
        return _cidByUsername[username];
    }

    function createProfile(string memory username, string memory cid, address payable userAddress) public {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(bytes(cid).length > 0, "CID cannot be empty");

        _cidByUsername[username] = UserDetails(cid, userAddress);
        _cidByAddress[userAddress] = UserDetails(cid, userAddress); // also store UserDetails by wallet address
    }

    function addMessage(string memory username, string memory message, uint256 amount) public payable {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(bytes(message).length > 0, "Message cannot be empty");
        require(msg.value == amount, "Incorrect amount sent");

        _cidByUsername[username].userAddress.transfer(msg.value);

        _messagesByAddress[_cidByUsername[username].userAddress].push(UserMessage(msg.sender, message, amount, block.timestamp));
    }

    function getAllMessages(address userAddress) public view returns (UserMessage[] memory) {
        UserMessage[] storage messages = _messagesByAddress[userAddress];
        uint256 messagesLength = messages.length;
        
        UserMessage[] memory all_messages = new UserMessage[](messagesLength);
        
        for (uint256 i = 0; i < messagesLength; i++) {
            all_messages[i] = messages[i];
        }
        
        return all_messages;
    }
    
    function getUserDetailsByAddress(address walletAddress) public view returns (UserDetails memory) {
        return _cidByAddress[walletAddress];
    }
}