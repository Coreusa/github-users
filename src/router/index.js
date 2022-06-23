import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Users from '@/views/Users.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    // This is imo the correct pathing, but...
    path: '/users/:username',
    // // ...the task assignment asked for /user/:username, so we add that as an alias
    alias: '/user/:username',
    name: 'Users',
    component: Users
  }
  // {
  //   path: '/users/:id',
  //   name: 'UserDetails',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "UserDetails" */ '../views/UserDetails.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
