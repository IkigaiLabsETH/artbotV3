"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { GradientButton } from "../../common/Button";

interface VaultCardProps {
  vaultAddress: string;
  name: string;
  description: string;
  apy: string;
  tvl: string;
  token: string;
}

export function VaultCard({ vaultAddress, name, description, apy, tvl, token }: VaultCardProps) {
  const [amount, setAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const { mutate: sendTx } = useSendTransaction();
  const account = useActiveAccount();

  const handleDeposit = async () => {
    if (!account) {
      console.error("Please connect your wallet");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      console.error("Please enter a valid amount");
      return;
    }

    try {
      setIsDepositing(true);
      
      // First approve tokens for deposit
      const approvalTx = {
        to: token,
        value: "0",
        data: {
          function: "approve",
          args: [vaultAddress, amount]
        }
      };
      
      await sendTx(approvalTx as any);
      console.log("Approval successful");
      
      // Then deposit tokens
      const depositTx = {
        to: vaultAddress,
        value: "0",
        data: {
          function: "deposit",
          args: [amount]
        }
      };
      
      await sendTx(depositTx as any);
      console.log("Deposit successful");
      setAmount("");
    } catch (err) {
      console.error("Failed to deposit", err);
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="bg-berry/20 text-berry px-3 py-1 rounded-full text-sm font-medium">
          {apy} APY
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex justify-between text-sm text-gray-400 mb-6">
        <span>TVL: {tvl}</span>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Amount to Deposit
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-berry"
        />
      </div>
      
      <GradientButton 
        onClick={handleDeposit} 
        disabled={isDepositing || !amount || !account}
        className="w-full py-3"
      >
        {isDepositing ? "Depositing..." : "Deposit"}
      </GradientButton>
    </div>
  );
} 