import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'home', component: () => import('pages/StartPage.vue')},
      {path: 'category', component: () => import('pages/CategoryPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default routes
