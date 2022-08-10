<template>
  <div>
    <ContentBlock>
      <Title titleText="請填寫個人資料"></Title>
      <p class="text-center">※中獎時將以此資料聯繫，<br>務必填寫正確資料</p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="pd-frame-1 mgt-1">

          <div class="input-group">
            <h5>姓名*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input type="text" class="input-style" placeholder="例：林美美" v-model="name">
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>

          <div class="input-group">
            <h5>Email*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <input type="text" class="input-style" placeholder="例：123@gmail.com" v-model="email">
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>

          <div class="input-group">
            <h5>性別*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <select class="input-style" name="" id="" v-model="gender">
                <option selected value="" disabled hidden></option>
                <option v-for="(op,index) in genderOption" :key="index" :value="op.value">{{op.text}}</option>
              </select>
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>

          <div class="input-group">
            <h5>出生年份*</h5>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <select class="input-style" name="" id="" v-model="birthYear">
                <option selected value="" disabled hidden></option>
                <option v-for="(op,index) in yearOption" :key="index" :value="op.value">{{op.text}}</option>
              </select>
              <ErrorText :text="errors[0]"></ErrorText>
            </ValidationProvider>
          </div>

          <div class="input-group"> 
              <ValidationProvider v-slot="{ errors }" :rules="{agree:true}">
                <input type="checkbox" id="agree" hidden v-model="agree">
                <label class="agree" for="agree"><span></span>我同意<div class="underline" @click="popupShow=true">個資保護條款</div></label>
                <ErrorText :text="errors[0]" class="text-left"></ErrorText>
              </ValidationProvider>
          </div>
          
          <SecondaryButton class="mgt-1" text="送出登錄資料" @click.native="handleSubmit(onSubmit)"></SecondaryButton>   
        </div>
      </ValidationObserver>
    </ContentBlock>
    <PopUp v-if="popupShow">
      <Title titleText="個資保護條款"></Title>
      <div class="scroll-frame">
        <ol>
          <li>依據個人資料保護法（以下稱個資法）向參與本活動消費者告知下列事項，參與本活動前請務必詳閱以下說明。 </li>
          <li>蒐集個人資料公司:聯華食品工業股份有限公司（“本公司”） </li>
          <li>蒐集之目的:作為參與「卡廸那不喊卡小劇場 導演PRO配備週週抽 活動小組」抽獎活動及後續相關程序之聯繫使用 </li>
          <li>個人資料之類別:包括姓名、手機號碼、聯絡地址等個人資料中之識別類資訊 </li>
          <li>個人資料利用之期間、地區、對象及方式: 
              <ul class="dot">
                <li>期間至2022/7/31 抽獎活動結束且獎項寄送等後續相關程式執行完畢。 </li>
                <li>地區：本國、未受中央目的事業主管機關限制之國際傳輸個人資料之接收者所在地。</li>
                <li>對象：本公司、本公司委託者及執行本活動時之必要相關人員。 </li>
                <li>方式：以自動化機器或其他非自動化之利用方式。</li>
              </ul>
          </li>
          <li>依據個資法第三條規定，本活動參與者瞭解，就其所提供之個人資料得行使下列權利: 
              <ul class="dot">
                <li>得向本公司查詢或請求閱覽、請求製給複製本，惟本公司依法得酌收必要成本費用。</li>
                <li>得向本公司請求補充或更正，惟依法本活動參與者應為適當之釋明。 </li>
                <li>得向本公司請求停止蒐集、處理或利用以及請求刪除，惟依法本公司因執行職務或保存證據所必須者，得不依本活動參與者請求為之。 </li>
              </ul>
          </li>
          <li>不提供個人資料所致權益之影響: <br>
              本活動參與者可自由選擇是否提供本公司其個人資料，若拒絕提供相關個人資料，則無法參與本活動；且經檢舉或本公司發現不足以確認本活動參與者的身分真實性或其他個人資料冒用、盜用、資料不實等情形，致本公司無法進行必要之確認作業，本公司有權暫時停止提供本活動相關服務，若有不便之處敬請見諒。 
          </li>
          <li>本人參與本活動即視為本人已瞭解活動主辦方貴公司以上告知事項，並已清楚瞭解貴公司蒐集、處理及利用本人個人資料之目的及用途，並同意貴公司於上述告知事項範圍內，得蒐集、處理、國際傳遞及利用本人資料。 </li>
        </ol>
      </div>
      <PrimaryButton class="mgt-2" text="我同意" @click.native="popupShow=false;agree=true"></PrimaryButton>
    </PopUp>
    <PopUp v-if="registerStatus">
      <p class="mgt-1 text-center">{{registerResult}}</p>
      <PrimaryButton class="mgt-1" text="前往活動首頁" @click.native="registerStatus=false;$router.push({name:'mainMenu'})" v-if="registerResult==='註冊成功'||registerResult==='用戶已註冊過'"></PrimaryButton>
      <PrimaryButton class="mgt-1" text="關閉" @click.native="registerStatus=false" v-else></PrimaryButton>
    </PopUp>
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import PrimaryButton from '@/components/PrimaryButton'
  import SecondaryButton from '@/components/SecondaryButton'
  import ErrorText from '@/components/ErrorText'
  import PopUp from '@/components/PopUp'
  import {register} from '@/api/index'
  //使用表單驗證
  export default {
    data(){
      return{
        popupShow:false,
        genderOption:[
          {
            value: '男',text:'男'
          },
          {
            value: '女',text:'女'
          }
        ],
        yearOption:[ 
        ],

        name:'',
        email:'',
        gender:'',
        birthYear:'',
        agree: false,
        registerStatus: false,
        registerResult: ''

      }
    },
    methods:{
      onSubmit(){
        this.$store.dispatch('changeLoading',true)
        let data={
          "lineToken": window.localStorage.getItem('userToken'),
          "name": "test",
          "email": "test@example.com",
          "phone": "0911222333",
          "gender": "男",
          "birthYear": "1990",
          "birthMonth": "01",
          "birthDay": "01",
          "favoriteStore": "寶雅"
        }
        register(data)
        .then((res)=>{
          this.$store.dispatch('changeLoading',false)
          if(res?.msg==='註冊成功'){
            window.localStorage.setItem('jwt',res.data.token)
          }
          this.registerStatus=true
          this.registerResult=res?.msg
        })
        .catch((err)=>{
          this.$store.dispatch('changeLoading',false)
          this.registerStatus=true
          this.registerResult=err?.response?.data?.msg
        })
      },
      inputUpdate(refName,value){
        this[refName] = value;
      },
      yearOptionInit(){
        let start=1900
        let end= new Date().getFullYear()
        for(let i=end;i>=start;i--){
          this.yearOption.push({value:i,text:i})
        }
      }
    },
    mounted(){
      this.yearOptionInit()
    },
    components:{
      ContentBlock,
      PrimaryButton,
      SecondaryButton,
      Title,
      ErrorText,
      PopUp
    }
  }
  
</script>
<style scoped>
  .agree{
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 3.74vw;
    line-height: 5.6vw;
  }
  .agree span{
    width: 4.27vw;
    height: 4.27vw;
    display: inline-block;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 1vw;
    position: relative;
  }
  .agree span::after{
    content: '';
    width: 3vw;
    height: 3vw;
    display: inline-block;
    border-radius: 50%;
    background-color: var(--primary);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
  }
  input[type='checkbox']:checked +.agree span::after{
    transform: translate(-50%,-50%) scale(1);
  }
  .underline{
    text-decoration: underline;
    cursor: pointer;
  }
  .scroll-frame{
    max-height: 50vh;
    overflow-y: auto;
    font-weight: 500;
    font-size: 3.74vw;
    line-height: 5.6vw;
  }
</style>