import CircularProgress from '@mui/material/CircularProgress'
import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <CircularProgress size={50} />
    </div>
  )
}

export default LoadingSpinner;