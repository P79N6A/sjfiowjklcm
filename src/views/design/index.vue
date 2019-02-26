<template>
  <div class="design-container">
    <header>
      <Iheader :appJson="appJson"></Iheader>
    </header>
    <div class="contain">
      <!-- <div class="left">
        <Isidebar></Isidebar>
      </div>-->
      <br>
      <div class="center">
        <!-- 传入当前页的json -->
        <Ishow
          :pageJson="appJson.value.pageJson[activePageIndex]"
          :activeTempIndex="activeTempIndex"
        ></Ishow>
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
import { getIshowOne, addIshows, updateIshows } from "@/api/ishow";

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
                  position: {
                    top: 10,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字"
                  },
                  style: {
                    bg: {
                      backgroundImage: "url('/favicon.ico')",
                      backgroundColor: "#eee",
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
                      shadowDire: 0
                    },
                    text: {
                      color: "#ddd",
                      textAlign: "center",
                      fontFamily: "simon",
                      lineHeight: "1.5",
                      letterSpacing: "",
                      fontWeight: "",
                      fontSize: 14,
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 100,
                      height: 100,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [
                    {
                      animationDelay: 0,
                      animationDuration: 1,
                      animationFillMode: "both",
                      animationIterationCount: 1,
                      animationName: "flash",
                      animationPlayState: "initial",
                      animationTimingFunction: "ease"
                    },
                    {
                      animationDelay: 0,
                      animationDuration: 1,
                      animationFillMode: "both",
                      animationIterationCount: 1,
                      animationName: "tada",
                      animationPlayState: "initial",
                      animationTimingFunction: "ease"
                    },
                    {
                      animationDelay: 0,
                      animationDuration: 1,
                      animationFillMode: "both",
                      animationIterationCount: 1,
                      animationName: "swing",
                      animationPlayState: "initial",
                      animationTimingFunction: "ease"
                    },
                    {
                      animationDelay: 0,
                      animationDuration: 1,
                      animationFillMode: "both",
                      animationIterationCount: 1,
                      animationName: "shake",
                      animationPlayState: "initial",
                      animationTimingFunction: "ease"
                    }
                  ],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    },
                    hover: {
                      animation: ""
                    }
                  }
                },
                {
                  type: 2,
                  title: "图片2",
                  position: {
                    top: 50,
                    left: 50
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "/favicon.ico"
                  },
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
                      fontSize: 14,
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "1",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 50,
                      height: 50,
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
                    },
                    hover: {
                      animation: ""
                    }
                  }
                },
                {
                  type: 1,
                  title: "文字3",
                  position: {
                    top: 85,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字"
                  },
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
                      fontSize: 14,
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "1",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 90,
                      height: 90,
                      opacity: 100,
                      rotate: 0
                    }
                  },
                  animate: [
                    {
                      animationDelay: 0,
                      animationDuration: 1,
                      animationFillMode: "both",
                      animationIterationCount: 1,
                      animationName: "",
                      animationPlayState: "initial",
                      animationTimingFunction: "ease"
                    }
                  ],
                  event: {
                    onClick: {
                      type: "",
                      link: "",
                      index: "",
                      target: "_blank"
                    },
                    hover: {
                      animation: ""
                    }
                  }
                },
                {
                  type: 9,
                  title: "形状",
                  position: {
                    top: 0,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    viewBox: "",
                    content: ""
                  },
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
                      shadowX: 0,
                      shadowY: 0,
                      shadowFuzzy: 0,
                      shadowDire: 0,
                      shadowinSet: ""
                    },
                    text: {
                      color: "#ccc",
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: 1,
                      letterSpacing: "",
                      fontSize: 14,
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 100,
                      height: 40,
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
                    },
                    hover: {
                      animation: ""
                    }
                  }
                }
              ],
              bg: {
                backgroundImage: "url('/favicon.ico')",
                backgroundColor: "#eee",
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
                shadowWidth: 0,
                shadowRadius: 0,
                shadowDire: 0
              },
              base: {
                width: 400,
                height: 400,
                opacity: 100,
                rotate: 0
              },
              animate: {
                enterAnimation: "",
                leaveAnimation: ""
              },
              config: {
                fullScreen: false
              },
              timer: null
            },
            {
              page: 2,
              title: "第2页",
              json: [
                {
                  type: 1,
                  title: "文字1",
                  position: {
                    top: 50,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字"
                  },
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
                      fontSize: 14,
                      fontFamily: "",
                      lineHeight: "1",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 40,
                      height: 70,
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
                    },
                    hover: {
                      animation: ""
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
              base: {
                width: 300,
                height: 300,
                opacity: 100,
                rotate: 0
              },
              animate: {
                enterAnimation: "",
                leaveAnimation: ""
              },
              config: {
                fullScreen: false
              },
              timer: null
            },
            {
              page: 3,
              title: "第3页",
              json: [
                {
                  type: 1,
                  title: "文字1",
                  position: {
                    top: 88,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字"
                  },
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
                      fontSize: 14,
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "1",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 60,
                      height: 50,
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
                    },
                    hover: {
                      animation: ""
                    }
                  }
                },
                {
                  type: 1,
                  title: "文字2",
                  position: {
                    top: 0,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字"
                  },
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
                      fontSize: 14,
                      textAlign: "",
                      fontFamily: "",
                      lineHeight: "1",
                      letterSpacing: "",
                      fontWeight: "",
                      fontStyle: "italic",
                      textDecoration: ""
                    },
                    base: {
                      width: 70,
                      height: 40,
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
                    },
                    hover: {
                      animation: ""
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
              base: {
                width: 400,
                height: 500,
                opacity: 100,
                rotate: 0
              },
              animate: {
                enterAnimation: "",
                leaveAnimation: ""
              },
              config: {
                fullScreen: false
              },
              timer: null
            }
          ],
          pageSetting: {
            autoAnimation: true,
            infinite: false,
            interval: 3
          },
          indicator: {
            show: false,
            showText: false,
            bottom: 0,
            margin: 0,
            width: "10",
            height: "10",
            color: "#eee",
            colorActive: "#409EFF",
            textColor: "#000",
            textColorActive: "#fff",
            borderRadius: 0
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

        if (key == "img") {
          this.$bus.$emit("openImgList", "ChangeImgUrl");
        } else if (key == "svg") {
          this.$bus.$emit("openSvgList", "ChangSvg");
        } else if (key == "vue") {
          this.$bus.$emit("openComList", "ChangeVue");
        }

        const _newTemp = JSON.parse(JSON.stringify(eleTemp[key]));
        _pageJson.json.splice(this.activeTempIndex + 1, 0, _newTemp);
        this.activeTempIndex++;
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
    // 切换元素锁定状态
    toggleTempLock(index) {
      this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].config.isLock = !this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].config.isLock;
    },
    // 切换元素显示与否
    toggleTempShow(index) {
      this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].config.isShow = !this.appJson.value.pageJson[this.activePageIndex].json[
        index
      ].config.isShow;
    },
    // 更新元素排序
    sortTemp(oldIndex, newIndex) {
      let _tempJson = this.appJson.value.pageJson[this.activePageIndex].json;
      const targetRow = _tempJson.splice(oldIndex, 1)[0];
      _tempJson.splice(newIndex, 0, targetRow);
    },
    // 删除元素
    deleteTemp(index) {
      console.log(index);
      if (this.appJson.value.pageJson[this.activePageIndex].json.length > 1) {
        const _tempJson = this.appJson.value.pageJson[this.activePageIndex]
          .json;
        console.log(_tempJson);
        _tempJson.splice(this.index, 1);
        // 取消元素的选中状态
        if (index > 0) {
          this.activeTempIndex = index - 1;
        } else {
          this.activeTempIndex = 0;
        }
      } else {
        this.$notify({
          title: "提示",
          message: "至少保留一个元素!",
          type: "warning",
          duration: 2000
        });
      }
    },
    /**=========页面操作========**/
    // 添加页面
    addPage(index) {
      let _pageJson = this.appJson.value.pageJson;
      _pageJson.splice(index + 1, 0, JSON.parse(JSON.stringify(pageTemp)));
      this.activePageIndex = index + 1;
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
    // 保存页面内容
    saveJson() {
      if (this.appJson._id) {
        updateIshows(this.appJson)
          .then(res => {
            this.$notify({
              title: "提示",
              message: "操作成功!",
              type: "success",
              duration: 2000
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        addIshows(this.appJson)
          .then(res => {
            this.$notify({
              title: "提示",
              message: "操作成功!",
              type: "success",
              duration: 2000
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
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
      this.$bus.$on("sortTemp", eventData => {
        this.sortTemp(eventData.oldIndex, eventData.newIndex);
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
      this.$bus.$on("saveJson", eventData => {
        this.saveJson();
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
    // 设置活动id,编辑状态
    const _id = this.$route.query.ishowsId || "";
    if (_id) {
      getIshowOne({ _id: _id })
        .then(res => {
          console.log(res);
          this.appJson = res.data;
          console.log(this.appJson);
        })
        .catch(err => {});
    } else {
    }
    this.initEvent();
  },
  watch: {
    activeTempIndex(val) {
      const _isShow = this.appJson.value.pageJson[this.activePageIndex].json[
        this.activeTempIndex
      ].config.isShow;
      const _isLock = this.appJson.value.pageJson[this.activePageIndex].json[
        this.activeTempIndex
      ].config.isLock;

      if (val.toString() && !_isLock) {
        this.$bus.$emit("openLayerSet");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.design-container {
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
    background: #fff;
    background-image: linear-gradient(
        45deg,
        #eee 25%,
        transparent 0,
        transparent 75%,
        #eee 0
      ),
      linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
  }
}
</style>
