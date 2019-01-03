<template>
  <div class="event-editor">
    <el-form ref="form" label-position="top">
      <el-form-item label="点击事件">
        <el-select v-model="onClick" placeholder="请选择" @change="addHistroy">
          <el-option
            v-for="(item, index) in clickEvent"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转到指定场景" v-if="onClick=='index'">
        <el-select v-model="toIndex" placeholder="请选择" @change="addHistroy">
          <el-option
            v-for="(item, index) in showJson"
            :label="`场景${index+1}`"
            :value="index"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超链接地址" v-if="onClick=='link'">
        <el-input v-model="link" @change="addHistroy"></el-input>
      </el-form-item>
      <el-form-item label="超链接打开方式" v-if="onClick=='link'">
        <el-select v-model="target" placeholder="请选择" @change="addHistroy">
          <el-option
            v-for="(item, index) in linkTarget"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import mainEditor from './main-editor.vue';
import bus from "@/views/ishow/js/bus";
export default {
  data() {
    return {
      id: this.showId,
      json: {},
      // 属性
      onClick: "",
      toIndex: 0,
      link: "",
      target: "",
      clickEvent: [
        {
          value: "",
          label: "无"
        },
        {
          value: "close",
          label: "关闭模块"
        },
        {
          value: "pre",
          label: "上一场景"
        },
        {
          value: "next",
          label: "下一场景"
        },
        {
          value: "index",
          label: "指定场景"
        },
        {
          value: "link",
          label: "超链接"
        }
      ],
      linkTarget: [
        {
          value: "_top",
          label: "当前页"
        },
        {
          value: "_blank",
          label: "新窗口"
        }
      ]
    };
  },
  props: ["renderJson", "showId", "showJson"],
  created() {
    this.json = this.parseJson(this.renderJson);
    this.setInput();

    // bus.$on("navbar-pic-update", data => {
    //   this.content = data.content;
    // });
  },
  watch: {
    renderJson(){
      console.log('json-change')
      this.setInput()
    },
    onClick() {
      this.json[this.id].onClick = this.onClick;
      this.triggerApp();
    },
    toIndex() {
      this.json[this.id].toIndex = this.toIndex;
      this.triggerApp();
    },
    link() {
      this.json[this.id].link = this.link;
      this.triggerApp();
    },
    target() {
      this.json[this.id].target = this.target;
      this.triggerApp();
    }
  },
  methods: {
    // openCrop() {
    //   bus.$emit("navbar-image-crop", true, this.content);
    // },
    // // 确定裁切图片
    // setPicCorp() {
    //   this.dialogVisible3 = false;
    //   // 如果有提交，加上提交裁切数据到后台返回裁切后的图片路径，传给更新图片url,例如如下：
    //  //   this.croodUrl=post(this.croodUrl,this.crood);
    //   this.$emit('update-crop-pic', this.croodUrl);
    //   console.info(this.croodUrl, this.crood)
    // },
    // // 获取裁切数据
    // afterCrop(json, url) {
    //   this.crood = json;
    //   this.croodUrl = url;
    //   console.info('afterCrop', json, url)
    // },
    // 更改图片
    // updateImg() {
    //   bus.$emit("update-target", this.json[this.id], this.id);
    // },
    // // 应用所有表单以主题色
    // changeThemecolorAll() {
    //   bus.$emit("update-themecolor", this.json[this.id].text.themeColor);
    // },
    // 调整高度为auto
    // contentChange(isFocus) {
    //   bus.$emit("show-text-resize", isFocus);
    // },
    // 添加历史
    addHistroy() {
      bus.$emit("add-histroy");
    },
    triggerApp() {
      bus.$emit("update-json", this.json);
    },
    // toggleActive(active, jsonKey, value, isDefault) {
    //   if (this[active]) {
    //     this[active] = false;
    //     this.json[this.id].text[jsonKey] = isDefault;
    //   } else {
    //     this[active] = true;
    //     this.json[this.id].text[jsonKey] = value;
    //   }
    //   this.addHistroy();
    //   bus.$emit("update-json", this.json);
    // },
    setInput() {
      const json = this.renderJson[this.showId];
      // 赋值
      this.onClick = json.onClick;
      this.toIndex = json.toIndex;
      this.link = json.link;
      this.target = json.target;
    },
    parseJson(json) {
      return JSON.parse(JSON.stringify(json));
    }
    // resetStyle() {
    //   bus.$emit("reset-json");
    // }
  }
};
</script>

<style lang="scss">
.event-editor {
  padding: 10px;
}
</style>