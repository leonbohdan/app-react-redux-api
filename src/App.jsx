import React, { useState } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from './redux/store';
import { MoviesList } from './components/MoviesList'
import { Description } from './components/Description';
import { SearchMovies } from './components/SearchMovies';
import { Pagination } from './components/Pagination';
import { getMovies } from './api/api';

export const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectors.getMovies);
  const loading = useSelector(selectors.getLoading);
  const moviesPerPage = useSelector(selectors.getMoviesPerPage);
  const totalMovies = useSelector(selectors.getTotalMovies);
  const [notFound, setNotFound] = useState(false);

  const searchMovies = async (title, page) => {
    const movies = await getMovies(title, page);

    dispatch(actions.setLoading(true));

    if (movies.Response === "False") {
      setNotFound(true);
    } else {
      dispatch(actions.setMovies(movies.Search));
      dispatch(actions.setTotalMovies(+movies.totalResults));
      dispatch(actions.setLoading(false));
    }

    dispatch(actions.setLoading(false));
  };

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
            movies={movies}
            loading={loading}
          />

          <div className="page__pagination">
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={totalMovies}
              paginate={paginate}
              searchMovies={searchMovies}
            />
          </div>
        </div>

        <div className="page__sidebar">
          <Description />
        </div>
      </div>
    </>
  );
};
