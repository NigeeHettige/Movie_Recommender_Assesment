import axios from "axios";

//Base url
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//Get all movies
export const discoverMovies = async (
  page = 1,
  language = "en-US",
  sessionId = null
) => {
  try {
    const response = await api.get("discover/movie", {
      params: {
        api_key: API_KEY,
        language,
        page,
        ...(sessionId && { session_id: sessionId }),
      },
    });
 
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

//Get the trending movies
export const discoverPopularMovies = async (
  page = 1,
  language = "en-US",
  sessionId = null,
  timeWindow = "week"
) => {
  try {
    const response = await api.get(`trending/movie/${timeWindow}`, {
      params: {
        api_key: API_KEY,
        language,
        page,
        ...(sessionId && { session_id: sessionId }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

//Get the video link of movies
export const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`movie/${movieId}/videos`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};


//Get the Genres of the movies
export const fetchMovieGenres = async (language = "en-US",sessionId=null) => {
  try {
    const response = await api.get("genre/movie/list", {
      params: {
        api_key: API_KEY,
        language,
         ...(sessionId && { session_id: sessionId }),
      },
    });
  
    return response.data;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
export default api;
