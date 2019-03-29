<template>
  <div class="wrapcards agent-index">
    <div  v-for="item in list" :class="['box',getClass(item)]" :key="item.bankno">
      <div :class="['bank_card_info',getClass(item)]">
        <h2 class="bankname">{{item.bankname}}</h2><span
        class="acctnumber">**** **** **** {{item.bankno}}</span><span
        class="acctname">持卡人：{{userData.accountName}}</span></div>
    </div>
    <div class="box" @click="add" v-if="list.length<3">
      <div class="add">
        <p class="text"><span class="iconyg yg-jiahao"></span>添加银行卡</p>
      </div>
    </div>

    <el-dialog
      title="绑定银行卡"
      :visible.sync="dialogVisible"
      width="500px">
        <addBank v-model="showAdd"></addBank>
    </el-dialog>
  </div>
</template>
<script>
  import {findUserBankList, validateBankNo, bindBankNo} from "@/api/payment"
  import {mapGetters} from 'vuex'
  import addBank from "./components/add"
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
        dialogVisible:false
      }
    },
    props: {
      text: {
        type: String,
        default: ""
      }
    },
    methods: {
      add(){
        if(!this.userData.accountName) {
          window.toast('请先完善个人资料!','warning')
        }
        else {
          this.dialogVisible=true
        }
      },
    },
    computed: {
      ...mapGetters(["userData"])
    },
    activated(){
      this.getBankList()
    },
    components:{
      addBank
    },
    created(){
      this.$bus.$on('refreshBankList', (eventData) => {
        this.getBankList()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .wrapcards {
    overflow: hidden;
    width: 100%;
    margin: 0 auto 40px;
    padding-bottom: 40px;
    .box {
      width:50%;
      float:left;
      margin-bottom:30px;
      text-align:center;
      .bank_card_info{
        height: 188px;
        width:320px;
        display:inline-block;
        vertical-align: top;
        border-radius: 18px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.bg1{ background-image: url("./images/01.jpg");}
        &.bg2{ background-image: url("./images/02.jpg");}
        &.bg3{ background-image: url("./images/03.jpg");}
        &.bg4{ background-image: url("./images/04.jpg");}
        &.bg5{ background-image: url("./images/05.jpg");}
        &.bg6{ background-image: url("./images/06.jpg");}
        &.bg7{ background-image: url("./images/07.jpg");}
        &.bg8{ background-image: url("./images/08.jpg");}
        &.bg9{ background-image: url("./images/09.jpg");}
        &.bg10{ background-image: url("./images/10.jpg");}
        &.bg11{ background-image: url("./images/11.jpg");}
        &.bg12{ background-image: url("./images/12.jpg");}
        &.bg13{ background-image: url("./images/13.jpg");}
        background-size: contain;
        h2 {
          margin: 18px auto 20px;
          font-weight: normal;
          color: #FFFFFF;
          font-size: 16px;
          padding: 15px 20px;
          border-bottom: solid 1px #fff;
          display: block;
        }
        .acctnumber, .acctname {
          font-weight: normal;
          color: #fff;
          font-size: 16px;
          margin-left: 18px;
          display: block;
          margin-top: 20px;
        }
      }
      .add{
        height: 188px;
        width:320px;
        display:inline-block;
        border: solid 1px #ccc!important;
        cursor: pointer;
        background: #ebebeb;
        border-radius: 18px;
        color:#a8a8a8;
        .text{
          margin-top:22%;
          font-size:16px;
          .iconyg{
            display:inline-block;
            // margin-top:20px;
            font-size:30px;
            color: #ed7e12;
            margin-right: 10px;
          }
        }
      }

    }
  }

</style>
