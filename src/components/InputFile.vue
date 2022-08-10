<template>
    <ValidationProvider v-slot="{ errors }" rules="required|image" :ref="refName">
      <input type="file" hidden id="upload" accept="image/png, image/jpeg" @change="uploadPreiview($event)">
      <label for="upload"><PrimaryButton :text="labelText"></PrimaryButton></label>
      <div class="preview-image mgt-2" v-if="infos.image">
        <img :src="infos.preview" alt="">
      </div>
      <ErrorText :text="errors[0]"></ErrorText>
    </ValidationProvider>
</template>

<script>
import ErrorText from '@/components/ErrorText'
import PrimaryButton from '@/components/PrimaryButton'


export default {
  props:{
    inputTitle: String,
    refName: String,
    labelText: String,
    styleClass: String
    
  },
  data(){
    return{
      infos:{
        image:'',
        preview:''
      }
    }
  },
  components:{
    ErrorText,
    PrimaryButton
  },
  methods:{
    // 資料回傳
    updateInput(){
      this.$emit('update',this.refName,this.infos); 
    },
    // 上傳圖片預覽
    async uploadPreiview(event){
      let self=this
      let ref=this.$refs
      console.log(this.$refs)
      const { valid } = await ref[this.refName].validate(event);
      if (valid) {
        var input = event.target;
        if (input.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            self.infos.preview = e.target.result;
          }
          self.infos.image=input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      }
      this.updateInput()
    },
  }
}
</script>
