<template>
  <div class="layout_form with_last_border layout_form_readonly sec_box">
    <form action="#">
      <div class="form_field_warp">
        <div class="form_field">
          <span class="form_field_label">真实姓名</span>
          <div class="form_field_input"><input type="text" :value="userData.accountName" readonly=""></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">手机号码</span>
          <div class="form_field_input"><input type="text" :value="userData.phone" readonly=""></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">邮箱地址</span>
          <div class="form_field_input"><input type="text" :value="userData.email" readonly=""></div>
        </div>
      </div>
      <div class="form_tip small_form_tip"
           v-clipboard:copy="userData.referWebsite" v-clipboard:success="onCopy"  v-clipboard:error="onError"
      >
        推广网址：{{userData.referWebsite}}（按此区域复制）
      </div>
    </form>
  </div>
</template>

<script>
  import  {copy} from "@/vue-extend/mixins/index"
  export default {
    mixins:[copy],
    data () {
      return {}
    },
    computed:{
      userData(){
        return this.$store.getters.userData;
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.form_field{
  position: relative;
  height: r(42*2);
  line-height: r(42*2);
  border-bottom: 1px solid #ccc;
  padding: 0 r(12);
  margin-bottom: r(16);
  background: #fff;
  .form_field_label {
    display: block;
    float: left;
    width: r(100*2);
    height: 100%;
    color: #666;
    padding-left: r(8);
  }
  .form_field_input {
    background-size: 10px 6px;
    position: relative;
    overflow: hidden;
    margin: 0 0 0 70px;
    height: 100%;
    white-space: nowrap;
    input {
      display:inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: none;
      color: #999;
      -webkit-appearance: none;
      font-size:1.2em;
    }
  }
}
.form_btn_wrap{
  .btn01, .btn02 {
    width: 100%;
    height: r(30*2);
    line-height: r(30*2);
    color: #fff;
    font-size:1.2em;
    font-weight: 700;
    background: #49a2bc;
    border: none;
    text-decoration: none;
    margin-bottom: r(10);
    display: inline-block;
    text-align: center;
  }
}
.small_form_tip{
  text-align:center;
  margin:2em;
  padding:1em;
  border:dashed 1px $cl1;
  border-radius:0.8em;
}

</style>
