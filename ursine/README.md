# IKIGAI Protocol

A DeFi protocol built on Berachain, leveraging NFT staking and yield generation for maximum returns.

## Overview

IKIGAI Protocol is a decentralized finance platform that combines NFT utility with yield generation. The protocol features:

1. **Genesis NFTs**: Mint NFTs that provide vested token rewards and access to exclusive features
2. **Token Staking**: Stake IKIGAI tokens to earn rewards with tiered multipliers
3. **Asset Bundling**: Create bundles to wrap multiple assets into single tradable tokens

## Smart Contracts

The protocol consists of several smart contracts built on the thirdweb framework:

### GenesisNFT.sol
- ERC721 NFT collection with claim conditions
- 90-day token vesting mechanism
- Integration with IKIGAI token for rewards

### NFTStaking.sol
- Staking contract for Genesis NFTs
- Configurable reward rates (global and per-token)
- Reward calculation and distribution

### IKIGAIToken.sol
- ERC20 token with role-based permissions
- Maximum supply cap of 1 billion tokens
- Zero initial supply for fair launch

### IKIGAIBundle.sol
- Wrapping mechanism for multiple assets
- Support for ERC20, ERC721, and ERC1155 tokens
- Metadata management for wrapped tokens

### IKIGAISplit.sol
- Revenue splitting functionality
- Configurable recipient shares
- Automatic distribution of protocol fees

## Frontend

The frontend is built with Next.js and integrates with the contracts using thirdweb's SDK:

### Pages
- **Home**: Introduction to the protocol and its features
- **Mint**: Interface for minting Genesis NFTs
- **Stake**: Dashboard for staking tokens and claiming rewards
- **Bundles**: Tool for creating and managing asset bundles

### Features
- Wallet connection via thirdweb
- Real-time transaction status updates
- Responsive design for all devices
- Error handling and user feedback

## Development

### Prerequisites
- Node.js 16+
- Yarn or npm
- Hardhat for contract development

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ikigai-protocol.git
   cd ikigai-protocol
   ```

2. Install dependencies
   ```bash
   # Install contract dependencies
   yarn install
   
   # Install frontend dependencies
   cd ursine-fe
   yarn install
   ```

3. Set up environment variables
   ```bash
   # In the ursine-fe directory
   cp .env.example .env.local
   ```
   
   Edit `.env.local` to add your contract addresses and API keys.

4. Run the development server
   ```bash
   # In the ursine-fe directory
   yarn dev
   ```

### Contract Deployment

1. Compile contracts
   ```bash
   npx hardhat compile
   ```

2. Deploy contracts
   ```bash
   npx hardhat run scripts/deploy.js --network berachain
   ```

## Testing

```bash
# Run contract tests
npx hardhat test

# Run frontend tests
cd ursine-fe
yarn test
```

## Security

The contracts implement several security features:
- Role-based access control for admin functions
- Proper checks for token ownership and staking status
- Vesting mechanism to prevent immediate token dumps

However, a full security audit is recommended before production deployment.

## License

MIT License
