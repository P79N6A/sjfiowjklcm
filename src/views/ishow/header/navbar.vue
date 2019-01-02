<template>
    <div class="ishow-navbarMain" @click="validateOut">
        <!-- 下啦选择弹层类型 -->
        <el-menu theme="dark" :default-active="activeIndex" background-color="#324057"   text-color="#fff"  active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal" @select="handleSelect" size="mini">
            <el-menu-item index="1">文本&nbsp;<i class="fa fa-font" aria-hidden="true"></i></el-menu-item>
            <el-menu-item index="2">
                <div @click="showTool('picTool')">图片&nbsp;<i class="fa fa-picture-o" aria-hidden="true"></i></div>
            </el-menu-item>
            <el-menu-item index="6" v-show="false"> 
                 <div @click="showTool('picTool2')" id="J-open-bg">背景&nbsp;<i class="fa fa-file-image-o" aria-hidden="true"></i></div>
            </el-menu-item>
        </el-menu>
        <!-- 打开图片裁切页面的钩子 -->
        <picTool :type="'pic'" :picJson="picJson" ref="picTool" :addElement="addPicElement"></picTool>
        <picTool :type="'bg'" :picJson="picJson" ref="picTool2" :addBg="addBg" :ratio="0.695"></picTool>
    </div>
</template>
<script>

import bus from '@/views/ishow/js/bus';
import navarJson from '@/views/ishow/js/navbar/navbar.json';
import picTool from '@/views/ishow/global/picTool/index.vue';
import {
    getImgList,
    getValidateList,
    getAudioList,
    getVideoList
} from '@/api/ishow';
const initJson = {
  default: false,
  name: '',
  cname: '',
  required: false,
  dire: 'v',
  selectedVal: '',
  options: ['', '', ''],
  validate: []
};
const initSelectJson = {
  name: 'none',
  cname: '',
  required: false,
  validate: [],
  selectedVal: 0,
  default: false,
  options: ['请选择', '请输入内容', '请输入内容', '请输入内容']
};
const initInputJson = {
  name: 'customize',
  cname: '自定义',
  required: false,
  default: false,
  selectedVal: '',
  validate: []
};
const initButtonJson = {
  name: '提交',
  tip: '感谢您的参与',
  link: '',
  time: '',
  noRepeat: false
};
export default {
  data() {
    return {
      activeIndex: '',
      dialogVisible: false,
      dialogVisible3: false,
      formDialogVisible1: false,
      formDialogVisible2: false,
      formDialogVisible3: false,
      formDialogVisible4: false,
      formDialogVisible5: false,
      dialogVisible2: false,
      isActive: false,
      activeName: 'upload',
      navbarJson: navarJson.navbarJsons,
      picJson: [],
      audioJson: [],
      videoJson: [],
      isBg: false,
      // 单选
      radioJson: this.parseJson(initJson),
      selectJson: this.parseJson(initSelectJson),
      buttonJson: this.parseJson(initButtonJson),
      inputJson: this.parseJson(initInputJson),
      isUpdate: false,
      key: false,
      temp: [],
      validateDefault: [],
      inputType: 3,
      selectType: 6,
      updateId: '',
      // 背景图片裁切
      crood: '',
      croodUrl: '',
      // 图片裁切
      dialogVisible4: false,
      crood2: '',
      croodUrl2: '',
      cropType: ''
    };
  },
  props: ['showId', 'renderJson', 'showJson'],
  components: {
    picTool
  },
  created() {
    // 更新renderJson
    bus.$on('update-radio-layer', (data, type) => {
      if (this.judgeCnameExist(type, data) === true) {
        this.$message.error('中文名重复了，请修改');
        return false;
      }
      const result = this.parseJson(data);
      this.addElement(type, {
        form: result
      });
    });

    // 编辑
    bus.$on('update-target', (data, id) => {
      this.updateId = id;
      this.setInput(data, true);
    });


    // 图片裁切
    bus.$on('navbar-image-crop', (isShow, url) => {
      this.dialogVisible4 = isShow;
      this.croodUrl2 = url;
    });

    // 背景裁切使用
    bus.$on('navbar-bg-handle', (isShow, url) => {
      this.dialogVisible3 = isShow;
      this.croodUrl = url;
    });
  },
  methods: {
    // 获取裁切数据
    afterCrop2(json, url) {
      this.crood2 = json;
      this.croodUrl2 = url;
      console.info('裁切后坐标尺寸', json, url)
    },
    // 确认裁切
    setPicCorp() {
      this.isUpdate = true;
      // 如果有提交，加上提交裁切数据到后台返回裁切后的图片路径，传给更新图片url,例如如下：
      // this.croodUrl=post(this.croodUrl,this.crood);
      this.addPicElement(this.croodUrl2);
    },
    // 设置loading
    setLoading(name) {
      this.$refs[name].setLoading(false);
    },
    confirmForm(data, type) {
      if (this.judgeCnameExist(type, data) === true) {
        this.$message.error('中文名重复了，请修改');
        return false;
      }
      const result = this.parseJson(data);
      this.addElement(type, {
        form: result
      });
    },
    // 打开图片选择工具
    showTool(name, cropUrl) {
      this.$refs[name].openTool(cropUrl);
    },
    // 鼠标移入验证
    validateOut() {
      this.validateIndex = false;
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
        // 编辑回填数据
    setInput(data, isUpdate) {
      const type = data.type;
      this.isUpdate = isUpdate;
        // 图片
      if (type === 2) {
        this.showTool('picTool');
        return false;
      }
        // 表单
      const temp = data.form;

        // 表单部分填充编辑数据
      if (type === 3) {
        this.inputJson = this.parseJson(temp);
            // 更新选择的验证
        this.$refs.inputLayer.updateGroups(temp);
      }
      if (type === 4 || type === 5) {
        this.radioJson = this.parseJson(temp);
      }
      if (type === 6) {
        this.selectJson = this.parseJson(temp);
      }
      if (type === 7) {
        this.buttonJson = this.parseJson(temp);
      }
      if (type >= 3 && type <= 7) {
        const key = 3 + '-' + (type - 2);
        const keyPath = ['3', key];
        this.handleSelect(key, keyPath, isUpdate);
      }
    },
    // 弹层确定按钮更新数据
    addElement(type, params) {
      this.dialogVisible = false;
      this.dialogVisible4 = false;
      this.formDialogVisible1 = false;
      this.formDialogVisible2 = false;
      this.formDialogVisible3 = false;
      this.formDialogVisible4 = false;
      this.formDialogVisible5 = false;
        // 编辑
      if (this.isUpdate === true) {
        const temp = this.parseJson(this.renderJson);
        Object.assign(temp[this.showId], params);
        bus.$emit('update-json', temp);
        if (type === 2) {
          bus.$emit('navbar-pic-update', temp[this.showId]);
        }
        this.isUpdate = false;
      } else {
        bus.$emit('add-json', type, params);
      }
      this.isBg = false;
      bus.$emit('change-tab', 'second');
      bus.$emit('add-histroy');
    },
    closeDialog() {
      this.dialogVisible = false;
      this.dialogVisible4 = false;
      this.formDialogVisible1 = false;
      this.formDialogVisible2 = false;
      this.formDialogVisible3 = false;
      this.formDialogVisible4 = false;
      this.formDialogVisible5 = false;
      this.isUpdate = false;
      this.isBg = false;
    },
    // 点击下啦打开相应的弹层
    handleSelect(key, keyPath, isUpdate) {
        // 文本
      if (key === '1') {
        this.addElement(1);
      }
        // 表单
      if (keyPath[0] === '3') {
        if (this.$refs.inputLayer && isUpdate !== true) {
          this.$refs.inputLayer.resetGroups();
        }
        this.handleForm(key, isUpdate);
      }
        // 编辑状态
      if (isUpdate === true) {
        this.isUpdate = true;
      }
    },
    // 重置json
    resetRadioJson(index) {
      if (index === '1') {
            // 输入框
            // this.$refs.inputLayer.resetGroups();
        this.inputJson = this.parseJson(initInputJson);
      } else if (index === '4') {
            // 下拉框
        this.selectJson = this.parseJson(initSelectJson);
      } else if (index === '5') {
            // 按钮
        this.buttonJson = this.parseJson(initButtonJson);
      } else {
            // 单选，多选
        this.radioJson = this.parseJson(initJson);
      }
    },
    // 深拷贝
    parseJson(json) {
      return JSON.parse(JSON.stringify(json));
    },

    addPicElement(url) {
      this.addElement(2, { content: url });
    },
    addBg(data) {
      const json = {
        bgImage: {
          url: data.url,
          coord: data.crood,
          backgroundColor: ''
        }
      };
      const tag = data.tag || '';
      const name = 'update-pageJson' + tag;
      bus.$emit(name, json);
      bus.$emit('change-tab', 'second');
      bus.$emit('add-histroy');
    }
  }
};
</script>
