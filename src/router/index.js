import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import List from '../views/List.vue'
import MovieInformation from '../views/Movie-information.vue'
import PersonInformation from '../views/Person-Information.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/movie/:id',
    name: 'MovieInformation',
    component: MovieInformation
  },
  {
    path: '/person/:id',
    name: 'PersonInformation',
    component: PersonInformation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
