[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)


link : https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-kasundi2002

# 🌍 REST Countries Explorer

A full-stack web application that allows users to explore data about countries using the [REST Countries API](https://restcountries.com/), and manage their favorite countries via a secure login system.

Built with **React + Vite + Tailwind CSS + Material UI** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## ✨ Features

### 🌐 Frontend
- View country details: name, capital, population, region, flag, and languages
- Search countries by name
- Filter countries by region
- Click to view detailed country info
- Responsive design using Tailwind CSS and Material UI
- Login/Register functionality
- Add countries to favorites (requires login)
- View your list of favorite countries

### 🛠️ Backend
- User authentication with JWT
- MongoDB-based user and favorites storage
- Secure routes with middleware
- RESTful API endpoints for login, register, and favorites

## 🚀 Project Structure
        rest-countries-explorer/
        │
        ├── frontend/                          # React (Vite) frontend
        │   ├── public/
        │   │   └── index.html
        │   ├── src/
        │   │   ├── assets/                    # Images/icons (if any)
        │   │   ├── components/                # Reusable components
        │   │   │   ├── countryCard.jsx
        │   │   │   ├── FilterComponent.jsx
        │   │   │   └── Header.jsx
        │   │   │   └── LoadingSpinner.jsx
        │   │   │   ├── SearchBar.jsx
        │   │   │   └── ThemeToggler.jsx
        │   │   ├── pages/ 
        │   │   │   ├── CountryDetailsPage.jsx                    # Application pages
        │   │   │   ├── HomePage.jsx
        │   │   │   ├── Login.jsx
        │   │   │   └── NotFound.jsx
        │   │   │   ├── Registration.jsx
        │   │   │   ├── userFavourites.jsx
        │   │   ├── styles/                  # css for pages
        │   │   │   ├── components/
        │   │   │   └── pages/
        │   │   ├── App.css
        │   │   ├── App.jsx                    # App router + layout
        │   │   ├── main.jsx                   # ReactDOM entry
        │   │   ├── index.css                  # Tailwind CSS import
        │   │   └── setupTests.js              # Jest test setup (optional)
        │   ├── package-lock.json
        │   ├── package.json
        │   └── vite.config.js
        │
        ├── server/                            # Node.js + Express backend
        │   ├── config/
        │   │   └── db.js                      # MongoDB connection
        │   ├── controllers/
        │   │   └── userController.js          # Register/Login/Favorites
        │   ├── models/
        │   │   └── User.js                    # Mongoose user schema
        │   ├── routes/
        │   │   └── userRoutes.js              # Auth/Favorites routes
        │   ├── middleware/
        │   │   └── authMiddleware.js          # JWT token protect
        │   ├── .env                           # Environment variables
        │   ├── server.js                      # Entry point for API server
        │   └── package.json
        │
        ├── .gitignore
        └── README.md


## 📦 Installation & Setup

### ⚙️ Prerequisites
- Node.js & npm
- MongoDB running locally or via Atlas


## 🖥️ Frontend Setup

cd frontend
npm install
npm run dev
