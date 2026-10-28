
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

const token = process.env.TMDB_READ_ACCESS_TOKEN;
const apiKey = process.env.TMDB_API_KEY;

async function getFromTMDB(endpoint, params = {}) {
  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (apiKey) {
    url.searchParams.set('api_key', apiKey);
  } else {
    throw new Error('TMDB credentials are missing from .env');
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`TMDB returned status ${response.status}`);
  }

  return response.json();
}

app.get('/api/movies', async (req, res) => {
  try {
    const data = await getFromTMDB('trending/movie/week');
    res.json(data);
  } catch (error) {
    console.error('Movie request failed:', error.message);
    res.status(500).json({
      message: 'Unable to load movies. Check the server and TMDB credentials.',
    });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const query = String(req.query.query || '').trim();

    if (!query) {
      return res.status(400).json({
        message: 'Please enter a movie title to search.',
      });
    }

    const data = await getFromTMDB('search/multi', { query });
    res.json(data);
  } catch (error) {
    console.error('Search request failed:', error.message);
    res.status(500).json({
      message: 'Unable to search right now. Please try again.',
    });
  }
});

app.get('/api/tv', async (req, res) => {
  try {
    const data = await getFromTMDB('trending/tv/week');
    res.json(data);
  } catch (error) {
    console.error('TV request failed:', error.message);
    res.status(500).json({
      message: 'Unable to load TV shows right now.',
    });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const data = await getFromTMDB(`movie/${req.params.id}`);
    res.json(data);
  } catch (error) {
    console.error('Movie details request failed:', error.message);
    res.status(500).json({
      message: 'Unable to load movie details.',
    });
  }
});

app.get('/api/tv/:id', async (req, res) => {
  try {
    const data = await getFromTMDB(`tv/${req.params.id}`);
    res.json(data);
  } catch (error) {
    console.error('TV details request failed:', error.message);
    res.status(500).json({
      message: 'Unable to load TV show details.',
    });
  }
});

app.get('/api/genre/:id', async (req, res) => {
  try {
    const genreId = Number(req.params.id);

    if (!Number.isInteger(genreId) || genreId <= 0) {
      return res.status(400).json({
        message: 'Invalid genre ID.',
      });
    }

    const data = await getFromTMDB('discover/movie', {
      with_genres: String(genreId),
      sort_by: 'popularity.desc',
    });

    res.json(data);
  } catch (error) {
    console.error('Genre filter failed:', error.message);
    res.status(500).json({
      message: 'Unable to filter movies by genre.',
    });
  }
});

app.get('/api/popular-movies', async (req, res) => {
  try {
    const data = await getFromTMDB('movie/popular');
    res.json(data);
  } catch (error) {
    console.error('Popular movies failed:', error.message);
    res.status(500).json({ message: 'Unable to load popular movies.' });
  }
});

app.get('/api/popular-tv', async (req, res) => {
  try {
    const data = await getFromTMDB('tv/popular');
    res.json(data);
  } catch (error) {
    console.error('Popular TV shows failed:', error.message);
    res.status(500).json({ message: 'Unable to load popular TV shows.' });
  }
});

app.get('/', (req, res) => {
  res.send('Ebiwoma_com API is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Ebiwoma_com API server running at http://localhost:${PORT}`);
});
