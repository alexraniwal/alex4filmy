import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isLoading: boolean;
  onMovieClick: (movie: Movie) => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies, isLoading, onMovieClick }) => {
  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 border-l-4 border-red-600 pl-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <button className="flex items-center text-sm text-red-500 hover:text-red-400 transition-colors">
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-neutral-900 rounded-lg aspect-[2/3] animate-pulse">
              <div className="h-full w-full bg-neutral-800/50"></div>
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={onMovieClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-neutral-900/30 rounded-lg border border-neutral-800">
          <p>No movies found for this section.</p>
        </div>
      )}
    </section>
  );
};

export default MovieSection;