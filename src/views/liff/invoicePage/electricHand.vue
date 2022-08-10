<template>
  <div>
    <ContentBlock>
      <Title titleText="電子發票手動輸入"></Title>
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
            <h5>發票隨機碼*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required|invoiceCode">
              <input type="text" class="input-style" placeholder="例：5678" v-model="randomCode">
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
  import {electricInvoice} from '@/api/index'
  //使用表單驗證

  export default {
    data(){
      return{
        invoiceNumber:'',
        invoiceDate:'',
        randomCode:'',
        imageUrl: ''
      }
    },
    methods:{
      onSubmit(){
        this.$store.dispatch('changeLoading',true)
        let data={
          "invoiceNumber": this.invoiceNumber,
          "invoiceDate": this.invoiceDate,
          "randomCode": this.randomCode,
          "imageUrl": this.imageUrl
        }
        electricInvoice(data)
        .then((res)=>{
          this.$store.dispatch('changeLoading',false)
          this.$store.dispatch('getInvoiceResult',res)
          this.$router.push({name:'resultPage'})
        })
        .catch(()=>{
          this.$store.dispatch('changeLoading',false)
          
        })
      },
    },
    mounted(){
      if(this.$route.query.identify===1){
        let iResult=this.$store.state.invoiceResult
        this.invoiceNumber=iResult.data.invoiceNumber
        this.invoiceDate=iResult.data.invoiceDate
        this.randomCode=iResult.data.randomCode
        this.imageUrl=iResult.data.imageUrl
      }
    },
    components:{
      ContentBlock,
      SecondaryButton,
      Title,
      ErrorText
    }
  }
  
</script>
