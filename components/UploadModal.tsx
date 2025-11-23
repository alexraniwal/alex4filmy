import React, { useState, useRef } from 'react';
import { X, UploadCloud, Film, Image as ImageIcon, CheckCircle, Loader2, Video } from 'lucide-react';
import { Movie } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (movie: Movie) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    genre: 'Action',
    director: '',
    cast: '',
    language: 'Hindi',
    rating: 'Unrated'
  });
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'video') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'thumbnail') {
        setThumbnail(e.target.files[0]);
      } else {
        setVideo(e.target.files[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Create Movie Object
        const newMovie: Movie = {
          id: `upload-${Date.now()}`,
          title: formData.title,
          year: formData.year,
          rating: formData.rating,
          genre: formData.genre,
          description: formData.description,
          language: formData.language,
          director: formData.director || 'Unknown',
          cast: formData.cast ? formData.cast.split(',').map(c => c.trim()) : [],
          // Create local URLs for previewing uploaded files
          imageUrl: thumbnail ? URL.createObjectURL(thumbnail) : undefined,
          videoUrl: video ? URL.createObjectURL(video) : undefined
        };

        onUpload(newMovie);
        setIsUploading(false);
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={!isUploading ? onClose : undefined}></div>
      
      <div className="relative bg-neutral-900 w-full max-w-2xl rounded-xl border border-red-900/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-black/40">
          <h2 className="text-xl font-bold text-white flex items-center">
            <UploadCloud className="w-5 h-5 mr-2 text-red-600" />
            Upload Movie
          </h2>
          {!isUploading && (
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {isUploading ? (
            <div className="h-full flex flex-col items-center justify-center py-12">
              <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-neutral-800 stroke-current" 
                    strokeWidth="8" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                  ></circle>
                  <circle 
                    className="text-red-600 progress-ring__circle stroke-current transition-all duration-300 ease-linear" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * uploadProgress) / 100}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {uploadProgress}%
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Uploading "{formData.title}"...</h3>
              <p className="text-gray-400">Please wait while we process your video.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thumbnail Input */}
                <div 
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-700 hover:border-red-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-900/50 hover:bg-neutral-800"
                >
                  {thumbnail ? (
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-green-400 font-medium truncate max-w-[150px]">{thumbnail.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-300 font-medium">Upload Thumbnail</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 5MB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={thumbnailInputRef}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'thumbnail')}
                    className="hidden"
                  />
                </div>

                {/* Video Input */}
                <div 
                  onClick={() => videoInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-700 hover:border-red-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-900/50 hover:bg-neutral-800"
                >
                  {video ? (
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-green-400 font-medium truncate max-w-[150px]">{video.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change</p>
                    </div>
                  ) : (
                    <>
                      <Video className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-300 font-medium">Upload Video</p>
                      <p className="text-xs text-gray-500 mt-1">MP4, MKV (Max 2GB)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={videoInputRef}
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'video')}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Movie Title"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Genre</label>
                  <select 
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                  >
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                    <option>Animation</option>
                    <option>Thriller</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Year</label>
                  <input 
                    type="number" 
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Language</label>
                  <input 
                    type="text" 
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What is this movie about?"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Director</label>
                  <input 
                    type="text" 
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    placeholder="Director Name"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Cast (Comma separated)</label>
                  <input 
                    type="text" 
                    name="cast"
                    value={formData.cast}
                    onChange={handleChange}
                    placeholder="Actor 1, Actor 2..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center mt-4"
              >
                <UploadCloud className="w-5 h-5 mr-2" />
                Upload Movie
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;