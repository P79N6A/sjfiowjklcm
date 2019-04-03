<template>
  <div class="sider-menu">
    <div class="s-menu" v-for="(list,i) in menus" :key="i" :class="{active:activeMenu==i}">
      <h3 @click="setMenu(i)">
        <i :class="list.ico"></i>
        {{list.title}}
        <span class="s-menu-ico iconfont icon-xiajiantou"></span>
      </h3>
      <ul>
        <li v-for="(menu,j) in list.children" :key="j">
          <router-link class="s-menu-item" :to="menu.router" v-if="menu.router">
            {{menu.name}}
            <span
              class="unreadCount"
              v-if="menu.name =='意见反馈' && unreadAndReply"
            >{{unreadAndReply}}</span>
          </router-link>
          <a :href="menu.href" class="s-menu-item" v-else>{{menu.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menus: [
        {
          title: "会员中心首页",
          ico: "iconfont icon-zidingyicaidan",
          children: [
            {
              name: "账户概况",
              router: { name: "user_detail" }
            }
          ]
        },
        {
          title: "账户中心",
          ico: "iconfont icon-qiandai",
          children: [
            {
              name: "快速存款",
              router: { name: "deposit" }
            },
            {
              name: "快速提款",
              router: { name: "drawmoney" }
            },
            {
              name: "户内转账",
              router: { name: "transfer" }
            },
            {
              name: "自助优惠",
              router: { name: "user_discount" }
            }
          ]
        },
        {
          title: "账户记录",
          ico: "iconfont icon-wenjian",
          children: [
            {
              name: "账户清单",
              router: { name: "user_log" }
            }
          ]
        },
        {
          title: "账户设置",
          ico: "iconfont icon-iconset0196",
          children: [
            {
              name: "个人资料",
              router: { name: "datum" }
            },
            {
              name: "银行卡资料",
              router: { name: "banks" }
            },
            {
              name: "修改密码",
              router: { name: "password" }
            },
            {
              name: "提款密码资料",
              router: { name: "payword" }
            }
          ]
        },
        {
          title: "信息服务",
          ico: "iconfont icon-tixing",
          children: [
            {
              name: "站内信",
              router: { name: "message" }
            },
            {
              name: "意见反馈",
              router: { name: "service" }
            },
            {
              name: "新手指南",
              router: '',
              href: '/static/page/newTutorial/index.html'
            }
          ]
        }
      ],
      activeMenu: null // 当前展开的菜单
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
  methods: {
    // 查找当前的路由，设置菜单的展开状态
    findRouter() {
      for (let i = 0; i < this.menus.length; i++) {
        const _activeRoute = this.menus[i].children.some(item => {
          return item.router.name == this.$route.name;
        });
        if (_activeRoute) {
          this.activeMenu = i;
        }
      }
    },
    // 点击菜单操作
    setMenu(i) {
      if (this.activeMenu == i) {
        this.activeMenu = null;
      } else {
        this.activeMenu = i;
      }
    }
  },
  computed: {
    ...mapGetters(["userData", "unread", "isUser", "unreadAndReply"])
  },
  created() {
    this.findRouter();
  },
  watch: {
    $route(val) {
      this.findRouter();
    }
  }
};
</script>
<style lang="scss" scoped="">
.sider-menu {
  background: #fff;
  color: #333;
  .s-menu {
    h3 {
      font-size: 18px;
      line-height: 65px;
      padding-left: 40px;
      font-weight: normal;
      cursor: pointer;
      i {
        margin-right: 5px;
        font-size: 18px;
        color: #aaa;
      }
      .s-menu-ico {
        display: inline-block;
        float: right;
        margin-right: 20px;
        font-size: 30px;
        color: #aaa;
        transition: all 0.4s;
      }
    }
    .s-menu-item {
      display: block;
      line-height: 0;
      padding-left: 50px;
      height: 0;
      overflow: hidden;
      transition: all 0.3s;
      &.active {
        color: #4db7f4;
        padding-left: 50px;
      }
    }
    &:hover,
    &.active {
      h3 {
        border-left: 4px solid #4db7f4;
        background: #f3f3f3;
        color: #4db7f4;
      }
      .s-menu-ico {
        transform: rotate(90deg);
        color: #4db7f4;
      }
    }
    &.active {
      .s-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .unreadCount {
    background: red;
    color: #fff;
    border-radius: 50%;
    padding: 0px 4px;
  }
}
</style>
