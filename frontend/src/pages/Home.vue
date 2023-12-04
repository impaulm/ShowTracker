<template>
    <div class="container">
        <h1>Bienvenue sur ShowTracker</h1>
        <div class="carousel-container">
            <el-carousel :interval="2000" type="card" height="75vh">
                <el-carousel-item class="carousel-item" v-for="(movie, index) in popularMovies" :key="index">
                    <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                        <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                    </router-link>
                </el-carousel-item>
            </el-carousel>
        </div>  
    </div>
</template>

<style scoped>
.container{
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.carousel-container {
    text-align: center;
}

.carousel-container .carousel-item {
    max-width: 100%;
}

.poster-movie {
    width: 100%;
    height: 100%;
}
</style>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const popularMovies = computed(() => store.getters.popularMovies);
store.dispatch('loadPopularMovies');

const getImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseUrl}${path}` : '';
};
</script>
