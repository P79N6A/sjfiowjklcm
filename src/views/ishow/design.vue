<template>
  <div>
    <!-- 导航栏 -->
    <main-header
      :show-id="showId"
      :show-json="showJson"
      :page-json="pageJson"
      :render-json="renderJson"
      :page="page"
      :h5-json="h5Json"
    ></main-header>
    <div class="main v-global" @click="toggerActive">
      <!-- 页面列表 -->
      <main-modules :page-json="pageJson" :show-json="showJson" :page="page"></main-modules>
      <!-- 操作区域 -->
      <main-show
        :show-json="showJson"
        :render-json="renderJson"
        :page-json="pageJson[page-1]"
        :show-id="showId"
        ref="show"
      ></main-show>
      <!-- 样式编辑工具 -->
      <main-editor
        :render-json="renderJson"
        :show-id="showId"
        ref="editor"
        :show-json="pageJson"
        :page-json="pageJson[page-1]"
      ></main-editor>
    </div>
    <!-- 当前页面参数设置 -->
    <div v-if="showDemo" class="demo">
      <div>
        <div>
          <el-button @click="showDemo=false">关闭</el-button>
        </div>
        <views :page-json="pageJson" :page-setting="pageSetting"></views>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="组件设置">
      <el-form ref="dataForm"  label-position="right" label-width="120px">
        <el-form-item label="*组件名称">
          <el-input v-model="name" placeholder="组件名"/>
        </el-form-item>
        <el-form-item label="*组件描述">
          <el-input v-model="description" type="textarea" placeholder="组件描述"/>
        </el-form-item>
        <el-form-item label="场景自动切换">
          <el-switch
            v-model="pageSetting.autoAnimation"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="场景循环播放">
          <el-switch
            v-model="pageSetting.infinite"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="场景循环播放">
           <el-input-number v-model="pageSetting.interval" :precision="1" :step="0.1" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click="bus.$emit('save-json')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import mainModules from "@/views/ishow/modules/modules.vue";
import mainEditor from "@/views/ishow/editor/main-editor.vue";
import mainHeader from "@/views/ishow/header/header.vue";
import mainShow from "@/views/ishow/show/main-show.vue";
// 全局事件
import bus from "@/views/ishow/js/bus";
import appJson from "@/views/ishow/js/app/app.json";
import views from "@/views/ishow/views/main-show.vue";
import { getPageJson, addIshows, getIshowOne, updateIshows } from "@/api/ishow";

// 排错技巧：定位到文件－行，数据没同步
const showJsons = [
  {
    page: 1,
    json: [],
    device: "pc",
    bg: {
      backgroundImage: "",
      backgroundColor: "",
      backgroundSize: "",
      backgroundRepeat: "",
      backgroundPosition: ""
    },
    enterAnimation: "",
    enterAnimationDire: "",
    leaveAnimation: "",
    leaveAnimationDire: "",
    width: 400,
    height: 300,
    timer: null
  }
];

export default {
  data() {
    return {
      bus,
      // 当前编辑json
      renderJson: {},
      // 当前编辑的id
      showId: false,
      _id: "",
      pageJson: [],
      // 当前页数
      page: 1,
      showJson: [],
      name: "新组件",
      description: "组件描述",
      autoAnimation: true, //是否自动播放动画
      infinite:true, // 是否循环播放
      interval:1,//动画时间间隔
      pageSetting:{
        autoAnimation: true, //是否自动播放动画
        infinite:true, // 是否循环播放
        interval:1.3,//动画时间间隔
      },
      initJson: this.parseJson(appJson.initJsons),
      initPage: this.parseJson(appJson.initPage),
      // 历史记录
      histroyJson: [],
      ref: {},
      h5Json: {},
      // 弹窗
      showDemo: false,
      dialogFormVisible: false
    };
  },
  components: {
    mainModules,
    mainEditor,
    mainHeader,
    mainShow,
    views
  },
  created() {
    // 设置总json
    this.pageJson = this.parseJson(showJsons);
    // 设置活动id,编辑状态
    this._id = this.$route.query.ishowsId || "";
    if (this._id) {
      this.$store.commit("SET_ACTIVITYID", this._id);
      this.fetchPageJson({
        _id: this._id
      });
    } else {
      this.init();
    }
  },

  methods: {
    init() {
      // 设置总json
      // this.pageJson = this.parseJson(json);
      // 设置showJson
      this.getPageJson();
      // 设置renderJson
      this.renderJson = this.converJson(this.showJson);
      // 绑定全局bus事件
      this.addEvent();

      bus.$emit("add-histroy");
    },
    // 获取h5编辑的json
    fetchPageJson() {
      const _this = this;
      return getIshowOne({
        _id: this._id
      })
        .then(res => {
          // const temp = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
          this.pageJson = this.parseJson(res.data.pageJson);
          this.name = res.data.name;
          this.description = res.data.description;
          Object.assign(this.pageSetting,res.data.pageSetting)
          this.pageJson[0].page = 1;
          _this.init();
          // this.updatePageJson(response.data);
        })
        .catch(err => {});
    },
    // 绑定事件
    addEvent() {
      // 文字 更改元素大小
      bus.$on("show-text-resize", isResize => {
        this.$refs.show.$refs.template[0].resize(isResize);
      });
      // 组件内容编辑弹窗
      bus.$on("showDialog", data => {
        this.dialogFormVisible = true;
      });
      // 查看demo
      bus.$on("showDemo", data => {
        this.showDemo = true;
      });
      // 更新图片
      // bus.$on('update-image-layer', (type, data) => {
      //   // 重置尺寸，兼容编辑图片引起的图片比例错误
      //   data.width = 'auto';
      //   data.height = 'auto';
      //   console.info(data)
      //   // this.addElement(type, data);
      // });
      // 更新背景
      bus.$on("setBgImg", data => {
        // console.log(this.pageJson)
        this.pageJson[this.page - 1].bg.backgroundImage = data;
      });
      // 更新当前页面设置
      bus.$on("pageSetting", data => {
        // 背景
        Object.assign(this.pageJson[this.page - 1].bg, data.bg);
        // 尺寸
        this.pageJson[this.page - 1].width = data.width;
        this.pageJson[this.page - 1].height = data.height;
        //动画
        this.pageJson[this.page - 1].enterAnimation = data.enterAnimation;
        this.pageJson[this.page - 1].enterAnimationDire =
          data.enterAnimationDire;
        this.pageJson[this.page - 1].leaveAnimation = data.leaveAnimation;
        this.pageJson[this.page - 1].leaveAnimationDire =
          data.leaveAnimationDire;
        // this.pageJson[this.page-1].name=data.name
        // this.pageJson[this.page-1].description=data.description
      });
      // 更新整个h5属性,可以忽略
      bus.$on("update-h5Json", data => {
        this.h5Json = Object.assign({}, this.h5Json, data);
      });

      // 更新renderJson
      bus.$on("update-json", data => {
        this.updateMethod(data);
        this.setPageJson();
      });

      // 添加元素
      bus.$on("add-json", (type, params) => {
        this.addJson(type, params);
        this.setPageJson();
      });

      // 修改所有元素的某一个属性
      bus.$on("update-themecolor", color => {
        this.setThemecolor(color);
        bus.$emit("set-page", this.page);
      });

      // 设置showId
      bus.$on("set-elementId", _id => {
        this.showId = _id;
      });

      // 设置page
      bus.$on("set-page", _page => {
        this.page = _page;
        // const result = this.getPageJson();
        this.showId = false;
        this.getPageJson();
        this.renderJson = this.converJson(this.showJson);
      });
      // 删除page
      bus.$on("delete-page", _page => {
        const result = this.deletePageJson(_page);
        if (!result.length) {
          const temp = this.parseJson(appJson.initPage);
          temp.page = 1;
          result.push(temp);
        }
        this.pageJson = result;
        this.page = 1;
        this.showId = false;
        bus.$emit("set-page", this.page);
      });
      // 添加page
      bus.$on("add-page", () => {
        const page = this.pageJson.length + 1;
        const temp = this.parseJson(appJson.initPage);
        temp.page = page;
        this.pageJson.push(temp);
        this.page = page;
        bus.$emit("set-page", page);
      });

      // 更新所有page-json
      // bus.$on('update-pageJson-all', data => {
      //   this.updatePageJson(data);
      // });

      // 更新当前page单一属性
      bus.$on("update-page", (key, value) => {
        const json = this.parseJson(this.pageJson);
        json[this.page - 1][key] = value;
        this.pageJson = json;
        bus.$emit("set-page", this.page);
      });

      // 更新当前page属性
      bus.$on("update-pageJson", value => {
        const json = this.parseJson(this.pageJson);
        json[this.page - 1] = Object.assign({}, json[this.page - 1], value);
        this.pageJson = json;
        bus.$emit("set-page", this.page);
      });

      // 更新所有页面page属性
      // bus.$on('update-pageJson-all', value => {
      //   const json = this.parseJson(this.pageJson);
      //   for (let i = 0; i < json.length; i++) {
      //     json[i] = Object.assign({}, json[i], value);
      //   }
      //   this.pageJson = json;
      //   bus.$emit('set-page', this.page);
      // });

      // 保存json
      bus.$on("save-json", () => {
        this.setPageJson();
        if (this.name && this.description) {
          if (this._id) {
            this.updateIshow();
          } else {
            this.createIshow();
          }
        } else {
          this.$notify({
            title: "提示",
            message: "请先完善信息",
            type: "warning",
            duration: 2000
          });
        }
      });

      // 保存json
      bus.$on("reset-json", () => {
        const json = this.parseJson(this.renderJson);
        json[this.showId] = this.parseJson(appJson.initJsons.text);
        json[this.showId].content = this.renderJson[this.showId].content;
        json[this.showId].id = this.renderJson[this.showId].id;
        // console.info(json)
        bus.$emit("update-json", json);
      });

      // 置底
      // bus.$on('set-index', () => {
      //   let showJson = this.parseJson(this.showJson);
      //   for (let i = 0; i < showJson.length; i++) {
      //     if (showJson[i].id === this.showId) {
      //       showJson[i].zIndex = 1;
      //       showJson = this.parseJson(this.array_move(showJson, i, 0));
      //       const renderJson = this.converJson(showJson);
      //       bus.$emit('update-json', renderJson);
      //       bus.$emit('update-index', 1);
      //       break;
      //     }
      //   }
      // });

      // 层级移动
      bus.$on("set-index-move", type => {
        let showJson = this.parseJson(this.showJson);
        showJson = this.orderFn(showJson, "zIndex", true);
        // console.info('showJson22', showJson)
        for (let i = 0; i < showJson.length; i++) {
          if (showJson[i].id === this.showId) {
            let newIndex = i;
            // 上移一层
            if (type === -1 && i - 1 >= 0) {
              showJson[i].zIndex = showJson[i - 1].zIndex;
              newIndex = i - 1;
            }
            // 下移一层
            if (type === 1 && i + 1 < showJson.length) {
              showJson[i].zIndex = showJson[i + 1].zIndex;
              newIndex = i + 1;
            }
            // 置底
            if (type === 0) {
              showJson[i].zIndex = 1;
              newIndex = 0;
            }
            // 置顶
            if (type === 2) {
              showJson[i].zIndex = showJson[showJson.length - 1].zIndex;
              newIndex = showJson.length - 1;
            }
            showJson = this.parseJson(this.array_move(showJson, i, newIndex));
            const renderJson = this.converJson(showJson);
            bus.$emit("update-json", renderJson);
            bus.$emit("update-index", newIndex);
            break;
          }
        }
      });

      // 添加历史纪录
      bus.$on("add-histroy", () => {
        const json = this.parseJson(this.pageJson);
        let len = this.histroyJson.length;
        if (this.jsonEq(json, this.histroyJson[len - 1])) {
          return false;
        }
        this.histroyJson.push(json);
        len = len + 1;
        const min = len - 10 < 0 ? 0 : len - 10;
        if (len >= 40) {
          this.histroyJson = this.parseJson(this.histroyJson.slice(min, len));
        }
      });

      // 获取设置历史纪录
      bus.$on("get-histroy", () => {
        const len = this.histroyJson.length;
        if (!len) {
          return false;
        }
        // 兼容没办法获取改变前的数据，只能通过@change方法获取。如果用watch会存储很多错误信息.所以要保存第一个的状态
        const result = len === 1 ? this.histroyJson[0] : this.histroyJson.pop();
        this.pageJson = this.parseJson(result);
        if (this.pageJson.length < this.page) {
          this.page = 1;
          this.showId = false;
        }
        bus.$emit("set-page", this.page);
      });

      // 切换显示背景编辑器
      // bus.$on('bg-editor-toggle', function(isActive) {
      //     let json=this.parseJson(this.pageJson[this.page-1].bgImage);
      //     console.info(json)
      //     this.$refs.editor.toggleBgEditor(isActive,json);
      // }.bind(this));
    },
    // desc降序
    orderFn(arr, key, desc) {
      if (arr.length < 2) {
        return;
      }
      arr.sort((a, b) => {
        let _a = a[key],
          _b = b[key];
        if (!desc) {
          _a = b[key];
          _b = a[key];
        }
        return _a - _b;
      });
      return arr;
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    },
    // 切换显示背景编辑器
    bgEditorToggle(isActive) {
      const json = this.parseJson(this.pageJson[this.page - 1].bgImage);
      this.$refs.editor.toggleBgEditor(isActive, json);
    },
    updateIshow() {
      const _data = {
        _id: this._id,
        name: this.name,
        description: this.description,
        pageSetting:this.pageSetting,
        pageJson: this.pageJson
      };
      updateIshows(_data)
        .then(res => {
          console.log(res);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    createIshow() {
      const _data = {
        name: this.name,
        description: this.description,
        pageSetting:this.pageSetting,
        pageJson: this.pageJson
      };
      addIshows(_data)
        .then(res => {
          this._id = res.data._id;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 添加page
    updatePageJson(json) {
      this.pageJson = this.parseJson(json);
      bus.$emit("set-page", 1);
    },
    // 统一更换主题色
    setThemecolor(color) {
      const jsons = this.parseJson(this.pageJson);
      jsons.forEach(json => {
        json.json.forEach(item => {
          if (item.text.themeColor && item.type !== 7) {
            item.text.themeColor = color;
            item.text.borderColor = color;
          }
        });
      });
      this.pageJson = jsons;
    },
    updateMethod(data) {
      if (data && this.renderJson !== data) {
        this.renderJson = JSON.parse(JSON.stringify(data));
        this.showJson = this.converShowJson(data);
      }
    },
    getPageJson() {
      for (let i = 0; i < this.pageJson.length; i++) {
        if (this.pageJson[i].page === this.page) {
          this.showJson = this.pageJson[i].json;
          return this.pageJson[i].json;
        }
      }
      return false;
    },
    deletePageJson(page) {
      let temp;
      const result = [];
      let newPage = 1;
      const json = this.parseJson(this.pageJson);
      for (let i = 0; i < json.length; i++) {
        if (json[i].page !== page) {
          temp = json[i];
          temp.page = newPage;
          result.push(temp);
          newPage++;
        }
      }
      return result;
    },

    setPageJson(data) {
      for (let i = 0; i < this.pageJson.length; i++) {
        if (this.pageJson[i].page === this.page) {
          this.pageJson[i].json = data || this.showJson;
          return false;
        }
      }
    },
    // json是否相等
    jsonEq(val1, val2) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    },

    // 深拷贝
    parseJson(json) {
      return JSON.parse(JSON.stringify(json));
    },
    // 添加元素
    addJson(type, params) {
      // 获取val值
      const keyVal = appJson.key[type];
      const initVal = Object.assign({}, this.initJson[keyVal]);
      // 获取id
      initVal.id = this.createId();
      initVal.zIndex = this.addIndex();
      if (initVal.type === 6) {
        params.form.name = "s-" + initVal.id;
        params.form.cname = "s-" + initVal.id;
      }
      // 合并参数
      if (params) {
        Object.assign(initVal, params);
      }
      this.showId = initVal.id;
      this.showJson.push(initVal);
      this.renderJson = this.converJson(this.showJson);
      bus.$emit("re-render", this.renderJson);
    },
    addIndex() {
      let max = 1;
      const len = this.showJson.length;
      let index;
      if (len === 0) {
        return 1;
      }
      for (let i = 0; i < len; i++) {
        index = this.showJson[i].zIndex;
        if (max < index) {
          max = index;
        }
      }
      return max + 1;
    },
    // showJson转换成renderJson
    converJson(data) {
      const result = {};
      for (let i = 0; i < data.length; i++) {
        result[data[i].id] = data[i];
      }
      return result;
    },
    // renderJson转换成showJson
    converShowJson(data) {
      const result = [];
      for (const id in data) {
        result.push(data[id]);
      }
      return result;
    },
    createId() {
      const date = new Date();
      return date.getTime() + "";
    },
    toggerActive() {
      bus.$emit("remove-selected");
      bus.$emit("button2-menu-hide");
      bus.$emit("bg-editor-hide");
      this.showId = false;
    }
  },
  mounted() {
    // 键盘上下左右移动
    document.addEventListener("keydown", event => {
      // 撤销 ctrl+z
      if (
        (event.keyCode === 90 && event.metaKey) ||
        (event.keyCode === 90 && event.ctrlKey)
      ) {
        bus.$emit("get-histroy");
      }

      if (!this.showId) {
        return false;
      }
      // 上下左右移动
      const arr = [["left", -1], ["left", 1], ["top", -1], ["top", 1]];
      const result =
        event.keyCode === 37
          ? 0
          : event.keyCode === 39
          ? 1
          : event.keyCode === 38
          ? 2
          : event.keyCode === 40
          ? 3
          : false;
      if (result !== false) {
        const data = this.parseJson(this.renderJson);
        data[this.showId].position[arr[result][0]] =
          data[this.showId].position[arr[result][0]] + arr[result][1];
        bus.$emit("update-json", data);
      }

      // 删除
      if (event.keyCode === 8 || event.keyCode === 46) {
        if (event.target.tagName === "BODY") {
          bus.$emit("add-histroy");
          delete this.renderJson[this.showId];
          const data = this.parseJson(this.renderJson);
          bus.$emit("update-json", data);
          this.showId = false;
        }
      }
    });
  }
};
</script>
<style>
.v-global {
  display: flex;
}

.demo {
  position: fixed;
  z-index: 99999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
