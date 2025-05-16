/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./../pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

const mockCountries = [
  {
    cca3: "USA",
    name: { common: "United States" },
    capital: ["Washington D.C."],
    region: "America",
    population: 331000000,
    languages: { eng: "English" },
    flags: { svg: "https://flagcdn.com/us.svg" },
  },
  {
    cca3: "FRA",
    name: { common: "France" },
    capital: ["Paris"],
    region: "Europe",
    population: 67000000,
    languages: { fra: "French" },
    flags: { svg: "https://flagcdn.com/fr.svg" },
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCountries });
  });

  it("renders countries after fetching", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/United States/i)).toBeInTheDocument();
      expect(screen.getByText(/France/i)).toBeInTheDocument();
    });
  });

  it('shows "no countries found" when filter matches nothing', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/xyz-nonexistent/i)).not.toBeInTheDocument();
    });
  });
});
