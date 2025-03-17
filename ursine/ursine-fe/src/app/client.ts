import { createThirdwebClient, defineChain } from "thirdweb";

// Get the client ID from environment variables
// You can get a client ID from https://thirdweb.com/dashboard/settings/api-keys
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn("No thirdweb client ID provided. Please add your client ID to .env.local");
}

// Define Berachain
export const berachain = defineChain({
  id: 80_094,
  name: "Berachain",
  rpc: process.env.NEXT_PUBLIC_BERACHAIN_RPC || "https://rpc.berachain.com",
  nativeCurrency: {
    decimals: 18,
    name: "BERA",
    symbol: "BERA",
  },
  blockExplorers: [
    { name: "Explorer", url: "https://explorer.berachain.com" },
  ],
});

// Define Berachain Testnet (Artio)
export const berachainTestnet = defineChain({
  id: 80_084,
  name: "Berachain Artio",
  rpc: "https://artio.rpc.berachain.com",
  nativeCurrency: {
    decimals: 18,
    name: "BERA",
    symbol: "BERA",
  },
  blockExplorers: [
    { name: "Explorer", url: "https://artio.explorer.berachain.com" },
  ],
});

// Create and export the thirdweb client
export const client = createThirdwebClient({
  clientId: clientId || "placeholder", // Fallback to placeholder to prevent runtime errors
});
