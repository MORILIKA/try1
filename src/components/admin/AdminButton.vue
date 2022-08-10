<template>
  <div>
    <div class="back-button" :class="{'btn-sm': size==1,'btn-md': size==2}" :style="style">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    text: String, //文字
    borderColor: String, //border顏色
    color: String, // 文字顏色
    size: String, //按鈕大小 1-2
    bgColor: String,
  },
  data(){
    return{
      
    }
  },
  computed:{
    style: function(){
        let style={
          borderColor: this.borderColor,
          color: this.color,
          background: this.bgColor
        }
        return style
    },
  }
}
</script>
<style scoped>
  .back-button{
    border-radius: 8px;
    border: 2px solid transparent;
    background-color: grey;
    color: #000;
    text-align: center;
    font-size: 18px;
    display: inline-block;
    cursor: pointer;
  }
  .back-button.btn-sm{
    min-width: 72px;
    padding: 8px 20px;
    font-size: 16px;
  }
  .back-button.btn-md{
    min-width: 110px;
    padding: 10px 30px;
  }
</style>