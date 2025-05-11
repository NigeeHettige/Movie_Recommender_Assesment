import React, { useState, useEffect, useContext } from "react";
import MovieCard from "../Components/MovieCard";
import {
 
  Typography,
  Grid,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { discoverMovies, fetchMovieGenres } from "../apiHelper";
import { useGenres } from "../context/GenresContext";
import { useMovies } from "../context/MovieContext";
import { FilterContext } from "../context/FilterContext";

function AllMovies() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  //filtered part
  const {
    filteredMovies,
    searchTerm,
    selectedGenre,
    selectedYear,
    selectedRating,
  } = useContext(FilterContext);

  const showFiltered = filteredMovies.length > 0;
  
  const hasActiveFilters =
    searchTerm ||
    selectedGenre !== null ||
    selectedYear !== null ||
    selectedRating;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated, sessionId } = useAuth();
  const { setGeneres } = useGenres();
  const { movies, setMovies } = useMovies();

  //fetch all movies
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const language = "en-US";
        const movieData = await discoverMovies(
          currentPage,
          language,
          sessionId
        );
        const geners = await fetchMovieGenres(language, sessionId);

        setGeneres(geners.genres || []);
        setMovies(movieData.results || []);
        setTotalPages(movieData.total_pages || 1);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [isAuthenticated, navigate, currentPage, sessionId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: "1rem" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 4, color: theme.text_letter.text, mt: 7 }}
      >
        All Movies
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {showFiltered ? (
            Array.isArray(filteredMovies) &&
            filteredMovies.map((movie) => (
              <Grid size={4} key={movie.id}>
                <MovieCard item={movie} />
              </Grid>
            ))
          ) : hasActiveFilters ? (
            <Grid item xs={4}>
              <Typography sx={{ color: theme.text_letter.text }}>
                No movies match the selected filters.
              </Typography>
            </Grid>
          ) : (
            Array.isArray(movies) &&
            movies.map((movie) => (
              <Grid size={4} key={movie.id}>
                <MovieCard item={movie} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.text_letter.text,
            },
          }}
        />
      </Box>
    </div>
  );
}

export default AllMovies;
