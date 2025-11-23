import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieSection from './components/MovieSection';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import UploadModal from './components/UploadModal';
import { fetchMovies, searchMoviesAI } from './services/movieService';
import { SectionData, FetchStatus, Movie } from './types';

const App: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([
    { title: "Latest Trending Movies", query: "Latest Movies 2024", movies: [] },
    { title: "Bollywood Hits", query: "Bollywood", movies: [] },
    { title: "Hollywood Hindi Dubbed", query: "Hollywood Hindi Dubbed", movies: [] },
    { title: "South Indian Blockbusters", query: "South Movies", movies: [] },
    { title: "Kids & Cartoons", query: "Kids Cartoon", movies: [] },
  ]);

  const [userUploads, setUserUploads] = useState<Movie[]>([]);
  const [searchStatus, setSearchStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [searchResults, setSearchResults] = useState<SectionData | null>(null);
  const [loadingSections, setLoadingSections] = useState<boolean[]>(new Array(5).fill(true));
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const loadMovies = async () => {
      // We load sections one by one to avoid overwhelming the browser/API in a demo context
      // and to show progressive loading
      const newSections = [...sections];

      for (let i = 0; i < newSections.length; i++) {
        const movies = await fetchMovies(newSections[i].query);
        newSections[i].movies = movies;
        
        // Update state progressively
        setSections([...newSections]);
        
        // Update loading state for this specific section
        setLoadingSections(prev => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchStatus(FetchStatus.LOADING);
    
    try {
      const results = await searchMoviesAI(query);
      setSearchResults({
        title: `Search Results for "${query}"`,
        query: query,
        movies: results
      });
      setSearchStatus(FetchStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setSearchStatus(FetchStatus.ERROR);
    }
  };

  const goHome = () => {
    setIsSearching(false);
    setSearchResults(null);
    setSearchStatus(FetchStatus.IDLE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadMovie = (movie: Movie) => {
    setUserUploads(prev => [movie, ...prev]);
    setIsUploadModalOpen(false);
    // Automatically open the uploaded movie details to confirm success
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      <Navbar 
        onSearch={handleSearch} 
        onHome={goHome} 
        onUploadClick={() => setIsUploadModalOpen(true)}
      />
      
      <main className="flex-grow pt-16">
        {isSearching ? (
          <div className="min-h-[60vh] py-10">
            {searchStatus === FetchStatus.LOADING && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            )}
            
            {searchStatus === FetchStatus.SUCCESS && searchResults && (
              <MovieSection 
                title={searchResults.title} 
                movies={searchResults.movies} 
                isLoading={false}
                onMovieClick={setSelectedMovie}
              />
            )}
            
            {searchStatus === FetchStatus.SUCCESS && searchResults && searchResults.movies.length === 0 && (
               <div className="text-center py-20">
                 <h3 className="text-2xl font-bold text-gray-400">No results found for your search.</h3>
                 <p className="text-gray-500 mt-2">Try searching for a different movie or genre.</p>
                 <button onClick={goHome} className="mt-6 text-red-500 underline">Back to Home</button>
               </div>
            )}
          </div>
        ) : (
          <>
            <Hero />
            
            <div className="relative z-10 -mt-20 pb-20 bg-gradient-to-t from-black via-black to-transparent">
               {/* This gradient blends the hero into the content */}
            </div>
            
            <div className="-mt-32 relative z-20 space-y-4">
              
              {/* User Uploads Section */}
              {userUploads.length > 0 && (
                <MovieSection 
                  title="Your Uploads" 
                  movies={userUploads} 
                  isLoading={false}
                  onMovieClick={setSelectedMovie}
                />
              )}

              {sections.map((section, index) => (
                <MovieSection 
                  key={index}
                  title={section.title}
                  movies={section.movies}
                  isLoading={loadingSections[index]}
                  onMovieClick={setSelectedMovie}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
      
      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUploadMovie}
        />
      )}
    </div>
  );
};

export default App;