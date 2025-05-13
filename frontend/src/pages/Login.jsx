// pages/Login.jsx
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'; // ✅ Correct
import { TextField, Button, Paper, Typography } from '@mui/material'
import axios from "axios";
import './../styles/pages/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/users/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      // Trigger header to update
      window.dispatchEvent(new Event("loginStatusChanged"));
      navigate("/");
      console.log("Login successful", isLoggedIn);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Paper elevation={3} className="auth-container">
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin} className="auth-form">
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  )
}

export default Login

