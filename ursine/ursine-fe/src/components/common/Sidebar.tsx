"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
  id?: string; // Add id for static rendering
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  title, 
  className = '' 
}) => {
  const pathname = usePathname();

  const renderItems = (items: SidebarItem[]) => {
    return items.map((item, index) => {
      const isActive = pathname === item.href;
      const hasChildren = item.children && item.children.length > 0;
      const itemId = item.id || `item-${index}-${item.href.replace(/\//g, '-')}`;
      
      return (
        <div key={itemId} className="mb-2">
          <Link 
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-berry/20 text-white border-l-2 border-berry' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
          
          {hasChildren && (
            <div className="ml-4 mt-2 border-l border-gray-800 pl-4">
              {renderItems(item.children!)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`bg-dark-secondary rounded-lg border border-gray-800 p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-bold mb-4 px-4">{title}</h3>
      )}
      <nav>
        {renderItems(items)}
      </nav>
    </div>
  );
};

// Example usage:
export const VaultsSidebar: React.FC = () => {
  return (
    <Sidebar
      title="Vaults"
      items={[
        {
          label: "All Vaults",
          href: "/vaults",
          id: "all-vaults",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
        },
        {
          label: "Stablecoin Vaults",
          href: "/vaults/stablecoins",
          id: "stablecoin-vaults",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          label: "ETH Vaults",
          href: "/vaults/eth",
          id: "eth-vaults",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          label: "BERA Vaults",
          href: "/vaults/bera",
          id: "bera-vaults",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          ),
        },
      ]}
    />
  );
};

export const StrategiesSidebar: React.FC = () => {
  return (
    <Sidebar
      title="Strategies"
      items={[
        {
          label: "All Strategies",
          href: "/strategies",
          id: "all-strategies",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
        },
        {
          label: "Lending Strategies",
          href: "/strategies/lending",
          id: "lending-strategies",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
        {
          label: "LP Strategies",
          href: "/strategies/lp",
          id: "lp-strategies",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
        },
        {
          label: "Staking Strategies",
          href: "/strategies/staking",
          id: "staking-strategies",
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
        },
      ]}
    />
  );
}; 