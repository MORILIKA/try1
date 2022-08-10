<template>
  <div class="liff-style">
    <!-- <KV></KV> -->
    <router-view class="main-content"></router-view>
    <transition name="fade">
      <Loading v-if="loadingStatus"></Loading>
    </transition>
    <transition name="fade">
      <Busy v-if="busyStatus"></Busy>
    </transition>
  </div>
</template>
<script>
  // import KV from '@/components/Kv'
  import Loading from '@/components/Loading'
  import Busy from '@/components/Busy'
  import '@/assets/liff/style/main.css'
  export default {
    data(){
      return{
      }
    },
    methods:{
      
    },
    computed:{
      loadingStatus: function(){
        return this.$store.state.loadingStatus
      },
      busyStatus: function(){
        return this.$store.state.busyStatus
      }
    },
    components:{
      Loading,
      Busy
      // KV
    }
  }
  
</script>
<style scoped>
  .liff-style{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
    background-color: #000;
  }
  .main-content{
    background-color: #000000;
    flex-grow: 1;
    background-image:url(~@/assets/liff/images/background.png);
    background-size: 100%;
    background-position: top center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

</style>