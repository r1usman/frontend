import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 py-8 mb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        {/* Page Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;