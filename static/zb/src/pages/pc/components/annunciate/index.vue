<template>
  <div class="tips-circular">
    <div class="content">
      <div class="marquee-box">
        <span class="icobjh bjh-tongzhi"></span>
        <marquee style="vertical-align: middle;">
          <router-link :to="{name:'newsIndex',params:{id:item.id}}" v-for="item in myData" :key="item.id" >
            [{{item.createtime|Date}}]&nbsp;{{item.title}}&nbsp;&nbsp;&nbsp;
          </router-link>
        </marquee>
        <!-- <ul id="con1" ref="con1" :class="{anim:animate == true}">
          <li v-for="item in myData" :key="item.id" class="pointer">
            <router-link :to="{name:'newsIndex',params:{id:item.id}}">{{item.title}}</router-link>
          </li>
        </ul> -->
      </div>
    </div>
    <Tips></Tips>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
import Tips from "./tips";
export default {
  name: "",
  data() {
    return {
      myData: [],
      animate: false,
      timer: null
    };
  },
  props: {},
  created() {
    getNewAnnouncement().then(res => {
      res.success && (this.myData = res.data);
      // if (this.myData && this.myData.length) {
      //   this.scroll();
      // }
    });
  },
  methods: {
    showTips(item) {
      this.$bus.$emit("getTipsShow", true);
      this.$bus.$emit("getTipsData", item);
    },
    scroll() {
      this.animate = true;
      this.timer = window.setInterval(() => {
        this.myData.push(this.myData[0]);
        this.myData.shift();
        this.animate = false;
      }, 2000);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  components: {
    Tips
  }
};
</script>
<style lang="scss" scoped>
.tips-circular {
  height: 40px;
  background: #fff;
  color: #787878;
  line-height: 40px;
  font-size: 14px;
  min-width: 1200px;
  .content {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    padding-left: 30px;
    width: 1200px;
    .marquee-box {
      display: flex;
      width: 840px;
    }
    .icobjh {
      font-size: 20px;
      width: 30px;
      color: #3ec1fe;
    }
    .anim {
      transition: all 0.5s;
      margin-top: -54px;
    }
    ul {
      width: 810px;
      li {
        list-style: none;
        line-height: 54px;
        height: 54px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
