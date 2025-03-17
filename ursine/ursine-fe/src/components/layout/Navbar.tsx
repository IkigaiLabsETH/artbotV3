import React, { useState } from 'react';
import Link from 'next/link';
import { WalletConnect } from '../common/WalletConnect';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark-secondary py-4 px-6 border-b border-gray-800 relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="gradient-text-berry">IKIGAI</span> Protocol
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="hover:text-berry transition-colors flex items-center">
              Earn
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-dark-secondary border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                <Link href="/vaults" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                  Vaults
                </Link>
                <Link href="/strategies" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                  Strategies
                </Link>
                <Link href="/stake" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                  Staking
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="hover:text-jelly transition-colors flex items-center">
              NFTs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-dark-secondary border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                <Link href="/mint" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                  Mint NFTs
                </Link>
                <Link href="/bundles" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                  NFT Bundles
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/bera" className="hover:text-lime transition-colors">
            Berachain
          </Link>
          
          <div className="ml-4">
            <WalletConnect />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-secondary border-b border-gray-800 shadow-lg">
          <div className="px-4 py-2">
            <div className="py-2 border-b border-gray-800">
              <p className="text-sm text-gray-400 mb-1">Earn</p>
              <Link href="/vaults" className="block py-2 hover:text-berry transition-colors">
                Vaults
              </Link>
              <Link href="/strategies" className="block py-2 hover:text-berry transition-colors">
                Strategies
              </Link>
              <Link href="/stake" className="block py-2 hover:text-berry transition-colors">
                Staking
              </Link>
            </div>
            
            <div className="py-2 border-b border-gray-800">
              <p className="text-sm text-gray-400 mb-1">NFTs</p>
              <Link href="/mint" className="block py-2 hover:text-jelly transition-colors">
                Mint NFTs
              </Link>
              <Link href="/bundles" className="block py-2 hover:text-jelly transition-colors">
                NFT Bundles
              </Link>
            </div>
            
            <div className="py-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}; 