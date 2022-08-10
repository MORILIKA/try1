<template>
  <div>
    <ContentBlock>
      <Title titleText="電子發票"></Title>
      <p class="text-center">請選擇登錄方式</p>
      <div class="pd-frame-1">
        <div class="choose-way-block mgt-2">
          <div class="square" @click="$router.push({name:'electricHand'})">
            <img src="@/assets/liff/images/electric-way-hand.png" alt="">
          </div>
          <div class="square" @click="$router.push({name:'electricPhoto'})">
            <img src="@/assets/liff/images/electric-way-photo.png" alt="">
          </div>
        </div>
        <p class="text-center mgt-2">*若發票類型錯誤，將不具抽獎資格</p>
        <PrimaryButton class="mgt-1" text="重新選擇登錄發票類型" @click.native="$router.push({name:'invoiceIndex'})"></PrimaryButton>
        <SecondaryButton class="mgt-3" text="回到首頁" @click.native="$router.push({name:'mainMenu'})"></SecondaryButton>
      </div>
      <Title class="mgt-1" titleText="電子發票範本如下"></Title>
      <div class="pd-frame-1">
        <div class="sample mgt-2">
          <img src="@/assets/liff/images/electric-sample.png" alt="">
        </div>
      </div>
    </ContentBlock>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import SecondaryButton from '@/components/SecondaryButton'
  import PrimaryButton from '@/components/PrimaryButton'
  export default {
    data(){
      return{
      }
    },
    methods:{
      
    },
    components:{
      ContentBlock,
      SecondaryButton,
      PrimaryButton,
      Title
    }
  }
  
</script>
<style scoped>
  .choose-way-block{
    display: flex;
    flex-direction: row;
  }
  .choose-way-block .square{
    width: 100%;
  }
  .square+.square{
    margin-left: 3.2vw;
  }
</style>
