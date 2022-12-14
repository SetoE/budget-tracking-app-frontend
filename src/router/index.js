import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import TransactionView from '../views/TransactionView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/transactions', name: 'Transactions', component: Transactions },
      { path: '/transactions/create', name: 'TransactionCreate', component: TransactionView },
      { path: '/transactions/:id', name: 'TransactionView', component: TransactionView },
    ],
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login' });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard' });
  }
  next();
});

export default router;