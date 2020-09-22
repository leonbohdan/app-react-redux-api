import React from 'react';
import './Description.scss';
import { useSelector} from 'react-redux';
import { selectors } from '../../redux/store';

export const Description = () => {
  const preview = useSelector(selectors.getPreview);

  return (
    <>
    <h2 className="details__header">More details</h2>
    {!(preview === null) ? (
      <div className="details">
        <div>
          <figure className="details__figure">
              <img
                className="details__image"
                src={preview.Poster}
                alt="Film logo"
              />
          </figure>
        </div>

        <div className="details__content">
          <div className="details__media">
            <div className="media-content">
                <p className="details__title">
                  {preview.Title}
                </p>
            </div>
          </div>

          <div className="details__content--bottom">
            <p>
              <strong>Actors: </strong>
              {preview.Actors}
            </p>
            <p>
              <strong>Awards: </strong>
              {preview.Awards}
            </p>
            <p>
              <strong>Country: </strong>
              {preview.Country}
              {` `}
              <strong>Language: </strong>
              {preview.Language}
            </p>
            <p>
              <strong>Director: </strong>
              {preview.Director}
              {` `}
              <strong>Writer: </strong>
              {preview.Writer}
            </p>
            <p>
              <strong>Genre: </strong>
              {preview.Genre}
            </p>
            <p>
              <strong>Production: </strong>
              {preview.Production}
            </p>
            <p>
              <strong>Runtime: </strong>
              {preview.Runtime}
            </p>
            <p>
              <strong>Released: </strong>
              {preview.Released}
            </p>
            <p>
              <strong>imdbRating: </strong>
              {preview.imdbRating}
              {` `}
              <strong>imdbVotes: </strong>
              {preview.imdbVotes}
            </p>
            <p>
              <strong>Description: </strong>
              {preview.Plot}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <p className="details__bottom">
        Click on the movie to show more
      </p>
    )}
  </>
  );
}
