// import React, { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   // Load theme from local storage or default to light mode
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme); // Save preference
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext(); // ✅ Correct way to create context

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>  {/* ✅ Ensure provider value is passed */}
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(); // ✅ Creates the context

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // ✅ Apply theme class to <body>
    // document.body.style.backgroundColor = theme ? "#fff" : "#000";
    // document.body.style.color = theme ? "#000" : "#fff";
    localStorage.setItem("theme", theme); // ✅ Save preference
  }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

const toggleTheme = () => {
    // setDarkMode(!darkMode);
    // document.body.style.backgroundColor = darkMode ? "#fff" : "#000";
    // document.body.style.color = darkMode ? "#000" : "#fff";
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

