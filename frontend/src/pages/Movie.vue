<template>
    <el-main>
        <el-row v-if="!loading" class="film-globalinfo">
            <el-col :span="6" class="img-button">
                <img class="img-poster" :src="getImageUrl(movie.poster_path)" :alt="movie.title">
            </el-col>
            <el-col :span="18" class="movie-info">
                <el-row>
                    <h2>{{ movie.title }} ({{ formatYear(movie.release_date) }})</h2>
                </el-row>
                <el-row class="movie-time">
                    <el-tag type="sucess" class="movie-duration">{{ formatDuration(movie.runtime) }}</el-tag>
                </el-row>
                <el-row class="gender-list">
                    <el-tag type="info" v-for="(genre, index) in movie.genres" :key="index">{{ genre.name }}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="warning" plain>
                        <el-icon :size="30">
                            <CollectionTag />
                        </el-icon>
                        Ajouter à la WatchList
                    </el-button>
                    <el-button type="success" plain>
                        <el-icon :size="30">
                            <CircleCheck />
                        </el-icon>
                    </el-button>
                </el-row>
                <el-row class="synopsis">
                    <el-col :span="15">
                        {{ movie.overview }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
    </el-main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';


const store = useStore();
const route = useRoute();
onMounted(() => {
    const movieId = route.params.id;
    store.dispatch('getMovie', movieId);
});

const movie = computed(() => store.getters.movie);
const loading = computed(() => store.getters.loading);

const formatYear = (value) => {
    const date = new Date(value);
    return date.getFullYear();
};

const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}h ${formattedMinutes}m`;
};


const getImageUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return path ? `${baseUrl}${path}` : '';
};
</script>

<style scoped>
.img-poster {
    height: 66vh;
}

.gender-list>*:not(:first-child) {
    margin: 0rem 1rem;
}

.gender-list> :first-child {
    margin-right: 1rem;
}

.movie-info>* {
    margin: 1rem 0;

}

.synopsis {
    padding-top: 2rem;
}
</style>