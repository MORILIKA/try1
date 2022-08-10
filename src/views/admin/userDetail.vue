<template>
  <div class="">
    <div class="top-area">
      <div>
        <h5>姓名：{{userInfo.name}}</h5>
        <h5 class="mgt-xs-b">Token: {{userInfo.lineToken}}</h5>
        <div class="d-flex align-items-center mgt-xs-b">
            <h5>抽獎狀態：</h5>
            <El-Radio label="未中獎" v-model="userInfo.lotteryStatus">未中獎</El-Radio>
            <El-Radio label="已中獎" v-model="userInfo.lotteryStatus">已中獎</El-Radio>
        </div>
        <div class="d-flex align-items-center mgt-xs-b">
          <AdminButton
            class="text-center"
            text="返回" 
            bgColor="#fff"
            color="var(--primary-b)"
            borderColor="var(--primary-b)"
            size="1"
            @click="$router.go(-1)"
            >
          >
          </AdminButton>
          <AdminButton
            class="text-center mgl-sm-b"
            text="儲存" 
            bgColor="var(--primary-b)"
            color="#fff"
            borderColor="var(--primary-b)"
            size="1"
            @click.native="updateData"
            >
          >
          </AdminButton>
        </div>
      </div>
    </div>
    <div class="card-b table-area">
      <div>
        <div class="d-flex-b flex-between">
          <h3>發票登錄歷程</h3> 
          <h6>累計消費金額{{userInfo.sumPrice}}元</h6>
        </div>
        
      </div>
      <div>
        <El-Table
          :data="tableData"
          style="width: 100%;overflow-x:auto"
          class="mgt-xs-b"
          stripe
          scroll>
          <El-TableColumn
            prop="status"
            label="審核狀態"
            sortable>
            <template slot-scope="scope">
              <div class="square" :class="{'warn': scope.row.status==='待審核','dark':scope.row.status==='登錄失敗','success':scope.row.status==='登錄成功'}">{{scope.row.status}}</div>
            </template>
          </El-TableColumn>
          <El-TableColumn
            prop="invoiceNumber"
            label="發票號碼"
            sortable>
          </El-TableColumn>
          <El-TableColumn
            prop="createdAt"
            label="登錄時間"
            sortable>
          </El-TableColumn>
          <El-TableColumn
            prop="price"
            label="消費金額"
            sortable>
          </El-TableColumn>
          
        </El-Table>
      </div>
      
      <!-- <div class="mgt-xs-b flex-between">
        <h5>顯示第1至10項結果，共15,984項</h5>
        <El-Pagination
          layout="prev, pager, next"
          :total="1000">
        </El-Pagination>
      </div> -->
    </div>
  </div>
</template>
<script>

  import AdminButton from '@/components/admin/AdminButton'
  import {userDetail,userUpdate} from '@/api/index'
  export default {
    name: 'userDetail',
    data(){
      return{
        getPrize:'',
        userInfo:'',
        tableData: [
        // {
        //   "id": 1,
        //   "lotteryStatus": "未中獎",
        //   "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
        //   "name": "陳先生",
        //   "email": "test@example.com",
        //   "phone": "0911222333",
        //   "gender": "男",
        //   "birthYear": "1992",
        //   "birthMonth": "02",
        //   "birthDay": "01",
        //   "totalInvoicesCount": 2,
        //   "successfulInvoiceCount": 2,
        //   "sumPrice": 300,
        //   "totalPoints": 20.1,
        //   "remainPoints": 10.5,
        //   "firstAttendedAt": "2022-01-01 11:11:11"
        // }
       ],
       datepick:'',
       datepickPrize:''
      }
    },
    methods:{
      getData(){
        userDetail(this.$route.query.userId)
        .then((res)=>{
          console.log(res)
          this.userInfo=res?.data?.data
          this.tableData=res?.data?.data?.invoices
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      updateData(){
        let data={
          "lotteryStatus": this.userInfo.lotteryStatus
        }
        userUpdate(this.$route.query.userId,data)
        .then((res)=>{
          if(res?.msg==='更新成功'){
            this.$message({
              message: "更新成功",
              type: 'success',
              duration: 3000
            })
          }
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })

      }
    },
    computed:{
      
    },
    components:{
      AdminButton
    },
    created(){
      this.getData()
    }
  }
  
</script>
