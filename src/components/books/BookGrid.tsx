import React from 'react';
import BookCard from './BookCard';
import { Book } from '../../types';
import Loader from '../ui/Loader';

interface BookGridProps {
  books: Book[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  isLoading = false,
  emptyMessage = "No books found."
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="large" />
      </div>
    );
  }
  
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;