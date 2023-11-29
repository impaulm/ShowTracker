import { createStore } from 'vuex';
import { getPopularMovies, getMovieById, getTrailersById } from '../api/api';
import { getSearchedMovie } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loadingMovie: true,
        loadingTrailers: true,
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',
        trailers: null,        
        searchedMovies: [],

    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        },
        searchedMovies: state => {
            console.log(state.searchedMovies);
            return state.searchedMovies;
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
        getSearchedMovies (state, searchedMovies) {
            state.searchedMovies = searchedMovies
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
        async loadPopularMovies ({ commit }) {
            const response = await getPopularMovie();
            commit('getPopularMovies', response.results)
        },
        async loadSearchedMovies ({ commit }, searchedMovies) {
            const response = await getSearchedMovie(searchedMovies);
            commit('getSearchedMovies', response)
        },
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