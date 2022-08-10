<template>
  <div>
    <ContentBlock>
      <Title titleText="傳統發票"></Title>
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="pd-frame-1 mgt-1">
          <div class="input-group">
            <h5>發票號碼*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required|invoiceNum">
              <input type="text" class="input-style" placeholder="例：AB12345678" v-model="invoiceNumber">
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>
          <div class="input-group">
            <h5>發票日期*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input type="date" class="input-style" placeholder="例：5678" v-model="invoiceDate">
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>
          <div class="input-group">
            <InputFile inputTitle="" refName="invoiceImage" labelText="選擇發票照片" @update="inputUpdate"></InputFile>
            <p class="mgt-2">＊上傳之照片須清楚包含「購買日期、發票號碼、卡廸那產品名稱與金額」，若資訊不足導致無法判斷，將需重新上傳進行審核</p>
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
  import ErrorText from '@/components/ErrorText'
  import InputFile from '@/components/InputFile'
  import {traditionalInvoice} from '@/api/index'
  //使用表單驗證
  export default {
    data(){
      return{
        invoiceNumber:'',
        invoiceDate:'',
        invoiceImage:'',
      }
    },
    methods:{
      onSubmit(){
        this.$store.dispatch('changeLoading',true)
        let data={
          "invoiceNumber": this.invoiceNumber,
          "invoiceDate": this.invoiceDate,
          "image": this.invoiceImage.preview
        }
        traditionalInvoice(data)
        .then((res)=>{
          this.$store.dispatch('changeLoading',false)
          this.$store.dispatch('getInvoiceResult',res)
          this.$router.push({name:'resultPage'})
        })
        .catch(()=>{
          this.$store.dispatch('changeLoading',false)
        })
      },
      inputUpdate(refName,value){
        this[refName] = value;
      }
    },
    components:{
      ContentBlock,
      SecondaryButton,
      Title,
      InputFile,
      ErrorText
    }
  }
  
</script>
