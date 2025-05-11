import { createContext, useContext, useState } from "react";
import React from "react";
import PropTypes from "prop-types";



const GenresContext = createContext();

GenresContext.propTypes = {
  children: PropTypes.node.isRequired,
};


export const GenresProvider = ({ children }) => {
  const [generes, setGeneres] = useState([]);

  return (
    <GenresContext.Provider value={{ generes, setGeneres }}>
      {children}
    </GenresContext.Provider>
  );
};
GenresProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useGenres = () => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider");
  }
  return context;
};
