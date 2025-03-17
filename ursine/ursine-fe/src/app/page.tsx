"use client";

import { Layout } from '../components/layout/Layout';
import Link from 'next/link';
import { GradientButton } from '../components/common/Button';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text-berry">IKIGAI</span> Protocol
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            DeFi protocol built on Berachain, leveraging battle-tested yield strategies for maximum returns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/mint">
              <GradientButton className="px-8 py-3 text-lg">
                Mint Genesis NFT
              </GradientButton>
            </Link>
            <Link href="/stake">
              <button className="px-8 py-3 text-lg bg-dark-secondary border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                Stake Tokens
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-berry/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-berry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-3.6 2.3L3 8m9 4v5m0-5H4.5a2 2 0 01-2-2v-.5a2 2 0 012-2H14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Genesis NFTs</h3>
              <p className="text-gray-400">
                Mint Genesis NFTs to receive vested IKIGAI tokens and gain access to exclusive protocol features.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-jelly/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-jelly" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Yield Vaults</h3>
              <p className="text-gray-400">
                Deposit your assets into IKIGAI vaults to earn optimized yields with auto-compounding strategies.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-kiwi/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-kiwi" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategy Bundles</h3>
              <p className="text-gray-400">
                Create bundles to wrap multiple yield-bearing assets into a single tradable token.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tokenomics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-secondary p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Token Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Genesis NFTs</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-berry h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Yield Rewards</span>
                  <span className="font-bold">35%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-jelly h-full rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Community/DAO</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-kiwi h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Treasury</span>
                  <span className="font-bold">10%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-lemon h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-dark-secondary p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Revenue Allocation</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Protocol Owned Liquidity</span>
                  <span className="font-bold">2.0%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-berry h-full rounded-full" style={{ width: '46.5%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Yield Rewards</span>
                  <span className="font-bold">1.3%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-jelly h-full rounded-full" style={{ width: '30.2%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Treasury Operations</span>
                  <span className="font-bold">1.0%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full">
                  <div className="bg-kiwi h-full rounded-full" style={{ width: '23.3%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-berry/20 to-jelly/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join IKIGAI Protocol</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the next generation DeFi protocol on Berachain.
          </p>
          <Link href="/mint">
            <GradientButton className="px-8 py-3 text-lg">
              Get Started
            </GradientButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
