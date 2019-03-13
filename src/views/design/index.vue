<template>
  <div class="design-container">
    <header>
      <Iheader :appJson="appJson"></Iheader>
    </header>
    <div class="contain">
      <div class="left">
        <Isidebar :activeTempIndex="activeTempIndex"></Isidebar>
      </div>
      <br>
      <div class="center">
        <!-- 传入当前页的json -->
        <Ishow
          :pageJson="appJson.value.pageJson[activePageIndex]"
          :activeTempIndex="activeTempIndex"
          :appJson="appJson"
        ></Ishow>
      </div>
      <div class="right">
        <Itool
          :appJson="appJson"
          :activePageIndex="activePageIndex"
          :activeTempIndex="activeTempIndex"
          :history="history"
          :historyIndex="historyIndex"
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
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  text = "ele-" + text;
  return text;
}
export default {
  data() {
    return {
      appId: null,
      // 场景json
      appJson: {
        id: "",
        description: "新组件",
        device: "",
        name: "新组件",
        type: "",
        tag: "",
        value: {
          pageJson: [
            {
              page: 1,
              id: "",
              title: "第1页",
              json: [
                {
                  type: 1,
                  id: "",
                  title: "文字",
                  position: {
                    top: 0,
                    left: 10
                  },
                  config: {
                    isShow: true,
                    isLock: false,
                    content: "你要编辑的文字",
                    styleText: "",
                    class: ""
                  },
                  style: {
                    bg: {
                      backgroundImage: "",
                      backgroundColor: "",
                      backgroundSize: "",
                      backgroundRepeat: "",
                      backgroundPosition: "",
                      backgroundAttachment: ""
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
                      fontSize: 14,
                      fontWeight: "",
                      fontStyle: "",
                      textDecoration: ""
                    },
                    base: {
                      width: 100,
                      height: 50,
                      opacity: 100,
                      rotate: 0
                    },
                    transition: {
                      duration: 0,
                      timingFunction: "ease"
                    },
                    transform: {
                      translateX: 0,
                      translateY: 0,
                      scaleX: 1,
                      scaleY: 1,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      skewX: 0,
                      skewY: 0
                    }
                  },
                  hoverStyle: {
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
                      fontSize: 14,
                      fontWeight: "",
                      fontStyle: "",
                      textDecoration: ""
                    },
                    base: {
                      width: 100,
                      height: 50,
                      opacity: 100,
                      rotate: 0
                    },
                    transform: {
                      translateX: 0,
                      translateY: 0,
                      scaleX: 1,
                      scaleY: 1,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      skewX: 0,
                      skewY: 0
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
                  hoverAnimate: [
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
                      target: "_blank",
                      elSet: []
                    }
                  }
                }
              ],
              style: {
                bg: {
                  backgroundImage: "",
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
                  width: 320,
                  height: 400,
                  opacity: 100,
                  rotate: 0
                }
              },
              animate: {
                enterAnimation: "",
                leaveAnimation: ""
              },
              config: {
                fullScreen: false,
                styleText: ""
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
            bg: "#rgba(0,0,0,0)",
            width: "10",
            height: "10",
            color: "#eee",
            colorActive: "#409EFF",
            textColor: "#000",
            textColorActive: "#fff",
            fontSize: 14,
            borderRadius: 0
          }
        }
      },
      history: [], // 历史纪录库
      historyIndex: 0, // 当前历史纪录编号
      // 正在编辑的场景序号
      activePageIndex: 0,
      // 正在编辑的元素序号
      activeTempIndex: 0
    };
  },
  methods: {
    /**========元素操作========**/
    // 添加元素
    addTemp(obj) {
      let key = obj.type;
      let data = obj.data;

      if (key && eleTemp && eleTemp[key]) {
        let _pageJson = this.appJson.value.pageJson[this.activePageIndex];
        const _newTemp = JSON.parse(JSON.stringify(eleTemp[key]));
        _newTemp.id = makeid();
        if (key == "img") {
          this.$bus.$emit("openImgList", "ChangeImgUrl");
        } else if (key == "svg") {
          this.$bus.$emit("openSvgList", "ChangSvg");
        } else if (key == "vue") {
          if (data.configId) {
            _newTemp.config.config = data.configId;
          }
          if (data.shortId) {
            _newTemp.config.content = data.shortId;
          }
          if (data.configModel) {
            _newTemp.config.configModel = data.configModel;
          }
          if (data.categoryModel) {
            _newTemp.config.categoryModel = data.categoryModel;
          }
          if (data.categoryId) {
            _newTemp.config.category = data.categoryId;
          }
        }
        _pageJson.json.splice(this.activeTempIndex + 1, 0, _newTemp);
        this.activeTempIndex++;
      }
    },
    // 复制元素
    copyTemp(index) {
      const _tempJson = this.appJson.value.pageJson[this.activePageIndex].json;
      let new_tempJson = JSON.parse(JSON.stringify(_tempJson[index]));
      new_tempJson.id = makeid();
      new_tempJson.title = new_tempJson.title + "[复制]";
      _tempJson.splice(index + 1, 0, new_tempJson);
    },
    // 选定元素
    selectTemp(index) {
      console.log(index);
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
      console.log(this.appJson.value.pageJson[this.activePageIndex].json);
      if (this.appJson.value.pageJson[this.activePageIndex].json.length > 0) {
        const _tempJson = this.appJson.value.pageJson[this.activePageIndex]
          .json;
        console.log(_tempJson);
        _tempJson.splice(index, 1);
        // 取消元素的选中状态
        if (index > 0) {
          this.activeTempIndex = index - 1;
        } else {
          this.activeTempIndex = 0;
        }
      }
    },
    /**=========页面操作========**/
    // 添加页面
    addPage(index) {
      let _pageJson = this.appJson.value.pageJson;
      _pagejson.id = makeid();
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
      new_pageJson.id = makeid();
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
            this.appJson._id = res.data._id;
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
      this.$bus.$on("saveHistory", eventData => {
        this.history.push({
          title: eventData,
          value: JSON.parse(JSON.stringify(this.appJson))
        });
        this.historyIndex++;
        this.history = this.history.slice(0, this.historyIndex + 1);
      });
      this.$bus.$on("selectHistory", eventData => {
        this.historyIndex = eventData;
        this.appJson = JSON.parse(
          JSON.stringify(this.history[this.historyIndex].value)
        );
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
    // 设置活动id,编辑状态
    const _id = this.$route.query.ishowsId || "";
    if (_id) {
      getIshowOne({
        _id: _id
      })
        .then(res => {
          this.appJson = res.data;
          // 历史纪录
          this.history.push({
            title: "打开组件",
            value: JSON.parse(JSON.stringify(this.appJson))
          });
        })
        .catch(err => {});
    } else {
      this.appJson.id = makeid();
      this.appJson.value.pageJson[0].id = makeid();
      this.appJson.value.pageJson[0].json[0].id = makeid();
      this.history.push({
        title: "打开组件",
        value: JSON.parse(JSON.stringify(this.appJson))
      });
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

  .center {
    flex: 1;
    display: flex;
    justify-content: top;
    align-items: flex-start;
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
