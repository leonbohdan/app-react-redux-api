const URL_API = 'https://www.omdbapi.com/';

export function getMovies(title, page) {
  return fetch(
    `${URL_API}?apikey=d905f6c1&s=${title}&page=${page}`
  )
    .then(response => response.json())
}

export function getDetails(title) {
  return fetch(`${URL_API}?apikey=d905f6c1&t=${title}`)
    .then(response => response.json());
}
