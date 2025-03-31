// import React from "react";
// import { Link } from "react-router-dom";
// import '../styles/navbar.css'
// // import '../assets/Tech-Blog-Cover--3-.png'
// import logo from "../assets/logo.jpeg.webp";



// const Navbar = () => {
//   const token = localStorage.getItem("token");
//   return (
//     <nav className="navbar">
//       <img src={logo} alt="Ad Platform Logo" className="logo" />
      
//       <ul className="nav-links">
//         {!token ? (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/dashboard">Dashboard</Link></li>
//             <li><Link to="/create-ad">Create Ad</Link></li>
//             <li><input type="text" placeholder="Search Ads" className="search-bar" /></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };


// const Navbar = ({ isAuthenticated }) => {
//   return (
//     <nav className="navbar">
//       <div className="logo">AdPlatform</div>
//       <div className="nav-links">
//         {isAuthenticated ? (
//           <>
//             <a href="/dashboard">Dashboard</a>
//             <a href="/create-ad">Create Ads</a>
//             <input type="text" placeholder="Search ads..." className="search-bar" />
//             <a href="/categories">Categories</a>
//           </>
//         ) : (
//           <>
//             <a href="/login">Login</a>
//             <a href="/register">Register</a>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, InputBase, Box, Button } from "@mui/material";
import { Menu as MenuIcon, Search, Home, Dashboard, Login, AppRegistration, AddBox, Category, Info, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { Settings } from "./Settings";
import logo from "../assets/logo.jpeg.webp"; 
import { MenuItem, Menu } from "@mui/material";
import { TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = ({ setSearchQuery}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  
  // const token = localStorage.getItem("token");
  const token = localStorage.getItem('token')
  // setToken(res.data.access)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <AppBar position="fixed" sx={{ backgroundColor: "lightgray", opacity: '1' ,width: "100%", height: '20%'}}>
        
        <Toolbar sx={{ display: "flex", justifyContent: "space-around", gap: '2px', alignItems: "center", marginTop: '30px', }}>
          {/* Left Side - Mobile Menu Icon */}
          
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          {/* Logo & Home Link */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: '-20px'}} component={Link} to="/">
            <img src={logo} alt="Logo" style={{width: 80, height: 80, marginRight: 10, marginTop: '-27px' }} />
            {/* <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none" }}>
              Ad_Platform           
            </Typography> */}
          </Box>

          {/* Search Bar - Centered */}
          

          {/* Right Side - Navigation Links */}
          <List sx={{ display: { xs: "none", md: "flex" }, gap: 3}}>
            {!token ? (
              <>
                <ListItem button component={Link} to="/about" sx={{color:'red', fontSize: '20px'}}>
                  <Info sx={{ mr: 1, color:'red', fontSize: '30px' }} /> About AdSpere
                </ListItem>
                <ListItem button component={Link} to="/categories" sx={{color:'red', fontSize: '20px'}}>
                  <Category sx={{ mr: 1, color:'red', fontSize: '30px' }} /> Categories
                </ListItem>
                <Box sx={{ display: { xs: "none", md: "flex" }, marginRight:'-20px', alignItems: "center",  borderRadius: '1', padding: "4px 8px", width: "40%" }}>
                  {/* <Search sx={{ color: "#1976d2", mr: 1 }}  label="Search Ads"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                  /> */}
                  
                  <TextField
                    label="Search Ads"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    sx={{width: '180px', color: "1976d2", backgroundColor: 'white', borderRadius: '3px', mr: 1}}
                  />
                  {/* <InputBase placeholder="Search ads..." fullWidth /> */}
                </Box>
                <ListItem button component={Link} to="/login" sx={{color:'red', fontSize: '20px'}}>
                  <Login sx={{ mr: 1, color:'red', fontSize: '30px' }} /> Login
                </ListItem>
                <ListItem button component={Link} to="/register" sx={{color:'red', fontSize: '20px'}}>
                  <AppRegistration sx={{ mr: 1, color:'red', fontSize: '30px' }} /> Register
                </ListItem>
              </>
              
              
            ) : (          

              <>
              <ListItem button component={Link} to="/dashboard" sx={{color:'red', fontSize: '13px'}}>
                <Dashboard sx={{ mr: 1, color:'red', fontSize: '22px'}} /> Dashboard
                </ListItem>
                <ListItem button component={Link} to="/create-ad" sx={{color:'red', fontSize: '13px'}}>
                  <AddBox sx={{ mr: 1, color:'red', fontSize: '22px' }} /> Create Ad
                </ListItem>
                <ListItem button component={Link} to="/categories" sx={{color:'red', fontSize: '13px'}}>
                  <Category sx={{ mr: 1, color:'red', fontSize: '22px' }} /> Categories
                </ListItem>
                <Box sx={{ display: { xs: "none", md: "flex" }, marginRight:'-20px', alignItems: "center",  borderRadius: '1', padding: "4px 8px", width: "40%" }}>
                  {/* <Search sx={{ color: "#1976d2", mr: 1 }}  label="Search Ads"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                  /> */}
                  
                  <TextField
                    label="Search Ads"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    sx={{width: '180px', color: "1976d2", backgroundColor: 'white', borderRadius: '3px', mr: 1}}
                  />
                  {/* <InputBase placeholder="Search ads..." fullWidth /> */}
                </Box>
                <ListItem button component={Link} to="/about" sx={{color:'red', fontSize: '13px'}}>
                  <Info sx={{ mr: 1, color:'red', fontSize: '22px' }} /> About Adspere
                </ListItem>
                <ListItem  sx={{color:'red', fontSize: '13px'}} component={Link} to="/settings" >
                  {/* Settings Button with Icon */}
                  {/* <IconButton onClick={handleOpenMenu} color="inherit" sx={{color:'red', fontSize: '13px'}}> */}
                    <SettingsIcon  color="inherit"  sx={{ mr: 1, color:'red', fontSize: '22px', cursor: 'pointer' }}/> Settings
                  {/* </IconButton> */}
                  {/* <SettingsIcon sx={{ mr: 1, color:'red', fontSize: '22px' }} component={Link} to="/settings"/>Settings */}
                  {/* Dropdown Menu for Settings */}
                  {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleCloseMenu} component={Link} to="/settings/theme">Dark/Light Mode</MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={Link} to="/settings/account">Account Settings</MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={Link} to="/settings/password">Change Password</MenuItem>
                    <MenuItem onClick={handleCloseMenu} component={Link} to="/settings/delete-account">Delete Account</MenuItem>
                  </Menu> */}
                </ListItem>
                <ListItem button component={Link} to='/logout' sx={{color:'red', fontSize: '13px'}}>
                  <Logout sx={{ mr: 1, color:'red', fontSize: '22px' }} /> Logout
              </ListItem>
              </>

            )}
            </List>
        </Toolbar>
      </AppBar>

      {/* MOBILE MENU - Drawer Sidebar */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { md: "none" } }}>
        <List sx={{ width: 250 }}>
          {!token ? (
            <>
              <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
                <Info sx={{ mr: 1 }} /> <ListItemText primary="About Us" />
              </ListItem>
              <ListItem button component={Link} to="/categories" onClick={handleDrawerToggle}>
                <Category sx={{ mr: 1 }} /> <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                <Login sx={{ mr: 1 }} /> <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/register" onClick={handleDrawerToggle}>
                <AppRegistration sx={{ mr: 1 }} /> <ListItemText primary="Register" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
                <Dashboard sx={{ mr: 1 }} /> <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/create-ad" onClick={handleDrawerToggle}>
                <AddBox sx={{ mr: 1 }} /> <ListItemText primary="Create Ad" />
              </ListItem>
              <ListItem button component={Link} to="/categories" onClick={handleDrawerToggle}>
                <Category sx={{ mr: 1 }} /> <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
                <Info sx={{ mr: 1 }} /> <ListItemText primary="About Us" />
              </ListItem>
              <ListItem button component={Link} to='/login'>
                <Logout sx={{ mr: 1 }} /> <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;