import React from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PropTypes from 'prop-types';


TextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
function TextButton({ onClick,name }) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      size="medium"
      onClick={onClick}
      sx={{
        borderRadius: "25px", 
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        backgroundColor: theme.filter_background.main, 
        color: theme.text_letter.text,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)", 
        "&:hover": {
          backgroundColor: theme.filter_background.main,
          opacity: 0.8, 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        },
        "&:active": {
          transform: "scale(0.98)", 
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: theme.text_color.text,
          mr: 0.5, 
        }}
      >
      {name}
      </Typography>
      
    </Button>
  );
}

export default TextButton;