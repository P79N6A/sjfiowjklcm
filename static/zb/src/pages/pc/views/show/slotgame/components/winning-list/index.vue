<template>
  <div class="winning-box">
    <div class="header"><img src="../../images/message.png" alt=""></div>
    <div class="winning-data">
      <div class="scrollTitle">
        <ul>
          <li class="winning-list-item">
              <span class="position">用户名</span>
              <span class="position">游戏名称</span>
              <span class="position">金额</span>
            </li>
        </ul>
      </div>
      <div id="winningScroll" class="scrollContent">
        <ul class="winning-list" ref="lists" style="position: relative;top: -40px;">
            <li class="winning-list-item ng-scope" v-for="(item,i) in myData" :key="i">
                <span class="position ng-binding">{{item.userName}}</span>
                <span class="position ng-binding">{{item.gameName}}</span>
                <span class="position ng-binding">{{item.prize}}</span>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getCarouselListAll} from "@/api/show"
import Velocity from 'velocity-animate';
export default {
    data() {
      return {
        myData: [],
        id:0
      }
    },
    watch:{
      myData(val){
        if (val.length>0) {
          this.id=window.setInterval(() => {
            this.move();
          }, 3500)
        }
      }
    },
    methods: {
      move() {
        let $this = this;
        Velocity(this.$refs.lists, {
          top: "-40px;"
        }, {
          duration: 1000,
          complete() {
            if ($this.$refs.lists.childNodes) {
              $this.$refs.lists.appendChild($this.$refs.lists.childNodes[0])
              $this.$refs.lists.style.top = 0;
            }
          }
        })
      }
    },
    beforeDestroy(){
      window.clearInterval(this.id)
    },
    created() {
      getCarouselListAll().then(res => {
        if (res.success) {
          this.myData = res.data;
        }
      })
    }
  }
</script>
