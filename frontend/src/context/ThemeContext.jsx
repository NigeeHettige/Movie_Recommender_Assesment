import React from "react";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";




const ThemeContext = createContext();
ThemeContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};
