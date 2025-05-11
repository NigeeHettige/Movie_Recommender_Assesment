import React from "react";
import {  Box } from "@mui/system";
import Filter from "../Components/Filter";
import TrendingMovies from "../Components/TrendingMovies";
import AllMovies from "../Components/AllMovies";

function HomePage() {
  return (
    <Box
      sx={{
        pl: { xs: 4, sm: 8, md: 8 },
        py: 0,
        maxWidth: "none",
        width: "100%",
      }}
    >
      <Filter />
      <TrendingMovies />
      <AllMovies />
    </Box>
  );
}

export default HomePage;
