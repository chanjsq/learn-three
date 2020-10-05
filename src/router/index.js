import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/demo01' },
  { path: '/demo01', component: () => import('@/views/Demo01.vue') },
  { path: '/demo02', component: () => import('@/views/Demo02.vue') },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
