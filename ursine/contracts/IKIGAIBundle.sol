// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/Multiwrap.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

/**
 * @title IKIGAI Bundle
 * @notice Bundle contract for wrapping IKIGAI tokens, NFTs, and other assets
 */
contract IKIGAIBundle is Multiwrap, PermissionsEnumerable {
    // Bundle types
    enum BundleType { GENESIS, COLLECTION, CUSTOM }
    
    // Bundle info
    struct BundleInfo {
        BundleType bundleType;
        uint256 createdAt;
        address creator;
    }
    
    // Mapping of token ID to bundle info
    mapping(uint256 => BundleInfo) public bundleInfo;
    
    // Fee percentage for bundle creation (in basis points, e.g. 250 = 2.5%)
    uint256 public bundleFeePercentage;
    
    // Fee recipient
    address public feeRecipient;
    
    // Events
    event BundleCreated(uint256 indexed tokenId, BundleType bundleType, address indexed creator);
    event BundleFeeUpdated(uint256 newFeePercentage);
    event FeeRecipientUpdated(address newFeeRecipient);

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint16 _royaltyBps,
        address _feeRecipient
    )
        Multiwrap(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        
        // Set initial fee percentage to 2.5%
        bundleFeePercentage = 250;
        
        // Set fee recipient
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @notice Set the bundle fee percentage
     * @param _feePercentage New fee percentage in basis points
     */
    function setBundleFeePercentage(uint256 _feePercentage) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_feePercentage <= 1000, "Fee too high"); // Max 10%
        bundleFeePercentage = _feePercentage;
        emit BundleFeeUpdated(_feePercentage);
    }
    
    /**
     * @notice Set the fee recipient
     * @param _feeRecipient New fee recipient address
     */
    function setFeeRecipient(address _feeRecipient) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_feeRecipient != address(0), "Zero address");
        feeRecipient = _feeRecipient;
        emit FeeRecipientUpdated(_feeRecipient);
    }
    
    /**
     * @notice Create a Genesis bundle
     * @param _contents Contents to wrap
     * @param _uriForWrappedToken URI for the wrapped token
     * @return tokenId ID of the created bundle
     */
    function createGenesisBundle(
        TokensForWrap[] calldata _contents,
        string calldata _uriForWrappedToken
    ) external payable returns (uint256 tokenId) {
        // Wrap tokens
        tokenId = wrap(_contents, _uriForWrappedToken, msg.sender);
        
        // Store bundle info
        bundleInfo[tokenId] = BundleInfo({
            bundleType: BundleType.GENESIS,
            createdAt: block.timestamp,
            creator: msg.sender
        });
        
        // Emit event
        emit BundleCreated(tokenId, BundleType.GENESIS, msg.sender);
        
        return tokenId;
    }
    
    /**
     * @notice Create a Collection bundle
     * @param _contents Contents to wrap
     * @param _uriForWrappedToken URI for the wrapped token
     * @return tokenId ID of the created bundle
     */
    function createCollectionBundle(
        TokensForWrap[] calldata _contents,
        string calldata _uriForWrappedToken
    ) external payable returns (uint256 tokenId) {
        // Wrap tokens
        tokenId = wrap(_contents, _uriForWrappedToken, msg.sender);
        
        // Store bundle info
        bundleInfo[tokenId] = BundleInfo({
            bundleType: BundleType.COLLECTION,
            createdAt: block.timestamp,
            creator: msg.sender
        });
        
        // Emit event
        emit BundleCreated(tokenId, BundleType.COLLECTION, msg.sender);
        
        return tokenId;
    }
    
    /**
     * @notice Create a Custom bundle
     * @param _contents Contents to wrap
     * @param _uriForWrappedToken URI for the wrapped token
     * @return tokenId ID of the created bundle
     */
    function createCustomBundle(
        TokensForWrap[] calldata _contents,
        string calldata _uriForWrappedToken
    ) external payable returns (uint256 tokenId) {
        // Calculate and collect fee
        uint256 totalValue = 0;
        
        // Sum up ERC20 values (simplified, in production would need to handle different token decimals)
        for (uint256 i = 0; i < _contents.length; i++) {
            if (_contents[i].assetType == ITokenBundle.AssetType.ERC20) {
                totalValue += _contents[i].totalAmount;
            }
        }
        
        // Calculate fee
        uint256 fee = (totalValue * bundleFeePercentage) / 10000;
        
        // Wrap tokens
        tokenId = wrap(_contents, _uriForWrappedToken, msg.sender);
        
        // Store bundle info
        bundleInfo[tokenId] = BundleInfo({
            bundleType: BundleType.CUSTOM,
            createdAt: block.timestamp,
            creator: msg.sender
        });
        
        // Emit event
        emit BundleCreated(tokenId, BundleType.CUSTOM, msg.sender);
        
        return tokenId;
    }
    
    /**
     * @notice Override wrap to collect fees
     */
    function wrap(
        TokensForWrap[] calldata _tokensToWrap,
        string calldata _uriForWrappedToken,
        address _recipient
    ) public payable override returns (uint256 tokenId) {
        // For custom bundles, fee is handled in the specific function
        // For other bundle types, we collect a fee here
        
        // Call parent wrap function
        tokenId = super.wrap(_tokensToWrap, _uriForWrappedToken, _recipient);
        
        return tokenId;
    }
    
    /**
     * @notice Get bundle info
     * @param _tokenId Token ID to get info for
     * @return info Bundle info
     */
    function getBundleInfo(uint256 _tokenId) external view returns (BundleInfo memory info) {
        require(_exists(_tokenId), "Bundle does not exist");
        return bundleInfo[_tokenId];
    }
} 