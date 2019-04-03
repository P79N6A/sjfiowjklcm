<template>
  <div class="show-agent-join">
    <component :is="showTab[showKey]"></component>
  </div>
</template>
<script>
  const tab1 = () =>
  import(/* webpackChunkName: "agenttab1" */ './components/agent-banner')
  const tab2 = () =>
  import(/* webpackChunkName: "agenttab2" */ './components/agent-details')
  const tab3 = () =>
  import(/* webpackChunkName: "agenttab3" */ './components/agent-notice')
  const tab4 = () =>
  import(/* webpackChunkName: "agenttab4" */ './components/common-problem')
  export default {
    data() {
      return {
        showKey:'tab1',
        showTab:{
          'tab1':tab1,
          'tab2':tab2,
          'tab3':tab3,
          'tab4':tab4,
        }
      }
    },
    props: {},
    computed: {},
    watch: {
      '$route'(val){
        // 监听路由，根据params切换显示选项
        if(this.$route.params&&this.$route.params.tab){
          this.showKey=this.$route.params.tab
        }else{
          this.showKey='tab1'
        }
      }
    },
    created() {
      if(this.$route.params&&this.$route.params.tab){
        this.showKey=this.$route.params.tab
      }else{
        this.showKey='tab1'
      }
    },
  }
</script>
<style lang="scss" scoped>
@import "~pc/assets/scss/agentJoin.scss";
  .show-agent-join{
    position: relative;
    display: block;
    background: #fff;
  }
</style>
