import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

import Home from '../pages/Home.vue';

export const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
    ],
    history: createWebHistory(),
});