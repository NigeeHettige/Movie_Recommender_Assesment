import React from "react";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";



ThemeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};
