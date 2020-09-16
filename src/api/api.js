const URL_API = 'https://www.omdbapi.com/';

// const defaultValues = ['a', 'f', 'd', 'x', 'o', 'p', 'r'];

export function getMovie(title) {
  return fetch(`${URL_API}?apikey=d905f6c1&t=${title}`)
    .then(response => response.json());
}

// export function getDefaultMovie(defaultValues) {
//   const movies = defaultValues.map(movieName => {
//     return fetch(`${URL_API}?apikey=d905f6c1&t=${movieName}`)
//       .then((response) => response.json(),
//     );
//   });

//   return movies;
// }
