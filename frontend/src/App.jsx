import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/HomePage'
import Header from './components/Header'
import CountryDetails from './pages/CountryDetails'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserFavoritePage from './pages/userFavourites'
import ThemeToggle from './components/ThemeToggle'


function App() {

 return (
  
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/favourites" element={<UserFavoritePage/>} />
      </Routes>
      <ThemeToggle />
    </Router>
  )
}

export default App

