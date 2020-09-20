import React from 'react';
import { useSelector} from 'react-redux';
import { selectors } from '../../redux/store';
import './Pagination.scss';
import CN from 'classnames';

export const Pagination = ({
  moviesPerPage,
  totalMovies,
  paginate
}) => {
  const currentPage = useSelector(selectors.getCurrentPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <nav className="pagination__nav">
        <div className="pagination__pages">
          {pageNumbers.map((page) => (
            <span
              key={page}
              className={CN("pagination__page", {
                "pagination__current-page":
                  currentPage === page,
              })}
              onClick={() => paginate(page)}
            >
              {page}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
};
