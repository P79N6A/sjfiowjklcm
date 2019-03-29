<template>
  <!--绑定银行卡{-->
  <div id="page-bindcard">
    <bank-list :showAdd="true"></bank-list>
    <div class="btn_wrap logout_btn_wrap"   @click="$store.dispatch('LOGIN_OUT')">
      <a href="javascript:void(0);" class="btn btn01 btn_logout"
        >安全退出</a>
    </div>
  </div>
  <!--}绑定银行卡-->
</template>
<script>
  import {logOut} from '@/api/authService';
  import bankList from 'mobile/components/bank-list/index';
  export default {
    data () {
      return {

      }
    },
    components:{
      bankList
    }
  }
</script>
