<template>
  <div class="col left left-container">
    <img class="bounceInLeft animated" src="./images/ope_ag.png" v-show="cur == 'AG'">
    <img class="bounceInLeft animated" src="./images/iph_image-1.png" v-show="cur == 'APP'">
    <img class="bounceInLeft animated pt" src="./images/PT_app.png" v-show="cur == 'PT'">
    <img class="bounceInLeft animated pt" src="./images/PT_app.png" v-show="cur == 'DT'">
    <img class="bounceInLeft animated pt" src="./images/PT_app.png" v-show="cur == 'LG'">
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      cur: "APP"
    };
  },
  created() {
    this.$bus.$on("getDownloadPage", eventData => {
      this.cur = eventData;
    });
  }
};
</script>
<style lang="scss" scoped>
.left-container {
  width: 510px;
  .pt {
    width: 90%;
    margin-top: 100px;
  }
  .title {
    margin-top: 90px;
    font-size: 36px;
    color: #fff;
    &:after {
      content: "";
      display: block;
      width: 60px;
      height: 1px;
      margin-top: 20px;
      background: #efefef;
    }
  }
  .description {
    width: 510px;
    color: #fff;
  }
}
</style>
