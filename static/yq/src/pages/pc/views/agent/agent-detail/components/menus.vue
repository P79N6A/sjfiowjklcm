<template>
  <div class="settingMenu">
    <router-link class="menuItem" v-for="item in Menus" :to="{name:item.to}" :key="item.name">
      <span class="iconay" :class="item.ico"></span>
      {{item.name}}
      <i></i>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Menus: [
        {
          to: "agent_setting",
          name: "个人资料",
          ico: "ay-gerenshezhi"
        },
        {
          to: "agent_banks",
          name: "银行卡管理",
          ico: "ay-bangdingyinhangqia"
        },
        {
          to: "agent_password",
          name: "修改密码",
          ico: "ay-mima2"
        },
        {
          to: "agent_payword",
          name: "修改支付密码",
          ico: "ay-zhifu"
        }
      ]
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters(["userData", "unread", "isUser"])
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.settingMenu {
  min-height: 40px;
  width: 94%;
  margin: 30px 0 0 30px;
  display: flex;
  .menuItem {
    display: block;
    padding: 0 35px;
    height: 46px;
    line-height: 46px;
    cursor: pointer;
    position: relative;
    font-size: 16px;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    background-color: #ddd;
    margin-right: 1px;
    color: #333;

    i {
      width: 0;
      height: 0;
      display: none;
      border-top: 10px solid #4db7f4;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 0 solid transparent;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      bottom: -10px;
      transition: 0.3s left, 0.6s opacity ease-out;
    }

    &.active {
      background-color: #4db7f4;
      color: #fff;

      i {
        opacity: 1;
        display: block;
      }
    }
  }
}
</style>
