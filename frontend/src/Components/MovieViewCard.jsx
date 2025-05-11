import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../Components/CustomButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMovieVideos } from "../apiHelper";
import { useGenres } from "../context/GenresContext";


function MovieViewCard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const item = location.state?.movie;
  const { generes } = useGenres();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    if (!item) return;

//fetch the video link
    const fetchDetails = async () => {
      try {
        const videos = await getMovieVideos(item.id); 

        const trailer = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key); 
        }
      } catch (error) {
        console.error("Error fetching additional movie data:", error);
      }
    };

    fetchDetails();
  }, [item]);

  
  //Set favourite items to local storage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.some((fav) => fav.id === item?.id);
    setIsFavorited(isFavorite);
  }, [item]);

  const handleAddToWatchlist = () => {
    console.log(`Added to watchlist: ${item?.title}`);
  };

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavorites = [...favorites, item];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  //video control
  const handleMediaClick = () => {
    if (videoKey) {
      setShowVideoModal(!showVideoModal);
    }
  };

const genreNames = item?.genre_ids?.map((id) => {
        const foundGenre = generes.find(genre => genre.id === id);
        return foundGenre?.name || 'Unknown';
    }).join(", ") || "Unknown";

  
  return (
    <Card
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: theme.view_background.main,
        overflow: "auto",
        borderRadius: 0,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      <IconButton
        onClick={() => {
          navigate("/home");
        }}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: theme.logo_text_color.main,
          color: theme.text_letter.text,
          "&:hover": {
            backgroundColor: theme.logo_text_color.main,
            opacity: 0.8,
          },
          zIndex: 2,
        }}
        aria-label="go back"
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          p: { xs: 2, md: 4 },
          overflow: "auto",
          mt: 10,
          ml: 10,
        }}
      >
       
        <Box
          onClick={handleMediaClick}
          sx={{ cursor: videoKey ? "pointer" : "default" }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: 120, md: 200 },
              height: { xs: 180, md: 300 },
              objectFit: "cover",
              mr: { xs: 2, md: 4 },
              borderRadius: 1,
            }}
            image={
              item?.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : ""
            }
            alt={item?.title || "Movie poster"}
          />
        </Box>

        <CardContent sx={{ flex: 1, color: theme.text_letter.text }}>
          <Typography
            component="div"
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              letterSpacing: "0.05rem",
            }}
          >
            {item?.title || "Unknown Title"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ color: theme.rating_color.main, fontSize: 20 }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item?.vote_average?.toFixed(1) || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ShowChartOutlinedIcon sx={{ fontSize: 20 }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item?.popularity}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {item?.release_date?.split("-")[0] || "Unknown Year"}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {genreNames}
            </Typography>
          </Box>

          <Box sx={{ mb: 4, display: "flex", gap: 3 }}>
            <CustomButton onClick={handleAddToWatchlist} name={item?.vote_average.toFixed(1)}/>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="toggle favorite"
            >
              <FavoriteIcon
                sx={{
                  fontSize: 18,
                  color: isFavorited
                    ? theme.logo_text_color.main
                    : theme.text_letter.text,
                }}
              />
            </IconButton>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "1.25rem", fontWeight: 600, mb: 1 }}
            >
              Overview
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {item?.overview || "No overview available."}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setShowVideoModal(true)}
            sx={{
              px: 3,
              py: 1,
              color: theme.text_letter.text,
              backgroundColor: theme.logo_text_color.main,
              borderRadius: "5%",
              "&:hover": {
                backgroundColor: theme.logo_text_color.main,
                opacity: 0.8,
              },
              fontSize: "1rem",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Watch Now
          </IconButton>

          <Modal
            open={showVideoModal}
            onClose={() => setShowVideoModal(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "90%", md: "60%" },
                maxWidth: 800,
                aspectRatio: "16/9",
                bgcolor: "black",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {videoKey && (
                <CardMedia
                  component="iframe"
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    border: "none",
                  }}
                  title={`${item?.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </Box>
          </Modal>
        </CardContent>
      </Box>
    </Card>
  );
}

export default MovieViewCard;
