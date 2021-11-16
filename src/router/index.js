import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/selectarea',
    name: 'Area',
    component: () => import('../components/siteSelect.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/registerPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../components/menu.vue'),
    children: [
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../components/Cart.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/categorylist.vue')
      },
      {
        path: '/goodsdetail',
        name: 'goodsDetail',
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
