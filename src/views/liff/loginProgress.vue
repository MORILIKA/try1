<template>
  <div>
    <ContentBlock>
      <Title titleText="發票登錄進度查詢"></Title>
      <p class="text-center mgt-2">卡廸那產品購買累積<br>
          累計登錄發票張數<span class="count">{{records.length}}</span>張
      </p>
      <div class="border-frame mgt-2" :class="{'noInfo':records.length===0}">
        <div class="progress" v-for="(record,index) in records" :key="index">
          <div class="icon">
            <img v-if="record.status==='登錄成功'" src="@/assets/liff/images/progress-success.png" alt="">
            <img v-if="record.status==='登錄失敗'" src="@/assets/liff/images/progress-fail.png" alt="">
            <img v-if="record.status==='待審核'" src="@/assets/liff/images/progress-pending.png" alt="">
          </div>
          <div>
            <p>發票號碼：{{record.invoiceNumber}}</p>
            <p>登錄日期：{{record.invoiceDate}}</p>
            <p v-if="record.status==='登錄失敗'">失敗原因：{{record.failMessage}}</p>
          </div>
        </div>
        <div class="progress" v-if="records.length===0">
            <div class="text-center">尚無登錄紀錄</div>
        </div>
        <!-- <div class="progress">
          <div class="icon">
            <img src="@/assets/liff/images/progress-fail.png" alt="">
          </div>
          <div>
            <p>發票號碼：AB12345678</p>
            <p>登錄日期：2021/3/3</p>
            <p>失敗原因：未購買活動品項</p>
          </div>
        </div>
        <div class="progress">
          <div class="icon">
            <img src="@/assets/liff/images/progress-pending.png" alt="">
          </div>
          <div>
            <p>發票號碼：AB12345678</p>
            <p>登錄日期：2021/3/3</p>
          </div>
        </div> -->
      </div>
      <div class="pd-frame-1 mgt-1"> 
        <PrimaryButton text="立即登錄發票" @click.native="$router.push({name:'invoiceIndex'})"></PrimaryButton>
        <SecondaryButton text="回到首頁" class="mgt-3" @click.native="$router.push({name:'mainMenu'})"></SecondaryButton>
      </div>
    </ContentBlock>
    
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import PrimaryButton from '@/components/PrimaryButton'
  import SecondaryButton from '@/components/SecondaryButton'
  import {invoiceList} from '@/api/index'
  export default {
    data(){
      return{
        records:''
      }
    },
    methods:{
      
    },
    components:{
      ContentBlock,
      Title,
      PrimaryButton,
      SecondaryButton
     
    },
    computed:{
      
    },
    mounted(){
      this.$store.dispatch('changeLoading',true)
      invoiceList()
      .then((response)=>{
        this.$store.dispatch('changeLoading',false)
        if(response){
          this.records=response.data.data
        }
        
      })
      .catch(()=>{
        this.$store.dispatch('changeLoading',false)
        
      })
    }
  }
  
</script>
<style scoped>
  .count{
    color: var(--third);
    margin-left: 2vw;
    margin-right: 2vw;
  }
  .border-frame{
    height: 50vh;
    border-radius: 2.13vw;
    border: 2px solid #F5CC30;
    padding: 3.2vw;
    overflow-y: auto;
  }
  .progress{
    width: 100%;
    background-color: #FFF9EC;
    border-radius: 1.06vw;
    padding: 3.2vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(0,0,0,0.6);
  }
  .progress + .progress{
    margin-top: 2vw;
  }
  /* .progress::before,.progress::after{
    content: '';
    display: block;
  } */
  .progress .icon{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progress .icon img{
    width: 70%;
  }
  .border-frame.noInfo{
    height: 25vh;
  }
  .noInfo .progress{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
</style>