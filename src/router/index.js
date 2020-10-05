import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo01 from '../views/Demo01.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/demo01' },
  { path: '/demo01', component: Demo01 },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
