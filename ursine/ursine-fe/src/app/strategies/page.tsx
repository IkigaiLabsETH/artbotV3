"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { StrategyCard } from '../../components/modules/strategies/StrategyCard';
import { useReadContract } from "thirdweb/react";

// Interface for strategy data
interface StrategyData {
  name: string;
  description: string;
  apy: string;
  risk: "Low" | "Medium" | "High";
  protocols: string[];
  vault: string;
}

// Default strategy data for static rendering and fallback
const defaultStrategies: StrategyData[] = [
  {
    name: "USDC Lending Optimizer",
    description: "Automatically allocates USDC across lending protocols to maximize yield.",
    apy: "8.2%",
    risk: "Low" as const,
    protocols: ["Aave", "Compound", "Euler"],
    vault: "USDC Vault",
  },
  {
    name: "ETH-BERA LP Compounder",
    description: "Compounds rewards from ETH-BERA liquidity provision on DEXes.",
    apy: "12.5%",
    risk: "Medium" as const,
    protocols: ["Uniswap", "Balancer", "Curve"],
    vault: "ETH Vault",
  },
  {
    name: "BERA Staking Maximizer",
    description: "Optimizes BERA staking rewards across multiple validators.",
    apy: "11.3%",
    risk: "Low" as const,
    protocols: ["Lido", "Rocket Pool", "Frax"],
    vault: "BERA Vault",
  },
  {
    name: "YFI Delta Neutral",
    description: "Delta neutral strategy using YFI to generate yield while hedging price exposure.",
    apy: "15.7%",
    risk: "High" as const,
    protocols: ["GMX", "Perpetual Protocol", "dYdX"],
    vault: "YFI Vault",
  },
  {
    name: "Stablecoin Curve Strategy",
    description: "Provides liquidity to Curve stablecoin pools and autocompounds CRV rewards.",
    apy: "9.8%",
    risk: "Medium" as const,
    protocols: ["Curve", "Convex", "Stake DAO"],
    vault: "USDC Vault",
  },
  {
    name: "ETH LST Yield Aggregator",
    description: "Aggregates yield from liquid staking tokens while maintaining ETH exposure.",
    apy: "7.2%",
    risk: "Low" as const,
    protocols: ["Lido", "Frax", "Swell"],
    vault: "ETH Vault",
  },
];

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<StrategyData[]>(defaultStrategies);
  const [isLoading, setIsLoading] = useState(true);

  // Strategy factory address from environment variable
  const strategyFactoryAddress = process.env.NEXT_PUBLIC_IKIGAI_STRATEGY_FACTORY_ADDRESS || "";

  // Read strategy addresses from factory
  const { data: strategyAddresses, isLoading: isLoadingStrategies } = useReadContract({
    contract: strategyFactoryAddress as any,
    method: "getAllStrategies" as any,
    params: [] as any
  });

  useEffect(() => {
    const fetchStrategyData = async () => {
      if (!strategyAddresses || !Array.isArray(strategyAddresses) || strategyAddresses.length === 0) {
        // If no strategies are deployed yet, use example data
        setStrategies(defaultStrategies);
        setIsLoading(false);
        return;
      }

      try {
        // In a real implementation, we would fetch data for each strategy
        // For now, we'll use example data
        
        // Example of how to fetch data for a single strategy (would need to be done for each strategy)
        // const strategyData = await useReadContract({
        //   contract: strategyAddresses[0],
        //   method: "estimatedAPY",
        //   params: []
        // });
        
        // For now, use example data
        setStrategies(defaultStrategies);
      } catch (error) {
        console.error("Error fetching strategy data:", error);
        // Fallback to example data
        setStrategies(defaultStrategies);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoadingStrategies) {
      fetchStrategyData();
    }
  }, [strategyAddresses, isLoadingStrategies]);

  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">IkigaiStrategies</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our automated strategies work around the clock to maximize your yield across DeFi protocols.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-dark-secondary rounded-lg border border-gray-800 p-4">
                <h3 className="text-lg font-bold mb-4 px-4">Strategies</h3>
                <nav>
                  <div className="mb-2">
                    <a 
                      href="/strategies"
                      className="flex items-center px-4 py-2 rounded-lg transition-colors bg-berry/20 text-white border-l-2 border-berry"
                    >
                      <span>All Strategies</span>
                    </a>
                  </div>
                  <div className="mb-2">
                    <a 
                      href="/strategies/lending"
                      className="flex items-center px-4 py-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <span>Lending Strategies</span>
                    </a>
                  </div>
                  <div className="mb-2">
                    <a 
                      href="/strategies/lp"
                      className="flex items-center px-4 py-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <span>LP Strategies</span>
                    </a>
                  </div>
                  <div className="mb-2">
                    <a 
                      href="/strategies/staking"
                      className="flex items-center px-4 py-2 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <span>Staking Strategies</span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            
            <div className="md:w-3/4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-berry"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {strategies.map((strategy, index) => (
                    <StrategyCard
                      key={index}
                      name={strategy.name}
                      description={strategy.description}
                      apy={strategy.apy}
                      risk={strategy.risk}
                      protocols={strategy.protocols}
                      vault={strategy.vault}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-dark-secondary rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">How IkigaiStrategies Work</h2>
            <p className="text-gray-400 mb-6">
              Ikigaistrategies are smart contracts that automate yield farming across DeFi protocols. Our strategies are:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-berry/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-berry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Automated</h3>
                  <p className="text-gray-400">
                    Strategies automatically rebalance and compound rewards to maximize yield.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-jelly/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-jelly" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Secure</h3>
                  <p className="text-gray-400">
                    All strategies undergo rigorous security audits and risk assessment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-kiwi/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-kiwi" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Optimized</h3>
                  <p className="text-gray-400">
                    Strategies are continuously optimized to adapt to changing market conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lemon/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lemon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Community-Driven</h3>
                  <p className="text-gray-400">
                    Strategies are proposed, reviewed, and approved by the Ikigaicommunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 