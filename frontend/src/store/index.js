import { createStore } from 'vuex';
import { getPopularMovies, getMovieById } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loading: true,
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',

    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        },
        loggedIn: state => {
            return state.loggedIn;
        },
        username: state => {
            return state.username;
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
        login (state, username) {
            state.loggedIn = true;
            state.username = username;
        },
        logout (state) {
            state.loggedIn = false;
            state.username = '';
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
        login: ({ commit }, username) => {
            localStorage.setItem('username', username);
            commit('login', username);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('username');
            commit('logout');
        },

        async getMovie ({ commit }, movieId) {
            commit('setLoading',true)
            const response = await getMovieById(movieId);
            commit('getMovie', response)
        },
    }
});