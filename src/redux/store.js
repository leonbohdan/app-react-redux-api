import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const intialState = {
  movies: [],
  loading: true,
  currentPage: 1,
  moviesPerPage: 5,
  totalMovies: 0,
};

export const selectors = {
  getMovies: state => state.movies,
  getLoading: state => state.loading,
  getCurrentPage: state => state.currentPage,
  getMoviesPerPage: state => state.moviesPerPage,
  getTotalMovies: state => state.totalMovies,
}

const SET_MOVIES = 'SET_MOVIES';
const ADD_MOVIE = 'ADD_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';
const FILTER_MOVIES = 'FILTER_MOVIES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_LOADING = 'SET_LOADING';

export const actions = {
  setMovies: (movies) => ({
    type: SET_MOVIES,
    movies,
  }),

  addMovie: (movie) => ({
    type: ADD_MOVIE,
    movie,
  }),

  deleteMovie: (imdbId) => ({
    type: DELETE_MOVIE,
    imdbId,
  }),

  filterMovies: (query) => ({
    type: FILTER_MOVIES,
    query,
  }),

  setCurrentPage: (pageNumber) => ({
    type: SET_CURRENT_PAGE,
    pageNumber,
  }),

  setLoading: (payload) => ({
    type: SET_LOADING,
    payload,
  }),
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        totalMovies: action.movies.length,
      };

    case ADD_MOVIE:
      return {
        ...state,
        movies: [action.movie, ...state.movies],
        totalMovies: state.totalMovies += 1,
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies
          .filter(movie => movie.imdbId !== action.imdbId),
        totalMovies: state.totalMovies -= 1,
      };

    case FILTER_MOVIES:
      return {
        ...state,
        movies: state.movies
          .filter(movie => (movie.title.toLowerCase()
            .includes(action.query)
          || movie.description.toLowerCase()
            .includes(action.query)
        )),
      };
    
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

    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;