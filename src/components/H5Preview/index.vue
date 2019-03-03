<template>
  <div style="width:100%;">
    <div v-for="(pageJson,i) in appJson.value.pageJson" :key="i">
      <div class="i-preview" :style="[bgCss,{width:pageJson.config.fullScreen?'100%':pageJson.base.width + 'px'}]" 
        v-if="i==activePage" >
        <div :class="pageJson.animate.enterAnimation" class="animated">
          <div class="i-show" :style="[baseCss,borderCss,boxShadow]">
            <!-- 拖拽外框 -->
            <div v-for="(drag,i) in pageJson.json" :key="i">
              <div v-if="drag.config.isShow" :style="{position:'absolute',transform: `rotate(${drag.style.base.rotate}deg)`,zIndex:`${1000-i}`,width:`${drag.style.base.width}px`,height:`${drag.style.base.height}`,left:`${drag.position.left}px`,top:`${drag.position.top}px`,}"
                :key="i">
                <eleTemp :eleJson="drag" :showId="i">
                  <!-- 组件配置 -->
                </eleTemp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import eleTemp from "./eleTemp.vue";
  import { getIshowOne } from "@/api/ishow"
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        // appJson:null,
        activePage: 0, // 当前活跃的
        autoAnimation: true, //是否自动播放动画
        infinite: true, // 是否循环播放
        interval: 3000, //动画时间间隔,单位ms
        timer: "",
        showPage: true
      };
    },
    components: {
      eleTemp
    },
    props: ["ishowId","appJson"],
    created() {

    },
    beforeDestroy() {
      window.clearInterval(this.timer);
    },
    mounted() {
      if(this.appJson){
            this.setVal();
            window.clearInterval(this.timer);
            if (this.autoAnimation) {
              this.timer = window.setInterval(() => {
                this.activePage = (this.activePage + 1) % this.appJson.value.pageJson.length;
                if (this.activePage == this.appJson.value.pageJson.length - 1) {
                  if (!this.infinite) {
                    window.clearInterval(this.timer);
                  }
                }
              }, this.interval);
            }
      }else{
        this.getIshowOne();
      }
    },
    methods: {
      setVal() {
        this.autoAnimation = this.appJson.value.pageSetting.autoAnimation ? true : false;
        this.infinite = this.appJson.value.pageSetting.infinite ? true : false;
        this.interval = this.appJson.value.pageSetting.interval ?
          this.appJson.value.pageSetting.interval * 1000 :
          3000;
      },
      // 读取数据内容
      getIshowOne() {
        if (this.ishowId){
        console.log('ishowId')
          getIshowOne({
            _id: this.ishowId
          }).then(res => {
            console.log(res);
            this.appJson = res.data;
            this.setVal();
            window.clearInterval(this.timer);
            if (this.autoAnimation) {
              this.timer = window.setInterval(() => {
                this.activePage = (this.activePage + 1) % this.appJson.value.pageJson.length;
                if (this.activePage == this.appJson.value.pageJson.length - 1) {
                  if (!this.infinite) {
                    window.clearInterval(this.timer);
                  }
                }
              }, this.interval);
            }
          }).catch(err => {

          })
          }else{
            console.log("klsfjlkjj")
          }
      }
    },
    watch: {
      ishowId(val) {
        if (val) {
          this.getIshowOne();
        }
      }
    },
      computed: {
    ...mapGetters(["cdnurl"]),
      borderCss() {
        return {
          borderWidth: this.appJson.value.pageJson[this.activePage].border.borderWidth + "px",
          borderRadius: this.appJson.value.pageJson[this.activePage].border.borderRadius + "px",
          borderColor: this.appJson.value.pageJson[this.activePage].border.borderColor,
          borderStyle: this.appJson.value.pageJson[this.activePage].border.borderStyle
        };
      },
      baseCss() {
        return {
          width: this.appJson.value.pageJson[this.activePage].base.width + "px",
          height: this.appJson.value.pageJson[this.activePage].base.height + "px",
          transform: `rotate(${this.appJson.value.pageJson[this.activePage].base.rotate}deg)`,
          opacity: this.appJson.value.pageJson[this.activePage].base.opacity / 100
        };
      },
      bgCss() {
              return {
            // 背景
            "backgroundImage": `url('${this.cdnurl}${this.appJson.value.pageJson[this.activePage].bg.backgroundImage}')`,
            "backgroundColor":this.appJson.value.pageJson[this.activePage].bg.backgroundColor,
            "backgroundSize": this.appJson.value.pageJson[this.activePage].bg.backgroundSize,
            "backgroundRepeat": this.appJson.value.pageJson[this.activePage].bg.backgroundRepeat,
            "backgroundPosition": this.appJson.value.pageJson[this.activePage].bg.backgroundPosition,
            "backgroundAttachment":this.appJson.value.pageJson[this.activePage].bg.backgroundAttachment,
      };
        // return this.appJson.value.pageJson[this.activePage].bg;
      },
      boxShadow() {
        return {
          boxShadow: `${this.appJson.value.pageJson[this.activePage].shadow.shadowColor} ${
          this.appJson.value.pageJson[this.activePage].shadow.shadowX
        }px ${this.appJson.value.pageJson[this.activePage].shadow.shadowY}px ${
          this.appJson.value.pageJson[this.activePage].shadow.shadowFuzzy
        }px ${this.appJson.value.pageJson[this.activePage].shadow.shadowDire}px ${
          this.appJson.value.pageJson[this.activePage].shadow.shadowinSet ? "inset" : ""
        }`
        };
      }
    }
  };

</script>
<style lang="scss" scoped>
  .i-preview {
    display: flex;
    justify-content: center;
    align-items: center;

    .i-show {
      overflow: hidden;
      display: block;
      position: relative;
    }
  }

</style>
