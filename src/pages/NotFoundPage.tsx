import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary-100 text-primary-600 mb-6">
          <BookX size={48} />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary py-3 px-6">
            <Home size={18} className="mr-2" />
            Go to Homepage
          </Link>
          <Link to="/browse" className="btn-outline py-3 px-6">
            <Search size={18} className="mr-2" />
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;