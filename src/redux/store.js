import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const intialState = {
  movies: [],
  searchTitle: '',
  loading: false,
  currentPage: 1,
  moviesPerPage: 10,
  totalMovies: 0,
  history: [],
};

export const selectors = {
  getMovies: state => state.movies,
  getSearchTitle: state => state.searchTitle,  getLoading: state => state.loading,
  getCurrentPage: state => state.currentPage,
  getMoviesPerPage: state => state.moviesPerPage,
  getTotalMovies: state => state.totalMovies,
}

const SET_MOVIES = 'SET_MOVIES';
const ADD_MOVIE = 'ADD_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';
// const FILTER_MOVIES = 'FILTER_MOVIES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_LOADING = 'SET_LOADING';
const SET_SEARCH_TITLE = 'SET_SEARCH_TITLE';
const SET_TOTAL_MOVIES = 'SET_TOTAL_MOVIES';

export const actions = {
  setMovies: (movies) => ({
    type: SET_MOVIES,
    movies,
  }),

  // addMovie: (movie) => ({
  //   type: ADD_MOVIE,
  //   movie,
  // }),

  // deleteMovie: (imdbId) => ({
  //   type: DELETE_MOVIE,
  //   imdbId,
  // }),

  // filterMovies: (query) => ({
  //   type: FILTER_MOVIES,
  //   query,
  // }),

  setCurrentPage: (pageNumber) => ({
    type: SET_CURRENT_PAGE,
    pageNumber,
  }),

  setLoading: (payload) => ({
    type: SET_LOADING,
    payload,
  }),

  setSearchTitle: (query) => ({
    type: SET_SEARCH_TITLE,
    query,
  }),

  setTotalMovies: (totalMovies) => ({
    type: SET_TOTAL_MOVIES,
    totalMovies,
  }),
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        // totalMovies: action.movies.totalResults,
      };

    case ADD_MOVIE:
      return {
        ...state,
        movies: [action.movie, ...state.movies],
        // totalMovies: (state.totalMovies += 1),
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.imdbID !== action.imdbID),
        // totalMovies: (state.totalMovies -= 1),
      };

    // case FILTER_MOVIES:
    //   return {
    //     ...state,
    //     movies: state.movies.filter(
    //       (movie) =>
    //         movie.title.toLowerCase().includes(action.query) ||
    //         movie.description.toLowerCase().includes(action.query),
    //     ),
    //   };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_SEARCH_TITLE:
      return {
        ...state,
        searchTitle: action.query,
      };

    case SET_TOTAL_MOVIES:
      return {
        ...state,
        totalMovies: action.totalMovies,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

function setSessionStorage(intialState) {
  return store.subscribe(() => {sessionStorage
  .setItem('moviesStore', JSON.stringify(intialState)
  )})
}

setSessionStorage(intialState);

export default store;