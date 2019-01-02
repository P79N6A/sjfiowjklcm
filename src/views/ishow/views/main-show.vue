<template>
<div>
        <div v-for="(page,i) in pageJson" :key="i" :style="page.bg" style="width:300px;height:300px;" v-if="i==activePage">
            <div class="ishow-previewPage" :style="getBackground">
                <normalElement v-for="item in showJson" :key="item.id" :child-json="item" :show-json="showJson" :type="item.type">
                </normalElement>
            </div>
        </div>
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
      activePage:0,
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
    // this.setActive();
    // this.setBgImage();
            // 更新背景图片
    // bus.$on('mainShow-update-img', () => {
      // this.setBgImage();
    // });
    // this.json=this.showJson.json;
    // console.info(this.json)
          window.clearInterval(timer)
      window.setInterval(item=>{
        this.page
      },2000)
  },
  computed: {
    // getBackground() {
    //   return this.setBgImage();
    // }
  },
  methods: {
    
            // 拼接背景css
    // setBgImage() {
    //   const bgImage = this.pageJson[this.page - 1].bgImage;
    //   if (!bgImage) {
    //     return;
    //   }
    //   if (bgImage.url) {
    //     return 'background: url(' + bgImage.url + ') center center / cover no-repeat;';
    //   }
    //   return 'background-color: ' + bgImage.backgroundColor + ' ;';
    // },
    handleDocumentClick() {
      this.visible = false;
    }
  },
  watch: {

  }

};
</script>
