<template>
  <div class="Layoutshow-container" v-if="contentData">
    <Layout :layoutTemp="contentData"></Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout";

import { getLayoutsShortId } from "@/api/layouts";
export default {
  name: "Page401",
  data() {
    return {
      contentData:null,
    };
  },
  mounted() {
    //监听消息反馈
    window.addEventListener(
      "message",
      event => {
        // this.selectNode = event.data;
        if(event&&event.data&&event.data.value&&event.data.value.content){
          getLayoutsShortId({shortId:event.data.value.content}).then(res=>{
            this.contentData=res.data
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      false
    );
  },
  methods: {},
  components: {
    Layout
  }
};
</script>