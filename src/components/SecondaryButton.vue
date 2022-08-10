<template>
  <div class="secondary-button">
    <img src="@/assets/liff/images/secondary-btn.png" alt="">
    <h3>{{text}}</h3>
  </div>
</template>

<script>
export default {
  props:{
    text:String
  },
  data(){
    return{
    }
  }
}
</script>
<style scoped>
  .secondary-button{
    color: #fff;
    position: relative;
    font-size: 0;
  
  }
  /* .primary-button+.primary-button{
    margin-top: 1vw;
  } */
  h3{
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-align: center;
  }
</style>