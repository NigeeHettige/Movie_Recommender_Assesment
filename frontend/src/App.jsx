import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import { useTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import MovieViewCard from "./Components/MovieViewCard";
import Login from "./Components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { useEffect } from "react";
import { GenresProvider } from "./context/GenresContext";
import { MoviesProvider } from "./context/MovieContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: theme.background_color.main,
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {isAuthenticated && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieViewCard />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <GenresProvider>
          <MoviesProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </MoviesProvider>
        </GenresProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
