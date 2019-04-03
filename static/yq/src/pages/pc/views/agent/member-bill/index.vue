<template>
  <div class="mainAgentDiv">
    <div class="mainmenber">
      <div class="menber_in">
        <router-link
          class="menuItem"
          v-for="item in Menus"
          :to="{name:item.to,params:{'proposalType':item.proposalType}}"
          :key="item.to"
        >
          {{item.name}}
          <i></i>
        </router-link>
      </div>
      <div class="u-c-box">
        <!-- 需要缓存的页面 -->
        <keep-alive v-if="!$route.meta.noCache">
          <router-view>
            <!-- 页面内容可视部分 -->
          </router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { getAgentQueryType } from "@/api/agent";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      Menus: {
        "1000": {
          to: "agent_deposit",
          name: "",
          ico: "ay-cunkuanlicairenminbi",
          proposalType: ""
        },
        "503": {
          to: "agent_withdraw",
          name: "",
          ico: "ay-tikuan",
          proposalType: ""
        },
        "2": {
          to: "agent_feedback",
          name: "",
          ico: "ay-tiyanjin",
          proposalType: ""
        },
        "1": {
          to: "agent_promo",
          name: "",
          ico: "ay-youhui2",
          proposalType: ""
        },
        "-1": {
          to: "agent_winlose",
          name: "会员输赢",
          ico: "ay-zhangdan",
          proposalType: ""
        }
      }
    };
  },
  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  created() {
    // 读取账户类型
    getAgentQueryType()
      .then(res => {
        if (res.success) {
          for (let i = 0; i < res.data.length; i++) {
            if (!this.Menus[res.data[i].value]) {
              this.Menus[res.data[i].value] = {};
            }
            Object.assign(this.Menus[res.data[i].value], res.data[i] || {});
          }
        } else {
          window.toast(res.message);
        }
      })
      .catch(err => {
        window.toast("类型加载失败");
      });
  }
};
</script>
<style lang='scss' scoped>
.mainAgentDiv {
  width: 100%;

  .ol-account {
    width: 94%;
    margin: 30px 0 0 30px;
    overflow: hidden;

    li {
      float: left;
      margin: 20px 0 0 10px;

      span {
        color: #cc0000;
        font-weight: 600;
      }
    }
  }

  .sidebar {
    display: inline-block;
  }

  .mainmenber {
    width: 94%;
    margin: 30px 0 0 30px;

    .menber_in {
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
        margin-bottom: 20px;

        &.active {
          background-color: #4db7f4;
          color: #fff;

          i {
            opacity: 1;
            display: block;
          }
        }

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
      }
    }
  }
}
</style>
