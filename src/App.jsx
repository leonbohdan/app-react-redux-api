import React, { useState, useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from './redux/store';

import { defaultMovies } from './api/api';
import { MoviesList } from './components/MoviesList'
import { FindMovie } from './components/FindMovie';
import { FilterMovie } from './components/FilterMovie';
import { Loader } from './components/Loader';
import { Pagination } from "./components/Pagination";

export const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectors.getMovies);
  const loading = useSelector(selectors.getLoading);
  const currentPage = useSelector(selectors.getCurrentPage);
  const moviesPerPage = useSelector(selectors.getMoviesPerPage);
  const totalMovies = useSelector(selectors.getTotalMovies);

  useEffect(() => {
    const fetchMovies = async() => {
      dispatch(actions.setMovies(defaultMovies));
      dispatch(actions.setLoading(false));
    }

    fetchMovies();
  }, []);

  const filterMovies = (query) => {
    const action = actions.filterMovies(query);
    dispatch(action);
  };

  const addMovie = (newMovie) => {
    if (movies.some((movie) =>
      movie.imdbId === newMovie.imdbId
    )) {
      return;
    }

    dispatch(actions.addMovie(newMovie));
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = pageNumber => dispatch(
    actions.setCurrentPage(pageNumber)
  );

  return (
    <>
      <FilterMovie filterMovies={filterMovies} />

      <div className="page">
        <div className="page__content">
          {loading ? (
            <Loader />
          ) : (
            <MoviesList movies={currentMovies} />
            )}
          <div className="page__pagination">
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={totalMovies}
              paginate={paginate}
            />
          </div>
        </div>

        <div className="page__sidebar">
          <FindMovie addMovie={addMovie} />
        </div>
      </div>
    </>
  );
};
