import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, BookCondition, BookStatus, Exchange, ExchangeStatus } from '../types';
import { mockBooks } from '../data/mockData';
import { useAuth } from './AuthContext';

interface BookContextType {
  books: Book[];
  userBooks: Book[];
  exchanges: Exchange[];
  isLoading: boolean;
  addBook: (book: Omit<Book, 'id' | 'addedAt' | 'ownerId' | 'ownerName' | 'status'>) => Promise<Book>;
  updateBook: (id: string, bookData: Partial<Book>) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  requestExchange: (bookId: string) => Promise<Exchange>;
  respondToExchange: (exchangeId: string, accept: boolean) => Promise<Exchange>;
  completeExchange: (exchangeId: string) => Promise<Exchange>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load books on mount
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setBooks(mockBooks);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Filter user's books
  const userBooks = user ? books.filter(book => book.ownerId === user.id) : [];

  // Add a new book
  const addBook = async (bookData: Omit<Book, 'id' | 'addedAt' | 'ownerId' | 'ownerName' | 'status'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!user) throw new Error('User must be authenticated to add a book');

      const newBook: Book = {
        ...bookData,
        id: Date.now().toString(),
        ownerId: user.id,
        ownerName: user.name,
        addedAt: new Date(),
        status: BookStatus.AVAILABLE,
      };

      setBooks(prevBooks => [...prevBooks, newBook]);
      return newBook;
    } catch (error) {
      console.error('Failed to add book:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a book
  const updateBook = async (id: string, bookData: Partial<Book>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) throw new Error('Book not found');

      const updatedBook = { ...books[bookIndex], ...bookData };
      const updatedBooks = [...books];
      updatedBooks[bookIndex] = updatedBook;
      setBooks(updatedBooks);

      return updatedBook;
    } catch (error) {
      console.error('Failed to update book:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a book
  const deleteBook = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    } catch (error) {
      console.error('Failed to delete book:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get book by ID
  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  // Request a book exchange
  const requestExchange = async (bookId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!user) throw new Error('User must be authenticated to request an exchange');

      const book = books.find(b => b.id === bookId);
      if (!book) throw new Error('Book not found');
      if (book.ownerId === user.id) throw new Error('You cannot request your own book');
      if (book.status !== BookStatus.AVAILABLE) throw new Error('This book is not available for exchange');

      // Update book status
      await updateBook(bookId, { status: BookStatus.PENDING });

      // Create exchange request
      const newExchange: Exchange = {
        id: Date.now().toString(),
        requesterId: user.id,
        requesterName: user.name,
        providerId: book.ownerId,
        providerName: book.ownerName,
        bookId: book.id,
        bookTitle: book.title,
        status: ExchangeStatus.REQUESTED,
        requestedAt: new Date(),
      };

      setExchanges(prevExchanges => [...prevExchanges, newExchange]);
      return newExchange;
    } catch (error) {
      console.error('Failed to request exchange:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Respond to an exchange request
  const respondToExchange = async (exchangeId: string, accept: boolean) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const exchangeIndex = exchanges.findIndex(exchange => exchange.id === exchangeId);
      if (exchangeIndex === -1) throw new Error('Exchange request not found');

      const exchange = exchanges[exchangeIndex];
      
      const newStatus = accept ? ExchangeStatus.ACCEPTED : ExchangeStatus.DECLINED;
      const updatedExchange = { ...exchange, status: newStatus };
      
      const updatedExchanges = [...exchanges];
      updatedExchanges[exchangeIndex] = updatedExchange;
      setExchanges(updatedExchanges);

      // If declined, set book back to available
      if (!accept) {
        await updateBook(exchange.bookId, { status: BookStatus.AVAILABLE });
      }

      return updatedExchange;
    } catch (error) {
      console.error('Failed to respond to exchange:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Complete an exchange
  const completeExchange = async (exchangeId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const exchangeIndex = exchanges.findIndex(exchange => exchange.id === exchangeId);
      if (exchangeIndex === -1) throw new Error('Exchange not found');

      const exchange = exchanges[exchangeIndex];
      if (exchange.status !== ExchangeStatus.ACCEPTED) {
        throw new Error('Exchange must be accepted before it can be completed');
      }

      // Update exchange
      const updatedExchange = { 
        ...exchange, 
        status: ExchangeStatus.COMPLETED, 
        completedAt: new Date() 
      };
      
      const updatedExchanges = [...exchanges];
      updatedExchanges[exchangeIndex] = updatedExchange;
      setExchanges(updatedExchanges);

      // Update book status
      await updateBook(exchange.bookId, { status: BookStatus.EXCHANGED });

      return updatedExchange;
    } catch (error) {
      console.error('Failed to complete exchange:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    books,
    userBooks,
    exchanges,
    isLoading,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    requestExchange,
    respondToExchange,
    completeExchange,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};