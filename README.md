# CineFind — Movie Discovery Web Application

## 1. Project Overview

CineFind is a responsive web application that helps users discover movies and TV shows. Users can search for titles, filter movies by genre, view details, and save favourites to a personal watchlist.

The application uses real movie and TV show information from The Movie Database (TMDB).

## 2. Main Features

- Browse trending movies and TV shows.
- Explore popular movies and popular TV shows.
- Search for movies and TV shows by title.
- Filter movies by genre.
- View details, ratings, release dates, and overviews.
- Add and remove titles from a personal watchlist.
- Save the watchlist in browser local storage.
- Responsive layout for desktop and mobile screens.
- Loading and error handling for API requests.

## 3. Technologies Used

- React JS and JSX
- Vite
- Material UI (MUI)
- React Router
- Node.js and Express
- TMDB API
- CSS
- Browser local storage

## 4. Project Structure

```text
movie-discovery/
├── public/
├── server/
│   └── server.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Home.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 5. Requirements

Install Node.js and npm before running the application. A TMDB API credential is also required.

## 6. Installation and Setup

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root using `.env.example` as a guide. Add your own TMDB credential privately.
5. Start the backend in one terminal:

   ```bash
   npm run server
   ```

6. Start the frontend in another terminal:

   ```bash
   npm run dev
   ```

7. Open the local URL shown by Vite, normally `http://localhost:5173/`.

Keep both servers running while using the local application.

## 7. API Configuration and Security

CineFind retrieves movie and TV information from TMDB through its Express backend. API credentials are stored in environment variables and should not be committed to GitHub.

The `.env` file must remain private. Use `.env.example` to document the required variable names without including real credentials.

## 8. Screenshots

Screenshots of the application are provided with the project submission. They demonstrate the homepage, movie discovery features, and application interface.

## 9. Production Build

To check the frontend production build, run:

```bash
npm run build
```

The generated frontend files are placed in the `dist` directory.

## 10. Credits

Movie and TV show data and poster images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
