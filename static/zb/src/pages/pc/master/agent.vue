<template>
  <div class="agent-master">
    <main-master>
      <agent-center></agent-center>
    </main-master>
  </div>
</template>
<script>
  import agentCenter from './center/t3/agent';
  import mainMaster from './main';
  export default {
    name: "agentMaster",
    data() {
      return {
        myData: []
      }
    },
    components: {
      mainMaster,
      agentCenter
    }
  }

</script>
<style lang="scss">

</style>
