import React, { useState, useEffect } from 'react';
import './SearchMovies.scss';
import PropTypes from 'prop-types';
import CN from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../redux/store';

export const SearchMovies = ({
  searchMovies,
  notFound,
  setNotFound
}) => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectors.getSearchTitle);

  return (
    <div className="header">
      <form
        className="finder__form"
        onSubmit={(event) => {
          event.preventDefault();
          searchMovies(searchTitle, 1);
          dispatch(actions.setSearchTitle(""));
          // dispatch(actions.setCurrentPage(1));
        }}
        // autoComplete="off"
      >
        <div className="header__field">
          <label className="header__label" htmlFor="movie-title">
            Movies searching
          </label>

          <div className="header__control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search..."
              className={CN({
                header__input: true,
                "header__input--is-danger": notFound,
              })}
              value={searchTitle}
              onChange={(event) => {
                dispatch(actions.setSearchTitle(event.target.value));
                setNotFound(false);
              }}
            />
          </div>

          {notFound && (
            <p className="header__help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="header__field header__field--is-grouped">
          <div className="header__control">
            <button type="submit" className="header__button is-light">
              Find movies
            </button>
          </div>

          {/* <div className="header__control">
            <button
              type="button"
              className="header__button is-primary"
              disabled={!canAddMovie}
              onClick={() => {
                // addMovie(foundMovie);
                setLoading(false);
                setShowPreview(false);
                setCanAddMovie(false);
                dispatch(actions.setSearchTitle(''));
              }}
            >
              Add to the list
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

SearchMovies.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  notFound: PropTypes.bool.isRequired,
  setNotFound: PropTypes.func.isRequired,
};
