<template>
  <div class="filelist-container">
    <!-- {{picJson}} -->
    <div v-if="!isLoading" class="cfx clear">
      <div v-for="(item,index) in picJson" class="file-item" :key="index" :style="`background-image: url(${cdnurl}/${item.src})`">
        <div class="buttons">
          <div class="tc">
            <el-button type="primary" @click="select(item)">
              选择
            </el-button>
          </div>
          <br>
          <div class="tc">
            <el-button @click="preview(cdnurl+'/'+item.src)"> 预览</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else><i class="el-icon-loading"></i> 正在加载图片，请稍后...</div>
  </div>
</template>

<script>
  import {
    getMedias
  } from "@/api/media";
  import {
    mapGetters
  } from "vuex";

  export default {
    name: 'FileList',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        picJson: [],
        tempUrl: '',
        isLoading: true,
        dataObj: {
          token: '',
          key: ''
        }
      }
    },
    created() {
      // 获取图片列表
      this.getMedias();
    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    methods: {
      getMedias() {
        getMedias().then(res => {
          this.picJson = res.data.media
          this.isLoading = false
        }).catch(err => {
          this.isLoading = true
        })
      },
      preview(url) {
        window.open(url)
      },
      select(item) {
        this.$emit('select', item)
      }
    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .filelist-container {
    .file-item {
      width: 140px;
      height: 140px;
      position: relative;
      float: left;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      margin: 4px;

      &:hover {
        .buttons {
          opacity: 1;
        }
      }

      .buttons {
        transition: all 0.3s;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        padding-top: 30px;
      }

    }
  }

</style>
