// pages/Home.jsx
import { useEffect, useState, useCallback } from "react";
import { Container, Grid, Pagination, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import FilterComponent from "../components/FilterComponent";
import axios from "axios";
import "./../styles/pages/HomePage.css";

const ITEMS_PER_PAGE = 9;

function Home() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const countriesRes = await fetch("https://restcountries.com/v3.1/all");
        const data = await countriesRes.json();
        setCountries(data);
        setFiltered(data);

        if (searchQuery) {
          const results = data.filter((c) =>
            c.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
          setFiltered(results);
        } else {
          setFiltered(data);
        }

        if (token) {
          const favRes = await axios.get(
            "http://localhost:8081/api/users/favorites",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFavorites(favRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchInitialData();
  }, [token,searchQuery]);

  const handleSearch = (query) => {
    const results = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
    setCurrentPage(1);
  };

  const handleFilter = (type, value) => {
    let results = [...countries];

    switch (type) {
      case "reset":
        break;
      case "region":
        results = results.filter((c) => c.region === value);
        break;
      case "language":
        results = results.filter((c) =>
          Object.values(c.languages || {}).some((lang) =>
            lang.toLowerCase().includes(value.toLowerCase())
          )
        );
        break;
      case "capital":
        results = results.filter((c) =>
          (c.capital || [""])
            .join(", ")
            .toLowerCase()
            .includes(value.toLowerCase())
        );
        break;
      case "population":
        if (Array.isArray(value) && value.length === 2) {
          const [min, max] = value;
          results = results.filter(
            (c) => c.population >= min && c.population <= max
          );
        }
        break;
      default:
        break;
    }

    setFiltered(results);
    setCurrentPage(1);
  };

  const fetchFavorites = useCallback(async () => {
    try {
      const [countriesRes, favoritesRes] = await Promise.all([
        axios.get("https://restcountries.com/v3.1/all"),
        axios.get("http://localhost:8081/api/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCountries(countriesRes.data);

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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCountries = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Container>
      <FilterComponent onSearch={handleSearch} onFilter={handleFilter} />

      <Grid container spacing={2}>
        {currentCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.cca3}>
            <CountryCard
              country={country}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& .MuiPagination-root": {
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "8px 16px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
          "& .MuiPaginationItem-root": {
            fontWeight: "bold",
            color: "#1976d2",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          },
        }}
      >
        <Pagination
          count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default Home;
