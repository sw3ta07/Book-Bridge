import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogIn, User, Search, BookPlus, Crown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { SubscriptionPlan } from '../../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-serif font-bold">
            <BookOpen className="text-accent-500" />
            <span className="hidden sm:inline">BookBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="hover:text-accent-300 transition-colors">
              Browse Books
            </Link>
            {isAuthenticated && (
              <Link to="/donate" className="hover:text-accent-300 transition-colors">
                Donate
              </Link>
            )}
          </nav>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-primary-700 border border-primary-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
          </form>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.subscription?.plan !== SubscriptionPlan.FREE && (
                  <Crown className="h-5 w-5 text-accent-400" />
                )}
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 hover:text-accent-300 transition-colors"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span>{user?.name}</span>
                </Link>
                <Link
                  to="/subscription"
                  className="px-4 py-2 rounded-md bg-accent-500 hover:bg-accent-600 transition-colors"
                >
                  Upgrade
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-primary-700 hover:bg-primary-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/signin" className="hover:text-accent-300 transition-colors flex items-center">
                  <LogIn className="h-5 w-5 mr-1" />
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded-md bg-accent-500 hover:bg-accent-600 transition-colors"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden absolute left-0 right-0 bg-primary-800 border-t border-primary-700 shadow-lg",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-primary-700 border border-primary-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <button
                type="submit"
                className="ml-2 p-2 rounded-full bg-accent-500 hover:bg-accent-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/browse" 
                className="py-2 hover:text-accent-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Books
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/profile" 
                    className="py-2 hover:text-accent-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/subscription" 
                    className="py-2 hover:text-accent-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Subscription Plans
                  </Link>
                  <Link 
                    to="/donate" 
                    className="py-2 hover:text-accent-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Donate
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Auth */}
            <div className="pt-2 border-t border-primary-700">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span>{user?.name}</span>
                    {user?.subscription?.plan !== SubscriptionPlan.FREE && (
                      <Crown className="h-5 w-5 text-accent-400" />
                    )}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-md bg-primary-700 hover:bg-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/signin" 
                    className="px-4 py-2 rounded-md border border-white hover:bg-primary-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 rounded-md bg-accent-500 hover:bg-accent-600 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;