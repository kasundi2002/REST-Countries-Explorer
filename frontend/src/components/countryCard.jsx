// components/CountryCard.jsx
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./../styles/components/countryCard.css";

function CountryCard({ country, favorites, onToggleFavorite }) {
  const isFav =
    Array.isArray(favorites) &&
    favorites.some((fav) => fav.cca3 === country.cca3);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(country);
  };
  console.log(country);

  return (
    <Card
      component={Link}
      to={`/country/${country.cca3}`}
      className="country-card"
    >
      <CardMedia
        component="img"
        height="140"
        image={country.flags.svg}
        alt={`${country.name.common} flag`}
      />

      <CardContent>
        <Typography variant="h6">{country.name.common}</Typography>
        <Typography variant="body2">Capital: {country.capital?.[0]}</Typography>
        <Typography variant="body2">Region: {country.region}</Typography>
        <Typography variant="body2">
          <strong>Languages:</strong>{" "}
          {Object.values(country.languages || {}).join(", ")}
        </Typography>
        <IconButton onClick={handleToggle} className="fav-btn">
          {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
