import axios from "axios";

// Assuming your Vite environment variable is set correctly
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "/api", // base URL will point to the proxy defined in Vite config
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (API_KEY) {
    // Ensure API key is passed in every request
    config.params = config.params || {};
    config.params.api_key = API_KEY;
  } else {
    console.error("API Key is missing. Please add VITE_TMDB_API_KEY in your .env file.");
  }
  return config;
});

export default api;
