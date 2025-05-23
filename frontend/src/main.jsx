
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
         <ThemeProvider>
            <App />
         </ThemeProvider>
     </AuthProvider>
  </StrictMode>
)
