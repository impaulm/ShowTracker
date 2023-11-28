import { createStore } from 'vuex';
import { getPopularMovies, getMovieById, getTrailersById } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loadingMovie: true,
        loadingTrailers: true,
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',
        trailers: null,
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

        loadingMovie: state => {
            return state.loadingMovie;
        },

        loadingTrailers: state => {
            return state.loadingTrailers;
        },

        movie: state => {
            return state.movie;
        },
        trailers: state => {
            return state.trailers;
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

        setLoadingMovie (state, loadingMovie) {
            state.loadingMovie = loadingMovie
        },

        setLoadingTrailers (state, loadingTrailers) {
            state.loadingTrailers = loadingTrailers
        },

        getMovie (state, movie) {
            state.movie = movie
            state.loadingMovie = false
        },
        
        getTrailers (state, trailers) {
            state.trailers = trailers
            state.loadingTrailers = false
        }
    },

    actions: {
        login: ({ commit }, username) => {
            localStorage.setItem('username', username);
            commit('login', username);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('username');
            commit('logout');
        },

        async loadPopularMovies ({ commit }) {
            const response = await getPopularMovies();
            commit('getPopularMovies', response.results)
        },

        async getMovie ({ commit }, movieId) {
            commit('setLoadingMovie',true);
            const response = await getMovieById(movieId);
            commit('getMovie', response)
        },


        async getTrailers ({ commit }, movieId) {
            commit('setLoadingTrailers',true);
            const response = await getTrailersById(movieId);
            commit('getTrailers', response)
        },
    }
});