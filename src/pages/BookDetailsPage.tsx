import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/ui/Loader';
import { 
  BookOpen, 
  RefreshCw, 
  Heart, 
  Calendar, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle,
  User
} from 'lucide-react';
import { BookStatus } from '../types';
import { cn } from '../utils/cn';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, requestExchange, isLoading } = useBooks();
  const { user, isAuthenticated } = useAuth();
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  
  const book = id ? getBookById(id) : undefined;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader size="large" />
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto mb-4 text-accent-500" />
          <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse" className="btn-primary">
            Browse Other Books
          </Link>
        </div>
      </div>
    );
  }
  
  const isOwner = user?.id === book.ownerId;
  const canRequest = isAuthenticated && !isOwner && book.status === BookStatus.AVAILABLE;
  
  const handleRequestExchange = async () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: `/book/${id}` } });
      return;
    }
    
    setIsRequesting(true);
    setRequestError(null);
    try {
      await requestExchange(book.id);
      setRequestSuccess(true);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Failed to request exchange. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/browse" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to Browse
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cream-200">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/* Book Cover */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 p-6 flex justify-center bg-cream-50">
            <div className="w-48 h-64 md:w-40 md:h-56 lg:w-48 lg:h-64 rounded-md overflow-hidden shadow-md">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} by ${book.author}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-cream-100">
                  <BookOpen size={48} className="text-primary-300" />
                </div>
              )}
            </div>
          </div>
          
          {/* Book Details */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-serif font-bold mb-2">{book.title}</h1>
                <p className="text-lg text-primary-600 mb-4">by {book.author}</p>
              </div>
              
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium h-fit",
                book.status === BookStatus.AVAILABLE ? "bg-secondary-100 text-secondary-700" :
                book.status === BookStatus.PENDING ? "bg-accent-100 text-accent-700" :
                "bg-primary-100 text-primary-700"
              )}>
                {book.status}
              </div>
            </div>
            
            {/* Book Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-primary-500" />
                    Added {new Date(book.addedAt).toLocaleDateString()}
                  </li>
                  <li className="flex items-center text-sm">
                    <User size={16} className="mr-2 text-primary-500" />
                    Shared by {book.ownerName}
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Condition:</span> {book.condition}
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {book.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-cream-100 text-primary-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{book.description}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {isOwner ? (
                <div className="w-full p-4 bg-cream-50 rounded-md">
                  <p className="text-gray-700">
                    This is your book. You can manage it from your profile.
                  </p>
                </div>
              ) : requestSuccess ? (
                <div className="w-full p-4 bg-secondary-50 rounded-md flex items-start">
                  <CheckCircle size={20} className="text-secondary-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      Exchange request sent successfully!
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      The book owner will be notified of your request. You can check the status in your profile.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    onClick={handleRequestExchange}
                    disabled={!canRequest || isRequesting}
                    className={cn(
                      "btn-primary py-3 px-6",
                      (!canRequest || isRequesting) && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isRequesting ? (
                      <>
                        <Loader size="small" className="mr-2 border-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={18} className="mr-2" />
                        Request Exchange
                      </>
                    )}
                  </button>
                  
                  <button className="btn-outline">
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                  </button>
                </>
              )}
              
              {requestError && (
                <div className="w-full p-4 bg-accent-50 rounded-md flex items-start">
                  <AlertCircle size={20} className="text-accent-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-accent-700">{requestError}</p>
                </div>
              )}
              
              {!isAuthenticated && !requestSuccess && (
                <div className="w-full p-4 bg-cream-50 rounded-md">
                  <p className="text-gray-700">
                    Please <Link to="/signin" className="text-accent-600 hover:underline">sign in</Link> to request this book.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;