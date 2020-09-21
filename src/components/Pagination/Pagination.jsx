import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from '../../redux/store';
import './Pagination.scss';
import CN from 'classnames';

export const Pagination = ({
  moviesPerPage,
  totalMovies,
  paginate
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectors.getCurrentPage);
  const pageNumbers = [];
  const pagesCount = Math.ceil(totalMovies / moviesPerPage);

  // for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
  //   pageNumbers.push(i);
  // }

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
            <span
              key={page}
              className={CN("pagination__page", {
                "pagination__current-page":
                  currentPage === page,
              })}
              onClick={() => {
                paginate(page);
                // dispatch(actions.setCurrentPage(page));
              }}
            >
              {page}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
};
