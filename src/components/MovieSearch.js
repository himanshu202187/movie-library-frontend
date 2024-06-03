import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'd637ce25';

  const searchMovie = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
      setMovie(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      setMovie(null);
    }
  };

  return (
    <div>
      <h1>OMDB Movie Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={searchMovie}>Search</button>

      {error && <p>{error}</p>}

      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <p>{movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
