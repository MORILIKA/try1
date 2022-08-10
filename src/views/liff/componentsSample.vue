<template>
  <div>
    <Kv></Kv>
    <ContentBlock>
      <Title titleText="123"></Title>
      <PrimaryButton></PrimaryButton>
    </ContentBlock>
    <BottomDeco></BottomDeco>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import Kv from '@/components/Kv'
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
      Title,
      Kv,
      PrimaryButton,
      BottomDeco
    }
  }
  
</script>