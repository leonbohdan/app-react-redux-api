import React from 'react';
import './MoviesList.scss';
import PropTypes from 'prop-types';
import { MovieCard } from '../MovieCard';
import { Loader } from '../Loader';
import { getDetails } from '../../api/api';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/store';

export const MoviesList = ({
  movies,
  loading,
}) => {
  const dispatch = useDispatch();

  if (loading) {
    return <Loader />;
  }

  const handleSelect = (movieTitle) => {
    getDetails(movieTitle)
      .then(movie => dispatch(actions.setPreview(movie)));
  }

  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          {...movie}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
