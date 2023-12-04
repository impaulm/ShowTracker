<template>
    <el-row justify="center">
        <h2>WatchList - Film</h2>
    </el-row>
    <el-row>
        <el-col :span="8">
            <h3>A voir</h3>
            <div class="movie-container">
                <div v-for="(movie, index) in watchList" :key="index">
                    <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                        <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                    </router-link>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <h3>Vue (s)</h3>
            <div class="movie-container">
                <div v-for="(movie, index) in watchedMovie" :key="index">
                    <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                        <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                    </router-link>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <h3>Aimé (s)</h3>
            <div class="movie-container">
                <div v-for="(movie, index) in likedMovie" :key="index">
                    <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                        <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                    </router-link>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
  

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { io } from 'socket.io-client';

const socket = io('localhost:3000');
const store = useStore();
const user = computed(() => store.getters.user);

socket.on('addwatchlist', (data) => {
      store.dispatch('addMovieToWatchList', data.movie);
});

socket.on('removewatchlist', (data) => {
        console.log("Watchlist", data.filmId);
      store.dispatch('removeMovieFromWatchList', data.filmId);
});

socket.on('addwatched', (data) => {
      store.dispatch('addMovieToWatched', data.movie);
});

socket.on('removewatched', (data) => {
      store.dispatch('removeMovieFromWatched', data.filmId);
});

socket.on('addliked', (data) => {
      store.dispatch('addMovieToLiked', data.movie);
});

socket.on('removeliked', (data) => {
      store.dispatch('removeMovieFromLiked', data.filmId);
});

onMounted(() => {
    store.dispatch('getWatchListMovie', user.value.userID);
    store.dispatch('getWatchedMovie', user.value.userID);
    store.dispatch('getLikedMovie', user.value.userID);
});

const watchList = computed(() => store.getters.watchList);
const watchedMovie = computed(() => store.getters.watchedMovie);
const likedMovie = computed(() => store.getters.likedMovie);

const getImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseUrl}${path}` : '';
};

</script>
<style scoped>
.movie-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(33.33% - 10px), 1fr));
    gap: 10px;
    border: 1px solid black;
    border-radius: 2px;
    margin: 0.5rem;
}

.poster-movie {
    width: 100%;
    max-width: 100%;
    height: auto;
}

h3 {
    text-align: center;
    margin-left: 1rem;
}

</style>