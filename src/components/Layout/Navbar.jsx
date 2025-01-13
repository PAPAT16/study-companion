import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className={`${
      location.pathname === '/track-progress' ? 'fixed top-0 left-0 right-0' : 'sticky top-0'
    } z-50 backdrop-blur-md bg-opacity-30 bg-gray-900`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-lg md:text-xl font-bold font-inter">
              Study Companion
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/notes" className="text-gray-300 hover:text-white transition-colors duration-200 font-inter">
              Notes
            </Link>
            <Link to="/flashcards" className="text-gray-300 hover:text-white transition-colors duration-200 font-inter">
              Flashcards
            </Link>
            <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors duration-200 font-inter">
              Quiz
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                  />
                  <span className="text-white text-sm md:text-base font-inter">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-inter px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-inter px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-dark-900 hover:bg-gray-100 transition-colors duration-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-semibold font-inter"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-0.5 px-2 pb-3 pt-2">
          <Link
            to="/notes"
            className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter"
          >
            Notes
          </Link>
          <Link
            to="/flashcards"
            className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter"
          >
            Flashcards
          </Link>
          <Link
            to="/quiz"
            className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter"
          >
            Quiz
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white block px-3 py-2.5 text-sm rounded-md font-inter"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-white text-dark-900 block px-3 py-2.5 text-sm rounded-md font-semibold font-inter mt-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
