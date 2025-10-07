import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">Coding Ninjas</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students with quality coding education and helping them achieve their career goals.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-orange-500 transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-orange-500 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Data Structures</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Machine Learning</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Interview Preparation</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Competitive Programming</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <span>123 Tech Street, Silicon Valley, CA 94000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>support@codingninjas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Coding Ninjas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
