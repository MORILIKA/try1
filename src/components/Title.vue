<template>
  <div class="title">
    <img src="@/assets/liff/images/title.png" alt="">
    <h2>{{titleText}}</h2>
  </div>
</template>

<script>
export default {
  props:{
    titleText: String,
  },
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
  .title{
    width: 100%;
    color: #fff;
    position: relative;
  }
  h2{
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin: 0;
    text-align: center;
    color: var(--secondary);
  }
  
</style>