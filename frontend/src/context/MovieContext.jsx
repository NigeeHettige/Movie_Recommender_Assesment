import React from "react";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";




const MoviesContext = createContext();
MoviesContext.propTypes = {
  children: PropTypes.node.isRequired,
};


export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useGenres must be used within a MoviesProvider");
  }
  return context;
};
