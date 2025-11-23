import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Film } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center mb-4">
                <Film className="h-6 w-6 text-red-600 mr-2" />
                <span className="text-xl font-bold tracking-wider text-white">
                  CINE<span className="text-red-600">VERSE</span>
                </span>
              </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Your ultimate destination for movies, TV shows, and entertainment. Stream the latest Bollywood, Hollywood, and regional hits.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li className="hover:text-red-500 cursor-pointer">Bollywood</li>
              <li className="hover:text-red-500 cursor-pointer">Hollywood Dubbed</li>
              <li className="hover:text-red-500 cursor-pointer">South Indian</li>
              <li className="hover:text-red-500 cursor-pointer">Kids Cartoon</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li className="hover:text-red-500 cursor-pointer">FAQ</li>
              <li className="hover:text-red-500 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-red-500 cursor-pointer">Terms of Service</li>
              <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-neutral-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all text-neutral-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-neutral-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all text-neutral-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-neutral-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all text-neutral-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-neutral-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all text-neutral-400">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-900 pt-8 text-center">
          <p className="text-neutral-600 text-sm">
            &copy; {new Date().getFullYear()} CineVerse AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;