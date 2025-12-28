import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ShoppingBagIcon,
  SparklesIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-white p-4 rounded-2xl">
                <ShoppingBagIcon className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            
            <h1 className="text-5xl font-display font-bold mb-4">VastShop</h1>
            <p className="text-xl text-primary-100 mb-8">Your Premium E-Commerce Destination</p>
            
            <div className="space-y-4 text-left max-w-sm mx-auto">
              {[
                ' Fast & Secure Shopping',
                ' Premium Quality Products',
                ' Exclusive Member Deals',
                ' Free Shipping Over $50'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-3">
                  <SparklesIcon className="h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl">
                <ShoppingBagIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                VastShop
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your shopping experience</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 animate-scale-in">
                  <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:scale-105 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Signing in...</span>
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <p className="text-sm font-semibold text-primary-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-primary-700">
                <p><span className="font-medium">Email:</span> admin@vastfactor.io</p>
                <p><span className="font-medium">Password:</span> admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;