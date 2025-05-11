import React from "react";
import { createContext, useState, useEffect } from "react";
import { useMovies } from "./MovieContext";
import PropTypes from "prop-types";



FilterContext.propTypes = {
  children: PropTypes.node.isRequired,
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { movies } = useMovies() || {};
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRating, setSelectedRating] = useState("");

  const filterMovies = () => {
    if (!movies || !Array.isArray(movies) || movies.length === 0) return [];

    return movies.filter((movie) => {
      const title = movie.title.toLowerCase();
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || title.includes(term);
      const matchesYear =
        !selectedYear ||
        (movie.release_date &&
          new Date(movie.release_date).getFullYear() === selectedYear);
      const matchesRating =
        !selectedRating ||
        (movie.vote_average &&
          parseFloat(movie.vote_average) >= parseFloat(selectedRating));
      const matchesGenre =
        !selectedGenre ||
        (movie.genre_ids && movie.genre_ids.includes(selectedGenre));

      return matchesSearch && matchesYear && matchesRating && matchesGenre;
    });
  };

  useEffect(() => {
    const newFilteredMovies = filterMovies();
    setFilteredMovies(newFilteredMovies);
  }, [movies, searchTerm, selectedGenre, selectedYear, selectedRating]);

  const handleSearchChange = (value) => setSearchTerm(value);
  const handleGenreClick = (genreId) => setSelectedGenre(genreId);
  const handleYearChange = (date) =>
    setSelectedYear(date ? date.getFullYear() : null);
  const handleRatingChange = (rating) => setSelectedRating(rating);
  const handleClearAll = () => {
    setSearchTerm("");
    setSelectedGenre(null);
    setSelectedYear(null);
    setSelectedRating("");
  };

  return (
    <FilterContext.Provider
      value={{
        filteredMovies,
        handleSearchChange,
        handleGenreClick,
        handleYearChange,
        handleRatingChange,
        handleClearAll,
        selectedYear,
        selectedRating,
        selectedGenre,
        searchTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
