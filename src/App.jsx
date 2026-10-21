
import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Container,
  Dialog,
DialogTitle,
DialogContent,
DialogActions,
Chip,
CircularProgress,
FormControl, 
InputLabel,
 Select,
 MenuItem,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import './App.css';

function CineFindPage() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [selectedMovie, setSelectedMovie] = useState(null);
const [details, setDetails] = useState(null);
const [detailsLoading, setDetailsLoading] = useState(false);

const [watchlist, setWatchlist] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('cinefind-watchlist')) || [];
  } catch {
    return [];
  }
});

const [showWatchlist, setShowWatchlist] = useState(false);


const handleSearch = async () => {
  const query = search.trim();

  if (!query) {
    setError('Please enter a movie or TV show title.');
    return;
  }

  setLoading(true);
  setError('');

  try {
    const response = await fetch(
      `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Search request failed.');
    }

    const data = await response.json();
    setMovies(data.results || []);

    if (!data.results || data.results.length === 0) {
      setError('No matching movies or TV shows were found.');
    }
  } catch (error) {
    console.error('Search error:', error);
    setError('Search failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

const handleGenreChange = async (genreId) => {
  setSelectedGenre(genreId);
  setShowWatchlist(false);
  setLoading(true);
  setError('');

  try {
    const url = genreId
      ? `http://localhost:5000/api/genre/${genreId}`
      : 'http://localhost:5000/api/movies';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Could not load genre results.');
    }

    const data = await response.json();
    setMovies(data.results || []);

    if (!data.results || data.results.length === 0) {
      setError('No movies found for this genre.');
    }
  } catch (error) {
    console.error('Genre filter error:', error);
    setError('Could not filter movies. Please try again.');
  } finally {
    setLoading(false);
  }
};

const handleShowTV = async () => {
  setShowWatchlist(false);
  setSelectedGenre('');
  setLoading(true);
  setError('');

  try {
    const response = await fetch('http://localhost:5000/api/tv');

    if (!response.ok) {
      throw new Error('Could not load TV shows.');
    }

    const data = await response.json();
    setMovies(data.results || []);
  } catch (error) {
    console.error('TV shows error:', error);
    setError('Could not load TV shows. Please try again.');
  } finally {
    setLoading(false);
  }
};

const toggleWatchlist = (movie) => {
  setWatchlist((currentList) => {
    const alreadySaved = currentList.some(
      (item) => item.id === movie.id
    );

    if (alreadySaved) {
      return currentList.filter((item) => item.id !== movie.id);
    }

    return [...currentList, movie];
  });
};

const isInWatchlist = (movieId) => {
  return watchlist.some((movie) => movie.id === movieId);
};

const [selectedGenre, setSelectedGenre] = useState('');
const [popularMovies, setPopularMovies] = useState([]);
const [popularTV, setPopularTV] = useState([]);

useEffect(() => {
  async function fetchMovies() {
    try {
      const response = await fetch('http://localhost:5000/api/movies');

      if (!response.ok) {
        throw new Error('Could not load movies.');
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('We could not load movies. Please try again.');
      console.error('Movie loading error:', err);
    } finally {
      setLoading(false);
    }
  }

  fetchMovies();
}, []);
useEffect(() => {
  localStorage.setItem('cinefind-watchlist', JSON.stringify(watchlist));
}, [watchlist]);

  const menuItems = [
    { label: 'Home', icon: <HomeOutlinedIcon /> },
    { label: 'Movies', icon: <LocalMoviesOutlinedIcon /> },
    { label: 'TV Shows', icon: <LiveTvOutlinedIcon /> },
    { label: 'My Watchlist', icon: <FavoriteBorderIcon /> },
  ];

  useEffect(() => {
  fetch('http://localhost:5000/api/popular-movies')
    .then((response) => {
      if (!response.ok) throw new Error('Popular movies failed to load');
      return response.json();
    })
    .then((data) => setPopularMovies(data.results || []))
    .catch((error) => console.error(error));

  fetch('http://localhost:5000/api/popular-tv')
    .then((response) => {
      if (!response.ok) throw new Error('Popular TV failed to load');
      return response.json();
    })
    .then((data) => setPopularTV(data.results || []))
    .catch((error) => console.error(error));
}, []);

  return (
    <Box className="app">
      <AppBar position="static" className="top-bar" elevation={0}>
        <Toolbar className="toolbar">
          <Box className="brand">
            <MovieOutlinedIcon className="brand-icon" />
            <Typography variant="h5" component="h1">
              Cine<span>Find</span>
            </Typography>
            </Box>

            <Box className="nav-buttons">
  {menuItems.map((item) => {
    const paths = {
      Home: '/',
      Movies: '/movies',
      'TV Shows': '/tv',
      'My Watchlist': '/watchlist',
    };

    return (
      <Button
        key={item.label}
        component={Link}
        to={paths[item.label]}
        startIcon={item.icon}
        onClick={() => {
          if (item.label === 'TV Shows') {
            handleShowTV();
          } else if (item.label === 'My Watchlist') {
            setShowWatchlist(true);
          } else {
            setShowWatchlist(false);
            setSelectedGenre('');
            setSearch('');
            handleGenreChange('');
          }
        }}
      >
        {item.label}
      </Button>
    );
  })}
</Box>
          
<TextField
  className="search-box"
  placeholder="Search movies and TV shows..."
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }}
  size="small"
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    },
  }}
/>

<Button
  className="watchlist-button"
  startIcon={<SearchIcon />}
  onClick={handleSearch}
>
  Search
</Button>

<Button
  className="watchlist-button"
  startIcon={<FavoriteBorderIcon />}
  onClick={() => setShowWatchlist(!showWatchlist)}
>
  {showWatchlist ? 'All Movies' : `Watchlist (${watchlist.length})`}
</Button>

<FormControl size="small" sx={{ minWidth: 160, mt: 2 }}>
  <InputLabel id="genre-filter-label" sx={{ color: '#929fb8' }}>
    Filter by genre
  </InputLabel>

  <Select
    labelId="genre-filter-label"
    value={selectedGenre}
    label="Filter by genre"
    onChange={(event) => handleGenreChange(event.target.value)}
    sx={{
      color: '#f5f7ff',
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#273249',
      },
      '.MuiSvgIcon-root': {
        color: '#55e6cf',
      },
    }}
  >
    <MenuItem value="">All genres</MenuItem>
    <MenuItem value="28">Action</MenuItem>
    <MenuItem value="35">Comedy</MenuItem>
    <MenuItem value="18">Drama</MenuItem>
    <MenuItem value="27">Horror</MenuItem>
    <MenuItem value="878">Science Fiction</MenuItem>
    <MenuItem value="16">Animation</MenuItem>
  </Select>
</FormControl>

        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="page-container">
        <Box className="welcome-section">
          <Typography className="eyebrow">
            YOUR NEXT FAVOURITE STARTS HERE
          </Typography>

          <Typography variant="h2" className="hero-title">
            Discover stories
            <br />
            worth <span>watching.</span>
          </Typography>

          <Typography className="hero-description">
            Explore movies and TV shows, discover new favourites,
            and keep your watchlist in one place.
          </Typography>
        </Box>

        <Box className="content-layout">
          <Box component="aside" className="sidebar">
            <Typography className="sidebar-heading">
              DISCOVER
            </Typography>

            {menuItems.map((item) => (
              <Button
                key={item.label}
                className={`menu-button ${
                  item.label === 'Home' ? 'active' : ''
                }`}
                startIcon={item.icon}
                fullWidth
              >
                {item.label}
              </Button>
            ))}

            <Box className="sidebar-note">
              <Typography variant="subtitle2">
                Movie night?
              </Typography>
              <Typography variant="body2">
                Find something worth watching.
              </Typography>
            </Box>
          </Box>

          <Box component="main" className="main-content">
            <Box className="section-heading">
              <Box>
                <Typography variant="h5">
                  Trending now
                </Typography>
                <Typography className="section-subtitle">
                  Popular picks to explore
                </Typography>
              </Box>

              {/* Popular Movies section */}
<Box sx={{ mt: 5 }}>
  <Typography variant="h5" sx={{ mb: 2 }}>
    Popular Movies
  </Typography>

  <Box className="movie-grid">
    {popularMovies.slice(0, 4).map((movie) => (
      <Card className="movie-card" key={movie.id}>
        {movie.poster_path ? (
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || 'Movie poster'}
            className="movie-poster"
          />
        ) : null}
        <CardContent>
          <Typography variant="subtitle1">
            {movie.title || 'Untitled'}
          </Typography>
          <Typography className="movie-caption">
            ⭐ {Number(movie.vote_average || 0).toFixed(1)} / 10
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
</Box>

{/* Popular TV Shows section */}
<Box sx={{ mt: 5 }}>
  <Typography variant="h5" sx={{ mb: 2 }}>
    Popular TV Shows
  </Typography>

  <Box className="movie-grid">
    {popularTV.slice(0, 4).map((show) => (
      <Card className="movie-card" key={show.id}>
        {show.poster_path ? (
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name || 'TV show poster'}
            className="movie-poster"
          />
        ) : null}
        <CardContent>
          <Typography variant="subtitle1">
            {show.name || 'Untitled'}
          </Typography>
          <Typography className="movie-caption">
            ⭐ {Number(show.vote_average || 0).toFixed(1)} / 10
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
</Box>

              <Typography className="section-label">
                DISCOVER
              </Typography>
            </Box>

           {showWatchlist && (
  <Typography className="section-subtitle">
    Your Watchlist — {watchlist.length} saved
  </Typography>
)}
<Box className="movie-grid">
  {loading && (
    <Typography>Loading movies...</Typography>
  )}

  {error && (
    <Typography color="error">{error}</Typography>
  )}

  {!loading && (!error || showWatchlist) &&
(showWatchlist ? watchlist : movies).map((movie) => (
    <Card
  className="movie-card"
  key={movie.id}
  onClick={() => {
    setSelectedMovie(movie);
    setDetails(null);
    setDetailsLoading(true);

    
fetch(
  `http://localhost:5000/api/${
    movie.media_type === 'tv' ||
    (!movie.title && movie.name)
      ? 'tv'
      : 'movie'
  }/${movie.id}`
)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load movie details');
        }
        return response.json();
      })
      .then((data) => setDetails(data))
      .catch((error) => {
        console.error(error);
        setDetails({ error: 'Could not load details. Please try again.' });
      })
      .finally(() => setDetailsLoading(false));
  }}>
      {movie.poster_path ? (
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || 'Movie poster'}
          className="movie-poster"
        />
      ) : (
        <Box className="poster-placeholder">
          <MovieOutlinedIcon />
        </Box>
      )}

      <CardContent>
        <Typography variant="subtitle1">
  {movie.title || movie.name || 'Untitled'}
</Typography>
         <Typography className="movie-caption">
          Release: {movie.release_date || movie.first_air_date || 'Not available'}
        </Typography>

        <Typography className="movie-caption">
          ⭐ {Number(movie.vote_average || 0).toFixed(1)} / 10
        </Typography>
        
        <Button
  fullWidth
  variant="outlined"
  onClick={(event) => {
    event.stopPropagation();
    toggleWatchlist(movie);
  }}
  sx={{
    mt: 2,
    color: '#55e6cf',
    borderColor: '#55e6cf',
  }}
>
  {isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
</Button>

      </CardContent>
    </Card>
  ))}
</Box>


            <Box className="coming-section">
              <Typography variant="h6">
                Ready to explore?
              </Typography>
              <Typography className="section-subtitle">
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      
      <Dialog
      open={Boolean(selectedMovie)}
      onClose={() => {
        setSelectedMovie(null);
        setDetails(null);
      }}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: '#131c2e',
          color: '#f5f7ff',
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle>
        {selectedMovie?.title || selectedMovie?.name || 'Details'}
        <IconButton
          onClick={() => {
            setSelectedMovie(null);
            setDetails(null);
          }}
          sx={{ float: 'right', color: '#f5f7ff' }}
          aria-label="Close movie details"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {detailsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress sx={{ color: '#55e6cf' }} />
          </Box>
        ) : details?.error ? (
          <Typography color="error">{details.error}</Typography>
        ) : details ? (
          <Box>
            {details.poster_path && (
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title || 'Movie poster'}
                sx={{
                  width: '150px',
                  maxWidth: '100%',
                  borderRadius: '10px',
                  mb: 2,
                }}
              />
            )}

            <Typography sx={{ mb: 2 }}>
              {details.overview || 'No overview is available for this movie.'}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              Release date: {details.release_date || details.first_air_date || 'Not available'}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Rating: ⭐ {Number(details.vote_average || 0).toFixed(1)} / 10
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {details.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    color: '#55e6cf',
                    borderColor: '#55e6cf',
                  }}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Typography>Movie details are not available.</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setSelectedMovie(null);
            setDetails(null);
          }}
          sx={{ color: '#55e6cf' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<CineFindPage />} />
    </Routes>
  );
}

export default App;
