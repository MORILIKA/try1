<template>
  <div>
    <ContentBlock>
      <Title titleText="請選擇登錄類型"></Title>
      <div class="pd-frame-1">
        <PrimaryButton text="電子發票" @click.native="popupStatus('electric')"></PrimaryButton>
        <PrimaryButton text="雲端載具" @click.native="popupStatus('cloud')"></PrimaryButton>
        <PrimaryButton text="傳統發票" @click.native="popupStatus('traditional')"></PrimaryButton>
        <SecondaryButton class="mgt-1" text="回到首頁" @click.native="$router.push({name:'mainMenu'})"></SecondaryButton>
      </div>
    </ContentBlock>
    <transition name="fade">
      <PopUp v-if="popupShow">
        <template>
          <Title :titleText="typeList[invoiceType].title"></Title>
          <h4 class="text-center mgt-2">{{typeList[invoiceType].text}}</h4>
          <PrimaryButton class="mgt-1" text="立即登錄發票" @click.native="goPage(typeList[invoiceType].link),popupStatus()"></PrimaryButton>
        
          <SecondaryButton class="mgt-3" text="關閉視窗" @click.native="popupStatus()"></SecondaryButton>
        </template>
      </PopUp>
    </transition>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import PrimaryButton from '@/components/PrimaryButton'
  import SecondaryButton from '@/components/SecondaryButton'
  import PopUp from '@/components/PopUp'
  import {getUserToken} from "@/api/index"
  export default {
    data(){
      return{
        invoiceType:'electric',
        popupShow: false,
        typeList:{
          'electric':{
            title: '電子發票',
            text:'提醒：\n財政部電子發票資料更新時間\n至多需48小時之審核時間',
            link:'electricPage'
          },
          'cloud':{
            title: '雲端載具',
            text:'提醒：雲端載具採人工審核，\n至多需5-7個工作天進行審核作業',
            link:'cloudPage'
          },
          'traditional':{
            title: '傳統發票',
            text:'提醒：傳統發票採人工審核，\n至多需5-7個工作天進行審核作業',
            link:'traditionalPage'
          }
        }
      }
    },
    methods:{
      popupStatus(type){
        if(type){
          this.invoiceType=type
          this.popupShow=true
        }else{
          this.invoiceType=''
          this.popupShow=false
        }
      },
      goPage(page){
        this.$router.push({name:page})
      },
      getjwt(){
        let data={
          lineToken: window.localStorage.getItem('userToken')
        }
        getUserToken(data)
        .then((res)=>{
          window.localStorage.setItem('jwt',res.data.token)
          this.$store.dispatch('changeLoading',false)
        })
        .catch(()=>{
          this.$store.dispatch('changeLoading',false)
        })
      },
    },
    created(){
      this.$store.dispatch('changeLoading',true)
      this.getjwt()
    },
    components:{
      ContentBlock,
      PrimaryButton,
      SecondaryButton,
      Title,
      PopUp
    }
  }
  
</script>
<style scoped>
  h4{
    white-space: pre-wrap;
  }
</style>