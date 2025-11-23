import React from 'react';
import { Play, Info } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')`, // Cinematic movie theater feel
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32">
        <span className="text-red-600 font-bold tracking-widest text-sm md:text-base mb-2 animate-fade-in-up">
          #1 MOVIE OF THE WEEK
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-xl max-w-3xl leading-tight">
          Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Dimensions</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-xl mb-8 drop-shadow-md line-clamp-3">
          In a world where reality is crumbling, one hero must navigate through shattered timelines to save the universe from eternal darkness. Experience the cinematic masterpiece that everyone is talking about.
        </p>
        
        <div className="flex space-x-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex items-center font-bold transition-all hover:scale-105 active:scale-95">
            <Play className="fill-white w-5 h-5 mr-2" />
            Watch Now
          </button>
          <button className="bg-gray-500/30 backdrop-blur-md hover:bg-gray-500/50 border border-gray-500/50 text-white px-6 py-3 rounded flex items-center font-semibold transition-all">
            <Info className="w-5 h-5 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;