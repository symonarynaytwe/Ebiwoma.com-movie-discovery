# Ebiwoma.com – Movie Discovery App

## 1. About the Project

Ebiwoma.com is a movie discovery website that helps users find movies and TV shows. Users can browse movies, search for titles, filter movies by genre, view movie details, and save movies to a personal watchlist.

I built this project to practise web development using React and JavaScript while learning how a frontend communicates with a backend API.

## 3. Main Features

- **Home:** Displays movies for users to explore.
- **Movies:** Allows users to browse movies.
- **TV Shows:** Loads TV shows from the backend.
- **Search:** Helps users find movies by title.
- **Genre Filter:** Allows users to filter movies by genre.
- **Movie Details:** Allows users to view more information about a selected movie.
- **My Watchlist:** Allows users to save movies they want to watch.
- **Responsive Layout:** Uses a top navigation bar instead of the previous left sidebar.
- **Loading and Error Messages:** Helps users understand when content is loading or when something goes wrong.

## 4. Technologies Used

- **React:** Builds the user interface.
- **Vite:** Runs the development server and builds the frontend.
- **Material UI:** Provides ready-made interface components such as buttons, icons, and navigation elements.
- **Express.js:** Handles backend API requests.
- **TMDB API:** Provides movie and TV show information.
- **React Router:** Helps users navigate between pages.
- **CSS:** Controls the layout and appearance of the website.
- **Render:** Hosts the live frontend and backend.
- **Git and GitHub:** Track and store project changes.

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

Ebiwoma.com retrieves movie and TV information from TMDB through its Express backend. API credentials are stored in environment variables and should not be committed to GitHub.

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

## . Project Links

- **Live Website:** https://ebiwoma-com-movie-discovery.onrender.com
- **GitHub Repository:** https://github.com/symonarynaytwe/Ebiwoma.com-movie-discovery
- **Backend API:** https://cinefind-movie-discovery-0qkj.onrender.com/api/movies

## . How the Application Works

The frontend sends requests to the backend when a user wants to load movies, TV shows, or genre results. The backend communicates with TMDB and returns the results to the frontend. React then displays the information on the website.

The watchlist uses browser local storage to keep saved movies on the same browser.

## . Running the Project Locally

### Requirements

- Node.js and npm
- A code editor such as Visual Studio Code
- A TMDB API key

### Install Dependencies

Open a terminal in the `movie-discovery` project folder and run:

```bash
npm install
```

### Start the Frontend

Run:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### Start the Backend

Open a second terminal in the project folder and run:

```bash
npm run server
```

The backend should start using the port configured in the project.

## . Environment Configuration

The backend needs a valid TMDB API key. Keep secret keys in the appropriate `.env` file and never upload real credentials to GitHub.

The frontend uses the `VITE_API_BASE_URL` environment variable to identify the backend API. For the deployed application, it points to:

```text
https://cinefind-movie-discovery-0qkj.onrender.com
```

Use the environment variable names and configuration already provided in the project. Do not share real API keys or passwords.

## . Recent Improvements

During development, I made several improvements:

- Fixed movie loading so the Movies navigation button loads results without requiring a page refresh.
- Fixed genre filtering so it requests the correct backend URL.
- Improved TV show loading and navigation.
- Kept the main navigation at the top and removed the left sidebar to make the layout simpler.
- Updated backend CORS settings to allow requests from the deployed frontend.
- Added a Render rewrite rule so application routes can load when opened or refreshed directly.
- Improved the handling of loading and error states.

## . Deployment

The frontend and backend are deployed separately on Render. The frontend communicates with the deployed backend through the configured API URL.

After making changes, I push the code to GitHub and check that Render has deployed the latest version.

## . Limitations

The watchlist is stored in the browser's local storage, so it is not automatically shared across different browsers or devices. The application also depends on the availability of the backend and TMDB API.

## . Acknowledgements

This project uses TMDB for movie and TV show information, along with React, Material UI, Express, and other supporting tools. External resources and assistance used during development should be acknowledged according to the assignment requirements.

---

**Project:** Ebiwoma.com – Movie Discovery App  
**Developer:** [Your Name]  
**Course:** Bachelor of Science in Information Technology  
**University:** Uganda Christian University
