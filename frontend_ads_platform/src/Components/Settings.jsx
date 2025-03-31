import React, { useState, useEffect, useContext } from "react";
import { Container, TextField, Button, Switch, FormControlLabel, Typography, Box } from "@mui/material";
import axios from "axios";
// import { ThemeContext } from "./ThemeContext";
import { ThemeContext } from "../App";

const Settings = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  // const [darkMode, setDarkMode] = useState(false);
  // const { theme, toggleTheme } = useContext(ThemeContext);
  // const [darkMode, setDarkMode] = useState(() => {
  //   return localStorage.getItem("darkMode") === "true"; // Convert to boolean
  // });
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    // Load user profile data
    axios.get("/api/user/profile/").then((response) => {
      setProfile(response.data);
      // setDarkMode(response.data.dark_mode);
    });
  }, []);

  const handleProfileUpdate = () => {
    axios.post("/api/user/update/", profile).then(() => alert("Profile updated!"));
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.body.style.backgroundColor = darkMode ? "#fff" : "#000";
  //   document.body.style.color = darkMode ? "#000" : "#fff";
  // };

  // const handleChangePassword = () => {
  //   axios.post("/api/user/change-password/", passwords)
  //     .then(() => alert("Password changed successfully!"))
  //     .catch(() => alert("Incorrect old password!"));
  // };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
    localStorage.setItem("darkMode", darkMode); // Save preference
  }, [darkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode((prevMode) => !prevMode);
  // };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };


  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios.post("https://127.0.0.1:8000/ads/delete_account/").then(() => {
        alert("Account deleted.");
        window.location.href = "/login";
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: "lightblue", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      
      {/* Profile Update */}
      <Box mb={3}>
        <Typography variant="h6">Update Profile</Typography>
        <TextField fullWidth label="Username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" onClick={handleProfileUpdate}>Save Changes</Button>
      </Box>
      
      {/* {/* Change Password */}
      {/* <Box mb={3}>
        <Typography variant="h6">Change Password</Typography>
        <TextField fullWidth label="Old Password" type="password" onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="New Password" type="password" onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} sx={{ mb: 2 }} />
        <Button variant="contained" color="secondary" onClick={handleChangePassword}>Change Password</Button>
      </Box> */}
       
      {/* Dark Mode Toggle */}
      {/* <Box mb={3}>
        <Typography variant="h6">Appearance</Typography>
        <FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} label="Dark Mode" />
      </Box> */}

       {/* Theme Selection */}
       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Dark Mode</Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Box>

        {/* <Container>
          {/* <Typography variant="h4">Settings</Typography> */}
          {/* <div>
            <Typography variant="body1">Dark Mode</Typography>
            <Switch checked={theme === "dark"} onChange={toggleTheme} />
          </div>
        </Container> */} 
      
      {/* Delete Account */}
      <Box>
        <Typography variant="h6" color="error">Danger Zone</Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>Delete Account</Button>
      </Box>
    </Container>
  );
};

export default Settings;
