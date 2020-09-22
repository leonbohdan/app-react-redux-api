import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const selectors = {
  getMovies: (state) => state.movies,
  getSearchTitle: (state) => state.searchTitle,
  getLoading: (state) => state.loading,
  getCurrentPage: (state) => state.currentPage,
  getMoviesPerPage: (state) => state.moviesPerPage,
  getTotalMovies: (state) => state.totalMovies,
  getPreview: (state) => state.preview,
  getHistory: (state) => state.history,
};

const SET_MOVIES = 'SET_MOVIES';
const DELETE_MOVIE = 'DELETE_MOVIE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_LOADING = 'SET_LOADING';
const SET_SEARCH_TITLE = 'SET_SEARCH_TITLE';
const SET_TOTAL_MOVIES = 'SET_TOTAL_MOVIES';
const SET_PREVIEW = 'SET_PREVIEW';
const SET_HISTORY = 'SET_HISTORY';

export const actions = {
  setMovies: (movies) => ({
    type: SET_MOVIES,
    movies,
  }),

  deleteMovie: (imdbID) => ({
    type: DELETE_MOVIE,
    imdbID,
  }),

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

  setPreview: (movieDesc) => ({
    type: SET_PREVIEW,
    movieDesc,
  }),

  setHistory: (query) => ({
    type: SET_HISTORY,
    query,
  }),
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.imdbID !== action.imdbID),
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

    case SET_PREVIEW:
      return {
        ...state,
        preview: action.movieDesc,
      };

    case SET_HISTORY:
      return {
        ...state,
        history: [...state.history, action.query],
      };

    default:
      return state;
  }
};

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("moviesStore");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("moviesStore", serializedState);
  } catch {
    //
  }
};

const intialState = sessionStorage.getItem('moviesStore')
  ? loadState()
  : {
    movies: [],
    searchTitle: '',
    loading: false,
    currentPage: 1,
    moviesPerPage: 10,
    totalMovies: 0,
    preview: null,
    history: [],
};

const store = createStore(reducer, composeWithDevTools());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;