<template>
  <div class="popup">
    <div class="popup-content">
      <p class="text-center mgt-1">系統忙碌中，請稍候再試</p>
      <SecondaryButton class="mgt-1" text="關閉" @click.native="$store.dispatch('changeBusy',false)"></SecondaryButton>
    </div>
  </div>
</template>
<script>
import SecondaryButton from "@/components/SecondaryButton"
export default {
  data(){
    return{
      
    }
  },
  components:{
    SecondaryButton
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
    padding: 5.4vw;
    width: 100%;
    height: auto;
    max-height: 100%;
    border: 2px solid #F5CC30;
    background-color: rgba(0, 0, 0, 0.87);
    color: #fff;
    border-radius: 2.13vw;
  }
</style>
