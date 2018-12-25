<!-- <meta name="viewport" id="viewport" content="width=320, initial-scale=1.2875, maximum-scale=1.2875, user-scalable=no"> -->
<template>
    <div>
        <div class="ishow-headerWrapper">
            <header class="header">
                iShow
                <div class="ishow-headerBtn">
                    <el-button size="small" @click.stop="linkNewSence">新建组件</el-button>
                </div>
            </header>
        </div>
          <div class="ishowList cfx">
            <div class="frames" v-for="(item,i) in activityList" :key="i">
              <div>
                <!-- 操作按钮区域 -->
                <el-button-group>
                  <el-button type="primary" round icon="el-icon-edit" @click="$router.push({ name: 'ishowsDesign', query: { ishowsId: item._id}})">编辑</el-button>
                  <el-button type="danger" round icon="el-icon-delete" @click="handleDelete(item)">删除</el-button>
                </el-button-group>
              </div>
              <div>{{item.name}}</div>
              <br/>
              <div class="frames-content">
                  封面预览，未做
                <img :src="item.screenShot" style="display:block;width:100%;">
              </div>
            </div>
          </div>
        <!-- <div class="ishow-list--main clearfix">
            <div class="ishow-list--item" v-for="item in activityList" :key="item.id">
                <div class="ishow-list--item-main" @click="showLayer(item)">
                    <div class="ishow-list--cover">
                        <div class="ishow-list--dropdown" @mouseover="">
                            <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>
                            <div class="c-dropDown">
                                <div class="c-dropDown--list">
                                    <div class="c-dropDown-item" @click="copy">
                                        <i class="fa fa-files-o" aria-hidden="true"></i>
                                        <span>复制</span>
                                    </div>
                                    <div class="c-dropDown-item" @click="deletePage">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                        <span>删除</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <img :src="item.settingPic" alt="" width="100%" height="100%" v-if="item.settingPic">
                    <img src="../../assets/ishow-item.png" alt="" width="100%" height="100%" v-else>
                </div>
                <a href="javascript:;" class="mt10 ishow-list--item-title">{{item.settingTitle}}</a>
                <a href="javascript:;" class="ishow-list--item-summary">{{item.settingSummary}}</a>
            </div>
        </div> -->
        <!-- <el-dialog title="" v-model="dialogVisible" size="auto" top="3%" class="ishow-list--dialog" :before-close="beforeClose">
            <div class="ishow-list--layer">
                <div class="ishow-list--layer-left">
                    <iframe src="/" width="100%" height="100%" border="none"></iframe>
                </div>
                <div class="ishow-list--layer-right">
                    <div class="ishow-list--layer-title">
                        设置场景信息
                    </div>
                    <div class="p20">
                        <el-form :model="settingForm" ref="settingForm" :rules="ruleState">
                            <div class="show-list--layer-form">
                                <el-form-item label="" prop="settingTitle">
                                    <el-input v-model="settingForm.settingTitle" placeholder="请输入标题"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="settingSummary">
                                    <el-input v-model="settingForm.settingSummary" placeholder="请输入简介"></el-input>
                                </el-form-item>
                                <div class="c-cover" @click="changePic">
                                    <img :src="settingForm.settingPic" width="100%" height="100%">
                                    <div class="c-cover--btn">更换封面</div>
                                </div>
                                
                            </div>
                            <div class="tr">
                                <el-button type="primary" size="small" @click="submitSetting('settingForm')" v-loading.body="loading">保存信息</el-button>
                            </div>
                            <div class="tc mt60">
                                <router-link :to="{ path: 'ishow', query: { activityId: activityId }}">
                                    <el-button type="primary" style="width:230px;"><i class="el-icon-edit el-icon--right"></i> 进入编辑页面</el-button>
                                </router-link>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </el-dialog> -->
        <picTool :type="'picCrop'" :picJson="picJson" ref="picTool" :addElementCrop="addElementCrop">
                                    
        </picTool>
    </div>
</template>
<script>

import {
    getActivityList,
     getImgList,
    savePageConfig,
    getIshows,
    deleteIshows
} from '@/api/ishow';
import picTool from '@/views/ishow/global/picTool/index.vue';
export default {
    data() {
        return {
            pageSize: 30,
            pageNum: 1,
            dialogVisible: false,
            settingForm: {
                settingTitle: '',
                settingSummary: '',
                settingPic: ''
            },
            activityId: '',
            activityList: [],
            ruleState: {
                settingTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                settingSummary: [{ required: true, message: '简介不能为空', trigger: 'blur' }]
            },
            picJson:[],
            // settingForm.settingPic:'',
            loading:false
        }
    },
    components: {
        picTool
    },
    created() {
        this.getIshows();
        this.fetchImgList().then(function(data){
            this.$refs.picTool.setLoading(false);
        }.bind(this));
    },
    methods: {
        //提交表单
        submitSetting(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.fetchPageConfig();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //保存配置
        fetchPageConfig() {
            let data={
                id:this.activityId,
                paramJson:JSON.stringify(this.settingForm)
            };
            this.loading=true;
            savePageConfig(data).then(response => {
                this.$message.success('保存成功');
                this.loading=false;
            }).catch(err => {
                console.info(err)
            });
        },
        //获取列表
        getIshows() {
            getIshows(this.pageSize, this.pageNum).then(response => {
                if (response.data && response.data.length) {
                    console.info(response.data)
                    this.activityList = response.data;
                }
                //console.info(response)
                //console.info(JSON.parse(response.data))
            });
        },
        //删除
        handleDelete(row) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            deleteIshows({
              _id: row._id
            }).then(res => {
              this.getIshows();
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
        },
        //复制
        copy() {

        },
        //打开弹层
        showLayer(json) {
            this.dialogVisible = true;
            this.settingForm.settingTitle = json.settingTitle;
            this.settingForm.settingSummary = json.settingSummary;
            this.settingForm.settingPic = json.settingPic;
            this.activityId = json.projectId;
        },
        beforeClose(done) {
            console.info(3333)
            done();
        },
        //新建场景
        linkNewSence() {
            this.$router.push({ name: 'ishowsDesign' });
        },
        //编辑h5
        updateH5() {

        },
        changePic() {
            this.$refs.picTool.openTool(this.settingForm.settingPic);
        },
        addElementCrop(json) {
            this.settingForm.settingPic=json.url;
            console.info('addElementCrop')
        },
        //获取本地图片
        fetchImgList() {
            return getImgList().then(response => {
                this.picJson = this.changeToArray(response.data);
            }).catch(err => {
                console.info(err)
            });
        },
         //json key 值返回
        changeToArray(json) {
            let url,
                result = [];
            for (url in json) {
                result.push(url);
            }
            return result;
        },
    }
}
</script>
<style lang="scss" scope>
    .ishowList {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;

      .frames {
        width: 25%;
        text-align: center;
        padding: 6px;
        cursor: pointer;

        &.active {
          .frames-content {
            border-color: #409eff;
            box-shadow: 0 0 4px 2px #ccc;
          }
        }

        .rows {
          background: #eee;
          margin-bottom: 2px;
        }

        .frames-content {
          padding: 6px;
          display: block;
          border: solid 1px #ccc;
          border-radius: 6px;
          font-size: 12px;
          transition: all 0.6s;
          height:200px;
          overflow:hidden;
          &:hover{
            overflow-y:scroll;
          }
        }

        .cols {
          padding: 2px;
          box-sizing: border-box;

          div {
            border: dashed 1px #ccc;
            padding: 2px 0;
          }
        }
      }
    }
</style>