"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { GradientButton } from "../../common/Button";
import styled from "@emotion/styled";

const StyledMintingCard = styled.div`
  background: var(--color-dark-secondary);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    background: var(--gradient-berry);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;

interface MintingCardProps {
  contractAddress: string;
}

export function MintingCard({ contractAddress }: MintingCardProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutate: sendTx } = useSendTransaction();
  const account = useActiveAccount();

  const handleMint = async () => {
    if (!account) {
      setErrorMessage("Please connect your wallet to mint");
      setMintStatus("error");
      return;
    }

    if (!contractAddress) {
      setErrorMessage("Contract address not configured");
      setMintStatus("error");
      return;
    }

    try {
      setIsMinting(true);
      setMintStatus("idle");
      setErrorMessage("");
      
      const transaction = {
        to: contractAddress,
        value: "0",
        data: {
          function: "claim",
          args: [account.address, 1]
        }
      };
      
      await sendTx(transaction as any);
      setMintStatus("success");
    } catch (err: any) {
      console.error("Failed to mint NFT", err);
      setMintStatus("error");
      setErrorMessage(err?.message || "Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <StyledMintingCard>
      <h2>Mint Genesis NFT</h2>
      <p className="text-gray-400 mb-6">
        Mint your Genesis NFT to join IKIGAI Protocol and start earning yield rewards.
      </p>
      
      {mintStatus === "success" && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-400">
          NFT minted successfully! Check your wallet to view your new NFT.
        </div>
      )}
      
      {mintStatus === "error" && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
          {errorMessage}
        </div>
      )}
      
      <GradientButton 
        onClick={handleMint}
        disabled={isMinting || !account}
        className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isMinting ? "Minting..." : "Mint NFT"}
      </GradientButton>
      
      <div className="mt-4 text-xs text-gray-500">
        * Minting is free, you only pay gas fees
      </div>
    </StyledMintingCard>
  );
} 