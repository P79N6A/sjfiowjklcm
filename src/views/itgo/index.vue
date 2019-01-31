<template>
  <div class="itgo-container">
    <header>
      <Iheader></Iheader>
    </header>
    <div class="contain">
      <!-- <div class="left">
        <Isidebar></Isidebar>
      </div>-->
      <div class="center">
        <!-- 传入当前页的json -->
        <Ishow :pageJson="appJson[activePageIndex]"></Ishow>
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
              json: [],
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
      // 正在编辑的元素
      activeTemp: null, // 应该可以废弃
      // 正在编辑的元素序号
      activeTempIndex: null
    };
  },
  methods: {
    // 添加元素
    addTemp(key) {
      if (key && eleTemp && eleTemp[key]) {
        let _pageJson = this.appJson.value.pageJson[this.activePageIndex];
        _pageJson.json.splice(this.activeTempIndex, 0, eleTemp[key]);
      }
    },
    // 删除元素
    deleteTemp(index) {
      let _pageJson = this.appJson.value.pageJson[this.activePageIndex];
      _pageJson.json.splice(this.activeTempIndex, 0);
      this.activeTempIndex = null;
      this.activeTemp = null;
    },
    // 添加页面
    addPage() {
      let _pageJson = this.appJson.value.pageJson;
      _pageJson.splice(this.activeTempIndex, 0, pageTemp);
    },
    // 删除页面
    deletePage(index) {
      if (this.appJson.value.pageJson.length > 1) {
        let _pageJson = this.appJson.value.pageJson;
        _pageJson.splice(this.activeTempIndex, 0);
        this.activePageIndex = 0;
      } else {
        alert("至少保留一个页面!");
      }
    },
    // 全局事件绑定
    initEvent() {
      this.$bus.$on("addTemp", key => {
        this.addTemp(key);
      });
      this.$bus.$on("deleteTemp", index => {
        this.addTemp(index);
      });
      this.$bus.$on("addPage", eventData => {
        this.addTemp();
      });
      this.$bus.$on("deletePage", index => {
        this.deletePage(index);
      });
      this.$bus.$on("selectPage", index => {
        this.activePageIndex = index;
      });
      this.$bus.$on("selectTemp", index => {
        this.activeTempIndex = index;
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
  mounted() {
    console.log(eleTemp);
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
