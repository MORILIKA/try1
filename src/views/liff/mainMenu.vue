<template>
  <div>
    <ContentBlock>
      <div class="pd-frame-1">
        <PrimaryButton text="活動辦法" @click.native="$router.push({name:'activityRule'})"></PrimaryButton>
        <PrimaryButton text="立即登錄發票" @click.native="$router.push({name:'invoiceIndex'})"></PrimaryButton>
        <PrimaryButton text="登錄進度查詢" @click.native="$router.push({name:'loginProgress'})"></PrimaryButton>
        <PrimaryButton text="中獎名單" @click.native="$router.push({name:'winnerList'})"></PrimaryButton>
      </div>
    </ContentBlock>
    <BottomDeco></BottomDeco>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import PrimaryButton from '@/components/PrimaryButton'
  import BottomDeco from '@/components/BottomDecoration'
  
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
      BottomDeco
    }
  }
  
</script>