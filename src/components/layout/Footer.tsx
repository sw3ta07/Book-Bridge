import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail, Github as GitHub, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-xl font-serif font-bold mb-4">
              <BookOpen className="text-accent-500" />
              <span>BookBridge</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Connecting readers through shared stories and building a community one book at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-500 transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 font-serif">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Book Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-300 transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-300 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 font-serif">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for book recommendations and community updates.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-md bg-primary-700 border border-primary-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-md bg-accent-500 hover:bg-accent-600 transition-colors"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-primary-700 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BookBridge. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-gray-400 hover:text-accent-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-accent-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-accent-300 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;