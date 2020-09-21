import React, { useState, useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from './redux/store';

import { MoviesList } from './components/MoviesList'
import { FindMovie } from './components/FindMovie';
import { SearchMovies } from './components/SearchMovies';
// import { Loader } from './components/Loader';
import { Pagination } from "./components/Pagination";
import { getMovies } from './api/api';

export const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectors.getMovies);
  const loading = useSelector(selectors.getLoading);
  const currentPage = useSelector(selectors.getCurrentPage);
  const moviesPerPage = useSelector(selectors.getMoviesPerPage);
  const totalMovies = useSelector(selectors.getTotalMovies);
  const [notFound, setNotFound] = useState(false);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     dispatch(actions.setMovies(movies));
  //     // dispatch(actions.setLoading(false));
  //   }

  //   fetchMovies();
  // }, []);

  const searchMovies = async (title, page) => {
    const movies = await getMovies(title, page);

    dispatch(actions.setLoading(true));
    console.log(movies);
    if (movies.Response === "False") {
      setNotFound(true);
    } else {
      dispatch(actions.setMovies(movies.Search));
      dispatch(actions.setTotalMovies(+movies.totalResults));
      dispatch(actions.setLoading(false));
    }
    dispatch(actions.setLoading(false));
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  console.log(movies);
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = pageNumber => dispatch(
    actions.setCurrentPage(pageNumber)
  );

  return (
    <>
      <SearchMovies
        searchMovies={searchMovies}
        notFound={notFound}
        setNotFound={setNotFound}
      />

      <div className="page">
        <div className="page__content">
          <MoviesList
            movies={currentMovies}
            loading={loading}
          />

          <div className="page__pagination">
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={totalMovies}
              paginate={paginate}
            />
          </div>
        </div>

        <div className="page__sidebar">
          {/* <FindMovie addMovie={addMovie} /> */}
        </div>
      </div>
    </>
  );
};
