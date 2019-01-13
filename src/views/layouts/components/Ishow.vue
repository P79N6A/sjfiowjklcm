<template>
  <div class="ishow-one" v-if="pageJson">
    <ishow-component :page-json="pageJson" :page-setting="pageSetting" v-if="pageJson.length>0"></ishow-component>
  </div>
</template>

<script>
  import IshowComponent from "@/components/IshowComponent/main-show.vue";
  import {
    getIshowOne
  } from "@/api/ishow"
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "IshowComponents",
    components: {
      IshowComponent
    },
    data() {
      return {
          pageJson:{},
          pageSetting:{}
      };
    },
    mounted() {
      // 读取数据模型
        this.getIshowOne();
    },
    methods: {
      // 读取数据内容
      getIshowOne() {
        if (this.ishowId)
          getIshowOne({
            _id: this.ishowId
          }).then(res => {
            console.log(res);
            this.pageJson=res.data.pageJson;
            this.pageSetting=res.data.pageSetting;
          }).catch(err => {

          })
      }
    },

    computed: {
      ...mapGetters(["cdnurl"])
    },
    props: {
      ishowId: {
        type: String,
        default: ''
      }
    }
  };

</script>