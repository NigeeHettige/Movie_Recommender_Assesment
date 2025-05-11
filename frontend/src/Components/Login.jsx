import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IconButton, TextField, Button, Box, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, error: authError } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const success = await login(username, password);
    if (success) {
      navigate("/home");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        backgroundColor:  "#121212",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#1e1e1e" ,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Movie Explorer
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "semibold",
            mb: 3,
            textAlign: "center",
            color: "#bdbdbd" ,
          }}
        >
          Sign In with TMDB
        </Typography>
        {authError && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              borderRadius: 1,
            }}
          >
            {authError}
          </Box>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="TMDB Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <PersonIcon
                  sx={{
                    color: "#90a4ae" ,
                    mr: 1,
                  }}
                />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#616161",
                },
                "&:hover fieldset": {
                  borderColor:  "#90a4ae" ,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
                backgroundColor: "#2c2c2c" ,
                color:  "#ffffff" ,
              },
              "& .MuiInputLabel-root": {
                color:  "#90a4ae" ,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <LockIcon
                  sx={{
                    color: "#90a4ae" ,
                    mr: 1,
                  }}
                />
              ),
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{ color:  "#90a4ae"  }}
                    />
                  ) : (
                    <Visibility
                      sx={{ color:  "#90a4ae" }}
                    />
                  )}
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:  "#616161" ,
                },
                "&:hover fieldset": {
                  borderColor: "#90a4ae" ,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
                backgroundColor:  "#2c2c2c" ,
                color: "#ffffff" ,
              },
              "& .MuiInputLabel-root": {
                color: "#90a4ae" ,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#1976d2",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{
              py: 1.5,
              fontWeight: "medium",
              borderRadius: 1,
            }}
          >
            Sign In
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: "center",
            color: "#90a4ae" ,
          }}
        >
          
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;