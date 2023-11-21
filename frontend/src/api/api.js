import axios from 'axios';

const BDD_URL = 'http://localhost:3000';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(BDD_URL + "/popularmovies");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async(id) => {
  if(!id) return;
  try {
    const response = await axios.get(BDD_URL+"/movie/"+id,)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}