// pages/UserFavorites.jsx
import { useEffect, useState, useCallback } from "react";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import CountryCard from "../components/countryCard";
import "./../styles/pages/userFavourites.css";

function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const token = localStorage.getItem("token");
  console.log(allCountries);
  
  const fetchFavorites = useCallback(async () => {
    try {
      const [countriesRes, favoritesRes] = await Promise.all([
        axios.get("https://restcountries.com/v3.1/all"),
        axios.get("http://localhost:8081/api/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAllCountries(countriesRes.data);

      const favCodes = favoritesRes.data.map((fav) => fav.cca3);
      const favCountries = countriesRes.data.filter(
        (c) => c.cca3 && favCodes.includes(c.cca3)
      );
      setFavorites(favCountries);
    } catch (err) {
      console.error("Error loading favorites:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = async (country) => {
    const body = {
      cca3: country.cca3,
      name: country.name.common,
      flag: country.flags.svg,
    };

    try {
      if (favorites.some((fav) => fav.cca3 === country.cca3)) {
        await axios.delete(
          `http://localhost:8081/api/users/favorites/${country.cca3}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            data: body,
          }
        );
      } else {
        await axios.post("http://localhost:8081/api/users/favorites", body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchFavorites();
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  };

  return (
    <Container className="favorites-container">
      <Typography
        variant="h5"
        sx={{
          my: 2,
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
          letterSpacing: 1.2,
          textTransform: "uppercase",
          backgroundColor: "#b0bec5", // Light grey
          padding: "12px 24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "inline-block",
          mx: "auto",
        }}
      >
        Your favourite countries
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" align="center">
          You have no favorite countries yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((country) => (
            <Grid item xs={12} sm={6} md={4} key={country.cca3}>
              <CountryCard
                country={country}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default UserFavorites;
