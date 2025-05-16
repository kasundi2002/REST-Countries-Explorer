/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../components/CountryCard";
import { BrowserRouter } from "react-router-dom";

const mockCountry = {
  cca3: "IND",
  name: { common: "India" },
  capital: ["New Delhi"],
  region: "Asia",
  population: 1400000000,
  languages: { hin: "Hindi", eng: "English" },
  flags: { svg: "https://flagcdn.com/in.svg" },
};

describe("CountryCard", () => {
  it("renders country details", () => {
    render(
      <BrowserRouter>
        <CountryCard
          country={mockCountry}
          favorites={[]}
          onToggleFavorite={() => {}}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/India/)).toBeInTheDocument();
    expect(screen.getByText(/New Delhi/)).toBeInTheDocument();
    expect(screen.getByText(/Asia/)).toBeInTheDocument();
    expect(screen.getByText(/Hindi, English/)).toBeInTheDocument();
  });

  it("calls toggle favorite when clicked", () => {
    const mockFn = jest.fn();
    render(
      <BrowserRouter>
        <CountryCard
          country={mockCountry}
          favorites={[]}
          onToggleFavorite={mockFn}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockFn).toHaveBeenCalled();
  });
});
