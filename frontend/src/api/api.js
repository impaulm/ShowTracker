import axios from 'axios';

const BDD_URL = 'http://localhost:3000';

export const getPopularMovie = async () => {
  try {
    const response = await axios.get(BDD_URL + "/popularmovies");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchedMovie = async (searchedMovies) => {
  try {
    const response = await axios.get(BDD_URL + "/searchedmovies", {
      params: {
        query: searchedMovies
      }
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};