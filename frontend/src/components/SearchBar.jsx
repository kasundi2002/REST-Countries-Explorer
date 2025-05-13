// components/SearchBar.jsx
import { TextField } from '@mui/material'
import { useState , useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/components/searchBar.css'

function SearchBar({ onSearch, searchQuery }) {
  const [query, setQuery] = useState(searchQuery || '')
  const navigate = useNavigate()
  const location = useLocation()

  // Update input field if searchQuery changes (like on back button)
  useEffect(() => {
    setQuery(searchQuery || '')
  }, [searchQuery])

    const handleChange = (e) => {
       const value = e.target.value
        setQuery(value)
        onSearch(value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set('search', query)
      navigate({ pathname: '/', search: searchParams.toString() })
    }
  }

  return (
    <div className="search-bar-container">
      <TextField
        fullWidth
        placeholder="Search by country name"
        variant="outlined"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          input: { color: '#333' },           // Text color
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#888',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',         // Blue on focus
            },
          },
          '& .MuiInputLabel-root': {
            color: '#555',
          },
          '& label.Mui-focused': {
            color: '#1976d2',                 // Label color on focus
          }
        }}
      />
    </div>
  )
}

export default SearchBar


