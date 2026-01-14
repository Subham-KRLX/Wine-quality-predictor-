import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="noise-bg" />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
