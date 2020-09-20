import data from './movies.json';

const URL_API = 'https://www.omdbapi.com/';

export function getMovie(title) {
  return fetch(`${URL_API}?apikey=d905f6c1&t=${title}`)
    .then(response => response.json());
}

export const defaultMovies = data;

console.log(defaultMovies);
