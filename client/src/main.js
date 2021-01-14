import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import '@/plugins/apexcharts'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Grades from './components/Grades.vue'
import Teachers from './components/Teachers.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Grades',
    path: '/grades',
    component: Grades
  },
  {
    name: 'Teachers',
    path: '/teachers',
    component: Teachers
  }
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
