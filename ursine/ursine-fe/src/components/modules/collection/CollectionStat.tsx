import { FC, ReactNode } from 'react';

interface CollectionStatProps {
  label: string;
  loading?: boolean;
  children: ReactNode;
}

export const CollectionStat: FC<CollectionStatProps> = ({
  label,
  loading = false,
  children
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-400 mb-1">{label}</span>
      <span className="text-lg font-bold">
        {loading ? (
          <div className="animate-pulse bg-gray-700 h-6 w-16 rounded" />
        ) : (
          children
        )}
      </span>
    </div>
  );
}; 