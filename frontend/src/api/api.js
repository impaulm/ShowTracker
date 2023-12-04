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
    const response = await axios.get(BDD_URL+"/movie/"+id)
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

export const getWatchListMovie = async (id) => {
  if (!id) return;
  try {
    const moviesID = await axios.get(BDD_URL + "/watchlist/" + id);

    const response = await Promise.all(
      moviesID.data.map(async (movieId) => {
        const movie = await getMovieById(movieId.filmID);
        return movie;
      })
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getWatchedMovie = async(id) =>  {
  if (!id) return;
  try {
    const moviesID = await axios.get(BDD_URL + "/watched/" + id);
    const response = await Promise.all(
      moviesID.data.map(async (movieId) => {
        const movie = await getMovieById(movieId.filmID);
        return movie;
      })
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const getLikedMovie = async(id) =>  {
  if (!id) return;
  try {
    const moviesID = await axios.get(BDD_URL + "/liked/" + id);
    const response = await Promise.all(
      moviesID.data.map(async (movieId) => {
        const movie = await getMovieById(movieId.filmID);
        return movie;
      })
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const watchList = async(userId, movieId) => {
  if(!userId || !movieId) return;
  try {
      const addorwatchlist = await axios.post(BDD_URL+"/addorupdatewatchlist",{
        userId: userId,
        filmId: movieId,
      });
      return addorwatchlist.data.etat;
  } catch (error) {
    console.log(error);
  }
}

export const watched = async(userId, movieId) => {
  if(!userId || !movieId) return;
  try {
      const addorwatched = await axios.post(BDD_URL+"/addorupdatewatched",{
        userId: userId,
        filmId: movieId,
      });
      return addorwatched.data.etat;
  } catch (error) {
    console.log(error); 
  }
} 

export const liked = async(userId, movieId) => {
  if(!userId || !movieId) return;
  try {
      const addorlike = await axios.post(BDD_URL+"/addorupdateliked",{
        userId: userId,
        filmId: movieId,
      });
      return addorlike.data.etat;
  } catch (error) {
    console.log(error);
  }
}


