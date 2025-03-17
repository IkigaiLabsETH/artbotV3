"use client";

import { FC } from 'react';
import Image from 'next/image';
import { Layout } from '../../components/layout/Layout';
import { CollectionHeader } from '../../components/modules/collection/CollectionHeader';
import { MintingCard } from '../../components/modules/nft/MintingCard';
import styled from '@emotion/styled';

const StyledMintPage = styled.div`
  .nft-image-container {
    background: var(--color-dark-secondary);
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MintPage: FC = () => {
  const contractAddress = process.env.NEXT_PUBLIC_NFT_DROP_ADDRESS || '';

  return (
    <Layout>
      <StyledMintPage>
        <CollectionHeader
          eyebrow="Genesis Collection"
          name="IKIGAI Genesis NFT"
          description="Mint your Genesis NFT to join the IKIGAI Protocol and start earning rewards. Each NFT grants you access to exclusive features and token rewards."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="nft-image-container">
              <Image 
                src="/images/genesis-nft.jpg" 
                alt="IKIGAI Genesis NFT" 
                width={500}
                height={500}
                className="w-full h-auto"
                onError={(e) => {
                  // @ts-ignore - Next Image doesn't have onError but we'll keep it for fallback
                  e.currentTarget.src = "https://via.placeholder.com/500x500?text=IKIGAI+Genesis+NFT";
                }}
              />
            </div>
            
            <MintingCard contractAddress={contractAddress} />
          </div>
        </CollectionHeader>
      </StyledMintPage>
    </Layout>
  );
};

export default MintPage; 