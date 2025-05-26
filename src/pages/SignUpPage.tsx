import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Check } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
            <BookOpen size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold">Join BookBridge</h1>
          <p className="text-gray-600 mt-2">Create an account to start exchanging books</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-cream-200 p-8">
          {error && (
            <div className="mb-6 p-4 bg-accent-50 text-accent-700 rounded-md border border-accent-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="youremail@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-70"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-accent-600 hover:text-accent-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-100">
          <h3 className="text-lg font-medium text-primary-800 mb-4">Why Join BookBridge?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check size={18} className="text-secondary-600 mt-0.5 mr-2" />
              <span>Exchange books with other readers in your community</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-600 mt-0.5 mr-2" />
              <span>Discover new titles and expand your reading horizons</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-600 mt-0.5 mr-2" />
              <span>Connect with fellow book lovers and share recommendations</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-secondary-600 mt-0.5 mr-2" />
              <span>Reduce waste and promote sustainable reading habits</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;