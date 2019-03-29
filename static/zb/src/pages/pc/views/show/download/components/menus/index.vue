<template>
  <div class="col left platform-box">
    <ul class="platform-box-bar">
      <li v-for="(item,i) in data" @click="setMenu(item.typeId)" :key="item.typeId+i">
        <a
          href="javascript:void(0);"
          data-target="ag"
          :class="[item.typeId,{active:cur==item.typeId}]"
        >{{item.typeId}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { generateQRCode } from "@/api/show";
import { SETTING, WEBCONFIG, Download } from "@/assets/data";
export default {
  name: "",
  data() {
    return {
      SETTING,
      WEBCONFIG,
      Download,
      cur: "APP",
      data: [
        {
          typeId: "APP",
          name: "众博娛樂手机APP下载"
        },
        {
          typeId: "AG",
          name: "AG真人"
        },
        {
          typeId: "PT",
          name: "PT电脑客户端下载"
        },
        {
          typeId: "DT",
          name: "DT手机客户端下载"
        },
        {
          typeId: "LG",
          name: "LG客户端下载"
        }
      ]
    };
  },
  computed: {
    filterData() {
      if (this.filter == "") {
        return this.myData.records;
      }
      return this.myData.records.filter((item, i) => {
        return item.type == this.filter;
      });
    }
  },
  watch: {},
  methods: {
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    setMenu(type) {
      this.cur = type;
      this.$bus.$emit("getDownloadPage", type);
    }
  },
  created() {
    this.generateQRCode("text");
  },
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.platform-box {
  margin-top: 75px;
  .platform-box-bar {
    margin-left: 15px;
    height: 580px;
    display: block;
    background: url(./images/bar.png) no-repeat;
    background-size: auto 100%;
    position: absolute;
    top: 170px;
    li {
      margin-left: -20px;
      &:first-child {
        padding-top: 50px;
      }
      &:not(:first-child) {
        margin-top: 10px;
      }
      a {
        display: block;
        width: 85px;
        height: 90px;
        transform: scale(1);
        background: url(./images/ico-app.png) no-repeat 50%;
        background-size: contain;
        text-align: center;
        color: #fff;
        font-size: 20px;
        transition: transform 0.3s;
        line-height: 75px;
        &.active,
        &:hover {
          line-height: 92px;
          transform: scale(1.2);
          background: url(./images/ico-app-hover.png) no-repeat 50%;
        }
      }
    }
  }
}
</style>
