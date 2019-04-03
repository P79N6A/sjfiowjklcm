<template>
  <!-- <div class="noticeTips" v-show="value">
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
  </div> -->
  <div class="modal ng-scope open" style="z-index: 1011; display: block; opacity: 1; transform: scaleX(1); top: 0px;" v-show="value">
    <div class="marquee-modal-body">
      <div style="background:none;box-shadow:none;padding:5rem">
        <div class="title">公告</div>
        <div class="content announce-modal-content">
          <div carousel="" indicators="true" dist="0" class="ng-isolate-scope carousel initialized" data-namespace="DIVng-isolate-scopecarousel0">
            <!-- ngRepeat: item in $parent.marquee.dialogMarquees -->
            <div class="carousel-item ng-binding ng-scope active"
              style="z-index: 0; opacity: 1; display: block; transform: translateX(0px) translateY(0px) translateX(0px) translateX(0px) translateZ(0px);">
            {{data.content}}</div>
          </div>
        </div>
        <div class="footer"  @click="$emit('input',false)" role="button" tabindex="0">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "tips",
    data() {
      return {

      }
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
  }

</script>
<style scoped lang="scss">
  .modal:not(.modal-large) {
    background: none;
    box-shadow: 0 0;
    overflow: hidden;
    top: 0;
    bottom: 0;
    max-height: 661px;
    width: 570px !important;
    position: fixed;
    left: 0;
    right: 0;
    padding: 0;
    margin: auto;
    border-radius: 2px;
    will-change: top, opacity;
    .marquee-modal-body {
      position: relative;
      z-index: -1;
      background: url('./images/board.png') no-repeat 50%;
      width: 570px;
      height: 455px;
      .title {
        text-align: center;
        color: #fff;
        font-size: 16px;
      }
      .content {
        padding: 1rem;
        height: 210px;
        .carousel {
          width: 400px;
          height: 195px;
          overflow: hidden;
          position: relative;
          perspective: 500px;
          transform-style: preserve-3d;
          transform-origin: 0 50%;
          .carousel-item {
            width: 400px;
            height: 195px;
            padding-top: 20px;
            word-wrap: break-word;
            color: #fff;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      .footer {
        padding: 1rem;
        text-align: center;
        font-size: 16px;
        line-height: 2.6;
        color: #fff;
        cursor: pointer;
        outline: none;
      }
    }
  }

</style>
