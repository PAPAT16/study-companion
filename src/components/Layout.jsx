import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Footer from './Footer';
import Preloader from './Preloader';

export default function Layout() {
  const location = useLocation();
  const hideFooterPaths = ['/flashcards', '/quiz', '/login', '/signup'];
  const hideNavbarPaths = ['/login', '/signup'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show preloader on route change
    setLoading(true);
    
    // Hide preloader after a short delay to ensure content is ready
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {loading && <Preloader />}
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}
