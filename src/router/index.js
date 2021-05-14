import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Search from '@/components/search'
import Register from '@/components/register'
import Login from '@/components/login'
import Sell from '@/components/sell'
import GoodDetail from '@/components/goodDetail'
import OrderConfirm from '@/components/orderConfirm'
import myPost from '@/components/myPost'
import myPurchase from '@/components/myPurchase'
import mySell from '@/components/mySell'
import admin from '@/components/admin'
import allGood from '@/components/allGood'
import verfiGood from '@/components/verfiGood'
import delSeller from '@/components/delSeller'
import orderDetail from '@/components/orderDetail'
import user from '@/components/user'

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
    },
    {
      path: '/orderDetail/:orderId',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/myPost',
      name: 'myPost',
      component: myPost
    },
    {
      path: '/mySell',
      name: 'mySell',
      component: mySell
    },
    {
      path: '/myPurchase',
      name: 'myPurchase',
      component: myPurchase
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/admin/allGood',
      name: 'allGood',
      component: allGood
    },
    {
      path: '/admin/delSeller',
      name: 'delSeller',
      component: delSeller
    },
    {
      path: '/admin/verfiGood',
      name: 'verfiGood',
      component: verfiGood
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
