<template>
    <div class="header-agent">
        <div class="top top1">
            <before v-if="!islogin"></before>
            <after v-if="islogin"></after>
        </div>
    </div>
</template>
<script>
  import before from "./component/before";
  import after from "./component/after";
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed: {
      ...mapGetters(["userData", "islogin", "isAgent", "isUser", "showLogin"])
    },
    components: {
      before,
      after
    },
    methods: {
      ...mapActions(["UPDATE_USERDATA"]),
    },
    created() {
        // 更新一次用户信息
      this.UPDATE_USERDATA()
        .then(res => {})
        .catch(err => {});
    },
}
</script>
<style lang="scss" scoped>
.header-agent{
    background: #e16d00;
    border-bottom: 2px solid rgb(255, 195, 0);
    .top{
        width: 1000px!important;
        max-width: 1200px;
        height: 42px;
        margin: 0 auto;
        position: relative;
    }
}
</style>
