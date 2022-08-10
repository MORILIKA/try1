<template>
  <div>
    <ContentBlock>
      <Title titleText="中獎名單"></Title>
      
      <div class="pd-frame-1 mgt-1"> 
        <Collapes class="winnerList" v-for="(list,index) in winnerList" :key="index" :title="`${list.revealedDate} 中獎名單`">
          <template v-for="(content,contentIndex) in list.categories">
            <div :key="'c-'+contentIndex">
              <p>{{content.category}}</p>
              <ul class="dot">
                <template v-for="(winner,winnerIndex) in content.users">
                  <li :key="'w-'+winnerIndex">中獎人: {{winner.name}}</li>
                  <li :key="'wn-'+winnerIndex">中獎發票號碼: {{winner.invoiceNumber}}</li>
                </template>
              </ul>
            </div>
          </template>
          <p class="text-center" v-if="list.categories.length===0">尚未抽獎，敬請期待</p>
        </Collapes>
        <div>
          <p class="text-center mgt-1" v-if="winnerList.length===0">目前尚未抽獎</p>
        </div>
        <SecondaryButton text="回到首頁" class="mgt-1" @click.native="$router.push({name:'mainMenu'})"></SecondaryButton>
      </div>
    </ContentBlock>
    
  </div>
</template>

<script>
  import ContentBlock from '@/components/ContentBlock'
  import Title from '@/components/Title'
  import SecondaryButton from '@/components/SecondaryButton'
  import Collapes from '@/components/Collapes'
  import {winnerList} from '@/api/index'
  export default {
    data(){
      return{
        winnerList:[]
      }
    },
    methods:{
      
    },
    created(){
      this.$store.dispatch('changeLoading',true)
      winnerList()
      .then((res)=>{
        this.winnerList=res?.data?.data
        this.$store.dispatch('changeLoading',false)
      })
      .catch(()=>{
         this.$store.dispatch('changeLoading',false)
      })
    },
    components:{
      ContentBlock,
      Title,
      SecondaryButton,
      Collapes
     
    }
  }
  
</script>
<style>
  .winnerList .head{
    justify-content: flex-start;
    padding-left: 3.2vw;
    padding-right: 3.2vw;
    border: 2px solid var(--secondary);
  }
  .winnerList .icons{
    right: 3.2vw;
  }
  .winnerList {
    color: #000;
  }
  .winnerList+.winnerList{
    margin-top: 2vw;
  }
  .winnerList ul{
    padding-left: 11vw;
  }
</style>