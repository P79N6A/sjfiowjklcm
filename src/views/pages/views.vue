<template>
  <div class="Layoutshow-container" v-if="selectNode&&selectNode.value">
    <Layout :layoutTemp="selectNode.value.layout" v-if="selectNode.value.layout">
      <Layout :layoutTemp="selectNode.value.content" v-if="selectNode.value.content"></Layout>
    </Layout>
  </div>
</template>

<script>
  import Layout from "@/components/Layout";
  export default {
    name: "Page401",
    data() {
      return {
        selectNode: {
          value:"test"
        },

      };
    },
    mounted() {
      //监听消息反馈
      console.log("klsjflkasfjl")
      window.addEventListener('message',(event) => {
        this.selectNode=event.data;
      },false);
    },
    methods: {

    },
    components: {
      Layout
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  @import url('//at.alicdn.com/t/font_957526_lqqst93s3j.css');

  .iconfont {
    font-size: 12px !important;
  }

  .LayoutDesigh-container {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 84px);
    padding: 20px;

    #drag-box {
      // padding: 10px;
      // transform:scale(0.8);
      background: #f7f8fb;
    }

    .show {
      border: dotted 1px #ccc;
      background: #fff;
      padding: 20px 0;
      margin-top: 30px !important;
      position: relative;

      .block-controls {
        position: absolute;
        top: -28px;
        left: -1px;
      }

      input {
        border: none;
        background: none;
        color: #343434;
        text-align: center;
        outline: none;
      }

      .el-row {
        border: solid 1px #343434;
        margin-bottom: 5px !important;
        padding: 10px;
        margin: 10px;
        position: relative;

        .row-controls {
          position: absolute;
          top: -28px;
          right: -1px;
        }

        .el-col {
          padding: 10px;

          >div {
            position: relative;
            border: dashed 1px #409eff;
            padding: 10px;
            text-align: center;
            height: 70px;
            cursor: move;



            .col-controls {
              position: absolute;
              left: 10px;
              bottom: 10px;
            }
          }

          .ico-width {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        }
      }
    }

    .rightMenu {
      position: absolute;
      z-index: 9;
      transition: all 0.3s;
      top: 0;
      right: 0-300px;
      height: 100%;
      background: yellow;
      overflow: visible;

      &.active {
        right: 0;
      }

      .toggle {
        position: absolute;
        top: 50%;
        right: 100%;
      }
    }
  }

  // 0,
  // 1,
  // 2,  old
  // 3,  new
  // 4

</style>
