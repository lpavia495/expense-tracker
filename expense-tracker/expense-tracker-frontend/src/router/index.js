import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import ExpenseList from '../components/ExpenseList.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
  { path: '/expenses', component: ExpenseList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
