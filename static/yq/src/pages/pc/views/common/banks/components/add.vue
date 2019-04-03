<template>
  <div>
    <el-form ref="form" :model="bindData" label-width="0">
      <el-form-item>
        <el-input v-model="bindData.cardNo" class="msginput" placeholder="输入卡号自动识别" @input="verifyBankNumber(bindData.cardNo)" maxlength="19">
          <el-button slot="append" v-show="banktxt">{{banktxt}}</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitBind">绑定</el-button>
    </span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import  check from "@/util/RegExp"
  import {bank} from "@/controls/common/bank"
  export default {
    mixins:[bank],
    data() {
      return {
        loadding: false,
        validateBankNo: false,
        showAdd: false,
        list: [],
      }
    },
    methods: {
      submitBind(){      
        this.addBankNo(this.bindData).then(res=>{
          this.$emit('closeDialog',false);
          window.toast(res.message)
        }).catch(err=>{
          window.toast(err.message)
        })
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    activated(){
    },
    components:{
    }
  }
</script>
<style lang="scss" scoped>
.msginput{
    .el-input__inner{
      background-color: #fff!important;
      color: #606266!important;
      border: 1px solid #dcdfe6!important;
    }
  }

</style>
