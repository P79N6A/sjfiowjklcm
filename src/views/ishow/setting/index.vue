<template>
  <div class="ishow-mainSetting">
    <transition name="fade">
      <div v-if="disable" class="ishow-mainSetting--bg" @click="toggle"></div>
    </transition>

    <transition name="slide-fade">
      <div v-if="disable" class="ishow-mainSetting--info"  v-el-drag-dialog >
        <el-tabs type="card" v-model="activeName">
          <!-- 背景设置 -->
          <!-- <div class="ishow-bgStyle">
            <div class="form-group">
              <div>背景图片</div>
              <div class="el-upload el-upload--picture-card ishow-bgStyle--main mt10" @click="changeImage">
                <i class="el-icon-plus"></i>
                <img :src="pageJson.bgImage.url" alt="" v-if="pageJson.bgImage.url">
              </div>
              <div class="mt10 tr" v-if="pageJson.bgImage.url">
                <el-button type="default" size="mini" @click="deleteImage">删除图片</el-button>
                <el-button type="default" size="mini" @click="changeImage">修改图片</el-button>
              </div>
            </div>
          </div> -->

          <!-- 其他设置 -->
          <el-tab-pane label="常用设置" name="first">
            <!-- {{settingForm.bg.backgroundImage}} -->
            <div class="p10">
              <el-form :label-position="'left'" label-width="70px" :model="settingForm" ref="settingForm" :rules="ruleState">
                <!-- <el-form-item label="封面" prop="settingPic">
                  <div class="c-cover" @click="changePic">
                    <img :src="coverUrl" width="100%" height="100%">
                    <div class="c-cover--btn">更换封面</div>
                  </div>
                </el-form-item> -->
                
                <el-form-item label="背景图" prop="bg">
                <div class="img-view" :style="{backgroundImage:settingForm.bg.backgroundImage}" @click="changeImage">
                  <i class="el-icon-plus"></i>
                </div>
                <div class="mt10 tl" v-if="settingForm.bg.backgroundImage">
                  <el-button type="default" size="mini" @click="deleteImage">删除图片</el-button>
                  <el-button type="default" size="mini" @click="changeImage">修改图片</el-button>
                </div>
                </el-form-item>
                <el-form-item label="水平" prop="bg">
                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left top">1</el-radio-button>
                    <el-radio-button label="center top">2</el-radio-button>
                    <el-radio-button label="right top">3</el-radio-button>
                  </el-radio-group>

                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left center">4</el-radio-button>
                    <el-radio-button label="center center">5</el-radio-button>
                    <el-radio-button label="right center">6</el-radio-button>
                  </el-radio-group>

                  <el-radio-group v-model="settingForm.bg.backgroundPosition" size="small">
                    <el-radio-button label="left bottom">7</el-radio-button>
                    <el-radio-button label="center bottom">8</el-radio-button>
                    <el-radio-button label="right bottom">9</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="覆盖方式" prop="bg">
                  <el-radio-group v-model="settingForm.bg.backgroundSize" size="small">
                    <el-radio-button label="">原始</el-radio-button>
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

                <el-form-item label="组件宽度" prop="width">
                  <el-input v-model="settingForm.width" placeholder="请输入组件长度">
                    <template slot="append">PX</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="组件高度度" prop="height">
                  <el-input v-model="settingForm.height" placeholder="请输入组件宽度">
                    <template slot="append">PX</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="组件标题" prop="name">
                  <el-input v-model="settingForm.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="组件简介" prop="description">
                  <el-input v-model="settingForm.description" placeholder="请输入简介"></el-input>
                </el-form-item>
                <div class="tc">
                  <el-button @click="toggle">取消</el-button>
                  <el-button type="primary" @click="submitSetting('settingForm')">保存配置</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="分享设置" name="second">
                    </el-tab-pane> -->
        </el-tabs>
      </div>
    </transition>
    <!-- <transition name="slide-fade">
            <div v-if="disable" class="ishow-mainSetting--phone">
                <div class="ishow-mainSetting--screen">
                    <iframe width="100%" height="100%" border="none" src="/"></iframe>
                </div>
            </div>
        </transition> -->

    <!-- <picTool :type="'picCrop'" :picJson="picJson" ref="picTool" :addElementCrop="addElementCrop"></picTool> -->
  </div>
</template>
<script>
  import picTool from '@/views/ishow/global/picTool/index.vue';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
  import {
    getImgList,
    savePageConfig
  } from '@/api/ishow';
  import bus from '@/views/ishow/js/bus';
  export default {
  directives: { elDragDialog },
    data() {
      return {
        disable: false,
        activeName: 'first',
        coverUrl: '',
        picJson: [],
        settingForm: {
          bg: {
            backgroundImage: '',
            backgroundColor: '',
            backgroundSize: '',
            backgroundRepeat: '',
            backgroundPosition: '',
          },
          width: 0,
          height: 0,
          name: '',
          description: '',
        },
        ruleState: {
          settingTitle: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }],
          settingSummary: [{
            required: true,
            message: '简介不能为空',
            trigger: 'blur'
          }]
        }
      };
    },
    props: ['showJson', 'renderJson', 'showId', 'pageJson'],
    created() {
      this.fetchImgList().then(() => {
        this.$refs.picTool.setLoading(false);
      });
      this.resetSetting()
    },
    watch: {
      pageJson: {
        handler() {
          this.resetSetting();
        },
        deep: true
      },
      toggle(val){
        if(val){
          this.resetSetting()
        }
      }
    },
    components: {
      picTool
    },
    methods: {
      // 提交表单
      submitSetting(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.fetchPageConfig();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 提交配置
      fetchPageConfig() {
        console.info('this.$store', this.$store, this.$store.getters.activityId)
        bus.$emit('pageSetting',this.settingForm)
        return

        if (!this.$store.getters.activityId) {
          this.$message('保存当前场景后保存的配置才能生效');
          return false;
        }
        const data = {
          id: this.$store.getters.activityId || '',
          paramJson: JSON.stringify(this.settingForm)
        };
        const _this = this;
        savePageConfig(data).then(response => {
          console.info(response)
          _this.toggle();
        }).catch(err => {
          console.info(err)
        });
      },
      // 获取本地图片
      fetchImgList() {
        return getImgList().then(response => {
          this.picJson = this.changeToArray(response.data);
        }).catch(err => {
          console.info(err)
        });
      },
      toggle() {
        this.disable = !this.disable;
      },
      addElementCrop(json) {
        this.coverUrl = json.url;
        console.info('addElementCrop')
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
      resetSetting(){
        console.log('resetFrom')
        this.settingForm=JSON.parse(JSON.stringify(this.pageJson))
        // this.settingForm=Object.assign({},this.pageJson) 
        // this.settingForm.bg=Object.assign({},this.pageJson.bg) 
      },
    changeImage() {
      document.getElementById('J-open-bg').click();
    },
    deleteImage() {
      this.settingForm.bg.backgroundImage=''
      bus.$emit('update-pageJson', {
        // bgImage: {
        //   url: '',
        //   coord: ''
        // }
      });
    },
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
<style>
.img-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  text-align:center;
  line-height:60px;
  width: 60px;
  height: 60px;
  display: inline-block;
}
</style>