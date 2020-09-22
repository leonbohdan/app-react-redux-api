import React from 'react';
import './History.scss';
import { useSelector } from 'react-redux';
import { selectors } from '../../redux/store';

export const History = () => {
  const history = useSelector(selectors.getHistory);

  return (
    <div className="history">
      {history.map((query, i) => (
        <div
          key={i}
          className="history__query"
        >
          {`${query} >`}
        </div>
      ))}
    </div>
  );
}
