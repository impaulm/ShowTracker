<template>
    <el-row>
        <h2>Film</h2>
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
            <h3>Vue(s)</h3>
            <div class="movie-container">
                <div v-for="(movie, index) in watchedMovie" :key="index">
                    <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                        <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                    </router-link>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <h3>Aimé(s)</h3>
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

const store = useStore();
const user = computed(() => store.getters.user);
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
}

.poster-movie {
    width: 100%;
    max-width: 100%;
    height: auto;
}
</style>