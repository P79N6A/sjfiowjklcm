<template>
  <div class="forum inblock">
    <router-link :to="{name:'newsIndex'}">
      <div id="j-forum-more" class="section_title clear">
        <h4 class="fl">
          <i class="iconfont icon-luntanzhuanqu"></i>最新公告专区
        </h4>

        <div class="fr bg-more_icon">
          <span class="link-spanner"></span>
        </div>

        <div id="j-forum-enter"></div>
      </div>
    </router-link>
    <div class="newslist topLoop">
      <div class="bd">
        <ul class="j-f1List">
          <li v-for="item in myData" :key="item.id">
            <router-link :to="{name:'newsIndex'}">
              <span class="s1">{{item.title}}</span>
              <!-- <span class="s2">{{item.createtime|Date}}</span> -->
            </router-link>
          </li>
        </ul>
        <ul class="j-f1List">
          <li v-for="item in myData" :key="item.id">
            <router-link :to="{name:'newsIndex'}">
              <span class="s1">{{item.title}}</span>
              <!-- <span class="s2">{{item.createtime|Date}}</span> -->
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
export default {
  data() {
    return {
      myData: []
    };
  },
  created() {
    getNewAnnouncement().then(res => {
      res.success && (this.myData = res.data);
    });
  }
};
</script>
<style lang="scss" scoped>
.forum {
  width: 330px;
  height: 223px;
  background: #fff;
  overflow: hidden;
  .bd {
    overflow: hidden;
  }
  .j-f1List {
    padding: 0 14px;
    color: #787876;
    animation: animations 20s linear infinite;
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px dotted;

      .s1 {
        width: 70%;
        margin-right: 18px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        overflow: hidden;
      }

      .s2 {
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}

.inblock {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  letter-spacing: normal;
  zoom: 1;
}

.section_title {
  padding-left: 20px;
          background: rgb(89, 219, 208); /* Old browsers */
          background: -moz-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */

  line-height: 50px;
  color: #fff;
  position: relative;

  i {
    margin-right: 3px;
  }

  .bg-more_icon {
    width: 20px;
    height: 5px;
    position: relative;
    margin: 25px 18px 0 0;
    background: url(./images/content_sprites.png) -10px -10px;

    #j-forum-enter {
      display: none;
      position: absolute;
      right: -35px;
      top: -80px;
    }
  }
}

.clear {
  zoom: 1;
  clear: none !important;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}

h4 {
  font-size: 14px;
  letter-spacing: normal;
  line-height: 50px;
}

.link-spanner {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
@keyframes animations {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
