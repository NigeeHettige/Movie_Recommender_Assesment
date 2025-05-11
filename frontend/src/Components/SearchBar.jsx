import React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
function SearchBar({ onSearch, sx: externalSx = {} }) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%", 
        maxWidth: "100%", 
        ...externalSx,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%", 
          backgroundColor: theme.text_color.text,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: 1,
          boxSizing: "border-box", 
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: theme.palette.text.primary }}
          placeholder="Type movie name"
          inputProps={{ "aria-label": "search movies" }}
          value={searchValue}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", color: theme.palette.text.secondary }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;