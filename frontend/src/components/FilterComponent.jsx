// components/FilterDrawer.jsx
import {
  Drawer,
  IconButton,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Slider,
  Chip,
  Box,
  InputAdornment,
  Fab
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import LanguageIcon from '@mui/icons-material/Language'
import PlaceIcon from '@mui/icons-material/Place'
import PublicIcon from '@mui/icons-material/Public'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import './../styles/components/FilterComponent.css'

const regions = ['Africa', 'America', 'Asia', 'Europe', 'Australia', 'Antarctica']

function FilterComponent({ onFilter }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [language, setLanguage] = useState('')
  const [capital, setCapital] = useState('')
  const [population, setPopulation] = useState([0, 1000000000])

  const toggleDrawer = (open) => () => setDrawerOpen(open)

  const handleRegionChange = (event, newRegion) => {
    setSelectedRegion(newRegion)
    if (newRegion) onFilter('region', newRegion)
  }

  const handleClear = () => {
    setSelectedRegion('')
    setLanguage('')
    setCapital('')
    setPopulation([0, 1000000000])
    onFilter('reset')
  }

  const handlePopulationChange = (e, newValue) => {
    setPopulation(newValue)
    onFilter('population', newValue)
  }

  return (
    <>
      {/* Floating Filter Button */}
      <Fab
        color= 'black'
        className="filter-fab"
        aria-label="open filter drawer"
        onClick={toggleDrawer(true)}
      >
        <FilterAltIcon />
      </Fab>

      {/* Drawer with filters */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box className="filter-drawer">
          <Box className="filter-drawer-header">
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleDrawer(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack spacing={2} sx={{ mt: 2 }}>

            <TextField
              label="Language"
              variant="outlined"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value)
                onFilter('language', e.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Capital"
              variant="outlined"
              value={capital}
              onChange={(e) => {
                setCapital(e.target.value)
                onFilter('capital', e.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceIcon />
                  </InputAdornment>
                ),
              }}
            />

            <div>
              <Typography gutterBottom>Region</Typography>
              <ToggleButtonGroup
                value={selectedRegion}
                exclusive
                onChange={handleRegionChange}
                color="primary"
                className="toggle-buttons"
              >
                {regions.map(region => (
                  <ToggleButton key={region} value={region}>
                    <PublicIcon sx={{ mr: 0.5 }} />
                    {region}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>

            <div>
              <Typography gutterBottom>Population Range</Typography>
              <Slider
                value={population}
                onChange={handlePopulationChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000000000}
                step={10000000}
              />
            </div>

            <Chip
              label="Clear Filters"
              onClick={handleClear}
              icon={<ClearAllIcon />}
              color="secondary"
              variant="outlined"
              aria-label="clear filters"
            />
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}

export default FilterComponent


