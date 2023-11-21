<template>
    <div class="carousel-container">
        <el-carousel :interval="2000" type="card" height="750px">
            <el-carousel-item v-for="(movie, index) in popularMovies" :key="index">
                <router-link :to="{ name: 'Movie', params: { id: movie.id }}">
                    <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
.carousel-container {
    text-align: center;
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
