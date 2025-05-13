import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]));
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <>
      <style>
        {`
          .details-container {
            max-width: 400px; /* Smaller width */
            margin: 2rem auto;
            padding: 0.5rem 1rem; /* Less padding */
            height: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: #f9f9f9; /* Optional: for visual contrast */
            border-radius: 10px; /* Optional: softer corners */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: subtle depth */
          }

          .details-card {
            width: 100%;
            max-width: 400px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          .country-card {
            position: relative;
            text-decoration: none;
            height: 70%;
            display: flex;
            flex-direction: column;
            border: 1px solid #776e6e;
            border-radius: 10px;
            overflow: hidden;
          }

          .country-card .MuiCardMedia-root {
            height: 50px; /* Corrected height from "50x" to valid value */
            object-fit: cover;
          }

          .fav-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            padding: 6px;
            z-index: 1;
          }

          .flag-image {
            width: 200px; /* Set fixed width for consistent sizing */
            height: auto; /* Maintain aspect ratio */
            object-fit: contain; /* Ensures entire flag is visible */
            display: block;
            margin: 1rem auto;
            border: 3px solid #000; /* Optional: reduce border thickness */
            border-radius: 6px; /* Optional: smaller curve */
          }
        `}
      </style>

      <Container className="details-container">
        <Card className="details-card">
          <CardMedia
            component="img"
            height="200"
            image={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="flag-image"
          />
          <CardContent>
            <Typography variant="h5">{country.name.common}</Typography>
            <Typography variant="body1">
              <strong>Capital:</strong> {country.capital?.[0]}
            </Typography>
            <Typography variant="body1">
              <strong>Region:</strong> {country.region}
            </Typography>
            <Typography variant="body1">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Languages:</strong>{" "}
              {Object.values(country.languages || {}).join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Currencies:</strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(", ")
                : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default CountryDetails;
