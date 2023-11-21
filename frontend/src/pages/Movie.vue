<template>
    <el-main>
        <el-row v-if="!loading" class="film-globalinfo">
            <el-col :span="12" class="img-button">
                <img class="img-poster" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
            </el-col>
            <el-col :span="12" class="info">
                <el-row>{{ movie.title }}</el-row>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';


const store = useStore();
const route = useRoute();
onMounted( () => {
    const movieId = route.params.id;
    store.dispatch('getMovie', movieId);
});

const movie = computed(() => store.getters.movie);
const loading = computed(() => store.getters.loading);



const getImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseUrl}${path}` : '';
};
</script>

<style scoped>
.img-poster{
    height: 75vh;
}

</style>