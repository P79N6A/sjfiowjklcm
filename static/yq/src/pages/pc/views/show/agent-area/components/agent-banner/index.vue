<template>
    <div class="agent_banner">
        <annunciate></annunciate>
        <div class="in_banner">
            <ul class="big">
              <li :class="{opa:isshow == '1'}">
                <a href="javascript:void(0)" class="ban1"></a>
              </li>
              <li :class="{opa:isshow == '2'}">
                <a href="javascript:void(0)" class="ban2"></a>
              </li>
              <li :class="{opa:isshow == '3'}">
                <a href="javascript:void(0)" class="ban3"></a>
              </li>
            </ul>
            <ul class="btns">
                <li :class="{hover:isshow == '1'}" @click="isshow = '1'"><span></span>业界首创，日结佣金</li>
                <li :class="{hover:isshow == '2'}" @click="isshow = '2'"><span></span>二十七大平台，游戏多样化</li>
                <li :class="{hover:isshow == '3'}" @click="isshow = '3'"><span></span>秒存、秒提、秒返水</li>
            </ul>
        </div>
    </div>
</template>
<script>
import annunciate from 'pc/components/annunciate'
export default {
    data() {
        return {
            isshow: '1'
        }
    },
    methods: {
        changebg() {
        let _this = this
        setInterval(function () {
          if (_this.isshow == '1') {
            _this.isshow = '2'
          } else if (_this.isshow == '2') {
            _this.isshow = '1'
          }
        }, 4000)
      },
    },
    created() {
      this.changebg();
    },
    components:{annunciate}
}
</script>
<style lang="scss" scoped>

.in_banner {
    position: relative;
    height: 804px;
    overflow: hidden;
    z-index: 10;

    .big {
      overflow: hidden;
      width: 100%;
      height: 714px;

      /*background: #535f46;*/
      li {
        width: 100%;
        height: 714px;
        background-repeat: no-repeat;
        background-position: top center;
        opacity: 0;

        &:first-child {
          background-image: url('../../images/pic1.jpg');
          background-repeat: no-repeat;
          background-position: center -5px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 500;
          display: list-item;
          transition: all 1.5s;
        }

        &:nth-child(2){
            background-image: url('../../images/pic2.jpg');
          background-repeat: no-repeat;
          background-position: center -5px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 499;
          display: list-item;
          transition: all 1.5s;
        }

        &:last-child {
          background-image: url('../../images/pic3.jpg');
          background-repeat: no-repeat;
          background-position: center -5px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 498;
          display: list-item;
          transition: all 1.5s;
        }

        &.opa {
          opacity: 1;
          transition: all 1.5s;
        }
      }
    }

    .btns {
        width: 100%;
        height: 96px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        margin-left: 0;

      li {
        float: left;
        width: 33.33%;
        height: 96px;
        line-height: 88px;
        color: #222;
        font-size: 28px;
        cursor: pointer;
        text-align: center;
        background: #f7f7f7;

        &.hover {
          color: #c6241f;
        }
      }
    }
  }
</style>
