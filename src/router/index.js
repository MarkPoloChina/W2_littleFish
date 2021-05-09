import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Search from '@/components/search'
import Register from '@/components/register'
import Login from '@/components/login'
import Sell from '@/components/sell'
import GoodDetail from '@/components/goodDetail'
import OrderConfirm from '@/components/orderConfirm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/search/:keyWord',
      name: 'search',
      component: Search
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/goodDetail/:goodId',
      name: 'goodDetail',
      component: GoodDetail
    },
    {
      path: '/orderConfirm/:goodId',
      name: 'orderConfirm',
      component: OrderConfirm
    }
  ]
})
