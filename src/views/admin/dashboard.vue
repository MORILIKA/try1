<template>
  <div class="">
    <div class="d-flex align-items-center mgt-sm-b">
      <El-DatePicker
        class="input-style-b"
        v-model="datepick"
        type="daterange"
        range-separator="至"
        start-placeholder="起始日"
        end-placeholder="结束日"
        value-format="yyyy-MM-dd"
        :clearable=false
        size="small"
        align="center">
      </El-DatePicker>
      <AdminButton 
        class="mgl-sm-b"
        text="查詢" 
        bgColor="var(--primary-b)"
        color="#fff"
        borderColor="var(--primary-b)"
        size="1" @click.native="getData">
      </AdminButton>
      <AdminButton 
        class="mgl-sm-b"
        text="清除" 
        bgColor="#fff"
        color="var(--primary-b)"
        borderColor="var(--primary-b)"
        size="1"
        @click.native="cleanData"
        >
      </AdminButton>
    </div>
    <div class="card-b mgt-sm-b">
      <h3>活動數據總覽</h3>
      <div>
        <ul class="dashboard-card mgt-xs-b">
          <li>
            <h3>總登錄發票數</h3>
            <h2>{{dashboard.registeredInvoices}}<span class="unit">張</span></h2>
          </li>
          <li>
            <h3>登錄成功發票數</h3>
            <h2>{{dashboard.registeredSuccessfulInvoices}}<span class="unit">張</span></h2>
          </li>
          <li>
            <h3>登錄成功人數</h3>
            <h2>{{dashboard.successfulUsers}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>活動品項累積金額</h3>
            <h2>{{dashboard.sumPrice}}<span class="unit">元</span></h2>
          </li>
           <li>
            <h3>電子發票張數<br><span>（登錄成功）</span></h3>
            <h2>{{dashboard.successfulElectricInvoice}}<span class="unit">張</span></h2>
          </li>
           <li>
            <h3>雲端載具張數<br><span>（登錄成功）</span></h3>
            <h2>{{dashboard.successfulCloudInvoice}}<span class="unit">張</span></h2>
          </li>
           <li>
            <h3>傳統發票張數<br><span>（登錄成功）</span></h3>
            <h2>{{dashboard.successfulTraditional}}<span class="unit">張</span></h2>
          </li>
        </ul>
      </div>
    </div>
     <div class="card-b mgt-sm-b">
      <h3>參與者年齡</h3>
      <div>
        <ul class="dashboard-card mgt-xs-b">
          
          <li>
            <h3>15歲以下</h3>
            <h2>{{ageArray[0]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>16-25歲</h3>
            <h2>{{ageArray[1]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>26-35歲</h3>
            <h2>{{ageArray[2]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>36-45歲</h3>
            <h2>{{ageArray[3]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>46-55歲</h3>
            <h2>{{ageArray[4]}}<span class="unit">人</span></h2>
          </li>
           <li>
            <h3>56-65歲</h3>
            <h2>{{ageArray[5]}}<span class="unit">人</span></h2>
          </li>
           <li>
            <h3>66歲以上</h3>
            <h2>{{ageArray[6]}}<span class="unit">人</span></h2>
          </li>
          
        </ul>
      </div>
    </div>
     <div class="card-b mgt-sm-b">
      <h3>參與者性別</h3>
      <div>
        <ul class="dashboard-card mgt-xs-b">
          <li>
            <h3>男性</h3>
            <h2>{{gender[0]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>女性</h3>
            <h2>{{gender[1]}}<span class="unit">人</span></h2>
          </li>
          <li>
            <h3>不提供</h3>
            <h2>{{gender[2]}}<span class="unit">人</span></h2>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import AdminButton from '@/components/admin/AdminButton'
  import {getDashboard} from '@/api/index'
  export default {
    data(){
      return{
       datepick:[],
       dashboard:{},
       ageArray:[],
       gender:[]
      }
    },
    methods:{
     getData(){
       let params={
          startDate: this.datepick[0]?this.datepick[0]:null,
          endDate: this.datepick[1]?this.datepick[1]:null,
        }
        getDashboard(params)
        .then((res)=>{
          this.dashboard=res?.data?.data
          this.ageArray=this.dashboard.agesChart.map(element => {
            return element[1]
          });
          this.gender=Object.values(this.dashboard.genders)
          console.log(this.dashboard)
        })
        .catch((err)=>{
          console.log(err)
        })
     },
     cleanData(){
       this.datepick[0]=''
       this.datepick[1]=''
     }
    },
    computed:{

    },
    components:{
      AdminButton
    },
    mounted(){
       this.getData()
     
      
    }
  }
  
</script>
