import React from 'react';
import { Star, PlayCircle } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  // Use uploaded image if available, otherwise generate deterministic placeholder
  const seed = movie.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageUrl = movie.imageUrl || `https://picsum.photos/seed/${seed}/300/450`;

  return (
    <div 
      onClick={() => onClick(movie)}
      className="group relative bg-neutral-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/20 cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:opacity-60"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center border border-yellow-500/30">
          <Star className="w-3 h-3 fill-yellow-400 mr-1" />
          {movie.rating}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-14 h-14 text-red-600 drop-shadow-lg scale-90 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Genre Tag */}
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent pt-8">
           <span className="text-[10px] uppercase tracking-wider font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/50">
             {movie.genre.split(',')[0]}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 group-hover:text-red-500 transition-colors">
            {movie.title}
          </h3>
          <span className="text-neutral-500 text-xs whitespace-nowrap ml-2">{movie.year}</span>
        </div>
        
        <p className="text-neutral-400 text-xs line-clamp-2 mt-1 mb-2 flex-grow">
          {movie.description}
        </p>
        
        <div className="mt-auto pt-2 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
          <span>{movie.language}</span>
          <span className="group-hover:translate-x-1 transition-transform text-red-600 font-medium">Watch Now &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;