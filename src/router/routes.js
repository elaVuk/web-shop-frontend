import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'home', component: () => import('pages/StartPage.vue')},
      {path: 'category', name: 'CategoryPage', component: () => import('pages/CategoryPage.vue')},
      {path: 'product/:id', name: 'ProductPage', component: () => import('pages/ProductPage.vue')},
      {path: 'cart', name: 'CartPage', component: () => import('pages/CartPage.vue')},
      {path: 'login', name: 'LoginPage', component: () => import('pages/auth/LoginPage.vue')},
      {path: 'register', name: 'RegisterPage', component: () => import('pages/auth/RegisterPage.vue')},
    ]
  },

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
