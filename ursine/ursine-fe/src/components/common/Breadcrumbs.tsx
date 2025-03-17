"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = '' }) => {
  const pathname = usePathname();
  
  // Skip rendering breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }
  
  // Split the pathname into segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      // Capitalize the first letter and replace hyphens with spaces
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      return { label, href };
    }),
  ];

  return (
    <nav className={`py-4 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <li className="text-gray-500">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
            )}
            <li>
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-300 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}; 