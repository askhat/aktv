import Vue from 'vue'
import Router from 'vue-router'
import VDashboard from '@/views/VDashboard'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'VDashboard',
      component: VDashboard
    },
    {
      path: '/admin',
      name: 'VDashboardLogin',
      component: VDashboard,
      props: { showLoginForm: true }
    }
  ]
})
