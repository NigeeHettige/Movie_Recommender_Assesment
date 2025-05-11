import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// Create an Axios instance for TMDB API
const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

const AuthContext = createContext();
AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem("sessionId") || null;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
    } else {
      localStorage.removeItem("sessionId");
    }
  }, [isAuthenticated, sessionId]);

  const login = async (username, password) => {
    try {
      // Step 1: Fetch a request token
      const tokenResponse = await tmdbClient.get("/authentication/token/new");
      if (!tokenResponse.data.success) {
        throw new Error("Failed to fetch request token");
      }
      const requestToken = tokenResponse.data.request_token;

      // Step 2: Validate the request token with username and password
      const validateResponse = await tmdbClient.post(
        "/authentication/token/validate_with_login",
        {
          username,
          password,
          request_token: requestToken,
        }
      );
      if (!validateResponse.data.success) {
        throw new Error(
          validateResponse.data.status_message || "Invalid username or password"
        );
      }

      // Step 3: Create a session with the validated request token
      const sessionResponse = await tmdbClient.post(
        "/authentication/session/new",
        {
          request_token: requestToken,
        }
      );
      if (!sessionResponse.data.success) {
        throw new Error(
          sessionResponse.data.status_message || "Failed to create session"
        );
      }

      setSessionId(sessionResponse.data.session_id);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setIsAuthenticated(false);
      setSessionId(null);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSessionId(null);
    setError(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        sessionId,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
