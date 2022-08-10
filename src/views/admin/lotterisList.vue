<template>
  <div class="">
     <AdminButton 
        class="mgt-sm-b"
        text="下載範例" 
        bgColor="var(--secondary-b)"
        color="#fff"
        borderColor="var(--secondary-b)"
        size="1"
        @click.native="getExample"
        >
      </AdminButton>
    <div class="card-b mgt-sm-b">
     
      <ul class="userlist">
        <li>
          <h4>2022/04/20 中獎名單</h4>
          <input type="file" hidden id="upload" @change="updateFile">
          <label for="upload">
            <AdminButton 
            class="mgl-sm-b"
            text="上傳名單" 
            bgColor="var(--secondary-b)"
            color="#fff"
            borderColor="var(--secondary-b)"
            size="1"
            >
            </AdminButton>
          </label>
          
          <div class="mgl-sm-b">
            <p>檔案：<span class="downloadLink">卡廸那_0420_中獎名單.xlsx</span><El-Icon class="el-icon-close delete-icon"></El-Icon></p>
          </div>
            
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import AdminButton from '@/components/admin/AdminButton'
  import {getlotteris} from '@/api/index'
  export default {
    data(){
      return{
       uploadfile:''
      }
    },
    methods:{
      getExample(){
        this.axios.post(process.env.VUE_APP_APIURL+'/admin-api/v1/auth/lotteries/download-template',null,{
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
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = '中獎名單範例.xlsx'
            link.click()
          }
        })
        .catch((err)=>{
          
          console.log(err)
        })
      },
      updateFile(e){
        let self=this
        
        if(e.target.files[0]){
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = (e) => {
            self.uploadfile=e.target.result
            self.uploadFile()
          }
          reader.onerror = function (error) {
              console.error('Error: ', error)
          }
        }
        
      },
      uploadFile(){
        let data={
          file: this.uploadfile
        }
        this.axios.post(process.env.VUE_APP_APIURL+'/admin-api/v1/auth/lotteries/upload-winners',data,{
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('backJWT')}`,
          }
        })
        .then((res)=>{
          console.log(res)
          if(res?.data?.msg==="上傳成功"){
             this.$message({
                message: "上傳成功",
                type: 'success',
                duration: 3000
              })
            this.getList()
          }
         
          
        })
        .catch((err)=>{
          console.error('出現異常錯誤，請稍候重新嘗試')
          console.log(err)
        })
      },
      getList(){
        getlotteris()
        .then((res)=>{
          console.log(res)
         
         
          
        })
        .catch((err)=>{
          console.error('出現異常錯誤，請稍候重新嘗試')
          console.log(err)
        })
      }
    },
    
    
    computed:{
      
    },
    components:{
      AdminButton
    },

  }
  
</script>
