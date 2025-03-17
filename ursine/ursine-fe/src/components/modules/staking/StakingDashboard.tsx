"use client";

import { useState } from 'react';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { GradientButton } from '../../common/Button';

interface StakingDashboardProps {
  stakingAddress: string;
  tokenAddress: string;
}

export const StakingDashboard = ({ stakingAddress, tokenAddress }: StakingDashboardProps) => {
  const [amount, setAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [txStatus, setTxStatus] = useState<"idle" | "approving" | "staking" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const account = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();

  const handleStake = async () => {
    if (!account) {
      setErrorMessage('Please connect your wallet first');
      setTxStatus('error');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage('Please enter a valid amount');
      setTxStatus('error');
      return;
    }
    
    if (!stakingAddress || !tokenAddress) {
      setErrorMessage('Contract addresses not configured');
      setTxStatus('error');
      return;
    }

    try {
      setIsApproving(true);
      setTxStatus('approving');
      setErrorMessage('');
      
      // First approve tokens for staking
      const approvalTx = {
        to: tokenAddress,
        value: "0",
        data: {
          function: "approve",
          args: [stakingAddress, amount]
        }
      };
      
      await sendTx(approvalTx as any);
      setIsApproving(false);
      setIsStaking(true);
      setTxStatus('staking');
      
      // Then stake tokens
      const stakeTx = {
        to: stakingAddress,
        value: "0",
        data: {
          function: "stake",
          args: [amount]
        }
      };
      
      await sendTx(stakeTx as any);
      setTxStatus('success');
      setAmount('');
    } catch (error: any) {
      console.error('Error staking tokens:', error);
      setTxStatus('error');
      setErrorMessage(error?.message || 'Failed to stake tokens. Please try again.');
    } finally {
      setIsApproving(false);
      setIsStaking(false);
    }
  };
  
  const handleClaimRewards = async () => {
    if (!account || !stakingAddress) {
      setErrorMessage('Please connect your wallet first');
      setTxStatus('error');
      return;
    }
    
    try {
      setIsStaking(true);
      setTxStatus('staking');
      setErrorMessage('');
      
      const claimTx = {
        to: stakingAddress,
        value: "0",
        data: {
          function: "claimRewards",
          args: []
        }
      };
      
      await sendTx(claimTx as any);
      setTxStatus('success');
    } catch (error: any) {
      console.error('Error claiming rewards:', error);
      setTxStatus('error');
      setErrorMessage(error?.message || 'Failed to claim rewards. Please try again.');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="bg-dark-secondary p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Stake IKIGAI Tokens</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Amount to Stake
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-berry"
          />
        </div>
      </div>
      
      {txStatus === "success" && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-400">
          Transaction successful!
        </div>
      )}
      
      {txStatus === "error" && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
          {errorMessage}
        </div>
      )}
      
      <GradientButton 
        onClick={handleStake} 
        disabled={isApproving || isStaking || !amount || parseFloat(amount) <= 0}
        className="w-full py-3 mb-3"
      >
        {isApproving ? 'Approving...' : isStaking ? 'Staking...' : 'Stake Tokens'}
      </GradientButton>
      
      <button 
        onClick={handleClaimRewards}
        disabled={isStaking}
        className="w-full py-2 mt-3 bg-gray-800 border border-kiwi text-kiwi rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isStaking ? 'Processing...' : 'Claim Rewards'}
      </button>
      
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h4 className="font-medium mb-2">Staking Rewards</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex justify-between">
            <span>Tier 1 (30 days):</span>
            <span className="text-kiwi">1.2x Multiplier</span>
          </li>
          <li className="flex justify-between">
            <span>Tier 2 (90 days):</span>
            <span className="text-jelly">1.5x Multiplier</span>
          </li>
          <li className="flex justify-between">
            <span>Tier 3 (180 days):</span>
            <span className="text-berry">2.0x Multiplier</span>
          </li>
        </ul>
      </div>
    </div>
  );
}; 