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