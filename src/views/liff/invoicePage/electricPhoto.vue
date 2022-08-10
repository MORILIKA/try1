<template>
  <div>
    <ContentBlock>
      <Title titleText="電子發票拍照辨識"></Title>
      
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="pd-frame-1 mgt-1">
          <div class="input-group">
            <h5>上傳發票照片*</h5>
            <InputFile labelText="選擇發票照片" @update="inputUpdate" refName="invoiceImage" ></InputFile>
            <p class="mgt-2">＊上傳之照片須清晰顯示「發票號碼、發票隨機碼、發票日期」，若資訊不足導致無法判斷，將需重新上傳進行審核</p>
          </div>
          <SecondaryButton class="mgt-1" text="送出登錄資料" @click.native="handleSubmit(onSubmit)"></SecondaryButton>   
        </div>
      </ValidationObserver>
    </ContentBlock>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import SecondaryButton from '@/components/SecondaryButton'
  import InputFile from '@/components/InputFile'
  
  //使用表單驗證
  export default {
    data(){
      return{
        invoiceImage:'',
        input:''
      }
    },
    methods:{
      inputUpdate(refName,value){
        this[refName] = value;
      },
      onSubmit(){
        this.$store.dispatch('getIdentifyImage',this.invoiceImage.preview)
        this.$router.push({name:'electricLoading'})
      }
    },
    components:{
      ContentBlock,
      SecondaryButton,
      Title,
      InputFile,
    }
  }
</script>
<style scoped>
  .choose-way-block{
    display: flex;
    flex-direction: row;
  }
  .choose-way-block .square{
    width: 100%;
  }
  .square+.square{
    margin-left: 3.2vw;
  }
</style>
