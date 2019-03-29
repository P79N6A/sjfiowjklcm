<template>
  <div class="user-master">
    <main-master>
      <user-center></user-center>
    </main-master>
  </div>
</template>
<script>
  import mainMaster from './main' // 主要模版
  import userCenter from './center/t3/user' // 用户中心模版

  export default {
    name: "userMaster",
    data() {
      return {
        myData: []
      }
    },
    components: {
      userCenter,
      mainMaster
    }
  }

</script>

