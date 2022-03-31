import {createRouter, createWebHistory} from 'vue-router';
import DefaultLayout from '../components/DefaultLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'DefaultLayout',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard}
        ]
    },   
    {
        path: '/login',
        name: 'Login',
        component: Login
    },    
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes

});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
      next({ name: "Login" });
    } else if (store.state.user.token && to.name === 'Login' || to.name === 'Register') {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  });

export default router;