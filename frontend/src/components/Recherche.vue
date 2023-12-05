<template>
  <div class="search-container">
    <input v-model="searchTerm" @input="handleSearch" @click="showResults" placeholder="Rechercher un film" />
    <ul class="search-results">
      <li v-for="(movie, index) in searchResults" :key="index" @click="selectMovie(movie)">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const searchTerm = ref('');
const router = useRouter();
const handleSearch = () => {
  if (searchTerm.value.trim().length >= 0) {
    console.log('Recherche de films pour:', searchTerm.value.trim());
    store.dispatch('loadSearchedMovies', searchTerm.value.trim());
  }
};
let searchResults = computed(() => store.getters.searchedMovies);



const selectMovie = (movie) => {
  // Action à réaliser lors de la sélection d'un film, par exemple, ajouter à une liste de favoris, etc.
  console.log('Film sélectionné:', movie.id, movie.title);

  searchTerm.value = '';

  store.commit('clearSearchedMovies');

  router.push({ name: 'Movie', params: { id: movie.id } });
};

onBeforeMount(() => {
  searchResults.value = [];
  // store.commit('setClearSearchedMovies', []);
});

</script>

<style>
.search-container {
  position: relative;
  margin: 20px;
}

.search-container input {
  padding: 0.5rem 1rem;
  border: 2px solid gray;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
}

/* Mise en valeur lors du focus */
.search-container input:hover {
  border-color: #00bcd4;
  /* Couleur de mise en valeur */
}

/* Mise en valeur lors du focus */
.search-container input:focus {
  border-color: #00bcd4;
  /* Couleur de mise en valeur */
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
  width: 400px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  color: black;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 3;
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

