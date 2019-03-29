<template>
<div class="noticeTips" v-show="value">
    <div class="noticeTipsContent">
      <img src="./images/close.png" @click="$emit('input',false)">
      <h1>
        系 统 公 告 NOTICES
        <span>
          system notification
        </span>
      </h1>
      <div class="n-show">
        <h2 class="n-title">{{data.title}}</h2>
        <div class="n-content">
          {{data.content}}
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    class="modal ng-scope open"
    style="z-index: 1011; display: block; opacity: 1; transform: scaleX(1); top: 0px;"
    v-show="value"
  >
    <div class="marquee-modal-body">
      <div style="background:none;box-shadow:none;padding:5rem">
        <div class="title">公告</div>
        <div class="content announce-modal-content">
          <div
            carousel
            indicators="true"
            dist="0"
            class="ng-isolate-scope carousel initialized"
            data-namespace="DIVng-isolate-scopecarousel0"
          >
            <div
              class="carousel-item ng-binding ng-scope active"
              style="z-index: 0; opacity: 1; display: block; transform: translateX(0px) translateY(0px) translateX(0px) translateX(0px) translateZ(0px);"
            >{{data.content}}</div>
          </div>
        </div>
        <div class="footer" @click="$emit('input',false)" role="button" tabindex="0">关闭</div>
      </div>
    </div>
  </div> -->
</template>
<script>
export default {
  name: "tips",
  data() {
    return {};
  },
  props: {
    value: Boolean,
    data: {
      required: true,
      default: {
        title: "",
        content: ""
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.value = false;
    }
  },
  created() {},
  activated() {},
  components: {}
};
</script>
<style scoped lang="scss">
.noticeTips {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index:9;
  .noticeTipsContent{
    box-shadow: 0px 0px 25px rgba(255, 255, 255, 0.3);
    width: 605px;
    min-height: 355px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    border: 3px solid #3ec1fe;
    border-radius: 10px;
    img{
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .t6 {
      position: absolute;
      top: 15px;
      right: 10px;
      cursor: pointer;
      font-size: 36px;
    }

    h1{
      font-size: 36px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      padding: 15px 0;
      background: #3ec1fe; 
      span{
        font-size: 16px;
        display: block;
        line-height: 22px;
      }
    }

    .n-show{
      margin: 20px 50px 30px;
    }

    .n-title{
      font-size: 30px;
      color: #3ec1fe;
      text-align: center;
      margin-bottom: 15px;
    }

    .n-content{
      font-size: 18px;
      color: #000000;
      line-height:1.6;
      max-height:300px;
      overflow:hidden;
      padding-right:8px;
      &:hover{
        padding-right:0;
        overflow-y:scroll;
      }
    }
  }
}
</style>
