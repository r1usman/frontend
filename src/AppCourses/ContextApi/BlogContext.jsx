import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <SearchContext.Provider value={{ selectedBlog, setSelectedBlog }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

