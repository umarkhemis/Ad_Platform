import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Link, } from 'react-router-dom';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Home from './Components/Home';
import CreateAds from './Components/CreateAds';
import Dashboard from './Components/Dashboard';
import AdDetails from './Components/AdDetails';
import Navbar from './Components/NavBar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))


  const Logout = () => {
    localStorage.clear()
    return <Navigate to='/login' />
  }

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
