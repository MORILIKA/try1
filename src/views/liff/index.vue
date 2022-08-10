<template>
  <div class="index-page">
    <!-- <ul>
      <li><router-link to="/mainMenu">活動首頁</router-link></li>
      <li><router-link to="/activityRule">活動辦法</router-link></li>
      <li><router-link to="/loginProgress">登錄進度查詢</router-link></li>
      <li><router-link to="/winnerList">中獎名單</router-link></li>
      <li><router-link to="/personalInfo">填寫個人資料</router-link></li>
      <li><hr></li>
      <li><router-link to="/electricPage">電子發票</router-link></li>
      <li><router-link to="/electricPhoto">電子發票-圖像辨識</router-link></li>
      <li><router-link to="/electricHand">電子發票-手動輸入</router-link></li>
      <li><router-link to="/cloudPage">雲端載具</router-link></li>
      <li><router-link to="/cloudLogin">雲端載具-登錄</router-link></li>
      <li><router-link to="/traditionalPage">傳統發票</router-link></li>
      <li><router-link to="/traditionalLogin">傳統發票-登錄</router-link></li>
      <li><router-link to="/resultPage">發票登錄結果</router-link></li>
    </ul> -->
    <Loading></Loading>
  </div>
</template>

<script>
  import liff from "@line/liff"; 
  import Loading from "@/components/Loading"
  // import {getUserToken} from "@/api/index"
  export default {
    data(){
      return{
      }
    },
    methods:{
      async lineInit(){
          await liff
            .init({
              liffId: process.env.VUE_APP_LIFFID 
            })
            .then(() => {
              //detect login or not
              if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: window.location.href });
              } else {
                liff
                  .getProfile()
                  .then(res => {
                    window.localStorage.setItem("userToken", res.userId);
                    this.pageQuery()
                    
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
            })
            .catch(err => {
              console.log(err.code, err.message);
            });
      },
      pageQuery(){
        let page=this.$route.query.page
        if(page){
          this.$router.push({name:page})
        }else{
          this.$router.push({name:'mainMenu'})
        }
        
      }
    },
    components:{
      Loading
    },
    created(){
      
      // line
      // this.lineInit() 

      //本地
      window.localStorage.setItem("userToken", "123");
      console.log('abc12')
      this.pageQuery()
      
    },
   
  }
</script>
<style scoped>
  .index-page{
    background-color: #000;
    width: 100%;
    height: 100vh;
  }
</style>