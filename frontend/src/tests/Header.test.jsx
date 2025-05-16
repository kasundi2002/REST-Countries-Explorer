/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./../components/Header";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

function mockLocalStorage(loggedIn = false) {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "token") return loggedIn ? "fake-token" : null;
    if (key === "user")
      return loggedIn ? JSON.stringify({ name: "Test" }) : null;
    return null;
  });
}

describe("Header", () => {
  it("shows Login and Register when not logged in", () => {
    mockLocalStorage(false);
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it("shows Logout and Favorites when logged in", () => {
    mockLocalStorage(true);
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  });

  it("triggers logout and updates UI", () => {
    mockLocalStorage(true);
    const { rerender } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Logout/i));

    // Simulate token removal
    Storage.prototype.getItem = jest.fn(() => null);

    act(() => {
      window.dispatchEvent(new Event("loginStatusChanged"));
    });

    rerender(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
