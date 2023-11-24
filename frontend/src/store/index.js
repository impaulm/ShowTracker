import { createStore } from 'vuex';
import { getPopularMovie } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
        loggedIn: localStorage.getItem('username') !== null,
        username: localStorage.getItem('username') || '',

    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        },
        searchedMovies: state => {
            return state.searchedMovies;
        },
        loggedIn: state => {
            return state.loggedIn;
        },
        username: state => {
            return state.username;
        }
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
        }
    },

    actions: {
        async loadPopularMovies ({ commit }) {
            const response = await getPopularMovie();
            commit('getPopularMovies', response.results)
        },
        async loadSearchedMovies ({ commit }, searchedMovies) {
            const response = await getSearchedMovie(searchedMovies);
            commit('getSearchedMovies', searchedMovies)
        },
        login: ({ commit }, username) => {
            localStorage.setItem('username', username);
            commit('login', username);
        },
        logout: ({ commit }) => {
            localStorage.removeItem('username');
            commit('logout');
        },
    }
});