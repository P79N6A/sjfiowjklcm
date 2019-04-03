<template>
  <!-- <transition name="fade">
    <div class="prefer_box" v-show="showWindow">
      <div class="prefer_content">
        <div class="prefer_title" @click="showWindow=false">
          <span class="iconay ay-guanbi"></span>
        </div>
        <div class="prefer_title1">{{this.resdata.data.activityTitle}}</div>
        <div class="prefer_detail">
          <iframe  ref="iframe" style="height:100%;" width="100%"  cl src="" frameborder="0">
          </iframe>
        </div>
      </div>
    </div>
  </transition>-->
  <div class="promo-info" v-html="htmlContent"></div>
  <!-- <div style="width:100%;height:100vh">
    <iframe ref="iframe" frameborder="0" style="width:100%;height:100%;"></iframe>
  </div>-->
</template>
<script>
import { scrolltool } from "@/vue-extend/scrolltool";
import util from "@/util/util";
import { findLatestPreferentialById } from "@/api/show";

export default {
  name: "",
  mixins: [scrolltool],
  data() {
    return {
      showWindow: false,
      showDatas: {
        activityTitle: "",
        activityContent: ""
      },
      resdata: {
        data: {
          newImageUrl: ""
        }
      },
      htmlContent: null
    };
  },
  props: {
    htmlInfo: {
      required: true,
      type: Object
    }
  },
  watch: {
    htmlInfo(val) {
      val && this.getBody();
      // this.setiframe(val.activityTitle,val.activityContent)
    }
  },
  methods: {
    setiframe(title, content) {
      this.showWindow = true;
      // this.showDatas.activityTitle = title
      // this.showDatas.activityContent = content
      let ifrm = this.$refs.iframe;
      const doc = ifrm.contentDocument
        ? ifrm.contentDocument
        : ifrm.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.body.style["overflow-y"] = "visible";
      doc.body.style["margin"] = 0;
      doc.body.style["height"] = "auto";
      doc.close();
    },
    getBody() {
      var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
      this.htmlContent = pattern.exec(this.htmlInfo.activityContent)[1];
      // console.log(this.htmlContent)
      // 自动滚动
      // let iTarget = document.querySelectorAll(".promo-info");
      // let index = this.htmlInfo.index
      // this.scrollTo(iTarget[index].offsetTop - 40,0.5);
    }
  },
  created() {
    // this.$bus.$on('showProDetail', eventData=>{
    //   this.setiframe(eventData.data.activityTitle,eventData.data.activityContent)
    //   this.resdata = eventData
    // })
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.promo-info {
  height: 0;
  overflow: auto;
  table {
    width: 98%;
    border: 1px solid #bbbbbb;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    td {
      border: 1px solid #bbb;
      color: #353535;
      line-height: 1;
      padding: r(10);
      white-space: nowrap;
    }
  }
  p {
    @include f(26px);
    line-height: 1.5;
  }
}
</style>
