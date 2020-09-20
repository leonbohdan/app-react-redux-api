import React, { useState, useEffect } from 'react';
import './FindMovie.scss';
import PropTypes from 'prop-types';
import CN from 'classnames';
import { MovieCard } from '../MovieCard';
import { Loader } from '../Loader';
// import { useDispatch } from 'react-redux';
// import { addMovies } from '../../redux/store';

import { getMovie } from '../../api/api';

export const FindMovie = ({ addMovie }) => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [foundMovie, setFoundMovie] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [canAddMovie, setCanAddMovie] = useState(false);

  // useEffect(() => {
    // setLoading(false);
    // searchMovie(searchTitle);
  // }, [loading]);

  const searchMovie = async (title) => {
    setLoading(true);
    const movie = await getMovie(title);

    if (movie.Response === 'False') {
      setLoading(false);
      setNotFound(true);
      setShowPreview(false);
      setCanAddMovie(false);
      return;
    }

    setFoundMovie({
      title: movie.Title,
      description: movie.Plot,
      imgUrl: movie.Poster,
      imdbUrl: `https://www.imdb.com/title/${movie.imdbID}`,
      imdbId: movie.imdbID,
    });
    
    setLoading(false);
    setNotFound(false);
    setShowPreview(true);
    setCanAddMovie(true);
  };

  return (
    <div className="finder">
      <form
        className="finder__form"
        onSubmit={(event) => {
          event.preventDefault();
          searchMovie(searchTitle);
        }}
        autoComplete="off"
      >
        <div className="finder__field">
          <label
            className="finder__label"
            htmlFor="movie-title"
          >
            Movie title
          </label>

          <div className="finder__control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search..."
              className={CN({
                finder__input: true,
                "finder__input--is-danger": notFound,
              })}
              value={searchTitle}
              onChange={(event) => {
                setSearchTitle(event.target.value);
                setNotFound(false);
              }}
            />
          </div>

          {notFound && (
            <p className="finder__help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="finder__field finder__field--is-grouped">
          <div className="finder__control">
            <button
              type="submit"
              className="finder__button is-light"
            >
              Find a movie
            </button>
          </div>

          <div className="finder__control">
            <button
              type="button"
              className="finder__button is-primary"
              disabled={!canAddMovie}
              onClick={() => {
                addMovie(foundMovie);
                setLoading(false);
                setShowPreview(false);
                setCanAddMovie(false);
                setSearchTitle('');
              }}
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      {showPreview && (
        <div className="container">
          <h2 className="container__title">Preview</h2>
            {loading ? (
              <Loader />
            ) : (
              <MovieCard {...foundMovie} />
            )}
        </div>
      )}
    </div>
  );
};

FindMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
