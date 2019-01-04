<template>
  <div class="p10">
    <el-form :label-position="'left'" label-width="70px" :model="settingForm" ref="settingForm">
      <div class="tc" style="margin-bottom:10px;">
        <el-button @click="toggle">取消</el-button>
        <el-button type="primary" @click="submitSetting('settingForm')">生效</el-button>
      </div>
      <el-form-item label="背景图" prop="bg">
        <div
          class="img-view"
          :style="{backgroundImage:settingForm.bg.backgroundImage}"
          @click="changeImage"
        >
          <i class="el-icon-plus"></i>
        </div>
        <div class="mt10 tl" v-if="settingForm.bg.backgroundImage">
          <el-button type="default" size="mini" @click="deleteImage">删除图片</el-button>
          <el-button type="default" size="mini" @click="changeImage">修改图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="水平" prop="bg">
        <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
          <el-radio-button label="left top">左-上</el-radio-button>
          <el-radio-button label="center top">中-上</el-radio-button>
          <el-radio-button label="right top">右-上</el-radio-button>
        </el-radio-group>

        <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
          <el-radio-button label="left center">左-中</el-radio-button>
          <el-radio-button label="center center">中-中</el-radio-button>
          <el-radio-button label="right center">右-中</el-radio-button>
        </el-radio-group>

        <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
          <el-radio-button label="left bottom">左-下</el-radio-button>
          <el-radio-button label="center bottom">中-下</el-radio-button>
          <el-radio-button label="right bottom">右-下</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="覆盖方式" prop="bg">
        <el-radio-group v-model="settingForm.bg.backgroundSize" size="small">
          <el-radio-button label>原始</el-radio-button>
          <el-radio-button label="cover">平铺</el-radio-button>
          <el-radio-button label="contain">适配</el-radio-button>
          <el-radio-button label="100% 100%">拉伸</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="重复方式" prop="bg">
        <el-radio-group v-model="settingForm.bg.backgroundRepeat" size="small">
          <el-radio-button label="repeat-x">水平</el-radio-button>
          <el-radio-button label="repeat-y">垂直</el-radio-button>
          <el-radio-button label="repeat">全重复</el-radio-button>
          <el-radio-button label="no-repeat">不重复</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景颜色" prop="bg">
        <el-input v-model="settingForm.bg.backgroundColor" placeholder="请输入组件背景颜色" size="medium">
          <el-color-picker slot="prepend" v-model="settingForm.bg.backgroundColor" show-alpha></el-color-picker>
        </el-input>
      </el-form-item>
      <hr>
      <el-form-item label="场景宽度" prop="width">
        <el-input v-model="settingForm.width" placeholder="请输入组件长度">
          <template slot="append">PX</template>
        </el-input>
      </el-form-item>
      <el-form-item label="场景高度" prop="height">
        <el-input v-model="settingForm.height" placeholder="请输入组件宽度">
          <template slot="append">PX</template>
        </el-input>
      </el-form-item>
      <el-form-item label="入场动画" prop="name">
        <el-select
          v-model="settingForm.enterAnimation"
          placeholder="请选择"
          @change="animateNameChange"
        >
          <el-option label="无" value></el-option>
          <el-option
            v-for="(item, index) in animateOptions"
            :label="item.label"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="入场方向"
        prop="name"
        v-if="settingForm.enterAnimation&&settingForm.enterAnimation.dire"
      >
        <el-select
          v-model="settingForm.enterAnimationDire"
          placeholder="请选择"
          @change="animateNameChange"
        >
          <el-option
            v-for="(item, index) in direOptions"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="离场动画" prop="description">
        <el-select
          v-model="settingForm.leaveAnimation"
          placeholder="请选择"
          @change="animateNameChange"
        >
          <el-option label="无" value></el-option>
          <el-option
            v-for="(item, index) in animateOptionsLeave"
            :label="item.label"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="离场方向"
        prop="name"
        v-if="settingForm.leaveAnimation&&settingForm.leaveAnimation.dire"
      >
        <el-select
          v-model="settingForm.leaveAnimationDire"
          placeholder="请选择"
          @change="animateNameChange"
        >
          <el-option
            v-for="(item, index) in direOptions"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import picTool from "@/views/ishow/global/picTool/index.vue";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import { getImgList, savePageConfig } from "@/api/ishow";
import bus from "@/views/ishow/js/bus";
export default {
  directives: { elDragDialog },
  data() {
    return {
      disable: false,
      activeName: "first",
      coverUrl: "",
      picJson: [],
      settingForm: {
        bg: {
          backgroundImage: "",
          backgroundColor: "",
          backgroundSize: "",
          backgroundRepeat: "",
          backgroundPosition: ""
        },
        width: 0,
        height: 0,
        enterAnimation: {},
        enterAnimationDire: "",
        leaveAnimation: {},
        leaveAnimationDire: ""
      },
      // ruleState: {
      //   settingTitle: [
      //     {
      //       required: true,
      //       message: "标题不能为空",
      //       trigger: "blur"
      //     }
      //   ],
      //   settingSummary: [
      //     {
      //       required: true,
      //       message: "简介不能为空",
      //       trigger: "blur"
      //     }
      //   ]
      // },
      animateSelect: {},
      direName: "",
      animateOptions: [
        {
          value: "fadeIn",
          label: "淡入",
          dire: false
        },
        {
          value: "fadeIn-dire",
          label: "移入",
          dire: true
        },
        {
          value: "bounceIn-dire",
          label: "弹入",
          dire: true
        },
        {
          value: "flipInY",
          label: "翻转进入",
          dire: false
        },
        {
          value: "bounceIn",
          label: "中心弹入",
          dire: false
        },
        {
          value: "zoomIn",
          label: "中心放大"
        },
        {
          value: "rollIn-dire",
          label: "翻滚进入",
          dire: true
        },
        {
          value: "flipInX",
          label: "翻开进入",
          dire: false
        },
        {
          value: "lightSpeedIn-dire",
          label: "光速进入",
          dire: true
        },
        {
          value: "twisterInDown-dire",
          label: "魔幻进入",
          dire: true
        },
        {
          value: "puffIn",
          label: "缩小进入",
          dire: false
        },
        {
          value: "twisterInUp-dire",
          label: "旋转进入",
          dire: true
        }
      ],
      animateOptionsLeave: [
        {
          value: "fadeOut",
          label: "淡出",
          dire: false
        },
        {
          value: "fadeOut-dire",
          label: "移出",
          dire: true
        },
        {
          value: "bounceOut-dire",
          label: "弹出",
          dire: true
        },
        {
          value: "flipOutY",
          label: "翻转消失",
          dire: false
        },
        {
          value: "bounceOut",
          label: "中心消失",
          dire: false
        },
        {
          value: "zoomOut",
          label: "中心缩小",
          dire: false
        },
        {
          value: "rollOut-dire",
          label: "翻滚退出",
          dire: true
        },
        {
          value: "flipOutX",
          label: "翻开消失",
          dire: false
        },
        {
          value: "lightSpeedOut-dire",
          label: "光速退出",
          dire: true
        },
        {
          value: "puffOut",
          label: "放大退出",
          dire: false
        },
        {
          value: "hingeRight-dire",
          label: "悬挂脱落",
          dire: true
        }
      ],
      direOptions: [
        {
          label: "从左到右",
          value: "Right"
        },
        {
          label: "从上到下",
          value: "Down"
        },
        {
          label: "从右到左",
          value: "Left"
        },
        {
          label: "从下到上",
          value: "Up"
        }
      ]
    };
  },
  props: ["showJson", "renderJson", "showId", "pageJson"],
  created() {
    // this.fetchImgList().then(() => {
    //   this.$refs.picTool.setLoading(false);
    // });
    this.resetSetting();
  },
  watch: {
    pageJson: {
      handler() {
        this.resetSetting();
      },
      deep: true
    },
    toggle(val) {
      if (val) {
        this.resetSetting();
      }
    }
  },
  components: {
    picTool
  },
  methods: {
    animateNameChange() {
      console.log(this.settingForm);
    },
    // 提交表单
    submitSetting(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fetchPageConfig();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交配置
    fetchPageConfig() {
      console.info("this.$store", this.$store, this.$store.getters.activityId);
      bus.$emit("pageSetting", this.settingForm);
      return;

      if (!this.$store.getters.activityId) {
        this.$message("保存当前场景后保存的配置才能生效");
        return false;
      }
      const data = {
        id: this.$store.getters.activityId || "",
        paramJson: JSON.stringify(this.settingForm)
      };
      const _this = this;
      savePageConfig(data)
        .then(response => {
          console.info(response);
          _this.toggle();
        })
        .catch(err => {
          console.info(err);
        });
    },
    // 获取本地图片
    fetchImgList() {
      return getImgList()
        .then(response => {
          this.picJson = this.changeToArray(response.data);
        })
        .catch(err => {
          console.info(err);
        });
    },
    toggle() {
      this.disable = !this.disable;
    },
    addElementCrop(json) {
      this.coverUrl = json.url;
      console.info("addElementCrop");
    },
    // json key 值返回
    changeToArray(json) {
      let url;
      const result = [];
      for (url in json) {
        result.push(url);
      }
      return result;
    },
    // bg背景
    changePic() {
      this.$refs.picTool.openTool(this.coverUrl);
    },
    resetSetting() {
      this.settingForm = JSON.parse(JSON.stringify(this.pageJson));
      // this.settingForm=Object.assign({},this.pageJson)
      // this.settingForm.bg=Object.assign({},this.pageJson.bg)
    },
    changeImage() {
      document.getElementById("J-open-bg").click();
    },
    deleteImage() {
      this.settingForm.bg.backgroundImage = "";
      bus.$emit("update-pageJson", {
        // bgImage: {
        //   url: '',
        //   coord: ''
        // }
      });
    }
    // setColor(val) {
    //   bus.$emit('update-pageJson', {
    //     bgImage: {
    //       url: '',
    //       coord: '',
    //       backgroundColor: val
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.img-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  text-align: center;
  line-height: 60px;
  width: 60px;
  height: 60px;
  display: inline-block;
}
</style>