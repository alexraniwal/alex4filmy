import React, { useState } from 'react';
import { Search, Film, Menu, X, UploadCloud } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHome: () => void;
  onUploadClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onHome, onUploadClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onHome}>
            <Film className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold tracking-wider text-white">
              CINE<span className="text-red-600">VERSE</span>
            </span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, genres..."
                className="w-full bg-neutral-900 border border-neutral-700 text-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 group-focus-within:text-red-500" />
            </form>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Home</button>
            <button className="text-gray-300 hover:text-white transition-colors">Movies</button>
            <button 
              onClick={onUploadClick}
              className="flex items-center text-gray-300 hover:text-red-500 transition-colors"
            >
              <UploadCloud className="w-5 h-5 mr-1.5" />
              Upload
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full font-medium transition-colors">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-black border border-neutral-700 rounded-lg py-2 px-4 pl-10 text-white focus:border-red-600 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </form>
            <button onClick={() => { onHome(); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white py-2">Home</button>
            <button onClick={() => { onUploadClick(); setIsMenuOpen(false); }} className="flex items-center w-full text-left text-gray-300 hover:text-white py-2">
              <UploadCloud className="w-5 h-5 mr-2" /> Upload Movie
            </button>
            <button className="block w-full text-left text-red-500 font-semibold py-2">Login / Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;