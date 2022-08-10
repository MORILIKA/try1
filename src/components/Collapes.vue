<template>
  <div class="collapes">
    <div class="head" @click="collapsed=!collapsed">
      <h5>{{title}}</h5>
      <transition name="fade">
        <span class="icons plus" v-if="collapsed===true">
          <img src="@/assets/liff/images/collapes-icon-1.svg">
        </span>
      </transition>
      <transition name="fade">
        <span class="icons minus" v-if="collapsed===false">
          <img src="@/assets/liff/images/collapes-icon-2.svg">
        </span>
      </transition>
    </div>
    <div class="bottom" :class="{'open': !collapsed }">
      <div class="bottom-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title: String
  },
  data(){
    return{
      collapsed: true
    }
  }
}
</script>

<style scoped>
  .collapes{
    background-color: var(--secondary);
    border-radius: 1.06vw;
  }
  .head{
    height: 8.8vw;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 1.06vw;
    border: 1px solid #F7B341;
    color: #000;
  }
  .icons{
    width: 3vw;
    height: 3vw;
    display: inline-block;
    position: absolute;
    right: 15vw;
  }
  .icons img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
  }
  .bottom{
    max-height: 0;
    overflow: hidden;
    transition: 0.3s;
  }
  .bottom-content{
    padding: 2.13vw;
  }
  .open{
    height: auto;
    transition: 0.3s;
    max-height: 9999px;
  }
</style>