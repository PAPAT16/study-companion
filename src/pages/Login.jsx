import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import SplineScene from '../components/SplineScene';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = {
        id: 1,
        name: 'Test User',
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      };
      
      login(userData);
      navigate('/profile');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Link
        to="/"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-dark-800/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-dark-700 text-white hover:bg-accent-primary/10 hover:border-accent-primary transition-all duration-200 font-inter group shadow-lg"
      >
        <svg className="w-5 h-5 text-accent-primary group-hover:translate-x-[-2px] transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm md:text-base font-medium">Back to Home</span>
      </Link>
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="w-full flex items-center justify-center px-4 md:px-6 lg:px-8 lg:w-1/2">
          <div className="w-full max-w-sm md:max-w-md space-y-6 md:space-y-8 bg-dark-800/80 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-2xl border border-dark-700">
            <div>
              <h2 className="mt-2 md:mt-4 text-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary font-inter">
                Welcome back
              </h2>
              <p className="mt-2 text-center text-sm text-gray-400 font-inter">
                Or{' '}
                <Link to="/signup" className="font-medium text-accent-primary hover:text-accent-secondary transition-colors duration-200">
                  create a new account
                </Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-500 text-sm text-center font-inter">
                  {error}
                </p>
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-3 md:px-4 py-2 md:py-3 border border-dark-700 rounded-lg md:rounded-xl placeholder-gray-500 text-white bg-dark-900 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 font-inter text-sm md:text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 md:px-4 py-2 md:py-3 border border-dark-700 rounded-lg md:rounded-xl placeholder-gray-500 text-white bg-dark-900 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 font-inter text-sm md:text-base"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-accent-primary focus:ring-accent-primary border-dark-700 rounded bg-dark-900"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 font-inter">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-accent-primary hover:text-accent-secondary transition-colors duration-200 font-inter">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 md:py-3 px-3 md:px-4 border border-transparent text-sm font-semibold rounded-lg md:rounded-xl text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/80 hover:to-accent-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary transition-all duration-200 font-inter"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>

        {/* Right side - 3D Scene */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 font-inter">
              Study Smarter,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                Not Harder
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-inter max-w-md mx-auto">
              Join our community of students and unlock your full potential with AI-powered study tools.
            </p>
          </div>
          <div className="absolute inset-0">
            <SplineScene />
          </div>
        </div>
      </div>
    </div>
  );
}
