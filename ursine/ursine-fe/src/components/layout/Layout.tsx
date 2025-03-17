import React from 'react';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBreadcrumbs = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-primary text-white">
      <Navbar />
      <main className="flex-grow">
        {showBreadcrumbs && (
          <div className="max-w-6xl mx-auto px-6">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}; 