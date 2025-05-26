import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon, Heart, RefreshCw } from 'lucide-react';
import { Book, BookStatus } from '../../types';
import { cn } from '../../utils/cn';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const statusBadgeClass = {
    [BookStatus.AVAILABLE]: 'bg-secondary-500',
    [BookStatus.PENDING]: 'bg-accent-400',
    [BookStatus.EXCHANGED]: 'bg-primary-400',
  };

  return (
    <div className="book-card group h-full flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
        {/* Book Cover */}
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={`${book.title} by ${book.author}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-100">
            <BookIcon size={48} className="text-primary-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white",
          statusBadgeClass[book.status]
        )}>
          {book.status}
        </div>
      </div>
      
      {/* Book Info */}
      <div className="p-4 flex-grow flex flex-col bg-white rounded-b-lg">
        <Link to={`/book/${book.id}`} className="hover:underline">
          <h3 className="font-serif font-bold text-lg">{book.title}</h3>
        </Link>
        <p className="text-primary-600 text-sm mb-2">{book.author}</p>
        
        {/* Genre Tags */}
        <div className="mb-3 flex flex-wrap gap-1">
          {book.genre.map((genre, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-cream-100 text-primary-700 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
        
        {/* Condition */}
        <p className="text-sm text-gray-600 mb-2">
          Condition: <span className="font-medium">{book.condition}</span>
        </p>
        
        {/* Owner */}
        <p className="text-sm text-gray-600 mt-auto">
          Shared by: <span className="font-medium">{book.ownerName}</span>
        </p>
        
        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <Link 
            to={`/book/${book.id}`}
            className="btn-primary py-1 flex-1 mr-2 text-sm flex justify-center"
          >
            <RefreshCw size={16} className="mr-1" />
            Exchange
          </Link>
          <button className="p-2 rounded-md bg-cream-100 hover:bg-cream-200 text-primary-700">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;