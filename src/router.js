import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/content/_section.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/pokemons',
      name: 'pokemonpage',
      component: () => import('./components/pokemon/pokemonspage.vue'),
    },
    {
      path: '/pokemons/:id',
      name: 'pokemons detail',
      component: () => import('./components/pokemon/pokemon-detail.vue'),
    },
    {
      path: '/pokexbag/email=:email',
      name: 'list my pokemons',
      component: () => import('./components/pokemon/pokex-bag-user.vue'),
    },
    {
      path: '*',
      name: 'page not found',
      component: () => import('./views/_error-page.vue'),
    },
  ],
});
