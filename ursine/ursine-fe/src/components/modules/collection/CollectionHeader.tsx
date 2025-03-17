import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

const StyledCollectionHeader = styled.div`
  max-width: 72rem; // 6xl in Tailwind
  margin: 0 auto;
  padding: 2rem 1rem;

  .eyebrow {
    color: var(--color-berry);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: var(--gradient-berry);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    color: #d1d5db; // text-gray-300
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 2rem;
    max-width: 48rem;
  }
`;

interface CollectionHeaderProps {
  eyebrow?: string;
  coverImage?: string;
  name: string;
  description: string;
  children: ReactNode;
}

export const CollectionHeader: FC<CollectionHeaderProps> = ({
  eyebrow,
  coverImage,
  name,
  description,
  children
}) => {
  return (
    <StyledCollectionHeader>
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}
      <h1 className="title">{name}</h1>
      <p className="description">{description}</p>
      {children}
    </StyledCollectionHeader>
  );
}; 