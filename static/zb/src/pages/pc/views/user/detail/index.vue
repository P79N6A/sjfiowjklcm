<template>
  <div class="user-page">
    <level></level>
    <div class="mainDev">
      <transfer></transfer>
      <tips></tips>
    </div>
    <btn-groups></btn-groups>
  </div>
</template>
<script>
//  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import level from "./components/level"
  import transfer from "./components/transfer"
  import tips from "./components/tips"
  import btnGroups from "./components/buttonGroup"
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {
//      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
    },
    created() {
    },
    components: {
      level,transfer,tips,btnGroups
    }
  };
</script>
<style lang="scss" scoped>
  .user-page{
    padding:40px 0;
    background: #fff;
    border:1px solid #ccc;
    width: 930px;
    .user-content{
      padding:20px 0;
      background:#fff;
      min-height:800px;
      display:flex;
      justify-content: space-between;
    }
    .mainDev{
      width: 94%;
      margin: 20px auto 0;
    }
  }
</style>

