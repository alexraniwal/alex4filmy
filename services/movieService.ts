import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Movie } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const movieSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    year: { type: Type.STRING },
    rating: { type: Type.STRING },
    genre: { type: Type.STRING },
    description: { type: Type.STRING },
    language: { type: Type.STRING },
    director: { type: Type.STRING },
    cast: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
  },
  required: ["title", "year", "rating", "genre", "description", "language", "director", "cast"],
};

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: movieSchema,
};

export const fetchMovies = async (category: string): Promise<Movie[]> => {
  try {
    const prompt = `Generate a list of 6 popular and high-rated movies for the category: "${category}". 
    Ensure the titles are accurate. 
    For "Bollywood", return Hindi movies.
    For "South Movies", return popular South Indian movies (Telugu, Tamil, Kannada, Malayalam).
    For "Hollywood Hindi Dubbed", return Hollywood blockbusters that are famous in India.
    For "Kids Cartoon", return popular animated movies.
    
    Provide the following details for each movie:
    - Title
    - Year of release
    - Rating (out of 10)
    - A detailed description (2-3 sentences)
    - Main Genre
    - Language
    - Director name
    - List of 3-4 main cast members`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return [];

    const rawData = JSON.parse(text);
    
    // Add unique IDs
    return rawData.map((movie: any, index: number) => ({
      ...movie,
      id: `${category.replace(/\s/g, '')}-${index}-${Date.now()}`
    }));

  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const searchMoviesAI = async (query: string): Promise<Movie[]> => {
  try {
    const prompt = `Recommend 8 movies based on the user search query: "${query}". 
    If the query is a specific movie, show that and similar ones.
    Provide title, year, rating, genre, language, detailed description, director, and main cast.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) return [];
    
    const rawData = JSON.parse(text);
    return rawData.map((movie: any, index: number) => ({
      ...movie,
      id: `search-${index}-${Date.now()}`
    }));

  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};