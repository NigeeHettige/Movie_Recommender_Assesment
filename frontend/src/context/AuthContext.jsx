// context/AuthContext.jsx
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  // Access API key from .env
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Validate that the API key is present
  if (!API_KEY) {
    console.error(
      "TMDB API key is missing. Please set REACT_APP_TMDB_API_KEY in the .env file."
    );
    throw new Error(
      "TMDB API key is missing. Please set REACT_APP_TMDB_API_KEY in the .env file."
    );
  }

  // Configure Axios instance
  const api = axios.create({
    baseURL: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Automatically add API key to all requests
  api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params.api_key = API_KEY;
    return config;
  });

  // Step 1: Create a Request Token
  const createRequestToken = async () => {
    try {
      const response = await api.get("/authentication/token/new");
      if (response.data.success) {
        return response.data.request_token;
      } else {
        throw new Error(
          response.data.status_message || "Failed to create request token"
        );
      }
    } catch (err) {
      setError(err.message || "Network error");
      return null;
    }
  };

  // Step 2: Validate Request Token with Login
  const validateWithLogin = async (username, password, requestToken) => {
    try {
      const response = await api.post(
        "/authentication/token/validate_with_login",
        {
          username,
          password,
          request_token: requestToken,
        }
      );
      if (response.data.success) {
        return response.data.request_token;
      } else {
        throw new Error(
          response.data.status_message || "Invalid username or password"
        );
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
      return null;
    }
  };

  // Step 3: Create Session ID
  const createSession = async (requestToken) => {
    try {
      const response = await api.post("/authentication/session/new", {
        request_token: requestToken,
      });
      if (response.data.success) {
        setSessionId(response.data.session_id);
        setIsAuthenticated(true);
        return response.data.session_id;
      } else {
        throw new Error(
          response.data.status_message || "Failed to create session"
        );
      }
    } catch (err) {
      setError(err.message || "Session creation failed");
      return null;
    }
  };

  // Login function
  const login = async (username, password) => {
    console.log("Came", username, password);
    setError(null);
    const requestToken = await createRequestToken();
    if (!requestToken) return false;

    const validatedToken = await validateWithLogin(
      username,
      password,
      requestToken
    );
    if (!validatedToken) return false;

    const session = await createSession(validatedToken);
    return !!session;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSessionId(null);
    setError(null);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, error, sessionId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
