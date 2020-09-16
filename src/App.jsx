import React, { useState } from 'react';
import './App.scss';

import data from './api/movies.json';
import { MoviesList } from './components/MoviesList'
import { FindMovie } from './components/FindMovie';

export const App = () => {
  const [movies, setMovies] = useState(data);

  const addToList = (newMovie) => {
    if (movies.some((movie) => movie.imdbId === newMovie.imdbId)) {
      return;
    }

    setMovies([...movies, newMovie]);
  };

  return (
    <>
      <div className="header">
        <div className="header__menu">
          <label
            htmlFor="search-query"
            className="header__label"
          >
            Search movie
          </label>

          <div className="header__control">
            <input
              type="text"
              id="search-query"
              className="header__input"
              placeholder="Search..."
              // value={this.state.query}
              // onChange={this.filterMovies}
            />
          </div>
        </div>
      </div>

      <div className="page">
        <div className="page__content">
          <MoviesList movies={movies} />
        </div>
        <div className="page__sidebar">
          <FindMovie addMovie={addToList} />
        </div>
      </div>
    </>
  );
};
