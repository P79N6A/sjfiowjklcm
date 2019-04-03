
<template>
  <div class="serviceList">
    <ul class="listTop">
      <li
        v-for="(item,i) in dataList"
        :key="i"
        :class="{active:cur == item.id}"
        @click="cur = item.id ; tabPanel =item.tabPanel"
      >
        <img :src="item.icon">
        {{item.name}}
      </li>
    </ul>
    <div style="height:30px;background:#f1f1f1;"></div>
    <div>
      <component :is="tabPanel"></component>
    </div>
  </div>
</template>
<script>
import service from "../service/index";
import serviceLog from "../serviceLog/index";

export default {
  name: "",
  data() {
    return {
      cur: 1,
      tabPanel: service,
      dataList: [
        {
          id: "1",
          name: "意见反馈",
          icon: require("./images/icon1.png"),
          tabPanel: service
        },
        {
          id: "2",
          name: "反馈记录",
          icon: require("./images/icon2.png"),
          tabPanel: serviceLog
        }
      ],
      tabPanel: service
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.serviceList {
  .listTop {
    display: flex;
    justify-content: center;
    li {
      padding: 20px 30px;
      font-size: 16px;
      cursor: pointer;
      img {
        margin-right: 10px;
      }
      &.active {
        border-bottom: 2px solid #4db7f4;
      }
    }
  }
}
</style>
