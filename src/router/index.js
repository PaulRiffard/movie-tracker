import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import MovieInformation from '../views/Movie-information.vue'
import PersonInformation from '../views/Person-Information.vue'
import CollectionList from '../views/Lists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/movie/:id',
    name: 'movieInformation',
    component: MovieInformation
  },
  {
    path: '/person/:id',
    name: 'personInformation',
    component: PersonInformation
  },
  {
    path: '/lists',
    name: 'lists',
    component: CollectionList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
