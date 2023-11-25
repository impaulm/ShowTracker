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

export const getTrailersById = async(id) => {
  if(!id) return;
  try {
    const response = await axios.get(BDD_URL+"/movie/"+id+"/videos")
    for (let i = 0; i < response.data.results.length; i++) {
      if (response.data.results[i].type === "Trailer") {
        return response.data.results[i];
      }
      return response.data.results[0];
    }
  } catch (error) {
    console.error(error);
  }
}