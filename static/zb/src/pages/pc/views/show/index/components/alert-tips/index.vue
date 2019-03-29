<template>
  <div class="alert-tips" v-show="show">
    <div class="alert-tips-content">
      <i class="iconfont icon-guanbi iclose" @click="close"></i>
      <div class="content-info">
        <div v-for="text in title" :key="text" class="title">{{text}}</div>
        <div class="conent" v-html="conent"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {checkConfigSystem} from "@/api/show"
  import {$localStorage,$sessionStorage} from "@/util/storage"
  export default {
    data() {
      return {
        myData: {
          itemNo: "type002", //true string
          typeNo: "001",
        },
        title: "",
        conent: "",
        show: false
      };
    },
    watch: {},
    props: {},
    activated() {

    },
    methods: {
      // generateQRCode(url,size){
      //   return   generateQRCode(url,size)
      // },
      close() {
        this.show = false;
        $sessionStorage.set("index_alert", true)
      }
    },
    computed: {},
    created() {
      if (!$sessionStorage.get('index_alert')) {
        checkConfigSystem().then(res => {
          if (res.success) {
            var arydata = res.data.split('#');
            this.title = arydata[0].split('，');
            this.conent = arydata[1];
            this.show = true;
          }
        }).catch(err => {
        })
      }
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  .alert-tips {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
    text-align: center;
    .alert-tips-content {
      background: url("./images/bg.png");
      width: 815px;
      height: 628px;
      display: inline-block;
      margin-top: 10%;
      border-radius: 15px;
      background-size: 100% 100%;
      color: #000;
      padding: 43px 264px 120px 30px;
      position: relative;
      .iclose {
        position: absolute;
        right:56px;
        top: 18px;
        font-size:50px;
        color: #fff;
        cursor: pointer;
        background-color: #0e1a95;
        border-radius: 50%;
      }
      .content-info {
        .title {
          text-align: center;
          font-size: 19px;
          color: #ffe72b;
          white-space: nowrap;
          padding-left: 180px;
          padding-right: 46px;
        }
        .conent{
          font-size: 16px;
          color:#ed7e12;
          line-height: 24px;
          overflow-x: hidden;
          text-align: left;
          margin: 42px 0 0 0;
          overflow: hidden;
          height: 402px;
          &:hover{
            overflow-y: scroll;
          }
        }
      }
    }
  }
</style>
