<template>
    <el-main>
        <div class="background-image" v-if="!loadingMovie"
            :style="{ backgroundImage: 'url(' + getImageUrl('/original' + movie.backdrop_path) + ')' }">
            <el-row class="film-globalinfo">
                <el-col :span="6" class="poster-img"
                    :style="{ backgroundImage: 'url(' + getImageUrl('/w500' + movie.poster_path) + ')' }"></el-col>
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
                    <el-row v-if="loggedIn">
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
        </div>
        <el-row class="trailer" justify="center">
            <div v-if="!loadingTrailers && trailers">
                <iframe width="896" height="504" :src="getYouTubeEmbedUrl(trailers.key)" frameborder="0"
                    allowfullscreen></iframe>
            </div> 
        </el-row>
    </el-main>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';


const store = useStore();
const route = useRoute();
const router = useRouter();

watch(
  () => router.currentRoute.value.params.id,
  (newMovieId, oldMovieId) => {
    // Charger les données du nouveau film lorsque l'ID du film change
    store.dispatch('getMovie', newMovieId);
    store.dispatch('getTrailers', newMovieId);
  }
);

onMounted(() => {
    const movieId = route.params.id;
    store.dispatch('getMovie', movieId);
    store.dispatch('getTrailers', movieId);
});

const movie = computed(() => store.getters.movie);
const trailers = computed(() => store.getters.trailers);
const loadingMovie = computed(() => store.getters.loadingMovie);
const loadingTrailers = computed(() => store.getters.loadingTrailers);

const loggedIn = computed(() => store.getters.loggedIn);

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
    const baseUrl = 'https://image.tmdb.org/t/p/';
    return path ? `${baseUrl}${path}` : '';
};

const getYouTubeEmbedUrl = (key) => {
    const baseUrl = 'https://www.youtube.com/embed/';
    return key ? `${baseUrl}${key}` : '';
};

</script>

<style scoped>
.background-image {
    height: 67vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.film-globalinfo {
    background-image: linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%);
    padding: 2rem;
    height: 100%;
}

.poster-img {
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.gender-list>*:not(:first-child) {
    margin: 0rem 1rem;
}

.gender-list> :first-child {
    margin-right: 1rem;
}

.movie-info>* {
    margin: 1rem 0;
    padding-left: 1rem;
}

.synopsis {
    padding-top: 2rem;
}

.trailer {
    padding: 2rem;
}
</style>