import { createStore } from 'vuex';
import { getPopularMovies, getMovieById, getTrailersById, getWatchListMovie, getWatchedMovie } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loadingMovie: true,
        loadingTrailers: true,
        loggedIn: localStorage.getItem('user') !== null,
        user: localStorage.getItem('user') || null,
        trailers: null,
        watchList: [],
        watchedMovie: [],
    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        },
        loggedIn: state => {
            return state.loggedIn;
        },
        user: state => {
            return state.user;
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
        watchList: state => {
            return state.watchList;
        },
        watchedMovie: state => {
            return state.watchedMovie;
        },
    },

    mutations: {
        getPopularMovies (state, popularMovies) {
            state.popularMovies = popularMovies
        },
        login (state, user) {
            state.loggedIn = true;
            state.user = user;
        },
        logout (state) {
            state.loggedIn = false;
            state.user = null;
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
        },

        getWatchListMovie (state, watchList){
            state.watchList = watchList;
        },

        getWatchedMovie (state, watchedMovie){
            state.watchedMovie = watchedMovie;
        },
    },

    actions: {
        login: ({ commit }, user) => {
            localStorage.setItem('user', user);
            commit('login', user);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('user');
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

        async getWatchListMovie ({commit}, userId)
        {
            const response = await getWatchListMovie(userId);
            commit('getWatchListMovie', response)
        },

        async getWatchedMovie ({commit}, userId){
            const response = await getWatchedMovie(userId);
            commit('getWatchedMovie', response)
        },
    }
});