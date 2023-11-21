import { createStore } from 'vuex';
import { getPopularMovies, getMovieById } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loading: true,
    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        },

        loading: state => {
            return state.loading;
        },

        movie: state => {
            return state.movie;
        },
    },

    mutations: {
        getPopularMovies (state, popularMovies) {
            state.popularMovies = popularMovies
        },

        getMovie (state, movie) {
            state.movie = movie
            state.loading = false
        },

        setLoading (state, loading) {
            state.loading = loading
        },
    },

    actions: {
        async loadPopularMovies ({ commit }) {
            const response = await getPopularMovies();
            commit('getPopularMovies', response.results)
        },

        async getMovie ({ commit }, movieId) {
            commit('setLoading',true)
            const response = await getMovieById(movieId);
            commit('getMovie', response)
        },
    }
});