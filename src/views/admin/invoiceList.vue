<template>
  <div class="">
    <div class="top-area">
      <div class="flex-row-center list-items">
        <h5>發票類型：</h5>
        <div class="flex-row-center">
          <El-CheckBox label="電子發票" v-model="type"></El-CheckBox>
          <El-CheckBox label="雲端載具" v-model="type"></El-CheckBox>
          <El-CheckBox label="傳統發票" v-model="type"></El-CheckBox>
        </div>
      </div>
      <div class="list-items">
        <div class="list-item">
          <h5>狀態：</h5>
          <select class="input-style-b" name="" id="" v-model="status">
            <option value="">全部</option>
            <option value="登錄成功">登錄成功</option>
            <option value="登錄失敗">登錄失敗</option>
            <option value="待審核">待審核</option>
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
          <input type="text" class="input-style-b" placeholder="Token/發票號碼/姓名" v-model="keyword">
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
            <El-Popover
              placement="bottom"
              width="400"
              trigger="click">
              <slot>
                <div class="list-item d-flex-b align-items-center">
                  <h5>登錄日期：</h5>
                  <El-DatePicker
                    class="input-style-b"
                    v-model="datepickPrize"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="起始日"
                    end-placeholder="结束日"
                    :clearable=false
                    size="small"
                    align="center">
                  </El-DatePicker>
                </div>
                <div class="list-item d-flex-b align-items-center">
                  <h5>抽出人數：</h5>
                  <input type="number" class="input-style-b" v-model="prizeCount">
                </div>
                <div class="mgt-xs-b">
                  <AdminButton 
                    text="開始抽獎" 
                    bgColor="var(--secondary-b)"
                    color="#fff"
                    borderColor="var(--secondary-b)"
                    size="1"
                    @click.native="getWinnerList"
                    >
                  </AdminButton>
                  <a :href="download" :download='downloadFileName'>{{downloadFileName}}</a>
                </div>
            </slot>
            <div slot="reference">
                <AdminButton 
                class="text-center mgl-sm-b"
                text="抽獎" 
                bgColor="var(--secondary-b)"
                color="#fff"
                borderColor="var(--secondary-b)"
                size="1">
              </AdminButton>
            </div>
          </El-Popover>
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
          prop="status"
          label="審核狀態"
          sortable>
          <template slot-scope="scope">
            <div class="square" :class="{'warn': scope.row.status==='待審核','dark':scope.row.status==='登錄失敗','success':scope.row.status==='登錄成功'}">{{scope.row.status}}</div>
          </template>
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
          prop="type"
          label="發票類型"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="invoiceNumber"
          label="發票號碼"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="price"
          label="消費金額"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="storeName"
          label="購買通路"
          sortable>
        </El-TableColumn>
        <El-TableColumn
          prop="createdAt"
          label="登錄時間"
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
  import {invoiceListAdmin} from '@/api/index'
  export default {
    name: 'invoiceList',
    data(){
      return{
       type:[],
       status:'',
       datepick:[],
       keyword:'',
       tableData: [
        {
          "id": 1,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345678",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 100,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
         {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄失敗",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 20,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "待審核",
          "type": "傳統發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 60,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 100,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 100,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 100,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 100,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
        },
        {
          "id": 2,
          "lineToken": "U0a2ed7bc927ef3e32d3f57b1c024d4f2",
          "status": "登錄成功",
          "type": "電子發票",
          "invoiceNumber": "AA12345679",
          "randomCode": "1234",
          "imageUrl": "https://example.com/xxx.jpg",
          "price": 80,
          "userName": "陳先生",
          "userEmail": "test@example.com",
          "userGender": "男",
          "userBirthYear": "1992",
          "storeName": "寶雅",
          "storeAddress": "臺北市xx路",
          "createdAt": "2022-01-01 11:11:11"
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
       datepickPrize:[],
       prizeCount:'',
       download:'',
       downloadFileName:''
      }
    },
    methods:{
      goDetail(id){
        this.$router.push({name: 'invoiceDetail',query:{invoiceId: id}})
        let params={
          type: this.type?this.type:[],
          status: this.status,
          startDate: this.datepick[0]? this.datepick[0]:' ',
          endDate: this.datepick[1]?this.datepick[1]:' ',
          keyword: this.keyword,
          page: this.page
        }
        window.sessionStorage.setItem('invoiceParams',JSON.stringify(params))
        
      },
      getData(){
        let params={
          type: this.type,
          status: this.status,
          startDate: this.datepick[0],
          endDate: this.datepick[1],
          keyword: this.keyword
        }
        invoiceListAdmin(params)
        .then((res)=>{
          this.tableData=res?.data?.data
          this.page.total=res?.data?.data?.length
          this.page.nowPage=1
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      cleanData(){
        this.type=[]
        this.status=''
        this.datepick=[]
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
      },
      dataFormat(date){
        let y=date.getFullYear()
        let m=date.getMonth()+1
        let d=date.getDay()
        return y+'/'+m+'/'+d
      },
      getWinnerList(){
        let data={
          "startDate": this.datepickPrize[0],
          "endDate": this.datepickPrize[1],
          "qty": this.prizeCount
        }
        this.axios.post(process.env.VUE_APP_APIURL+'/admin-api/v1/auth/lotteries/draw-winners',data,{
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('backJWT')}`,
            }
        })
        .then((res)=>{
          console.log(res)
          if(res){
            const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          const blob = new Blob([res.data], { type: type, encoding: 'UTF-8' })
          if(blob){
             this.download = window.URL.createObjectURL(blob)
             this.downloadFileName=this.dataFormat(data.startDate)+'-'+this.dataFormat(data.endDate)+'.xlsx'
            }
          }
          
        })
        .catch((err)=>{
          console.log(err)
        })
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
      this.getData()
    }
  }
  
</script>
