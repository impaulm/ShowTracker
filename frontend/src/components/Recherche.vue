<template>
  <div class="search-container">
    <input v-model="searchTerm" @input="handleSearch" placeholder="Rechercher un film">
      <ul class="search-results">
        <li v-for="(movie, index) in searchResults" :key="index" @click="selectMovie(movie)">
          {{ movie.title }}
        </li>
      </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchTerm = ref('');
const handleSearch = () => {
  if (searchTerm.value.trim().length >= 3) {
    // console.log('Recherche de films pour:', searchTerm.value.trim());
    store.dispatch('loadSearchedMovies', searchTerm.value.trim());
  } 
};
let searchResults = computed(() => store.getters.searchedMovies);
console.log(searchResults);

const selectMovie = (movie) => {
  // Action à réaliser lors de la sélection d'un film, par exemple, ajouter à une liste de favoris, etc.
  console.log('Film sélectionné:', movie);
  searchTerm.value = ''; // Effacer le terme de recherche une fois que le film est sélectionné
  searchResults = []; // Effacer les résultats de la recherche
};
</script>

<style>
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




<!-- Barre de recherche proposant des films dont le titre correspond au texte saisi par l'utilisateur. Les titres de films proviennent de l'API TMDB

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
import { computed } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const movieResults = computed(() => store.getters.searchedMovies);
const fetchMovies = async () => {
  if (searchQuery.value.length > 2) {
    await store.dispatch('searchedMovies', searchQuery.value);
  }
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
</style> -->

