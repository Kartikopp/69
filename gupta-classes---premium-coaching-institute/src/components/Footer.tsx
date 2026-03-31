import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Gupta Classes</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium coaching institute in Meerut specializing in Banking, SSC, CAT, and other competitive exams. Empowering students since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">All Courses</Link></li>
              <li><Link to="/results" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Success Stories</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-6">Our Exams</h4>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">IBPS PO / Clerk</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">SSC CGL / CHSL</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">CAT / MAT</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Banking Foundation</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Railway Exams</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">123, Civil Lines, Near Commissioner Office, Meerut, UP - 250001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">info@guptaclasses.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
          <p>© 2026 Gupta Classes. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
