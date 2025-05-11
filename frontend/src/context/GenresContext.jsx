import { createContext, useContext, useState } from "react";
import React from "react";
import PropTypes from "prop-types";


GenresContext.propTypes = {
  children: PropTypes.node.isRequired,
};

GenresProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [generes, setGeneres] = useState([]);

  return (
    <GenresContext.Provider value={{ generes, setGeneres }}>
      {children}
    </GenresContext.Provider>
  );
};

export const useGenres = () => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider");
  }
  return context;
};
