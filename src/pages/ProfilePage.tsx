import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  MapPin, 
  BookOpen, 
  PlusCircle, 
  RefreshCw, 
  Settings,
  X,
  Check,
  Loader as LoaderIcon
} from 'lucide-react';
import BookGrid from '../components/books/BookGrid';
import Loader from '../components/ui/Loader';
import { BookCondition, Book } from '../types';
import { cn } from '../utils/cn';

const ProfilePage: React.FC = () => {
  const { user, isLoading: authLoading, updateProfile } = useAuth();
  const { userBooks, exchanges, isLoading: booksLoading, addBook } = useBooks();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('mybooks');
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    description: '',
    genre: [],
    condition: BookCondition.GOOD,
    coverImage: '',
    isAvailableForExchange: true,
  });
  const [newGenre, setNewGenre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Exchange request that this user has received
  const receivedRequests = exchanges.filter(exchange => 
    exchange.providerId === user?.id && 
    exchange.status === 'Requested'
  );
  
  // Exchange request that this user has sent
  const sentRequests = exchanges.filter(exchange =>
    exchange.requesterId === user?.id
  );
  
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader size="large" />
      </div>
    );
  }
  
  if (!user) {
    navigate('/signin');
    return null;
  }
  
  const handleAddGenre = () => {
    if (newGenre && !newBook.genre?.includes(newGenre)) {
      setNewBook({
        ...newBook,
        genre: [...(newBook.genre || []), newGenre]
      });
      setNewGenre('');
    }
  };
  
  const removeGenre = (genreToRemove: string) => {
    setNewBook({
      ...newBook,
      genre: newBook.genre?.filter(g => g !== genreToRemove) || []
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewBook({
      ...newBook,
      [name]: checked
    });
  };
  
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validation
    if (!newBook.title || !newBook.author || !newBook.description) {
      setFormError('Please fill in all required fields.');
      return;
    }
    
    if (!newBook.genre || newBook.genre.length === 0) {
      setFormError('Please add at least one genre.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addBook(newBook as Omit<Book, 'id' | 'addedAt' | 'ownerId' | 'ownerName' | 'status'>);
      setShowAddBookForm(false);
      setNewBook({
        title: '',
        author: '',
        description: '',
        genre: [],
        condition: BookCondition.GOOD,
        coverImage: '',
        isAvailableForExchange: true,
      });
    } catch (error) {
      setFormError('Failed to add book. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cream-200 mb-8">
        <div className="bg-paper-texture bg-cover h-32 relative">
          <div className="absolute inset-0 bg-primary-900/30"></div>
        </div>
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-end relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-6 rounded-full border-4 border-white overflow-hidden h-24 w-24 bg-primary-100">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <UserIcon size={40} className="text-primary-300" />
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div className="mt-12 md:mt-0 md:ml-28 flex-grow">
            <h1 className="text-2xl font-serif font-bold">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
              <span className="flex items-center">
                <BookOpen size={18} className="mr-1 text-primary-500" />
                {userBooks.length} books shared
              </span>
              {user.location && (
                <span className="flex items-center">
                  <MapPin size={18} className="mr-1 text-primary-500" />
                  {user.location}
                </span>
              )}
              <span className="flex items-center">
                <RefreshCw size={18} className="mr-1 text-primary-500" />
                {user.booksShared || 0} exchanges completed
              </span>
            </div>
          </div>
          
          {/* Settings Button */}
          <button className="mt-4 md:mt-0 btn-outline self-start">
            <Settings size={18} className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-8 border-b border-cream-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('mybooks')}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === 'mybooks'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-gray-600 hover:text-primary-600"
            )}
          >
            My Books
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === 'requests'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-gray-600 hover:text-primary-600"
            )}
          >
            Exchange Requests
            {receivedRequests.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent-500 text-white rounded-full">
                {receivedRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === 'history'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-gray-600 hover:text-primary-600"
            )}
          >
            Exchange History
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === 'wishlist'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-gray-600 hover:text-primary-600"
            )}
          >
            Wishlist
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {/* My Books Tab */}
        {activeTab === 'mybooks' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold">My Bookshelf</h2>
              <button 
                onClick={() => setShowAddBookForm(true)}
                className="btn-primary"
              >
                <PlusCircle size={18} className="mr-2" />
                Add New Book
              </button>
            </div>
            
            {showAddBookForm && (
              <div className="bg-white rounded-lg shadow-md border border-cream-200 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Add New Book</h3>
                  <button 
                    onClick={() => setShowAddBookForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {formError && (
                  <div className="mb-4 p-3 bg-accent-50 border border-accent-200 rounded-md text-accent-700">
                    {formError}
                  </div>
                )}
                
                <form onSubmit={handleAddBook}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title <span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={newBook.title}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                        Author <span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="author"
                        name="author"
                        type="text"
                        value={newBook.author}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-2">
                        Cover Image URL
                      </label>
                      <input
                        id="coverImage"
                        name="coverImage"
                        type="url"
                        value={newBook.coverImage}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="https://example.com/book-cover.jpg"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="condition" className="block text-gray-700 font-medium mb-2">
                        Condition <span className="text-accent-600">*</span>
                      </label>
                      <select
                        id="condition"
                        name="condition"
                        value={newBook.condition}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        {Object.values(BookCondition).map(condition => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description <span className="text-accent-600">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newBook.description}
                        onChange={handleInputChange}
                        className="input min-h-[100px]"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Genres <span className="text-accent-600">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newBook.genre?.map(genre => (
                          <span 
                            key={genre} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                          >
                            {genre}
                            <button 
                              type="button"
                              onClick={() => removeGenre(genre)}
                              className="ml-1 text-primary-500 hover:text-primary-700"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          value={newGenre}
                          onChange={(e) => setNewGenre(e.target.value)}
                          className="input rounded-r-none"
                          placeholder="Add a genre (e.g. Fantasy, Mystery)"
                        />
                        <button
                          type="button"
                          onClick={handleAddGenre}
                          className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <input
                          id="isAvailableForExchange"
                          name="isAvailableForExchange"
                          type="checkbox"
                          checked={newBook.isAvailableForExchange}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isAvailableForExchange" className="ml-2 block text-gray-700">
                          Available for exchange
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAddBookForm(false)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader size="small" className="mr-2 border-white" />
                          Adding...
                        </>
                      ) : (
                        'Add Book'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <BookGrid 
              books={userBooks} 
              isLoading={booksLoading}
              emptyMessage="You haven't added any books yet. Click 'Add New Book' to get started."
            />
          </div>
        )}
        
        {/* Exchange Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-xl font-serif font-bold mb-6">Exchange Requests</h2>
            
            {/* Received Requests */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Requests Received</h3>
              
              {receivedRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 text-center text-gray-600">
                  You haven't received any exchange requests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedRequests.map(request => (
                    <div 
                      key={request.id}
                      className="bg-white rounded-lg shadow-sm border border-cream-200 p-4 flex flex-col sm:flex-row sm:items-center"
                    >
                      <div className="flex-grow mb-4 sm:mb-0">
                        <h4 className="font-medium">{request.bookTitle}</h4>
                        <p className="text-sm text-gray-600">
                          Requested by: {request.requesterName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(request.requestedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-primary py-1 px-4">
                          <Check size={16} className="mr-1" />
                          Accept
                        </button>
                        <button className="btn-outline py-1 px-4">
                          <X size={16} className="mr-1" />
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sent Requests */}
            <div>
              <h3 className="text-lg font-medium mb-4">Requests Sent</h3>
              
              {sentRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 text-center text-gray-600">
                  You haven't sent any exchange requests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {sentRequests.map(request => (
                    <div 
                      key={request.id}
                      className="bg-white rounded-lg shadow-sm border border-cream-200 p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{request.bookTitle}</h4>
                          <p className="text-sm text-gray-600">
                            Owner: {request.providerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {new Date(request.requestedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-sm",
                          request.status === 'Requested' ? "bg-accent-100 text-accent-700" :
                          request.status === 'Accepted' ? "bg-secondary-100 text-secondary-700" :
                          request.status === 'Completed' ? "bg-primary-100 text-primary-700" :
                          "bg-gray-100 text-gray-700"
                        )}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Exchange History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-serif font-bold mb-6">Exchange History</h2>
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 text-center text-gray-600">
              You haven't completed any exchanges yet.
            </div>
          </div>
        )}
        
        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-xl font-serif font-bold mb-6">My Wishlist</h2>
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 text-center text-gray-600">
              Your wishlist is empty. Browse books and add them to your wishlist.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;