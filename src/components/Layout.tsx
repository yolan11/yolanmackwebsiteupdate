import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, Mail, Music } from 'lucide-react';

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/'){
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }else{
      setIsScrolled(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black text-white py-4 shadow-lg' 
            : 'bg-transparent text-white py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src="https://hfbcsivzjtspmoxhjjhj.supabase.co/storage/v1/object/public/website_images//Transparent_Image_1.png" alt="Depuis Supabase" className="w-10" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-gray-300 ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className={`hover:text-gray-300 ${location.pathname === '/gallery' ? 'border-b-2 border-white' : ''}`}
            >
              Gallery
            </Link>
            <Link 
              to="/booking" 
              className={`bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md ${
                location.pathname === '/booking' ? 'bg-gray-200' : ''
              }`}
            >
              Book Me
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black text-white">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="hover:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/booking" 
                className="bg-white text-black px-4 py-2 rounded-full font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Me
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Music className="mr-2" />
                YOLAN MACK
              </h3>
              <p className="mb-4">Professional DJ bringing the best vibes to your events.</p>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <Instagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <Facebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <Twitter />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                <li><Link to="/gallery" className="hover:text-gray-400">Gallery</Link></li>
                <li><Link to="/booking" className="hover:text-gray-400">Book Me</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="flex items-center mb-2">
                <Mail className="mr-2" size={18} />
                info@yolanmack.com
              </p>
              <p>Based in Paris, France</p>
              <p>Available for worldwide bookings</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Yolan Mack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;