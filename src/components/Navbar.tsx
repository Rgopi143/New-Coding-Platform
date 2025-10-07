import { Link } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-800">Coding Ninjas</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Courses
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Events
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-orange-500 hover:text-orange-600 font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/events"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg font-medium text-center">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium text-center">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
