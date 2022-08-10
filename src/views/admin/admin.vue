<template>
  <div class="admin-page inside">
    <transition name="fade">
      <div class="login" v-if="isLogin">
        <div class="logo">
          <img src="@/assets/admin/images/logo.png" alt="">
        </div>
        <h3>卡廸那202204SP後台</h3>
        <div class="mgt-sm-b input-frame">
          <transition name="fade">
            <div class="loginErr" v-if='!loginResult.status'>
              <p class="text-center">{{loginResult.err}}</p>
            </div>
          </transition>
          
          <ValidationObserver class="mgt-xs-b" v-slot="{ handleSubmit }" tag="div">
              <ValidationProvider v-slot="{ errors }" rules="required" tag="div">
                <input type="text" class="input-style" placeholder="帳號" v-model="name">
                <p class="notify">{{errors[0]}}</p>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" rules="required" tag="div">
                <input type="password" class="input-style mgt-xs-b" placeholder="密碼" v-model="password">
                <p class="notify">{{errors[0]}}</p>
              </ValidationProvider>
              
              <El-CheckBox class="mgt-xs-b" label="記住我" v-model="remember"></El-CheckBox>
              <AdminButton 
                class="text-center mgt-sm-b"
                text="登入" 
                bgColor="var(--secondary-b)"
                color="#fff"
                borderColor="#fff"
                size="2"
                @click.native="handleSubmit(userlogin)"
              >
              </AdminButton>
          </ValidationObserver>
        </div>
      </div>
    </transition>
    <div class="sidebar" v-if="!isLogin">
      <div class="top">
        <div class="logo">
          <img src="@/assets/admin/images/logo.png" alt="">
        </div>
        <h5 class="text-center">卡廸那202204SP</h5>
        <AdminButton 
          class="text-center mgt-sm-b"
          text="登出" 
          bgColor="var(--secondary-b)"
          color="#fff"
          borderColor="#fff"
          size="2"
          @click.native="userlogout"
        >
        </AdminButton>
      </div>
      <El-Menu mode="horizon" :default-active="sideBarActive">
        <El-MenuItem index="dashboard" @click="changePage('dashboard')">
          <div class="icon"><img src="@/assets/admin/images/sidebar-icon-dashboard.svg" alt=""></div>
          <h4>數據儀表板</h4>
        </El-MenuItem>
        <El-MenuItem index="invoiceList" @click="changePage('invoiceList')">
          <div class="icon"><img src="@/assets/admin/images/sidebar-icon-invoicelist.svg" alt=""></div>
          <h4>發票列表</h4>
        </El-MenuItem>
        <El-MenuItem index="userList" @click="changePage('userList')">
          <div class="icon"><img src="@/assets/admin/images/sidebar-icon-userlist.svg" alt=""></div>
          <h4>參與者名單</h4>
        </El-MenuItem>
        <El-MenuItem index="lotterisList" @click="changePage('lotterisList')">
          <div class="icon"><img src="@/assets/admin/images/sidebar-icon-lotterisList.svg" alt=""></div>
          <h4>上傳中獎名單</h4>
        </El-MenuItem>
      </El-Menu>
    </div>
    <div class="right-content">
      <p class="goLastPage" :class="{'show':lastPage!=='null'}" @click="$router.push({name:lastPage})">
       <El-Icon class="el-icon-arrow-left"></El-Icon> 返回發票列表
      </p>
      <h2 class="page-title">{{pageTitle}}</h2>
      <keep-alive :include="$store.state.cacheView">
        <router-view class="main-content"></router-view>
      </keep-alive>
      
      <!-- <router-view class="main-content"></router-view> -->
      
      <!-- <router-view v-if="!$route.meta.keepAlive" class="main-content"></router-view> -->
    </div>
    <transition name="fade">
      <Loading v-if="loadingStatus"></Loading>
    </transition>
  </div>
</template>
<script>
  import Loading from '@/components/Loading'
  import '@/assets/admin/style/element-ui.css'
  import '@/assets/admin/style/back-main.css'
  import AdminButton from '@/components/admin/AdminButton'
  import {login} from '@/api/index'
  export default {
    data(){
      return{
        loadingStatus: false,
        name:'accuhit7274',
        password:'accuhit5008!',
        remember: false,
        loginResult:{
          status: true,
          err:''
        }
      }
    },
    methods:{
      changePage(page){
        if(page!==this.$route.name){
          this.$router.push({name: page})
        }
      },
      async userlogin(){
        let self=this
        let data={
          "name": this.name,
          "password": this.password
        }
        login(data)
        .then((res)=>{
          window.localStorage.setItem('backJWT',res?.data?.token)
          let jwt= window.localStorage.getItem('backJWT')
          console.log(jwt)
          if(this.remember===true){
            window.localStorage.setItem('backName',this.name)
            window.localStorage.setItem('backPassword',this.password)
          }
          if(jwt){
            self.$router.push({path:'/admin/dashboard'})
          }
        })
        .catch((err)=>{
          this.loginResult.status=false
          if(err.response.data.msg==='登入失敗'){ 
            this.loginResult.err='帳號或密碼錯誤，請重新輸入'
              console.log(err.response.data.msg)
          }else{
            this.loginResult.err=err.response.data.msg
          }
          
        })
        
      },
      userlogout(){
        window.localStorage.removeItem('backJWT')
        this.loginResult.status=true
        this.$router.push({name:'login'})
      }
    },
    computed:{
      sideBarActive: function(){
        return this.$route.meta.nav
      },
      pageTitle: function(){
        return this.$route.meta.title
      },
      lastPage: function(){
        if(this.$route.meta.parent){
          return this.$route.meta.parent
        }else{
          return 'null'
        }
      },
      isLogin: function(){
        if(this.$route.name==='login'){
          return true
        }else{
          return false
        }
      }
    },
    created(){
      // this.name=window?.localStorage?.getItem('backName')
      // this.password=window?.localStorage?.getItem('backPassword')
    },
    components:{
      Loading,
      AdminButton,
      // KV
    }
  }
  
</script>
<style>

</style>