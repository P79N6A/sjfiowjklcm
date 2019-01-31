<template>
  <div class="itgo-container">
    <header>
      <Iheader></Iheader>
    </header>
    <div class="contain">
      <!-- <div class="left">
        <Isidebar></Isidebar>
      </div>-->
      {{appJson.value.pageJson[activePageIndex]}}
      <br>
      {{activeTempIndex}}
      <div class="center">
        <!-- 传入当前页的json -->
        <Ishow
          :pageJson="appJson.value.pageJson[activePageIndex]"
          :activeTempIndex="activeTempIndex"
        ></Ishow>
        <br>
      </div>
      <div class="right">
        <Itool
          :appJson="appJson"
          :activePageIndex="activePageIndex"
          :activeTempIndex="activeTempIndex"
        ></Itool>
      </div>
    </div>
  </div>
</template>

<script>
import Iheader from "./component/header";
import Itool from "./component/tool";
import Isidebar from "./component/sidebar";
import Ishow from "./component/show";
// 模板数据
import eleTemp from "./component/temp.json";
import pageTemp from "./component/page.json";

export default {
  data() {
    return {
      // 场景json
      appJson: {
        description: "",
        device: "",
        name: "",
        type: "",
        tag: "",
        value: {
          pageJson: [
            {
              page: 1,
              title: "第1页",
              json: [
                {
                  type: 1,
                  title: "文字1",
                  content: "你要编辑的文字",
                  position: {
                    top: 10,
                    left: 10
                  },
                  isShow: true,
                  isLock: false,
                  width: 100,
                  height: 200,
                  style: {
                    bg: {
                      backgroundImage: "/favicon.ico",
                      backgroundColor: "#000",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "repeat-x",
                      backgroundPosition: "center center"
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "#564563",
                      borderStyle: "solid"
                    },
                    shadow: {
                      shadowColor: "#ccc",
                      shadowWidth: 2,
                      shadowRadius: 3,
                      shadowDire: 4
                    },
                    text: {
                      color: "#ddd",
                      textAlign: "center",
                      fontFamily: "simon",
                      lineHeight: "1.5",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                },
                {
                  type: 1,
                  title: "文字2",
                  content: "你要编辑的文字",
                  position: {
                    top: 50,
                    left: 50
                  },
                  isShow: true,
                  isLock: false,
                  width: 200,
                  height: 210,
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: ""
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "",
                      borderStyle: ""
                    },
                    shadow: {
                      shadowColor: "",
                      shadowWidth: 0,
                      shadowRadius: 0,
                      shadowDire: 0
                    },
                    text: {
                      color: "",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                },
                {
                  type: 1,
                  title: "文字3",
                  content: "你要编辑的文字",
                  position: {
                    top: 85,
                    left: 10
                  },
                  isShow: true,
                  isLock: false,
                  width: 250,
                  height: 99,
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: ""
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "",
                      borderStyle: ""
                    },
                    shadow: {
                      shadowColor: "",
                      shadowWidth: 0,
                      shadowRadius: 0,
                      shadowDire: 0
                    },
                    text: {
                      color: "",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                }
              ],
              bg: {
                backgroundImage: "/favicon.ico",
                backgroundColor: "#000",
                backgroundSize: "100% 100%",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "center center"
              },
              border: {
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "#564563",
                borderStyle: "solid"
              },
              shadow: {
                shadowColor: "#ccc",
                shadowWidth: 2,
                shadowRadius: 3,
                shadowDire: 4
              },
              enterAnimation: {},
              leaveAnimation: {},
              width: 400,
              height: 300,
              opacity: 100,
              rotate: 0,
              timer: null
            },
            {
              page: 1,
              title: "第2页",
              json: [
                {
                  type: 1,
                  title: "文字1",
                  content: "你要编辑的文字",
                  position: {
                    top: 50,
                    left: 10
                  },
                  isShow: true,
                  isLock: false,
                  width: 50,
                  height: 88,
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: ""
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "",
                      borderStyle: ""
                    },
                    shadow: {
                      shadowColor: "",
                      shadowWidth: 0,
                      shadowRadius: 0,
                      shadowDire: 0
                    },
                    text: {
                      color: "",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                }
              ],
              bg: {
                backgroundImage: "",
                backgroundColor: "",
                backgroundSize: "",
                backgroundRepeat: "",
                backgroundPosition: ""
              },
              border: {
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "",
                borderStyle: ""
              },
              shadow: {
                shadowColor: "",
                shadowWidth: 0,
                shadowRadius: 0,
                shadowDire: 0
              },
              enterAnimation: {},
              leaveAnimation: {},
              width: 400,
              height: 300,
              opacity: 100,
              rotate: 0,
              timer: null
            },
            {
              page: 1,
              title: "第3页",
              json: [
                {
                  type: 1,
                  title: "文字1",
                  content: "你要编辑的文字",
                  position: {
                    top: 88,
                    left: 10
                  },
                  isShow: true,
                  isLock: false,
                  width: 150,
                  height: 55,
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: ""
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "",
                      borderStyle: ""
                    },
                    shadow: {
                      shadowColor: "",
                      shadowWidth: 0,
                      shadowRadius: 0,
                      shadowDire: 0
                    },
                    text: {
                      color: "",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                },
                {
                  type: 1,
                  title: "文字2",
                  content: "你要编辑的文字",
                  position: {
                    top: 0,
                    left: 10
                  },
                  isShow: true,
                  isLock: false,
                  width: 150,
                  height: 78,
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: ""
                    },
                    border: {
                      borderWidth: 0,
                      borderRadius: 0,
                      borderColor: "",
                      borderStyle: ""
                    },
                    shadow: {
                      shadowColor: "",
                      shadowWidth: 0,
                      shadowRadius: 0,
                      shadowDire: 0
                    },
                    text: {
                      color: "",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    style: {
                      width: 0,
                      height: 0,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    }
                  }
                }
              ],
              bg: {
                backgroundImage: "",
                backgroundColor: "",
                backgroundSize: "",
                backgroundRepeat: "",
                backgroundPosition: ""
              },
              border: {
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "",
                borderStyle: ""
              },
              shadow: {
                shadowColor: "",
                shadowWidth: 0,
                shadowRadius: 0,
                shadowDire: 0
              },
              enterAnimation: {},
              leaveAnimation: {},
              width: 400,
              height: 300,
              opacity: 100,
              rotate: 0,
              timer: null
            }
          ],
          pageSetting: {
            autoAnimation: true,
            infinite: false,
            interval: 3
          }
        }
      },
      // 正在编辑的场景序号
      activePageIndex: 0,
      // 正在编辑的元素序号
      activeTempIndex: 0
    };
  },
  methods: {
    /**========元素操作========**/
    // 添加元素
    addTemp(key) {
      if (key && eleTemp && eleTemp[key]) {
        let _pageJson = this.appJson.value.pageJson[this.activePageIndex];
        _pageJson.json.splice(this.activeTempIndex + 1, 0, eleTemp[key]);
      }
    },
    // 复制元素
    copyTemp(index) {
      const _tempJson = this.appJson.value.pageJson[this.activePageIndex].json;
      let new_tempJson = JSON.parse(JSON.stringify(_tempJson[index]));
      new_tempJson.title = new_tempJson.title + "[复制]";
      _tempJson.splice(index + 1, 0, new_tempJson);
    },
    // 选定元素
    selectTemp(index) {
      this.activeTempIndex = index;
    },
    //切换元素锁定状态
    toggleTempLock(index) {
      this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].isLock = !this.appJson.value.pageJson[this.activePageIndex].json[index]
        .isLock;
    },
    toggleTempShow(index) {
      this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].isShow = !this.appJson.value.pageJson[this.activePageIndex].json[index]
        .isShow;
    },
    // 删除元素
    deleteTemp(index) {
      const _tempJson = this.appJson.value.pageJson[this.activePageIndex].json;
      _tempJson.splice(this.index, 1);
      // 取消元素的选中状态
      if (index > 0) {
        this.activeTempIndex = index - 1;
      } else {
        this.activeTempIndex = 0;
      }
    },
    /**=========页面操作========**/
    // 添加页面
    addPage(index) {
      let _pageJson = this.appJson.value.pageJson;
      _pageJson.splice(index + 1, 0, JSON.parse(JSON.stringify(pageTemp)));
    },
    // 选中页面
    selectPage(index) {
      this.activePageIndex = index;
    },
    // 复制页面
    copyPage(index) {
      let new_pageJson = JSON.parse(
        JSON.stringify(this.appJson.value.pageJson[index])
      );
      new_pageJson.title = new_pageJson.title + "[复制]";
      this.appJson.value.pageJson.splice(index + 1, 0, new_pageJson);
    },
    // 删除页面
    deletePage(index) {
      if (this.appJson.value.pageJson.length > 1) {
        let _pageJson = this.appJson.value.pageJson;
        _pageJson.splice(index, 1);
        if (index > 0) {
          this.activePageIndex = index - 1;
        }
      } else {
        this.$notify({
          title: "提示",
          message: "至少保留一个页面!",
          type: "warning",
          duration: 2000
        });
      }
    },
    // 更新页面排序
    sortPage(oldIndex, newIndex) {
      let _pageJson = this.appJson.value.pageJson;
      const targetRow = _pageJson.splice(oldIndex, 1)[0];
      _pageJson.splice(newIndex, 0, targetRow);
    },
    // 全局事件绑定
    initEvent() {
      //元素事件
      this.$bus.$on("addTemp", key => {
        this.addTemp(key);
      });
      this.$bus.$on("copyTemp", index => {
        this.copyTemp(index);
      });
      this.$bus.$on("deleteTemp", index => {
        this.deleteTemp(index);
      });
      this.$bus.$on("toggleTempLock", index => {
        this.toggleTempLock(index);
      });
      this.$bus.$on("toggleTempShow", index => {
        this.toggleTempShow(index);
      });
      // 页面事件
      this.$bus.$on("addPage", index => {
        if (!index && index != 0) {
          index = this.appJson.value.pageJson.length - 1;
        }
        this.addPage(index);
      });
      this.$bus.$on("copyPage", index => {
        this.copyPage(index);
      });
      this.$bus.$on("deletePage", index => {
        this.deletePage(index);
      });
      this.$bus.$on("selectPage", index => {
        this.selectPage(index);
      });
      this.$bus.$on("selectTemp", index => {
        this.selectTemp(index);
      });
      this.$bus.$on("sortPage", eventData => {
        this.sortPage(eventData.oldIndex, eventData.newIndex);
      });
    }
  },
  components: {
    // 基本菜单
    Iheader,
    Itool,
    Isidebar,
    Ishow
  },
  created() {
    console.log(eleTemp);
    this.initEvent();
  },
  watch: {
    activeTempIndex(val) {
      if (val.toString()) {
        this.$bus.$emit("openLayerSet");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.itgo-container {
  background: #eee;

  header {
    border-bottom: solid 1px #ccc;
  }

  .contain {
    display: flex;
    justify-content: space-between;
  }

  .left {
    width: 70px;
    border-right: solid 1px #ccc;
  }

  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
