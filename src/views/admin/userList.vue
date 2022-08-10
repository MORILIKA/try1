<template>
  <div class="">
    <div class="top-area">
      <div class="list-items">
        <div class="list-item">
          <h5>抽獎狀態：</h5>
          <select class="input-style-b" name="" id="" v-model="lotteryStatus">
            <option value="">全部</option>
            <option value="未中獎">未中獎</option>
            <option value="已中獎">已中獎</option>
          </select>
        </div>
        <div class="list-item">
          <h5>登錄時間：</h5>
          <El-DatePicker
            class="input-style-b"
            v-model="datepick"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日"
            end-placeholder="结束日"
            :clearable=false
            size="small"
            align="center">
          </El-DatePicker>
        </div>
        <div class="list-item">
          <h5>關鍵字搜尋：</h5>
          <input type="text" class="input-style-b" placeholder="搜尋Token或姓名" v-model="keyword">
        </div>
        <div class="list-item mgt-xs-b flex-between">
          <div class="d-flex">
              <AdminButton 
              class="text-center"
              text="查詢" 
              bgColor="var(--primary-b)"
              color="#fff"
              borderColor="var(--primary-b)"
              size="1"
              @click.native="getData"
              >
            </AdminButton>
            <AdminButton 
              class="text-center mgl-sm-b"
              text="清除" 
              bgColor="#fff"
              color="var(--primary-b)"
              borderColor="var(--primary-b)"
              size="1"
              @click.native="cleanData"
              >
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
    <div class="card-b table-area">
      <div>
        <div class="d-flex-b flex-between">
          <h5>顯示
            <select name="" id="" class="input-style-b" v-model=page.range>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            項結果
          </h5>
          <AdminButton 
            class="text-center"
            text="下載名單" 
            bgColor="var(--secondary-b)"
            color="#fff"
            borderColor="var(--secondary-b)"
            size="1">
          </AdminButton>
        </div>
      </div>
      <El-Table
        :data="tableShowData"
        style="width: 100%"
        class="mgt-xs-b"
        empty-text="沒有符合的項目"
        @sort-change="sortChange"
        stripe
        scroll>
        <El-TableColumn
          prop="lotteryStatus"
          label="抽獎狀態"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="id"
          label="查看"
          width="60px"
          class="text-center"
          >
          <template slot-scope="scope">
            <IconEye @click.native="goDetail(scope.row.id)"></IconEye>
          </template>
        </El-TableColumn>
        <El-TableColumn
          prop="lineToken"
          label="User Token"
          sortable>
          <template slot-scope="scope">
            <div class="token">{{scope.row.lineToken}}</div>
          </template>
        </El-TableColumn>
        <El-TableColumn
          prop="name"
          label="姓名"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="gender"
          label="性別"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="birthYear"
          label="出生年份"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="totalInvoicesCount"
          label="登錄發票數"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="successfulInvoiceCount"
          label="登錄成功發票數"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="sumPrice"
          label="累積消費金額"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="firstAttendedAt"
          label="首次參與日期"
          sortable>
        </El-TableColumn>
      </El-Table>
      <div class="mgt-xs-b flex-between">
        <h5 v-if="page.total!==0">顯示第{{(page.nowPage-1)*page.range+1}}至{{page.total%page.range!==0?(page.nowPage-1)*page.range+page.total%page.range:page.nowPage*page.range}}項結果，共{{page.total}}項</h5>
        <El-Pagination
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.range"
          :current-page="page.nowPage"
          @current-change="changeNowPage"
          @size-change="sizeChange"
          :hide-on-single-page=true
          >
        </El-Pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import IconEye from '@/components/admin/IconEye'
  import AdminButton from '@/components/admin/AdminButton'
  import {userListAdmin} from '@/api/index'
  export default {
    name: 'userList',
    data(){
      return{
       lotteryStatus:'',
       datepick:[],
       keyword:'',
       datepickPrize:'',
       tableData: [
        {
          "id": 1,
          "lotteryStatus": "未中獎",
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "name": "陳先生",
          "email": "test@example.com",
          "phone": "0911222333",
          "gender": "男",
          "birthYear": "1992",
          "birthMonth": "02",
          "birthDay": "01",
          "totalInvoicesCount": 2,
          "successfulInvoiceCount": 2,
          "sumPrice": 300,
          "totalPoints": 20.1,
          "remainPoints": 10.5,
          "firstAttendedAt": "2022-01-01 11:11:11"
        }
       ],
       tableSort:{
         prop:'',
         order:''
       },
       page:{
         total: 8,
         range: 10,
         nowPage: 1,
       },
      }
    },
    methods:{
      goDetail(id){
        this.$router.push({name: 'userDetail',query:{userId: id}})
        console.log(id)
      },
      getData(){
        let params={
          lotteryStatus: this.lotteryStatus,
          startDate: this.datepick[0],
          endDate: this.datepick[1],
          keyword: this.keyword
        }
        userListAdmin(params)
        .then((res)=>{
          this.tableData=res?.data?.data
          this.page.total=res?.data?.data.length
          this.page.nowPage=1
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      cleanData(){
        this.lotteryStatus=''
        this.datepick=''
        this.keyword=''
      },
      changeNowPage(currentPage){
        this.page.nowPage=currentPage
      },
      sizeChange(){
        this.page.nowPage=1
      },
      sortChange(column){
        this.tableSort.prop=column.prop
        this.tableSort.order=column.order
        this.tableData.sort(this.sortCompare(column.prop,column.order))
      },
      sortCompare (propertyName, sort) {
        return function (obj1, obj2) {
          var value1 = obj1[propertyName]
          var value2 = obj2[propertyName]
          if (typeof value1 === 'string' && typeof value2 === 'string') {
            const res = value1.localeCompare(value2, 'zh')
            return sort === 'ascending' ? res : -res
          } else {
            if (value1 <= value2) {
              return sort === 'ascending' ? -1 : 1
            } else if (value1 > value2) {
              return sort === 'ascending' ? 1 : -1
            }
          }
        }
      }
    },
    computed:{
      tableShowData: function(){
        return this.tableData.slice(((this.page.nowPage-1)*this.page.range),(this.page.nowPage*this.page.range))
      }
    },
    components:{
      IconEye,
      AdminButton
    },
    activated(){
      console.log('abc')
      this.getData()
    }
  }
  
</script>
