import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  //TODO: VERIFICAR SE TOKEN ESTÁ VÁLIDO
  const loggedIn = localStorage.getItem('userToken')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})