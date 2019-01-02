<template>
    <div>
        
        <el-popover ref="popover1" placement="bottom" width="200" v-model="visible2">
            <p>确定删除这个页面吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancleDelete">取消</el-button>
                <el-button type="primary" size="mini" @click="confirmDelete">确定</el-button>
            </div>
        </el-popover>
        <div :class="['page-item',{ active: isActive }]" @click="toggerActive" @mouseover="visible = true" @mouseout="mouseoutDelete">
          <slot></slot>
        </div>
        <!-- <div class="ishow-previewMain" :class="{ active: isActive }" @click="toggerActive" @mouseover="visible = true" @mouseout="mouseoutDelete">
            <div class="ishow-previewPage" :style="getBackground">
                <normalElement v-for="item in showJson" :key="item.id" :child-json="item" :show-json="showJson" :type="item.type">
                </normalElement>
            </div>
        </div> -->
    </div>
</template>
<script>
import bus from '@/views/ishow/js/bus';
import {
    on
} from '@/views/ishow/js/dom';
import normalElement from './normal-template.vue';
// import imgElement from './img-template.vue';
export default {
  data() {
    return {
      currentView: 'normalElement',
      isActive: false,
      visible2: false,
      visible: false,
      bgImage: ''
    }
  },
  name: 'main-show',
  props: ['showJson', 'page', 'activePage', 'pageJson'],
  components: {
    normalElement
  },
  created() {
    on(document, 'click', this.handleDocumentClick);
    this.setActive();
    this.setBgImage();
            // 更新背景图片
    bus.$on('mainShow-update-img', () => {
      this.setBgImage();
    });
    // this.json=this.showJson.json;
    // console.info(this.json)
  },
  computed: {
    getBackground() {
      return this.setBgImage();
    }
  },
  methods: {
            // 拼接背景css
    setBgImage() {
      const bgImage = this.pageJson[this.page - 1].bg;
      if (!bgImage) {
        return;
      }
      return bgImage
      // if (bgImage.url) {
        // return 'background: url(' + bgImage.url + ') center center / cover no-repeat;';
      // }
      // return 'background-color: ' + bgImage.backgroundColor + ' ;';
    },
    //点击
    handleDocumentClick() {
      this.visible = false;
    },
    // 激活当前场景
    toggerActive() {
      this.$parent.activePage = this.page;
      bus.$emit('set-page', this.page);
    },
    setActive() {
      this.isActive = this.activePage === this.page;
    },
    confirmDelete() {
      this.visible2 = false;
      this.visible = false;
      bus.$emit('delete-page', this.page);
    },
    cancleDelete() {
      this.visible2 = false;
      this.visible = false;
    },
            // 隐藏删除按钮
    mouseoutDelete() {
      if (!this.visible2) {
        this.visible = false;
      }
    },
            // setBgImage() {
            //     let json=this.parseJson(this.pageJson[this.page-1]);
            //     if(json.bgImage&&json.bgImage.url){
            //         this.bgImage=json.bgImage.url;
            //     }
            // },
    parseJson(json) {
      return JSON.parse(JSON.stringify(json));
    }

  },
  watch: {
    activePage() {
      this.setActive();
    },
            // 显示弹层也显示删除按钮
    visible2(val) {
      if (val === true) {
        this.visible = true;
      }
    }
  }

};
</script>
<style lang="scss">
.page-item{
  line-height:40px;
  border-bottom:solid 1px #eee;
  cursor:pointer;
  transition:all 1s;
  padding-left:10px;
  &.active{
    background:#eee;
  }
}
</style>