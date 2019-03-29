<template>
  <div class="alert-tips" v-show="show">
    <div class="alert-tips-content">
      <!-- <i class="iconay ay-guanbi iclose" @click="close"></i> -->
      <!-- <img src="./images/guanbi.png" alt="" class="iclose"  @click="close"> -->
      <div class="content-info">
        <div class="title">{{title}}</div>
        <div class="conent" v-html="conent"></div>
      </div>
      <div class="closeBtn" @click="close"></div>
      <!-- <div class="wechatTips">
        <vue-qr class="download-Qrcode" :text='Download.app' height="140" :margin="5" width="140"></vue-qr> 
      </div> -->
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
            this.title = arydata[0];
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
    z-index: 9999;
    text-align: center;
    .alert-tips-content {
      background: url("./images/bg.png");
      width: 1000px;
      height: 620px;
      display: inline-block;
      border-radius: 15px;
      background-size: 100% 100%;
      color: #000;
      padding: 90px 200px 80px;
      position: absolute;
      top:45%;
      left:50%;
      transform:translate(-50%,-50%);
      .iclose {
        position: absolute;
        right:110px;
        top: 125px;
        font-size:30px;
        color: #fff;
        cursor: pointer;
      }
      .content-info {
        .title {
          text-align: center;
          font-size: 24px;
          color: #3ec1fe;
          white-space: nowrap;
          letter-spacing: 4px;
        }
        .conent{
          font-size: 16px;
          color:#3ec1fe;
          line-height: 24px;
          text-align: left;
          margin: 30px 0 0 0;
          overflow: hidden;
          height: 400px;
          &:hover{
            overflow-y: scroll;
          }
        }
      }
      .wechatTips{
        position: absolute;
        color: #ffdd8c;
        bottom: 90px;    
        right: 52%;
        width: 44%;
        .title {
          text-align: center;
          font-size: 19px;
          white-space: nowrap;
        }
      }
      .closeBtn {
        width: 270px;
        height: 100px;
        background: url(./images/btn.png) center ;
        margin: 20px auto 0;
        cursor: pointer;
      }
    }
  }
</style>
