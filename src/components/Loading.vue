<template>
  <div class="loading">
    <div class="loader"></div>
    <p class="text-center">處理中，請稍候</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
.loading{
  position: fixed;
  z-index: 9;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

}
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #f5cc2f;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-bottom: 10px;
}
p{
    font-size: 14px;
    line-height: 26px;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  
</style>