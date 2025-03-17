"use client";

import { FC } from 'react';
import { Layout } from '../../components/layout/Layout';
import { BundleCreator } from '../../components/modules/bundle/BundleCreator';

const BundlesPage: FC = () => {
  const multiwrapAddress = process.env.NEXT_PUBLIC_MULTIWRAP_ADDRESS || '';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text-berry mb-2">IKIGAI Bundles</h1>
          <p className="text-gray-400">
            Create bundles to wrap multiple assets into a single tradable token.
            This allows for efficient trading and management of your IKIGAI assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Bundle Benefits</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Trade entire positions as one unit</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Combine NFTs and tokens in a single asset</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Reduce gas costs for multiple transfers</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Create curated collections for easier trading</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Unwrap at any time to access individual assets</span>
              </li>
            </ul>
          </div>
          
          <BundleCreator multiwrapAddress={multiwrapAddress} />
        </div>
      </div>
    </Layout>
  );
};

export default BundlesPage; 