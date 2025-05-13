// components/Header.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import "./../styles/components/header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const updateLoginStatus = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!(token && user));
  };

  updateLoginStatus(); // Run on mount

  // Listen for the custom event
  window.addEventListener("loginStatusChanged", updateLoginStatus);

  return () => {
    window.removeEventListener("loginStatusChanged", updateLoginStatus);
  };
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("loginStatusChanged"));
  navigate("/login");
};


  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        <Typography
          variant="h6"
          className="header-logo"
          onClick={() => navigate("/")}
        >
          Country App
        </Typography>

        <Box className="header-buttons">
          {!isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate("/favourites")}>
                Favorites
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {/* <ThemeToggle /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
