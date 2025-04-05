// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract EventTicket is ERC721, Ownable, IERC2981 {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _ticketIds;
    
    struct Ticket {
        string eventName;
        uint256 price;
        uint256 eventTimestamp;
        bool isUsed;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(address => bool) public whitelistedMarketplaces;
    mapping(uint256 => uint256) public lastTransferTimestamp;

    uint256 public constant MAX_RESALE_PRICE_MULTIPLIER = 200;
    uint256 public cooldownPeriod = 1 days;
    uint256 public royaltyPercentage = 10;
    uint256 public ticketPrice = 100;
    string public eventName = "mujconcertxyz";
    uint256 public eventTimestamp = 1745942400;
    uint256 public totalSupply = 1000;
    uint256 public remainingSupply = 1000;
    string private _baseTokenURI = "https://api.example.com/tickets/";

    event TicketMinted(address indexed recipient, uint256 ticketId);
    event TicketUsed(uint256 ticketId);
    event WhitelistUpdated(address marketplace, bool status);

    constructor() ERC721("Concert Ticket", "CTICKET") Ownable(msg.sender) {}

    function mintTicket(address recipient) public payable returns (uint256) {
        require(remainingSupply > 0, "Sold out");
        require(msg.value >= ticketPrice, "Insufficient ETH");
        
        _ticketIds.increment();
        uint256 newTicketId = _ticketIds.current();

        _safeMint(recipient, newTicketId);
        
        tickets[newTicketId] = Ticket({
            eventName: eventName,
            price: ticketPrice,
            eventTimestamp: eventTimestamp,
            isUsed: false
        });

        lastTransferTimestamp[newTicketId] = block.timestamp;
        remainingSupply--;

        if (msg.value > ticketPrice) {
            payable(msg.sender).transfer(msg.value - ticketPrice);
        }
        
        emit TicketMinted(recipient, newTicketId);
        return newTicketId;
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = super._update(to, tokenId, auth);
        
        if (from != address(0)) { 
            require(!tickets[tokenId].isUsed, "Ticket used");
            require(block.timestamp < tickets[tokenId].eventTimestamp, "Event expired");
            require(
                block.timestamp >= lastTransferTimestamp[tokenId] + cooldownPeriod,
                "Cooldown active"
            );

            if (to.code.length > 0) {
                require(whitelistedMarketplaces[to], "Marketplace not whitelisted");
            }
        }

        lastTransferTimestamp[tokenId] = block.timestamp;
        return from;
    }

    function royaltyInfo(uint256, uint256 salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = owner();
        royaltyAmount = (salePrice * royaltyPercentage) / 100;
    }

    function updateWhitelist(address marketplace, bool status) public onlyOwner {
        whitelistedMarketplaces[marketplace] = status;
        emit WhitelistUpdated(marketplace, status);
    }

    function isValidTicket(uint256 ticketId, address holder) public view returns (bool) {
        return ownerOf(ticketId) == holder && 
               !tickets[ticketId].isUsed && 
               block.timestamp < tickets[ticketId].eventTimestamp;
    }

    function useTicket(uint256 ticketId) public onlyOwner {
        require(ownerOf(ticketId) != address(0), "Invalid ticket");
        tickets[ticketId].isUsed = true;
        emit TicketUsed(ticketId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        return string(abi.encodePacked(_baseTokenURI, tokenId.toString()));
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId || 
               super.supportsInterface(interfaceId);
    }

    function setCooldown(uint256 newPeriod) public onlyOwner {
        require(newPeriod <= 7 days, "Excessive cooldown");
        cooldownPeriod = newPeriod;
    }

    function setRoyalty(uint256 newPercentage) public onlyOwner {
        require(newPercentage <= 20, "Royalty too high");
        royaltyPercentage = newPercentage;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
} 
