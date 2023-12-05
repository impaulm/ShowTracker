import { createStore } from 'vuex';
import { getPopularMovies, getMovieById, getTrailersById, getWatchListMovie, getWatchedMovie, getLikedMovie } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        movie: null,
        loadingMovie: true,
        loadingTrailers: true,
        loggedIn: localStorage.getItem('user') !== null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        trailers: null,
        watchList: [],
        watchedMovie: [],
        likedMovie: [],
        
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
        likedMovie: state => {
            return state.likedMovie;
        },
    },

    mutations: {
        getPopularMovies(state, popularMovies) {
            state.popularMovies = popularMovies
        },
        login(state, user) {
            state.loggedIn = true;
            state.user = user;
        },
        logout(state) {
            state.loggedIn = false;
            state.user = null;
        },

        setLoadingMovie(state, loadingMovie) {
            state.loadingMovie = loadingMovie
        },

        setLoadingTrailers(state, loadingTrailers) {
            state.loadingTrailers = loadingTrailers
        },

        getMovie(state, movie) {
            state.movie = movie
            state.loadingMovie = false
        },

        getTrailers(state, trailers) {
            state.trailers = trailers
            state.loadingTrailers = false
        },

        getWatchListMovie(state, watchList) {
            state.watchList = watchList;
        },

        addMovieToWatchList(state, newMovie) {
            state.watchList.push(newMovie);
        },

        removeMovieFromWatchList(state, movieId) {
            state.watchList = state.watchList.filter(movie => movie.id !== movieId);
        },

        getWatchedMovie(state, watchedMovie) {
            state.watchedMovie = watchedMovie;
        },

        addMovieToWatchedMovie(state, newMovie) {
            state.watchedMovie.push(newMovie);
        },

        removeMovieFromWatchedMovie(state, movieId) {
            state.watchedMovie = state.watchedMovie.filter(movie => movie.id !== movieId);
        },

        getLikedMovie(state, likedMovie) {
            state.likedMovie = likedMovie;
        },

        addMovieToLikedMovie(state, newMovie) {
            state.likedMovie.push(newMovie);
        },

        removeMovieFromLikedMovie(state, movieId) {
            state.likedMovie = state.likedMovie.filter(movie => movie.id !== movieId);
        },

    },

    actions: {
        login: ({ commit }, user) => {
            localStorage.setItem('user', JSON.stringify(user));
            commit('login', user);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('user');
            commit('logout');
        },

        async loadPopularMovies({ commit }) {
            const response = await getPopularMovies();
            commit('getPopularMovies', response.results)
        },

        async getMovie({ commit }, movieId) {
            commit('setLoadingMovie', true);
            const response = await getMovieById(movieId);
            commit('getMovie', response)
        },


        async getTrailers({ commit }, movieId) {
            commit('setLoadingTrailers', true);
            const response = await getTrailersById(movieId);
            commit('getTrailers', response)
        },

        async getWatchListMovie({ commit }, userId) {
            const response = await getWatchListMovie(userId);
            commit('getWatchListMovie', response)
        },

        addMovieToWatchList({ commit }, newMovie) {
            commit('addMovieToWatchList', newMovie)
        },

        removeMovieFromWatchList({ commit }, movieId) {
            commit('removeMovieFromWatchList', movieId)
        },

        async getWatchedMovie({ commit }, userId) {
            const response = await getWatchedMovie(userId);
            commit('getWatchedMovie', response)
        },

        addMovieToWatched({ commit }, newMovie) {
            commit('addMovieToWatchedMovie', newMovie)
        },

        removeMovieFromWatched({ commit }, movieId) {
            commit('removeMovieFromWatchedMovie', movieId)
        },

        async getLikedMovie({ commit }, userId) {
            const response = await getLikedMovie(userId);
            commit('getLikedMovie', response)
        },

        addMovieToLiked({ commit }, newMovie) {
            commit('addMovieToLikedMovie', newMovie)
        },

        removeMovieFromLiked({ commit }, movieId) {
            commit('removeMovieFromLikedMovie', movieId)
        },
    }
});