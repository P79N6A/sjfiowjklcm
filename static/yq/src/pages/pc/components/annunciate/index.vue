<template>
  <div class="tips-circular">
    <div class="content-warp">
      <div id="notice"><i class="iconfont icon-gonggao"></i></div>
      <marquee style="vertical-align: middle;width: 1040px;font-family: 'Microsoft YaHei', Verdana, Arial !important;font-size:15px;" onmouseover="stop();" onmouseout="start();">
        <router-link v-for="item in myData" :to="{name:'newsIndex'}" :key="item.id">
          {{item.title}}&nbsp;[{{item.createtime|Date}}]&nbsp;&nbsp;&nbsp;
        </router-link>
      </marquee>
    </div>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
export default {
  name: "",
  data() {
    return {
      myData: []
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  created() {
    getNewAnnouncement().then(res => {
      res.success && (this.myData = res.data);
    });
  },
  activated() {},
  components: {}
};
</script>
<style spcoed lang="scss">
.tips-circular {
  width: 100%;
  height: 51px;
  position: absolute;
  top: 0;
  z-index: 11;
  background: rgba(0, 0, 0, 0.4);
  .content-warp {
    width: 1200px;
    height: 51px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    color: #fff;
    #notice{
      float: left;
      position: relative;
      left: 25px;
      margin-right: 50px;
      .iconfont{
        color: #fff;
        font-size: 22px;
      }
    }
    .text {
      position: absolute;
      left: -42px;
      font-weight: bold;
      font-size: 19px;
    }
  }
}
</style>
