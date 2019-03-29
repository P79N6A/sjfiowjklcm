<template>
  <div class="page_content_wrap">
    <div class="page_content_wrap_tab">
      <div class="tab" @click="selectTab('PHONE')" :class="{act:type=='PHONE'}">短信重置</div>
      <div class="tab" @click="selectTab('EMAIL')" :class="{act:type=='EMAIL'}">邮箱重置</div>
    </div>
    <div class="page_content_wrap_body">
      <div class="user-personal-update-box" v-show="type=='PHONE'">
        <div class="user-personal-update-list">
          <input class="user-personal-input" type="text" v-model="phone.phone" placeholder="请输入手机号码" maxlength="11">
          <span class="user-personal-label">手机号码</span>
          <i class="iconcent"></i>
        </div>
      </div>
      <div class="user-personal-update-box" v-show="type=='EMAIL'">
        <div class="user-personal-update-list">
          <input class="user-personal-input" type="text" v-model="phone.email" placeholder="请输入电子邮箱">
          <span class="user-personal-label">电子邮箱</span>
          <i class="iconcent"></i>
        </div>
      </div>
      <div class="user-personal-update-box">
        <div class="user-personal-update-list">
          <input class="user-personal-input" type="text" v-model="phone.code" placeholder="请输入验证码" maxlength="4">
          <span class="user-personal-label">验证码</span>
          <img class="valiimg" width="100" :src="validateImage" @click="GET_VALIDATE"/>
        </div>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" @click="subimtPay">重置支付密码</button>
      </div>
    </div>
  </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {SETTING} from "@/assets/data"
  import {payForgot} from '@/controls/auth/payForgot'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    mixins:[payForgot],
    data() {
      return {
        SETTING,
        selectTyle:[
          {id:"PHONE",name:"短信重置",icon:"icon_mobile.png"},
          {id:"EMAIL",name:"邮箱重置",icon:"icon_mail02.png"}
        ],
        // 当前选中的找回方式
        type: "PHONE",
      }
    },
    watch:{
    },
    computed:{
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      getIcon(val){
        return require('./images/'+val);
      },
      subimtPay() {
        // 判断当前找回支付密码的方式
        if(this.type == 'PHONE'){
          this.phone.pipe = 'PHONE'; // 设置找回方式
          // 通过手机找回
          this.findBySms(this.phone).then(res=>{
            window.toast(res.message)
          }).catch(err=>{
            console.log(err);
            window.toast(err.message)
          })
        }
        else{
          this.phone.pipe = 'EMAIL'; // 设置找回方式
          // 通过邮件找回
          this.findByEmail(this.phone).then(res=>{
            window.toast(res.message)
          }).catch(err=>{
            console.log(err);
            window.toast(err.message)
          })
        }
      },
      selectTab(val){
        this.type = val
      }
    },
    components:{
    },
    created() {
      this.GET_VALIDATE
    },
  }
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.page_content_wrap_tab{
  height: r(120);
  background: #fff;
  box-shadow: inset 0 -1px 0 0 rgba($color: #ddd, $alpha: .6);
  display: flex;
  .tab{
    font-family: PingFangSC-Regular;
    flex: 1;
    @include f(30px);
    color: #303030;
    text-align: center;
    line-height: r(120);
    border-bottom: 2px solid transparent;
    &.act{
      border-bottom: 2px solid $cl1;
      color: $cl1;
    }
  }
}
.page_content_wrap_body{
    background: #f7f7f7;
    padding-top: r(20);
    .user-personal-update-box{
      margin-bottom: r(20);
      border-top: 1px solid rgba($color: #ddd, $alpha: .6);
      background: #fff;
      .user-personal-update-list{
        position: relative;
        .user-personal-label{
          position: absolute;
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(51);
          top: 50%;
          transform: translateY(-50%);
          left: r(30);
        }
        .user-personal-input{
          width: 100%;
          height: r(100);
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #000;
          line-height: r(100);
          border: none;
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          padding: 0 r(30) 0 r(230);
        }
        .eyes{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .valiimg{
          position: absolute;
          right: r(20);
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .user-personal-update-btn{
      width: 100%;
      position: absolute;
      bottom: r(100);
      text-align: center;
      .btn{
        width: 94%;
        // margin: 0 auto;
        background:$cl1;
        color: #fff;
        height: r(94);
        line-height: r(94);
        text-align: center;
        @include f(32px);
        letter-spacing: 2px;
        font-family: PingFangSC-Regular;
        border-radius: 5px;
      }
    }
  }
</style>
