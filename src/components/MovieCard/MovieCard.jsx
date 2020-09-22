import React, { useState } from 'react';
import './MovieCard.scss';
import CN from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/store';

export const MovieCard = ({
  Title,
  Description,
  Poster,
  imdbUrl,
  imdbID,
  handleSelect,
}) => {
  const [details, setDetails] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div
        className={CN("card__container", {
          "is-flipped": details,
        })}
      >
        <figure className="card__face card__face--front ">
          <img src={Poster} alt="Film logo" className="card__image" />
        </figure>

        <div className="card__face card__face--back ">
          <div className="media-content">
            <>
              <p className="title">{Title}</p>
              <p className="title">{`imdbID: ${imdbID}`}</p>
            </>
          </div>

          <div className="content">
            {Description}
            <br />
            <a href={`https://www.imdb.com/title/${imdbID}`}>IMDB</a>
          </div>
        </div>
      </div>

      <div className="card__content">
        <div className="card__content--buttons">
          <button
            type="button"
            className="card__content--button"
            onClick={() => {
              setDetails(!details);
              handleSelect(Title);
            }}
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
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string,
  imgUrl: PropTypes.string,
  imdbUrl: PropTypes.string,
};
