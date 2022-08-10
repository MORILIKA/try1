<template>
  <div>
    <ContentBlock>
      <div class="loading-g pd-frame-1">
        <div>
          <img src="@/assets/liff/images/loading-1.png" alt="">
        </div>
        <div>
          <img src="@/assets/liff/images/loading-2.png" alt="">
        </div>
        <div>
          <img src="@/assets/liff/images/loading-3.png" alt="">
        </div>
        <div>
          <img src="@/assets/liff/images/loading-4.png" alt="">
        </div>
      </div>
      <h3 class="text-center mgt-1">發票辨識中...請稍後</h3>
    </ContentBlock>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import {identifyInvoice} from '@/api/index'
  export default {
    data(){
      return{
      }
    },
    methods:{
      
    },
    components:{
      ContentBlock,
    },
    mounted(){
         let data={
            "image": this.$store.state.identifyImage
          }
          identifyInvoice(data)
          .then((res)=>{
            if(res.msg==="發票辨識成功"){
              this.$store.dispatch('getInvoiceResult',res)
              if(res.data.failMessage===''){
                this.$router.push({name: 'electricHand',query: {identify: 1}})
              }else{
                this.$router.push({name: 'resultPage'})
              }
            }
          })
          .catch(()=>{
            this.$store.dispatch('changeBusy',true)
            
          })
    }
  }
  
</script>
<style scoped>
  .loading-g{
    display: flex;
    align-items: center;
    font-size: 0;
    margin-top: 12vw;
  }
  .loading-g div{
    transform: translateY(0%);
    -webkit-transform: translateY(0%);
  }
  .loading-g>div:first-child{
    animation: 1.6s upAndDown 0.2s infinite;
    
  }
   .loading-g>div:nth-child(2){
     animation: 1.6s upAndDown 0.4s infinite;

  }
   .loading-g>div:nth-child(3){
     animation: 1.6s upAndDown 0.6s infinite;

  }
   .loading-g>div:nth-child(4){
     animation: 1.6s upAndDown 0.8s infinite;

  }
  img{
    font-size: 0;
  }
  @keyframes upAndDown{
    0%{
      transform: translateY(0%);
    }
    30%{
      transform: translateY(-30%);
    }
    100%{
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes upAndDown{
    0%{
      -webkit-transform: translateY(0%);
    }
    30%{
      -webkit-transform: translateY(-30%);
    }
    100%{
      -webkit-transform: translateY(0%);
    }
  }
</style>
