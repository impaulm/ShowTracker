import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Movie from '../pages/Movie.vue';

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
    ],
    history: createWebHistory(),
});