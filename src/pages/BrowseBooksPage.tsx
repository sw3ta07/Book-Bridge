import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import BookGrid from '../components/books/BookGrid';
import { Book, BookCondition } from '../types';
import { Filter, Search } from 'lucide-react';

const BrowseBooksPage: React.FC = () => {
  const location = useLocation();
  const { books, isLoading } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<BookCondition[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique genres from books
  const allGenres = [...new Set(books.flatMap(book => book.genre))].sort();
  
  // Get query parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Filter books based on search query and selected filters
  useEffect(() => {
    let result = [...books];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.genre.some(g => g.toLowerCase().includes(query))
      );
    }
    
    // Apply genre filter
    if (selectedGenres.length > 0) {
      result = result.filter(book => 
        book.genre.some(genre => selectedGenres.includes(genre))
      );
    }
    
    // Apply condition filter
    if (selectedConditions.length > 0) {
      result = result.filter(book => 
        selectedConditions.includes(book.condition)
      );
    }
    
    setFilteredBooks(result);
  }, [books, searchQuery, selectedGenres, selectedConditions]);

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  // Toggle condition selection
  const toggleCondition = (condition: BookCondition) => {
    setSelectedConditions(prev => 
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedConditions([]);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-serif font-bold mb-8">Browse Books</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-grow md:max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or genre..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-cream-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
            />
          </div>
        </form>
        
        {/* Filter Toggle Button (Mobile) */}
        <button 
          className="md:hidden btn-outline flex items-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 mb-6 md:mb-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-accent-600 hover:text-accent-700"
              >
                Clear All
              </button>
            </div>
            
            {/* Conditions Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                {Object.values(BookCondition).map(condition => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Genres Filter */}
            <div>
              <h3 className="font-medium mb-2">Genres</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {allGenres.map(genre => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                      className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Books Grid */}
        <div className="flex-grow">
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </p>
          </div>
          <BookGrid 
            books={filteredBooks} 
            isLoading={isLoading} 
            emptyMessage="No books match your search criteria. Try adjusting your filters."
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseBooksPage;