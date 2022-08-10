<template>
  <div>
    <ContentBlock>
      <div class="pd-frame-1">
        <Title titleText="發票登錄結果"></Title>
        <div class="result-icon" v-show="status==='登錄成功'">
          <img src="@/assets/liff/images/success-icon.png" alt="">
        </div>
        <div class="result-icon" v-show="status==='登錄失敗'">
          <img src="@/assets/liff/images/fail-icon.png" alt="">
        </div>
        <div class="result-icon" v-show="status==='待審核'">
          <img src="@/assets/liff/images/pending-icon.png" alt="">
        </div>

        <template v-if="identify">
          <h4>辨識失敗<br>造成“辨識失敗”的狀況可能為照片<br>拍攝角度不正、發票皺褶、拍攝光線不足，導致拍攝發票不清晰，建議重新拍攝或改以手動輸入發票資訊，感謝您！ </h4>
          <SecondaryButton text="重新拍照上傳" @click.native="$router.push({name:'electricPhoto'})"></SecondaryButton>
          <SecondaryButton class="mgt-3" text="手動輸入發票類型" @click.native="$router.push({name:'electricHand'})"></SecondaryButton>
          <PrimaryButton class="mgt-3" text="重新選擇登錄發票類型" @click.native="$router.push({name:'mainMenu'})"></PrimaryButton>
        </template>
        
        <template v-else>
          <template v-if="status==='待審核'">
            <h4 v-if="type==='電子發票'">財政部尚無此發票明細，<br>電子發票更新時間至多<br>需48小時之審核時間，請您稍作等候！<br>發票審核確認後，將獲得兌獎資格。</h4>
            <h4 v-if="type==='雲端載具'">感謝您的參與，雲端載具採人工審核，<br>需5-7個工作天進行審核作業，<br>請稍作等候</h4>
            <h4 v-if="type==='傳統發票'">感謝您的參與，傳統發票採人工審核，<br>需5-7個工作天進行審核作業，<br>請稍作等候</h4>
          </template>
          <h4 v-if="status==='登錄失敗'" class="text-break">{{failText}}</h4>
          <h4 v-if="status==='登錄成功'">恭喜完成發票登錄<br>您已成功獲得抽獎資格</h4>
          <SecondaryButton text="查詢我的發票" @click.native="$router.push({name:'loginProgress'})"></SecondaryButton>
          <PrimaryButton class="mgt-3" text="回到首頁" @click.native="$router.push({name:'mainMenu'})"></PrimaryButton>
        </template>

      </div>
    </ContentBlock>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import PrimaryButton from '@/components/PrimaryButton'
  import SecondaryButton from '@/components/SecondaryButton'
  export default {
    data(){
      return{
        identify: false,
        status: '',
        failText:'',
        type:''
      }
    },
    methods:{
      failMessage(failCode, failMessage) {
          switch (failCode) {
              case '00001':
                  return '未購買活動品項\n您所登錄的發票需含卡廸那商品喔！'
              case '00002':
                  return '活動時間不符合，\n您所登錄的發票非活動期間內購買，\n詳情請參閱活動辦法。'
              case '00003':
                  return '發票重複登錄\n此發票號碼已成功登錄於後台，\n故無法重複登錄此發票，請查詢我的發票'
              case '00004':
                  return '您所登錄的發票資訊錯誤，\n請輸入正確發票號碼、隨機碼、發票日期'
              case '00005':
                  return '您所登錄的發票發票類型錯誤，請重新上傳'
              case '00006':
                  return failMessage
              case '00007':
                  return ''
          }
      }
    },
    components:{
      ContentBlock,
      Title,
      PrimaryButton,
      SecondaryButton
    },
    mounted(){
      let result=this.$store.state.invoiceResult
      if(result.msg==='發票辨識成功'){
        this.identify=true
        this.status='登錄失敗'
      }else{
        this.status=result?.data?.status
      }
      this.type=result?.data?.type
      let failCode=result?.data?.failCode
      let failMessage=result?.data?.failMessage
      this.failText=this.failMessage(failCode,failMessage)
    }
  }
  
</script>
<style scoped>
  .result-icon{
    width: 30%;
    margin: auto;
    margin-top: 5vw;
  }
  h4{
    text-align: center;
    margin-top: 4.8vw;
    margin-bottom: 6.4vw;
  }
  .text-break{
    white-space: pre-wrap;
  }

</style>
