import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../redux/store';
import './Pagination.scss';
import CN from 'classnames';

export const Pagination = ({
  moviesPerPage,
  totalMovies,
  paginate,
  searchMovies
}) => {
  const currentPage = useSelector(selectors.getCurrentPage);
  const searchTitle = useSelector(selectors.getSearchTitle);
  const pageNumbers = [];
  const pagesCount = Math.ceil(totalMovies / moviesPerPage);

  function createPages(pageNumbers, pagesCount, currentPage) {
    if (pagesCount > 10) {
      if (currentPage > 5) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          pageNumbers.push(i);
          if (i === pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          pageNumbers.push(i);
          if (i === pagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
      }
    }
  }

  createPages(pageNumbers, pagesCount, currentPage);

  return (
    <div className="pagination">
      <nav className="pagination__nav">
        <div className="pagination__pages">
          {pageNumbers.map((page) => (
            <div
              key={page}
              className={CN("pagination__page", {
                "pagination__current-page": currentPage === page,
              })}
              onClick={() => {
                paginate(page);
                searchMovies(searchTitle, page);
              }}
            >
              {page}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
