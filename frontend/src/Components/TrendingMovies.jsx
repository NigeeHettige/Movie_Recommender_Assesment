import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../Components/MovieCard";
import {

  Typography,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { discoverPopularMovies } from "../apiHelper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TrendingMovies() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated, sessionId } = useAuth();
  const scrollRef = useRef(null); 
  const [isFetching, setIsFetching] = useState(false); 
  const [timeWindow, settimeWindow] = React.useState("week");

  const handleChange = (event) => {
    settimeWindow(event.target.value);
  };
 
  //fetch trending movies
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsFetching(true);
        const language = "en-US";

        const movieData = await discoverPopularMovies(
          currentPage,
          language,
          sessionId,
          timeWindow
        );
      

        setMovies((prevMovies) =>
          [...prevMovies, ...movieData.results].filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          )
        );
        setTotalPages(movieData.total_pages || 1);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchMovies();
  }, [isAuthenticated, navigate, currentPage, sessionId,timeWindow]);

 
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (
        scrollWidth - scrollLeft <= clientWidth + 100 &&
        !isFetching &&
        currentPage < totalPages
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [isFetching, currentPage, totalPages]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: "1rem", position: "relative" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 4, color: theme.text_letter.text, mt: 7 }}
      >
        Trending Movies
      </Typography>

      <Box sx={{ position: "relative", color: theme.text_letter.text }}>
        <FormControl sx={{ m: 1, minWidth: 120,mb:2}} size="small"  >
          <InputLabel id="demo-select-small-label">Time Range</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={timeWindow}
            label="TimeWindow"
            onChange={handleChange}
            sx={{color:theme.text_letter.text}}
          >
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"day"}>Day</MenuItem>
          </Select>
        </FormControl>

        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: theme.logo_text_color.main,
            color: theme.text_letter.text,
            "&:hover": {
              backgroundColor: theme.logo_text_color.main,
              opacity: 0.8,
            },
            zIndex: 1,
          }}
          disabled={scrollRef.current?.scrollLeft <= 0}
        >
          <ArrowBackIosIcon />
        </IconButton>

       
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            gap: 2,
            paddingBottom: 2,
            maxWidth: "100%",
          }}
        >
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{ minWidth: 200, flexShrink: 0, boxSizing: "border-box" }}
              >
                <MovieCard item={movie} />
              </Box>
            ))}
        </Box>

     
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: theme.logo_text_color.main,
            color: theme.text_letter.text,
            "&:hover": {
              backgroundColor: theme.logo_text_color.main,
              opacity: 0.8,
            },
            zIndex: 1,
          }}
          disabled={currentPage >= totalPages}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </div>
  );
}

export default TrendingMovies;
