<template>
  <div class="siteSet-container">
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>站点基本配置</span>
      </div>
      <div class="text item">
        <el-form label-position="left" label-width="80px" :model="siteInfo.value">
          <el-form-item label="网站标题">
            <el-input v-model="siteInfo.value.title"></el-input>
          </el-form-item>

          <el-form-item label="关键词">
            <el-input v-model="siteInfo.value.keywords"></el-input>
          </el-form-item>

          <el-form-item label="描述">
            <el-input v-model="siteInfo.value.description"></el-input>
          </el-form-item>

          <el-form-item label="网站ico">
            <el-upload
              class="avatar-uploader"
              action="/api/media"
              :show-file-list="false"
              :on-success="handleAvatarSuccessFav"
              :before-upload="beforeAvatarUploadFav"
            >
              <img
                v-if="siteInfo.value.favicon"
                :src="cdnurl+siteInfo.value.favicon"
                class="favicon"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>只能是【.ico】后缀的文件且不超过100KB!
          </el-form-item>

          <el-form-item label="网站logo">
            <el-upload
              class="avatar-uploader"
              action="/api/media"
              :show-file-list="false"
              :on-success="handleAvatarSuccessLogo"
              :before-upload="beforeAvatarUploadLogo"
            >
              <img v-if="siteInfo.value.logo" :src="cdnurl+siteInfo.value.logo" class="logo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>只能是【.png】后缀的文件且不超过200KB!
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>高级配置</span>
      </div>
      <div class="text item">
        <el-form label-position="left" label-width="80px" :model="siteInfo">
          <el-form-item label="代码(顶部)">
            <el-input
              v-model="siteInfo.value.codeHeader"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10}"
            ></el-input>
            <div>这里的代码将注入到网站每个页面头部</div>
          </el-form-item>
          <el-form-item label="代码(脚部)">
            <el-input
              v-model="siteInfo.value.codeFooter"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10}"
            ></el-input>
            <div>这里的代码将注入到网站每个页面底部</div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>网站访问状态</span>
      </div>
      <div class="text item">
        <el-form label-position="left" label-width="80px" :model="siteInfo">
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
          <el-form-item label="维护公告" v-if="siteInfo.value.maintain">
            <tinymce :height="300" v-model="siteInfo.value.codeMaintain"/>
            <div>这里的文案将显示在维护页面</div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="site-btns">
      <el-button type="primary" @click="saveSiteInfo" icon="el-icon-setting">保存配置</el-button>
    </div>
  </div>
</template>

<script>
import { siteInfoGet, siteInfoPut } from "@/api/site";
import { mapGetters } from "vuex";
import Tinymce from "@/components/Tinymce";

export default {
  data() {
    return {
      siteInfo: {
        value: {
          maintain: false,
          title: "title",
          favicon: "",
          keywords: "keywords",
          description: "description",
          logo: "",
          // 其他
          codeHeader: "codeHeader",
          codeFooter: "codeFooter",
          codeMaintain: "codeMaintain",
          theme: "default"
        },
        _id: ""
      }
    };
  },

  created() {
    siteInfoGet()
      .then(res => {
        Object.assign(this.siteInfo.value, res.data.siteInfo.value);
        this.siteInfo._id = res.data.siteInfo._id;
      })
      .catch(err => {});
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
      this.siteInfo.value.favicon = res.src;
    },
    beforeAvatarUploadFav(file) {
      const isIcon =
        file.type === "image/vnd.microsoft.icon" ||
        file.type === "image/x-icon";
      const isLt100K = file.size / 1024 < 100;
      if (!isIcon) {
        this.$message.error("上传图片只能是【.ico】后缀的文件!");
      }
      if (!isLt100K) {
        this.$message.error("上传图片大小不能超过 100kb!");
      }
      return isIcon && isLt100K;
    },
    handleAvatarSuccessLogo(res, file) {
      this.siteInfo.value.logo = res.src;
    },
    beforeAvatarUploadLogo(file) {
      const isPng = file.type === "image/png";
      const isLt200K = file.size / 1024 < 200;
      if (!isPng) {
        this.$message.error("上传图片只能是【.png】后缀的文件!");
      }
      if (!isLt200K) {
        this.$message.error("上传图片大小不能超过 200kb!");
      }
      return isPng && isLt200K;
    }
  },
  components: {
    Tinymce
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
