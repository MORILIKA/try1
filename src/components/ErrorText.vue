<template>
  <div class="error-text">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props:{
    text: String,
  },
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
  p{
    color: var(--third);
    font-weight: 500;
    font-size: 12px;
    line-height: 17.76px; 
    text-align: right;
    margin-top: 1vw;
  }
</style>