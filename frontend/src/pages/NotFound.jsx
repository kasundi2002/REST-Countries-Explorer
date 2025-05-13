import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </div>
  )
}

export default NotFound
