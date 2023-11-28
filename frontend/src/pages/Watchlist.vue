<template>
    <el-row>
        <h2>Film</h2>
    </el-row>
    <el-row>
        <el-col :span="12">
            <h3>A voir</h3>
        </el-col>
        <el-col :span="12">
            <h3>Vue</h3>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div v-for="(movie, index) in watchList" :key="index">
                <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                    <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                </router-link>
            </div>
        </el-col>
        <el-col :span="12">
            <div v-for="(movie, index) in watchedMovie" :key="index">
                <router-link :to="{ name: 'Movie', params: { id: movie.id } }">
                    <img class="poster-movie" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
                </router-link>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

onMounted(() => {
    store.dispatch('getWatchListMovie',);
    store.dispatch('getWatchedMovie',);
});

const watchList = computed(() => store.getters.watchList);
const watchedMovie = computed(() => store.getters.watchedMovie);

const getImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseUrl}${path}` : '';
};

</script>

<style scoped></style>