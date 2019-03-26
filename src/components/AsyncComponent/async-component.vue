<template>
  <component :is="mode" v-bind="$attrs" v-on="$listeners"></component>
</template>

<script>
import { mapGetters } from "vuex";
import request from "@/utils/request";

export default {
  name: "AsyncComponent",
  props: {
    // 父组件提供请求地址
    url: {
      type: String,
      default: ""
    },
    shortId: {
      type: String,
      default: ""
    }
  },
  inheritAttrs: true,
  data() {
    return {
      resData: "",
      mode: ""
    };
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    shortId: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          request({
            url: `/api/components/shortId/${val}`,
            method: "get"
          })
            .then(res => {
              console.log("got component!");
              console.log(res.data.dist);
              let Fn = Function;
              this.mode = new Fn(`return ${res.data.dist}`)();
            })
            .catch(err => {});
        }
      }
    }
  }
};
</script>
