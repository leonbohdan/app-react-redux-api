import React from 'react';
import './SearchMovies.scss';
import PropTypes from 'prop-types';
import CN from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../redux/store';
import { History } from '../../components/History';

export const SearchMovies = ({
  searchMovies,
  notFound,
  setNotFound
}) => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectors.getSearchTitle);
  const currentPage = useSelector(selectors.getCurrentPage);

  return (
    <div className="header">
      <form
        className="finder__form"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(actions.setHistory(searchTitle));
          searchMovies(searchTitle, currentPage);
          dispatch(actions.setCurrentPage(1));
        }}
        autoComplete="off"
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

        <div className="header__field">
          <div className="header__control">
            <button
              type="submit" className="header__button is-light"
            >
              Find movies
            </button>

            <History />
          </div>
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
