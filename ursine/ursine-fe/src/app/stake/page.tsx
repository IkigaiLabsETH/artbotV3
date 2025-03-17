"use client";

import { FC } from 'react';
import { Layout } from '../../components/layout/Layout';
import { StakingDashboard } from '../../components/modules/staking/StakingDashboard';

const StakePage: FC = () => {
  const stakingAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS || '';
  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-berry mb-2">Stake IKIGAI</h1>
          <p className="text-gray-400">
            Stake your IKIGAI tokens to earn rewards and participate in governance.
            The longer you stake, the higher your rewards multiplier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Staking Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">APR</span>
                <span className="font-bold">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Staked</span>
                <span className="font-bold">1,250,000 IKIGAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Your Stake</span>
                <span className="font-bold">0 IKIGAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Your Rewards</span>
                <span className="font-bold">0 IKIGAI</span>
              </div>
            </div>
          </div>
          
          <StakingDashboard 
            stakingAddress={stakingAddress}
            tokenAddress={tokenAddress}
          />
        </div>
      </div>
    </Layout>
  );
};

export default StakePage; 