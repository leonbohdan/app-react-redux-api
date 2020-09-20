import React, { useState, useEffect } from 'react';
import './FilterMovie.scss';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/store';

export const FilterMovie = ({ filterMovies }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const action = actions.filterMovies(query);
    dispatch(action);
  }, [query]);

  // useEffect(() => {
  //   filterMovies(query);
  // }, [query]);

  return (
    <div className="header">
        <div className="header__menu">
          <label
            htmlFor="search-query"
            className="header__label"
          >
            Search movie {query}
          </label>

          <div className="header__control">
            <input
              type="text"
              id="search-query"
              className="header__input"
              placeholder="Search..."
              autoComplete="off"
              value={query}
              onChange={(event) => {setQuery(event.target.value)}}
            />
          </div>
        </div>
      </div>
  );
}
