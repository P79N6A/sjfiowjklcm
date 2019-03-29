<template>
  <div class="notice-box">
    <div v-for="(item,i) in data" class="item_list" :key="i">
      <div class="title_content" @click="showView(item,i)">
        <div class="title_content_main cfx">
          <h3>{{item.title}}
            <span class="notice_time fr">{{item.createtime | Date("M月dd日")}}</span>
          </h3>
        </div>
      </div>
      <transition name="message">
          <div class="toggle_content_main" v-show="item.already"
               v-html="item.content">
          </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {getNewAnnouncement} from "@/api/show";

  export default {
    data() {
      return {
        data: []  //records
      };
    },
    methods: {
      showView(item, i) {
        return item.already = !item.already;
//        if (this.$refs[item.id][0].style.height == "") {
//          this.$refs[item.id][0].style.height = this.$refs[item.id][0].css("height");
//        }
//        this.$nextTick(() => {
//          item.already = !item.already;
//        });
      },
    },
    created() {
      //加载数据
      getNewAnnouncement().then(res => {
        if (res.success) {
          this.data = res.data.map(item => {
            item.already = false;
            return item;
          });
        } else {
          window.toast(data.message);
        }
      })
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .message-enter-active, .message-leave-active {
    transition: all 0.5s;
  }
  .message-enter,
  .message-leave-to {
    opacity:0;
  }

  .item_list {
    transition: all .3s;
    -webkit-transition: all .3s;
    border-bottom: 1px solid #e6e6e6;
    .title_content {
      position: relative;
      padding: r(12*2) r(10*2);
      h3 {
        float: left;
        line-height: 1.3;
        width:100%;
        @include f(30px)
      }
    }
    .toggle_content_main {
      padding: 10px;
      color: #969696;
      line-height: 1.6;
      background: $main-bg;
      @include f(28px);
    }
  }
</style>
