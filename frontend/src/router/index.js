import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Movie from '../pages/Movie.vue';
import Register from '../pages/Register.vue';
import Watchlist from '../pages/Watchlist.vue'

export const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,

        },
        {
            path: '/movie/:id',
            name: 'Movie',
            component: Movie,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },

        {
            path: '/watchlist',
            name: 'Watchlist',
            component: Watchlist,
        },
    ],
    history: createWebHistory(),
});