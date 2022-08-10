<template>
  <div class="">
    <div class="card-b mgt-sm-b d-flex-b">
      <div class="review-image">
        <div class="noImg" v-if="!infos.imageUrl">無圖片</div>
        <img v-if="infos.imageUrl" :src="infos.imageUrl" alt="">
      </div>
      <div class="infos">
        <div class="tag">{{infos.type}}</div>
        <div class="input-group mgt-sm-b">
          <p>Token：{{infos.lineToken}}</p>
        </div>
        <div class="input-group">
          <p>登錄發票時間：{{infos.createdAt}}</p>
        </div>
        <div class="input-group">
          <p>最後編輯：{{infos.updatedAt}}</p>
        </div>
        <hr class="mgt-xs-b">
        <div class="input-group d-flex align-items-center mgt-xs-b">
          <label>發票號碼</label>
          <input type="text" class="input-style-light" readonly :value="infos.invoiceNumber">
        </div>
        <div class="input-group d-flex align-items-center" v-if="infos.type==='電子發票'">
          <label>發票隨機碼</label>
          <input type="text" class="input-style-light" readonly :value="infos.randomCode">
        </div>
        <div class="input-group d-flex align-items-center">
          <label>發票日期</label>
          <input type="text" class="input-style-light" readonly :value="infos.invoiceDate">
        </div>
        <template v-if="infos.type==='電子發票'">
          <div class="input-group d-flex align-items-center">
            <label>登錄狀態</label>
            <input type="text" class="input-style-light" readonly :value="infos.status">
          </div>
          <div class="input-group d-flex align-items-center">
            <label>購買通路</label>
            <input type="text" class="input-style-light" readonly :value="infos.storeName">
          </div>
          <div class="input-group d-flex align-items-center">
            <label>品項金額</label>
            <input type="text" class="input-style-light" readonly :value="infos.price">
          </div>
        </template>
        <template v-else>
          <template v-if="canRevise===true">
            <div class="input-group d-flex align-items-center">
              <label>審核狀態</label>
              <div class="d-flex align-items-center">
                <El-Radio label="登錄成功" v-model="infos.status">登錄成功</El-Radio>
                <El-Radio label="登錄失敗" v-model="infos.status">登錄失敗</El-Radio>
              </div>
            </div>
            <template v-if="infos.status==='登錄成功'">
              <div class="input-group d-flex align-items-center">
                <label>購買通路</label>
                <select class="input-style-light" v-model="infos.storeName">
                  <option value="全聯實業股份有限公司">全聯</option>
                  <option value="統一超商股份有限公司">統一超商</option>
                  <option value="家福股份有限公司">家樂福</option>
                  <option value="全家便利商店股份有限公司">全家便利商店</option>
                  <option value="大潤發股份有限公司">大潤發</option>
                  <option value="萊爾富股份有限公司">萊爾富</option>
                  <option value="惠康百貨股份有限公司">惠康百貨</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div class="input-group d-flex align-items-center">
                <label>品項金額</label>
                <input type="text" class="input-style-light" v-model="infos.price">
              </div>
            </template>
            <div class="input-group d-flex align-items-center" v-if="infos.status==='登錄失敗'">
              <label>請選擇<br>失敗原因</label>
              <div class="d-flex align-items-center flex-wrap radio-g">
                <El-Radio label="00001" v-model="failCode">未購買活動商品</El-Radio>
                <El-Radio label="00004" v-model="failCode">圖片資訊不足，請重新上傳</El-Radio>
                <El-Radio label="00002" v-model="failCode">不符合活動期間</El-Radio>
                <El-Radio label="00005" v-model="failCode">發票類型錯誤，請重新上傳</El-Radio>
                <div class="d-flex align-items-center other">
                  <El-Radio label="00006" v-model="failCode">其他：</El-Radio>
                  <input type="text" class="input-style-light" v-model="otherMessage">
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="input-group d-flex align-items-center">
              <label>審核狀態</label>
              <input type="text" class="input-style-light" readonly :value="infos.status">
            </div>
            <div class="input-group d-flex align-items-center" v-if='infos.status==="登錄成功"'>
              <label>購買通路</label>
              <input type="text" class="input-style-light" readonly :value="infos.storeName">
            </div>
            <div class="input-group d-flex align-items-center" v-if='infos.status==="登錄成功"'>
              <label>品項金額</label>
              <input type="text" class="input-style-light" readonly :value="infos.price">
            </div>
            <div class="input-group d-flex align-items-center">
              <label>失敗原因</label>
              <input type="text" class="input-style-light" readonly :value="infos.failMessage">
            </div>
          </template>
        </template>
        <div class="input-group d-flex align-items-center mgt-sm-b">
          <AdminButton
            class="text-center"
            text="返回" 
            bgColor="#fff"
            color="var(--primary-b)"
            borderColor="var(--primary-b)"
            size="1"
            @click.native="$router.go(-1)">
          </AdminButton>
          <!-- <AdminButton
            class="text-center mgl-sm-b"
            text="刪除" 
            bgColor="var(--primary-b)"
            color="#fff"
            borderColor="var(--primary-b)"
            size="1">
          </AdminButton> -->
          <AdminButton
            v-if="canRevise"
            class="text-center mgl-sm-b"
            text="儲存" 
            bgColor="var(--primary-b)"
            color="#fff"
            borderColor="var(--primary-b)"
            size="1"
            @click.native="updateValid"
            >
          </AdminButton>
        </div>
      </div>
    </div>
    <transition name="fade">
      <PopUp v-if="updataModal">
        <h4 class="text-center">是否確定登錄狀態，儲存後不得修改</h4>
        <div class="d-flex align-items-center justify-content-center mgt-sm-b">
          <AdminButton
            class="text-center"
            text="確定" 
            bgColor="var(--primary-b)"
            color="#fff"
            borderColor="var(--primary-b)"
            size="1" @click.native="updateData">
          </AdminButton>
          <AdminButton
            class="text-center mgl-sm-b"
            text="取消" 
            bgColor="#fff"
            color="var(--primary-b)"
            borderColor="var(--primary-b)"
            size="1" @click.native="updataModal=false">
          </AdminButton>
        </div>
      </PopUp>
    </transition>
  </div>
</template>
<script>
  
  import AdminButton from '@/components/admin/AdminButton'
  import {invoiceDetail,invoiceUpdate} from '@/api/index'
  import PopUp from '@/components/admin/PopUp'
  export default {
    data(){
      return{
       infos:'',
       failCode:'',
       otherMessage:'',
       canRevise: false,
       valid: true,
       updataModal: false
      }
    },
    methods:{
      getData(){
        invoiceDetail(this.$route.query.invoiceId)
        .then((res)=>{
          console.log(res)
          this.infos=res?.data?.data
          if(this.infos.status==='待審核'){
            this.canRevise=true
          }else{
            this.canRevise=false
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      updateValid(){
        this.valid=true
        if(this.infos.status==='待審核'||this.infos.status===''){
            this.valid=false
            this.$message({
              message: '請填寫審核狀態',
              type: 'warning',
              duration: 3000
            })
        }
        if(this.infos.status==='登錄成功'){  
            var errText=''
            var text=[]
            if(!this.infos.storeName||!this.infos.price){
              this.valid=false
              if(!this.infos.storeName ){
                text.push('購買通路')
              }
              if(!this.infos.price){
                text.push('品項金額')
              }
              errText='請填寫'+text.join("、")           
              this.$message({
                message: errText,
                type: 'warning',
                duration: 3000
              })
            }
        }
        if(this.infos.status==='登錄失敗'){
          if(!this.failCode){
            this.valid=false
            this.$message({
              message: "請填寫失敗原因",
              type: 'warning',
              duration: 3000
            })
          }else{
            if(this.failCode==='00006' && !this.otherMessage){
              this.valid=false
              this.$message({
                message: "請填寫其他失敗原因",
                type: 'warning',
                duration: 3000
              })
            }
          }
        }
        if(this.valid===true){
          this.updataModal=true
          // this.updateData()
        }
      },
      updateData(){
        var status=this.infos.status
        let data;
        if(status==='登錄成功'){
          data={
            "status": this.infos.status,
            "storeName": this.infos.storeName,
            "price": this.infos.price,
            "failCode": '',
            "failMessage": ''
          }
        }
        if(status==='登錄失敗'){
           data={
            "status": this.infos.status,
            "storeName": '',
            "price": '',
            "failCode": this.failCode,
            "failMessage": this.formatFailMessage(this.failCode,this.otherMessage)
          }
        }
       
        invoiceUpdate(this.$route.query.invoiceId,data)
        .then((res)=>{
          if(res.msg==='更新成功'){
             this.$message({
                message: "更新成功",
                type: 'success',
                duration: 3000
              })
              this.canRevise=false
             
          }
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      formatFailMessage(failCode, failMessage){
          switch (failCode) {
              case '00001':
                  return '未購買活動商品'
              case '00002':
                  return '不符合活動期間'
              case '00003':
                  return '發票重複登錄'
              case '00004':
                  return '圖片資訊不足，請重新上傳'
              case '00005':
                  return '發票類型錯誤，請重新上傳'
              case '00006':
                  return failMessage
          }
      }
    },
    computed:{
    
    },
    components:{
      AdminButton,
      PopUp
     
    },
    created(){
      
      this.getData()
    }
  }
  
</script>

