import React from 'react';

interface StrategyCardProps {
  name: string;
  description: string;
  apy: string;
  risk: 'Low' | 'Medium' | 'High';
  protocols: string[];
  vault: string;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({
  name,
  description,
  apy,
  risk,
  protocols,
  vault,
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="bg-berry/20 text-berry px-3 py-1 rounded-full text-sm font-medium">
          {apy} APY
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex justify-between text-sm mb-4">
        <span className="text-gray-400">Risk:</span>
        <span className={getRiskColor(risk)}>{risk}</span>
      </div>
      
      <div className="mb-4">
        <span className="text-sm text-gray-400">Protocols:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {protocols.map((protocol) => (
            <span 
              key={protocol}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {protocol}
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-400">
        <span>Vault: {vault}</span>
      </div>
    </div>
  );
}; 