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

export const getSearchedMovie = async () => {
  try {
    const response = await axios.get(BDD_URL + "/searchedmovies");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};