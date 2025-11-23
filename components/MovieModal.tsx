import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Film, User, Users, Play, Pause } from 'lucide-react';
import { Movie } from '../types';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Use uploaded image if available, otherwise generate deterministic placeholder
  const seed = movie.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageUrl = movie.imageUrl || `https://picsum.photos/seed/${seed}/800/600`;

  const handlePlayClick = () => {
    if (movie.videoUrl) {
      setIsPlaying(true);
    } else {
      // For demo purposes, we just simulate playing or alert
      alert("This is a demo movie. In a real app, this would play the stream.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-neutral-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 border border-neutral-800 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Image Section / Video Player */}
        <div className="w-full md:w-2/5 relative h-64 md:h-auto flex-shrink-0 bg-black">
          {isPlaying && movie.videoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <video 
                src={movie.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <>
              <img 
                src={imageUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-neutral-900/20 to-transparent"></div>
              
              {/* Play Overlay Button for Image */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handlePlayClick}
              >
                <div className="bg-red-600/90 rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-900/50">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
            </>
          )}

          <div className="absolute bottom-4 left-4 right-4 md:hidden pointer-events-none">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">{movie.title}</h2>
            <div className="flex items-center mt-2 space-x-3 text-sm">
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30 flex items-center font-bold">
                 <Star className="w-3 h-3 mr-1 fill-yellow-400" /> {movie.rating}
              </span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.language}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-neutral-900">
          <div className="hidden md:block mb-6">
            <h2 className="text-4xl font-bold text-white mb-2">{movie.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30 flex items-center font-bold">
                 <Star className="w-3 h-3 mr-1 fill-yellow-400" /> {movie.rating}
              </span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {movie.year}</span>
              <span className="px-2 py-1 bg-neutral-800 rounded uppercase text-xs tracking-wider">{movie.language}</span>
              <span className="text-red-500 font-medium">{movie.genre}</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Actions */}
            <div className="flex space-x-3">
              <button 
                onClick={handlePlayClick}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2 fill-current"/> : <Play className="w-5 h-5 mr-2 fill-current" />} 
                {isPlaying ? 'Playing...' : 'Watch Now'}
              </button>
              <button className="px-4 py-3 border border-neutral-700 hover:bg-neutral-800 text-white rounded-lg font-medium transition-colors">
                + My List
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Film className="w-4 h-4 mr-2 text-red-500" /> Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {movie.description}
              </p>
            </div>

            {/* Meta Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
              <div>
                <h4 className="text-gray-500 text-sm mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Director
                </h4>
                <p className="text-white font-medium">{movie.director}</p>
              </div>
              
              <div>
                <h4 className="text-gray-500 text-sm mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" /> Cast
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.cast && movie.cast.map((actor, idx) => (
                    <span key={idx} className="bg-neutral-800 text-gray-300 text-xs px-2 py-1 rounded-full border border-neutral-700">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;