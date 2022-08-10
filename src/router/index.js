import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/liff/index.vue'),
    

  },
  {
    path: '/liff',
    name: 'liff',
    component: () => import(/* webpackChunkName: "liff" */ '../views/liff/liff.vue'),
    children: [
      {
        path: '/mainMenu',
        name: 'mainMenu',
        component: () => import(/* webpackChunkName: "mainMenu" */ '../views/liff/mainMenu.vue'),
        meta: { userToken: true },
      },
      {
        path: '/invoiceIndex',
        name: 'invoiceIndex',
        component: () => import(/* webpackChunkName: "invoiceIndex" */ '../views/liff/invoicePage/invoiceIndex.vue'),
        meta: { userToken: true },
      },
      {
        path: '/electricPage',
        name: 'electricPage',
        component: () => import(/* webpackChunkName: "electricPage" */ '../views/liff/invoicePage/electricPage.vue'),
        meta: { userToken: true },
      },
      {
        path: '/electricPhoto',
        name: 'electricPhoto',
        component: () => import(/* webpackChunkName: "electricPhoto" */ '../views/liff/invoicePage/electricPhoto.vue'),
        meta: { userToken: true },
      },
      {
        path: '/electricHand',
        name: 'electricHand',
        component: () => import(/* webpackChunkName: "electricHand" */ '../views/liff/invoicePage/electricHand.vue'),
        meta: { userToken: true },
      },
      {
        path: '/electricLoading',
        name: 'electricLoading',
        component: () => import(/* webpackChunkName: "electricLoading" */ '../views/liff/invoicePage/electricLoading.vue'),
        meta: { userToken: true },
      },
      {
        path: '/cloudPage',
        name: 'cloudPage',
        component: () => import(/* webpackChunkName: "cloudPage" */ '../views/liff/invoicePage/cloudPage.vue'),
        meta: { userToken: true },
      },
      {
        path: '/cloudLogin',
        name: 'cloudLogin',
        component: () => import(/* webpackChunkName: "cloudLogin" */ '../views/liff/invoicePage/cloudLogin.vue'),
        meta: { userToken: true },
      },
      {
        path: '/traditionalPage',
        name: 'traditionalPage',
        component: () => import(/* webpackChunkName: "traditionalPage" */ '../views/liff/invoicePage/traditionalPage.vue'),
        meta: { userToken: true },
      },
      {
        path: '/traditionalLogin',
        name: 'traditionalLogin',
        component: () => import(/* webpackChunkName: "traditionalLogin" */ '../views/liff/invoicePage/traditionalLogin.vue'),
        meta: { userToken: true },
      },
      {
        path: '/resultPage',
        name: 'resultPage',
        component: () => import(/* webpackChunkName: "resultPage" */ '../views/liff/invoicePage/resultPage.vue'),
        meta: { userToken: true },
      },
      {
        path: '/personalInfo',
        name: 'personalInfo',
        component: () => import(/* webpackChunkName: "personalInfo" */ '../views/liff/personalInfo.vue'),
        // meta: { userToken: true },
      },
      {
        path: '/activityRule',
        name: 'activityRule',
        component: () => import(/* webpackChunkName: "activityRule" */ '../views/liff/activityRule.vue'),
        meta: { userToken: true },
      },
      {
        path: '/loginProgress',
        name: 'loginProgress',
        component: () => import(/* webpackChunkName: "loginProgress" */ '../views/liff/loginProgress.vue'),
        meta: { userToken: true },
      },
      {
        path: '/winnerList',
        name: 'winnerList',
        component: () => import(/* webpackChunkName: "winnerList" */ '../views/liff/winnerList.vue'),
        meta: { userToken: true },
      },
    ]
  },
  {
    path: '/admin',
    name: 'login',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/admin.vue'),
    children:[
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        meta:{
          nav: 'dashboard',
          title: '數據儀表板',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/dashboard.vue'),
      },
      {
        path: '/admin/invoiceList',
        name: 'invoiceList',
        meta:{
          nav: 'invoiceList',
          title: '發票列表',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "invoiceList" */ '../views/admin/invoiceList.vue'),
      },
      {
        path: '/admin/invoiceDetail',
        name: 'invoiceDetail',
        meta:{
          nav: 'invoiceList',
          title: '查看發票詳情',
          parent: 'invoiceList',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "invoiceDetail" */ '../views/admin/invoiceDetail.vue'),
      },
      {
        path: '/admin/userList',
        name: 'userList',
        meta:{
          nav: 'userList',
          title: '參與者名單',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "userList" */ '../views/admin/userList.vue'),
      },
      {
        path: '/admin/userDetail',
        name: 'userDetail',
        meta:{
          nav: 'userList',
          title: '查看詳情',
          parent: 'userList',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "userDetail" */ '../views/admin/userDetail.vue'),
      },
      {
        path: '/admin/lotterisList',
        name: 'lotterisList',
        meta:{
          nav: 'lotterisList',
          title: '上傳中獎名單',
          page: 'admin',
        },
        component: () => import(/* webpackChunkName: "lotterisList" */ '../views/admin/lotterisList.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 若頁面有userToken才能進去,沒有userToken時導回liffinit頁
  if(to.meta.userToken===true){
    let userToken=window.localStorage.getItem('userToken')
    console.log('liffId:',userToken,',pageName:',to.name)
    if(userToken){
      next();
    }else{
      next({name:'index'});
    }
  }else{
    next();
  }
  //如果是詳情頁記住的cache是list頁
  
  if(to.meta.page==='admin'){
    if(to.meta.parent===from.name){
      store.dispatch('changeCacheView',from.name)
      next();
    }else if(to.name===from.name){
      store.dispatch('changeCacheView',null)
      next();
    }else{
      store.dispatch('changeCacheView',to.name)
      next();
    }
  }else{
    next();
  }


})


export default router
