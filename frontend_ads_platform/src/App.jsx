import { useState, useContext, useEffect, createContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Link, } from 'react-router-dom';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Home from './Components/Home';
import CreateAds from './Components/CreateAds';
import Dashboard from './Components/Dashboard';
import AdDetails from './Components/AdDetails';
import Settings from './Components/Settings';
import Navbar from './Components/NavBar';
import { SearchProvider } from './Components/SearchContext';
import logo from "./assets/logo.jpeg.webp";
import ResetPassword from './Forms/RestPassword';
// import { ThemeContext } from './Components/ThemeContext';
// import { ThemeProvider } from './Components/ThemeContext';
// import { Settings } from './Components/Settings'
import './index.css'

export const ThemeContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Load saved mode
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const Logout = () => {
    localStorage.clear()
    return <Navigate to='/login' />
  }

 

  return (
    <>
      {/* <SearchProvider> */}
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <BrowserRouter>
          {/* <Navbar setSearchQuery={setSearchQuery}/> */}
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/create-ad">Create Ad</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav> */}
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create-ad' element={<CreateAds />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            {/* <Route path="/ads/:id" element={<AdDetails />} /> */}
            <Route path='/ads-details/:id' element={<AdDetails />}></Route>
            <Route path='/login' element = {<Login setToken={setToken}/>}></Route>
            <Route path='/register' element = {<Register />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
      {/* </SearchProvider> */}
      {/* COPYRIGHT FOOTER */}
      <footer className="footer">
        <p>Copyright © {new Date().getFullYear()} <img src={logo} alt="Logo" style={{width: 40, height: 40, }} /> All rights reserved.</p>
      </footer>
      
    </>
  )
}

export default App
