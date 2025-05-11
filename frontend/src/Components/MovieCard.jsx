import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

MovieCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
   
  }).isRequired,
};
function MovieCard({ item }) {
  const theme = useTheme();
  const navigate = useNavigate();

  
  return (
    <Card
      sx={{ maxWidth: 345, position: "relative" }}
      onClick={() => navigate(`/movie/${item.id}`, { state: { movie: item } })}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={
          item?.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/path/to/default-image.jpg"
        }
        title={item?.title || "No title available"}
      />

      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          opacity: 0.7,
          backgroundColor: theme.filter_background.main,
          borderRadius: "10%",
          width: 60,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "0.9rem",
          fontWeight: 600,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <StarOutlineOutlinedIcon
          sx={{
            fontSize: 20,
            marginRight: 1,
            color: theme.rating_color.main,
            fontWeight: 600,
            textAlign: "center",
          }}
        />
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: theme.text_letter.text,
            textAlign: "center",
          }}
        >
         {item?.vote_average.toFixed(1)}
        </Typography>
      </Box>
      <CardContent sx={{ backgroundColor: theme.button_color.main }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: theme.text_letter.text, fontWeight: 700 }}
        >
          {item?.title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.text_color.text }}>
         {item?.release_date.split("-")[0]}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
