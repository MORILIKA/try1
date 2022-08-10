<template>
  <div class="content-block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    
  },
  data(){
    return{
    }
  }
}
</script>
<style scoped>
  .content-block{
    width: 100%;
    padding-right: 10vw;
    padding-left: 10vw;
    padding-top: 5.4vw;
    padding-bottom: 10vw;
    margin-top: 83vw;
  }
</style>