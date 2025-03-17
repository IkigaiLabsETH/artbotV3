# IKIGAI Protocol Frontend

This is the frontend application for the IKIGAI Protocol, a DeFi platform built on Berachain.

## Features

- **Genesis NFT Minting**: Mint NFTs that provide vested token rewards
- **Token Staking**: Stake IKIGAI tokens to earn rewards with tiered multipliers
- **Asset Bundling**: Create bundles to wrap multiple assets into single tradable tokens
- **Wallet Integration**: Connect with popular Web3 wallets via thirdweb
- **Transaction Management**: Real-time transaction status and error handling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Web3 Integration**: thirdweb SDK
- **State Management**: React Hooks
- **Network Support**: Berachain Mainnet and Artio Testnet

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn or npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

### Installation

1. Clone the repository and navigate to the frontend directory
   ```bash
   git clone https://github.com/yourusername/ikigai-protocol.git
   cd ikigai-protocol/ursine-fe
   ```

2. Install dependencies
   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-client-id
   NEXT_PUBLIC_BERACHAIN_RPC=https://rpc.berachain.com
   NEXT_PUBLIC_NFT_DROP_ADDRESS=your-nft-drop-address
   NEXT_PUBLIC_TOKEN_ADDRESS=your-token-address
   NEXT_PUBLIC_STAKING_ADDRESS=your-staking-address
   NEXT_PUBLIC_MULTIWRAP_ADDRESS=your-multiwrap-address
   ```

4. Run the development server
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ursine-fe/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── bundles/    # Bundle creation page
│   │   ├── mint/       # NFT minting page
│   │   ├── stake/      # Token staking page
│   │   ├── client.ts   # thirdweb client configuration
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── common/     # Shared UI components
│   │   ├── layout/     # Layout components
│   │   └── modules/    # Feature-specific components
│   └── styles/         # Global styles
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Deployment

1. Build the application
   ```bash
   yarn build
   # or
   npm run build
   ```

2. Deploy to your hosting provider of choice (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
