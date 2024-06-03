import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`/api/movies/search?query=${query}`);
      setMovies(res.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/movies/list', {
        headers: { 'x-auth-token': token }
      });
      setLists(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToList = async (movie) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/movies/list', {
        name: listName,
        movies: [movie],
        isPublic
      }, {
        headers: { 'x-auth-token': token }
      });
      fetchLists();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <h1>Movie Library</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button onClick={fetchMovies}>Search</button>

      <div>
        <h2>Search Results</h2>
        {movies && movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
                <button onClick={() => addToList(movie)}>Add to List</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Create New List</h2>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="List Name"
        />
        <label>
          Public
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
        <button onClick={() => addToList({})}>Create List</button>
      </div>

      <div>
        <h2>Your Lists</h2>
        {lists && lists.length > 0 && (
          <ul>
            {lists.map((list) => (
              <li key={list._id}>
                <h3>{list.name}</h3>
                <ul>
                  {list.movies.map((movie, index) => (
                    <li key={index}>{movie.Title} ({movie.Year})</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
