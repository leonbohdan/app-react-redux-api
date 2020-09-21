import React, { useState } from 'react';
import './MovieCard.scss';
import CN from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actions } from "../../redux/store";
// import { getMovie } from '../../api/api'

export const MovieCard = ({
  Title,
  Description = '',
  Poster,
  imdbUrl,
  imdbID,
}) => {
  const [details, setDetails] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className={CN('card__container', {
        'is-flipped': details,
      })}>
        <figure className="card__face card__face--front ">
          <img
            src={Poster}
            alt="Film logo"
            className="card__image"
          />
        </figure>

        <div className="card__face card__face--back ">
          <div className="media-content">
            <p className="title">{Title}</p>
          </div>

          <div className="content">
            {Description}
            <br />
            <a href={imdbUrl}>IMDB</a>
          </div>
        </div>
      </div>
      
      <div className="card__content">
        <div className="card__content--buttons">
          <button
            type="button"
            className="card__content--button"
            onClick={() => {setDetails(!details)}}
          >
            Show more
          </button>

          <button
            type="button"
            className="card__content--button"
            onClick={() => {
              dispatch(actions.deleteMovie(imdbID));
            }}
          >
            Delete film
          </button>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imdbUrl: PropTypes.string.isRequired,
};
