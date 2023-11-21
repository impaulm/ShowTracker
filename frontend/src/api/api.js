import axios from 'axios';
const BDD_URL = 'http://localhost:3000/api/'

export const getPopularMovie = async () => {
  try {
    const response = await axios.get(BDD_URL+"/popularmovie");
    return response.data; 
  } catch (error) {
    console.error(error);
  }
}

