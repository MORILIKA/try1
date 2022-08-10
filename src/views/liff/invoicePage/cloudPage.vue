<template>
  <div>
    <ContentBlock>
      <Title titleText="雲端載具"></Title>
      <div class="pd-frame-1">
        <p class="text-center mgt-2">*若發票類型錯誤，將不具抽獎資格</p>
        <PrimaryButton class="mgt-1" text="登錄載具發票資訊" @click.native="$router.push({name:'cloudLogin'})"></PrimaryButton>
        <PrimaryButton class="mgt-3" text="重新選擇登錄發票類型" @click.native="$router.push({name:'invoiceIndex'})"></PrimaryButton>
        <SecondaryButton class="mgt-3" text="回到首頁" @click.native="$router.push({name:'mainMenu'})"></SecondaryButton>
      </div>
      <Title class="mgt-1" titleText="雲端載具範本如下"></Title>
      <div class="pd-frame-1">
        <div class="sample mgt-2">
          <img src="@/assets/liff/images/cloud-sample.png" alt="">
        </div>
      </div>
    </ContentBlock>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import PrimaryButton from '@/components/PrimaryButton'
  import SecondaryButton from '@/components/SecondaryButton'
  export default {
    data(){
      return{
      }
    },
    methods:{
      
    },
    components:{
      ContentBlock,
      PrimaryButton,
      SecondaryButton,
      Title
    }
  }
  
</script>
<style scoped>
  
</style>
