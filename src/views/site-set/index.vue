<template>
  <div class="siteSet-container">
    <el-tabs type="border-card">
      <el-tab-pane label="站点SEO">
        <div class="text item">
          <el-form label-position="left" label-width="80px" :model="siteInfo.value.seo">
            <el-form-item label="网站标题">
              <el-input v-model="siteInfo.value.seo.title"></el-input>
            </el-form-item>

            <el-form-item label="关键词">
              <el-input v-model="siteInfo.value.seo.keywords"></el-input>
            </el-form-item>

            <el-form-item label="描述">
              <el-input v-model="siteInfo.value.seo.description"></el-input>
            </el-form-item>

            <el-form-item label="网站ico">
              <el-upload
                class="avatar-uploader"
                action="/api/imgs"
                :show-file-list="false"
                :on-success="handleAvatarSuccessFav"
                :before-upload="beforeAvatarUploadFav"
              >
                <img
                  v-if="siteInfo.value.seo.favicon"
                  :src="cdnurl+siteInfo.value.seo.favicon"
                  class="favicon"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>只能是图片文件且不超过100KB!
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="高级配置">
        <div class="text item">
          <el-form label-position="left" label-width="80px" :model="siteInfo">
            <el-form-item label="默认首页">
              <el-input v-model="siteInfo.value.setting.index" placeholder="输入网址，默认重定向到该页面"></el-input>
            </el-form-item>
            <el-form-item label="页面丢失">
              <el-input v-model="siteInfo.value.setting.error404" placeholder="当输入错误网页地址时，重定向到该地址"></el-input>
            </el-form-item>
            <el-form-item label="IP受限">
              <el-input v-model="siteInfo.value.setting.error403" placeholder="当用户IP被限制访问时，重定向到该地址"></el-input>
            </el-form-item>
            <el-form-item label="网站维护">
              <el-switch
                style="display: block"
                v-model="siteInfo.value.maintain"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启"
                inactive-text="关闭"
              ></el-switch>
            </el-form-item>
            <el-form-item label="网站维护" v-if="siteInfo.value.maintain">
              <el-input v-model="siteInfo.value.setting.error500" placeholder="当网站维护状态时，重定向到该地址"></el-input>
            </el-form-item>
            <el-form-item label="代码(顶部)">
              <el-input
                v-model="siteInfo.value.setting.codeHeader"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="这里的代码将注入到网站每个页面头部"
              ></el-input>
              <div style="color:red;">*请谨慎添加，该代码将影响每个页面</div>
            </el-form-item>
            <el-form-item label="代码(脚部)">
              <el-input
                v-model="siteInfo.value.setting.codeFooter"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                placeholder="这里的代码将注入到网站每个页面底部"
              ></el-input>
              <div style="color:red;">*请谨慎添加，该代码将影响每个页面</div>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="游戏平台自定义">

      </el-tab-pane> -->
    </el-tabs>
    <br>
    <br>
    <div class="site-btns">
      <el-button type="primary" @click="saveSiteInfo" icon="el-icon-setting">保存配置</el-button>
    </div>
  </div>
</template>

<script>
import { siteInfoGet, siteInfoPut } from "@/api/site";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      siteInfo: {
        value: {
          maintain: false, // 维护状态
          seo: {
            title: "",
            favicon: "",
            keywords: "",
            description: ""
          },
          setting: {
            index: "",
            error404: "",
            error500: "",
            error403: "",
            codeHeader: "",
            codeFooter: ""
          },
          platform: {},
        },
        _id: ""
      }
    };
  },

  mounted() {
    siteInfoGet()
      .then(res => {
        Object.assign(this.siteInfo.value, res.data.value);
        this.siteInfo._id = res.data._id;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  methods: {
    saveSiteInfo() {
      siteInfoPut(this.siteInfo)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    handleAvatarSuccessFav(res, file) {
      console.log(res)
      this.siteInfo.value.seo.favicon = res.url;
    },
    beforeAvatarUploadFav(file) {
      const isImg = file.type.includes("image");
      const isLt100K = file.size / 1024 < 100;
      if (!isImg) {
        this.$message.error("只能上传图片类型文件!");
      }
      if (!isLt100K) {
        this.$message.error("图片大小不能超过 100 KB!");
      }
      return isImg && isLt100K;
    } 
  }
};
</script>

<style lang="scss">
.siteSet-container {
  padding: 20px;

  .site-btns {
    text-align: right;
    margin-top: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .favicon {
    height: 90px;
    display: block;
  }

  .logo {
    width: auto;
    height: 150px;
    display: block;
  }
}
</style>
