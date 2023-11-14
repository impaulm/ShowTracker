import { TMDB_API_KEY } from '../../env.js';
const TMDB_URL = 'https://api.themoviedb.org/3/'

export const getPopularMovie = async () => {
    try {
        let response = await fetch(TMDB_URL+"/movie/popular?language=fr-FR&page=1", {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '+TMDB_API_KEY
            }
          })
        .then(response => response.json())
        return response;

    } catch (error) {
        console.log(error);
    }
};
