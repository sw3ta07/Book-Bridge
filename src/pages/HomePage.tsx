import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import BookGrid from '../components/books/BookGrid';
import { BookOpen, Users, RefreshCw, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { books, isLoading } = useBooks();
  
  // Get most recent books for the featured section
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-wood-texture bg-cover bg-center py-20 relative">
        <div className="absolute inset-0 bg-primary-900/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Share Books, Connect Stories, Build Community
            </h1>
            <p className="text-xl mb-8 text-cream-100">
              Join our community of book lovers where you can exchange books, 
              share recommendations, and connect with fellow readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse" className="btn-accent text-lg px-8 py-3">
                Browse Books
              </Link>
              <Link to="/signup" className="btn-outline text-lg px-8 py-3 bg-white/10 text-white border-white/30 hover:bg-white/20">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">How BookBridge Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-cream-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full">
                <BookOpen size={32} />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">List Your Books</h3>
              <p className="text-gray-600">
                Add books you're willing to share to your virtual bookshelf for others to discover.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-cream-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-full">
                <RefreshCw size={32} />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Exchange Books</h3>
              <p className="text-gray-600">
                Request books from other members and coordinate exchanges in your community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-cream-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center bg-accent-100 text-accent-600 rounded-full">
                <Users size={32} />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Grow Community</h3>
              <p className="text-gray-600">
                Connect with other readers, share recommendations, and build a literary community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Books */}
      <section className="py-16 bg-paper-texture bg-cover bg-fixed relative">
        <div className="absolute inset-0 bg-cream-50/90"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold">Recently Added Books</h2>
            <Link to="/browse" className="text-accent-600 hover:text-accent-700 font-medium">
              View All →
            </Link>
          </div>
          <BookGrid books={recentBooks} isLoading={isLoading} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Community Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cream-200">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Joined 6 months ago</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I've discovered so many amazing books through this community that I would have never found otherwise. Plus, I've made genuine friends who share my passion for reading!"
              </p>
              <div className="mt-4 text-accent-500">
                <Heart className="inline-block mr-1" size={16} /> 12 books exchanged
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cream-200">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Joined 1 year ago</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "BookBridge has completely changed how I think about my book collection. Instead of gathering dust, my books are now being enjoyed by others while I get to discover new favorites."
              </p>
              <div className="mt-4 text-accent-500">
                <Heart className="inline-block mr-1" size={16} /> 24 books exchanged
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cream-200">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User avatar" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-600">Joined 9 months ago</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone on a budget, this platform has been a game-changer. I've been able to read so many more books without breaking the bank, and I love the sustainability aspect too!"
              </p>
              <div className="mt-4 text-accent-500">
                <Heart className="inline-block mr-1" size={16} /> 18 books exchanged
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start sharing books, connecting with fellow readers, and building a more 
            sustainable reading experience today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-accent text-lg px-8 py-3">
              Sign Up Now
            </Link>
            <Link to="/browse" className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white/10">
              Browse Books First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;