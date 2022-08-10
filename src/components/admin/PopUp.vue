<template>
  <div class="popup">
    <div class="popup-content">
      <slot></slot>
    </div>
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
  .popup{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
    top: 0;
    left: 0;
    padding: 5.4vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content{
    background-color: #fff;
    padding: 30px;
    width: 500px;
    height: auto;
    max-height: 100%;
    background-color: #fff;
    color: rgba(0,0,0,0.8);
    border-radius: 8px;
  }
</style>