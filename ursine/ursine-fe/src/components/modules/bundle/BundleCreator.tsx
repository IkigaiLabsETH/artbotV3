"use client";

import { useState } from 'react';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { GradientButton } from '../../common/Button';

interface BundleCreatorProps {
  multiwrapAddress: string;
}

type BundleType = 'GENESIS' | 'COLLECTION' | 'CUSTOM';

export const BundleCreator = ({ multiwrapAddress }: BundleCreatorProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [bundleType, setBundleType] = useState<BundleType>('GENESIS');
  const [bundleName, setBundleName] = useState<string>('');
  const [txStatus, setTxStatus] = useState<"idle" | "creating" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const account = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();

  const handleCreateBundle = async () => {
    if (!account) {
      setErrorMessage('Please connect your wallet first');
      setTxStatus('error');
      return;
    }
    
    if (!bundleName.trim()) {
      setErrorMessage('Please enter a name for your bundle');
      setTxStatus('error');
      return;
    }
    
    if (!multiwrapAddress) {
      setErrorMessage('Bundle contract address not configured');
      setTxStatus('error');
      return;
    }

    try {
      setIsCreating(true);
      setTxStatus('creating');
      setErrorMessage('');
      
      // Metadata for the bundle
      const metadata = {
        name: bundleName,
        description: `IKIGAI ${bundleType} Bundle`,
        image: "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/image.png" // Placeholder
      };
      
      // In a real implementation, you would upload this metadata to IPFS
      // and use the resulting URI in the wrap function
      const metadataUri = "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
      
      // Example bundle creation - this would need to be customized based on your specific requirements
      const wrapTx = {
        to: multiwrapAddress,
        value: "0",
        data: {
          function: "wrap",
          args: [
            [], // ERC20 tokens
            [], // ERC721 tokens
            [], // ERC1155 tokens
            metadataUri, // URI for wrapped token
            account.address // recipient
          ]
        }
      };
      
      await sendTx(wrapTx as any);
      setTxStatus('success');
      setBundleName('');
    } catch (error: any) {
      console.error('Error creating bundle:', error);
      setTxStatus('error');
      setErrorMessage(error?.message || 'Failed to create bundle. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-dark-secondary p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Create a Bundle</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Bundle Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            className={`p-3 rounded-lg border ${
              bundleType === 'GENESIS' 
                ? 'border-berry bg-berry/20 text-white' 
                : 'border-gray-700 bg-gray-800 text-gray-400'
            }`}
            onClick={() => setBundleType('GENESIS')}
          >
            Genesis
          </button>
          <button
            className={`p-3 rounded-lg border ${
              bundleType === 'COLLECTION' 
                ? 'border-jelly bg-jelly/20 text-white' 
                : 'border-gray-700 bg-gray-800 text-gray-400'
            }`}
            onClick={() => setBundleType('COLLECTION')}
          >
            Collection
          </button>
          <button
            className={`p-3 rounded-lg border ${
              bundleType === 'CUSTOM' 
                ? 'border-kiwi bg-kiwi/20 text-white' 
                : 'border-gray-700 bg-gray-800 text-gray-400'
            }`}
            onClick={() => setBundleType('CUSTOM')}
          >
            Custom
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Bundle Name
        </label>
        <input
          type="text"
          value={bundleName}
          onChange={(e) => setBundleName(e.target.value)}
          placeholder="Enter a name for your bundle"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-berry"
        />
      </div>
      
      {bundleType === 'GENESIS' && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            Genesis bundles include your Genesis NFT and IKIGAI tokens, creating a single tradable asset.
          </p>
        </div>
      )}
      
      {bundleType === 'COLLECTION' && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            Collection bundles allow you to group multiple NFTs from the same collection into a single tradable asset.
          </p>
        </div>
      )}
      
      {bundleType === 'CUSTOM' && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            Custom bundles give you complete freedom to combine any NFTs and tokens into a single tradable asset.
          </p>
        </div>
      )}
      
      {txStatus === "success" && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-400">
          Bundle created successfully!
        </div>
      )}
      
      {txStatus === "error" && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
          {errorMessage}
        </div>
      )}
      
      <GradientButton 
        onClick={handleCreateBundle} 
        disabled={isCreating}
        className="w-full py-3"
      >
        {isCreating ? 'Creating Bundle...' : 'Create Bundle'}
      </GradientButton>
    </div>
  );
};