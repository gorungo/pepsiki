import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "./views/HomePage"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },

        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('./views/FavoritePage.vue'),
        },

        {
            path: '/:breed',
            name: 'breed',
            component: () => import('./views/BreedPage.vue'),
        },
    ]
})