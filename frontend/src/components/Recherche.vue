<!-- Barre de recherche proposant des films dont le titre correspond au texte saisi par l'utilisateur. Les titres de films proviennent de l'API TMDB -->

<template>
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="fetchMovies"
        placeholder="Rechercher un film..."
        class="search-input"
      />
      <ul v-if="movieResults.length" class="search-results">
        <li v-for="movie in movieResults" :key="movie.id">{{ movie.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        movieResults: [],
      };
    },
    methods: {
      async fetchMovies() {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: TMDB_API_KEY, // Remplacez par votre clé API TMDB
              query: this.searchQuery,
            },
          });
  
          this.movieResults = response.data.results;
        } catch (error) {
          console.error('Erreur lors de la récupération des films', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style pour le composant RechercheFilm */
  .search-container {
    position: relative;
    margin: 20px;
  }
  
  .search-input {
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  .search-results {
    list-style: none;
    padding: 0;
    margin: 5px 0 0;
    width: 300px;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .search-results li {
    padding: 10px;
    cursor: pointer;
  }
  
  .search-results li:hover {
    background-color: #f0f0f0;
  }
  </style>