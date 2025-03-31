import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Create Provider
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook to use the context
export const useSearchContext = () => useContext(SearchContext);
