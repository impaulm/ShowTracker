import { createStore } from 'vuex';
import { getPopularMovie } from '../api/api';

export const store = createStore({
    state: {
        popularMovies: [],
    },

    getters: {
        popularMovies: state => {
            return state.popularMovies;
        }
    },

    mutations: {
        getPopularMovies (state, popularMovies) {
            state.popularMovies = popularMovies
        }
    },

    actions: {
        async loadPopularMovies ({ commit }) {
            const response = await getPopularMovie();
            commit('getPopularMovies', response.results)
        }
    }
});