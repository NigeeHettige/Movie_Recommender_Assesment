import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchBar from "../Components/SearchBar";
import TextButton from "./TextButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGenres } from "../context/GenresContext";
import { useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FilterContext } from "../context/FilterContext";

function Filter() {
  const theme = useTheme();
  const { generes } = useGenres();

  const {
    handleSearchChange,
    handleGenreClick,
    handleYearChange,
    handleRatingChange,
    handleClearAll,
    selectedYear,
    selectedRating,
    
  } = useContext(FilterContext);

  const ratings = ["9+", "8+", "7+", "6+", "5+"];
  const ratingOptions = ["", ...ratings];

  return (
    <Container
      sx={{
        backgroundColor: theme.filter_background.main,
        padding: { xs: 2, md: 3 },
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        margin: { xs: "1rem 0", md: "2rem 0" },
        position: "relative",
        color: theme.text_letter.text,
        width: "100%",
        alignItems: "center",
      }}
    >
      {/*  Clear All */}
      <Button
        variant="text"
        onClick={() => {
          handleClearAll();
          console.log("Cleared all filters");
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: 0,
          minWidth: "auto",
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: theme.text_letter.text,
          "&:hover": {
            color: theme.rating_color.main,
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
        aria-label="clear all filters"
      >
        Clear All
      </Button>

      {/*  Filters part*/}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, textAlign: "left", mb: 1 }}
        >
          Search Movies
        </Typography>
        <SearchBar onSearch={handleSearchChange} sx={{ width: "100%" }} />
      </Box>

      <Typography
        variant="h6"
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        Filters
        <FilterAltOutlinedIcon />
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
          mt: 3,
          width: "100%",
        }}
      >
        {/*  Genre */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Genre
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            {(generes || []).map((genre) => (
              <TextButton
                key={genre.id}
                onClick={() => {
                  handleGenreClick(genre.id);
                  console.log("Genre selected:", genre.id);
                }}
                name={genre.name}
              />
            ))}
          </Box>
        </Box>
        {/*  Year*/}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Year
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label="Select Year"
              value={selectedYear ? new Date(selectedYear, 0) : null}
              onChange={handleYearChange}
              sx={{ width: "100%" }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "small",
                  sx: { backgroundColor: theme.filter_background.main },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        {/*  Rating */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Rating
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="rating-select-label">Select Rating</InputLabel>
            <Select
              labelId="rating-select-label"
              value={selectedRating}
              label="Select Rating"
              onChange={(event) => handleRatingChange(event.target.value)}
              sx={{ backgroundColor: theme.filter_background.main }}
            >
              {ratingOptions.map((rating) => (
                <MenuItem key={rating || "none"} value={rating}>
                  {rating || "None"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default Filter;
