export interface Movie {
  id: string;
  title: string;
  year: string;
  rating: string;
  genre: string;
  description: string;
  language: string;
  director: string;
  cast: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface SectionData {
  title: string;
  query: string;
  movies: Movie[];
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}