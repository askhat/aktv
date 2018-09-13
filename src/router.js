import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/admin',
      name: 'DashboardLogin',
      component: Dashboard,
      props: { showLoginForm: true }
    }
  ]
})
