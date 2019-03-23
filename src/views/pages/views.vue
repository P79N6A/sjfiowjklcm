<template>
  <div class="Layoutshow-container">
    <Layout :layoutTemp="contentData" v-if="contentData"></Layout>
  </div>
</template>

<script>
  import Layout from "./components/Layout";

  import {
    getLayoutsShortId
  } from "@/api/layouts";
  export default {
    name: "Page401",
    data() {
      return {
        contentData: null,
      };
    },
    props: ['shortId'],
    methods: {
      getDataByShortId(id) {
        getLayoutsShortId({
          shortId: id
        }).then(res => {
          this.contentData = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      if (this.shortId) {
        this.getDataByShortId(this.shortId)
      }
    },
    watch: {
      shortId(val) {
        console.log(val);
        if (val) {
          this.getDataByShortId(val)
        }
      }
    },
    components: {
      Layout
    }
  };

</script>
