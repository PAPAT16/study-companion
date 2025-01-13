import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Preloader from './Preloader';

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show preloader while checking authentication
  if (!isInitialized) {
    return <Preloader />;
  }

  if (!user) {
    // Only show toast and redirect if we're not already on the login page
    if (location.pathname !== '/login') {
      toast.error('Please log in to access this feature');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
}
