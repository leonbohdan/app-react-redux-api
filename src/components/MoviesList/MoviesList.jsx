import React from 'react';

import './MoviesList.scss';
import PropTypes from 'prop-types';
import { MovieCard } from '../MovieCard';
import { Loader } from '../Loader';

export const MoviesList = ({
  movies,
  loading,
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbId} {...movie} />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
