<template>
  <div class="tutorials_left">
    <ul class="tutorials_left_ul">
      <li v-for="(menu,i) in menus" :key="i">
        <a
          href="javascript:void(0);"
          @click="setRouter(menu)"
          :class="{active:isShowChild == menu.title}"
        >
          <div class="tutorials_level" :class="menu.ico">
            <span>{{menu.title}}</span>
          </div>
        </a>
        <ul
          class="tutorials_left_Sub_ul"
          v-if="menu.lists.length > 0"
          v-show="isShowChild == menu.title"
        >
          <li v-for="(list,i) in menu.lists" :key="i+list.title">
            <router-link :to="{name:'aboutIndex',params:{'tab':list.key}}">
              <div class="sub_li_icon">
                <span>{{list.title}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowChild: "",
      menus: [
        {
          title: "关于众博娛樂",
          ico: "tutorials_icon01",
          key: "tab1",
          lists: []
        },
        {
          title: "我们的优势",
          ico: "tutorials_icon01",
          key: "tab7",
          lists: []
        },
        {
          title: "新手帮助",
          ico: "tutorials_icon02",
          key: "tab21",
          lists: [
            {
              title: "账号问题",
              key: "tab21"
            },
            {
              title: "存款问题",
              key: "tab22"
            },
            {
              title: "提款问题",
              key: "tab23"
            },
            {
              title: "常见问题",
              key: "tab24"
            },
            // {
            //   title: '游戏问题',
            //   key: 'tab25'
            // },
            {
              title: "APP问题",
              key: "tab26"
            }
          ]
        },
        {
          title: "隐私政策",
          ico: "tutorials_icon04",
          key: "tab3",
          lists: []
        },
        {
          title: "博彩责任",
          ico: "tutorials_icon05",
          key: "tab4",
          lists: []
        },
        {
          title: "用户协议",
          ico: "tutorials_icon06",
          key: "tab5",
          lists: []
        },
        {
          title: "联系我们",
          ico: "tutorials_icon03",
          key: "tab6",
          lists: []
        }
      ]
    };
  },
  methods: {
    setRouter(menu) {
      this.isShowChild = menu.title;
      this.$router.push({ name: "aboutIndex", params: { tab: menu.key } });
    }
  }
};
</script>
<style lang="scss" scoped>
// 如无特殊需求，必须加scoped，
.tutorials_left {
  margin: 0;
  padding: 0;
  width: 30%;
  display: block;
  float: left;
  .tutorials_defaultImg {
    cursor: pointer;
  }
  ul.tutorials_left_ul {
    position: relative;
    z-index: 2;
    top: 0;
    left: 60%;
    width: 40%;
    li {
      text-align: left;
      margin: 0;
      position: relative;
      margin-top: 30px;
      a {
        cursor: pointer;
        text-decoration: none;
        font-size: 16px;
        color: #fff;
        &:hover,
        &.active {
          color: #e6a23c;
          .tutorials_icon01 {
            background: url(./images/icon01_1.png) no-repeat;
          }
          .tutorials_icon02 {
            background: url(./images/icon02_1.png) no-repeat;
          }
          .tutorials_icon03 {
            background: url(./images/icon03_1.png) no-repeat;
          }
          .tutorials_icon04 {
            background: url(./images/icon04_1.png) no-repeat;
          }
          .tutorials_icon05 {
            background: url(./images/icon05_1.png) no-repeat;
          }
          .tutorials_icon06 {
            background: url(./images/icon06_1.png) no-repeat;
          }
        }
        .tutorials_icon01 {
          height: 60px;
          background: url(./images/icon01.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
        .tutorials_icon02 {
          height: 60px;
          background: url(./images/icon02.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
        .tutorials_icon03 {
          height: 60px;
          background: url(./images/icon03.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
        .tutorials_icon04 {
          height: 60px;
          background: url(./images/icon04.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
        .tutorials_icon05 {
          height: 60px;
          background: url(./images/icon05.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
        .tutorials_icon06 {
          height: 60px;
          background: url(./images/icon06.png) no-repeat;
          position: relative;
          z-index: 2;
          vertical-align: middle;
          line-height: 60px;
          padding-left: 60px;
        }
      }
      img {
        vertical-align: middle;
        position: relative;
        z-index: 2;
      }
      &:before {
        content: "";
        position: absolute;
        top: -5em;
        left: 2em;
        width: 0.1em;
        height: 8em;
        background: #e7e7e7;
        z-index: 1;
      }
      &:first-child:before {
        display: none;
      }
    }
    ul.tutorials_left_Sub_ul {
      position: relative;
      z-index: 2;
      li {
        text-align: center;
        margin-top: 20px;
        a {
          cursor: pointer;
          text-decoration: none;
          font-size: 14px;
          .sub_li_icon {
            vertical-align: middle;
            width: 125px;
            margin-left: 26px;
            &:hover {
              background: url(./images/l_point.png) 0 no-repeat;
            }
            &.action {
              background: url(./images/l_point.png) 0 no-repeat;
              color: #2293fc;
            }
          }
        }
        &:before {
          content: "";
          position: absolute;
          top: -5em;
          left: 2em;
          width: 0.1em;
          height: 8em;
          background: #e7e7e7;
          z-index: -1;
        }
        &:first-child:before {
          display: none;
        }
      }
    }
  }
}
</style>
