<template>
      <div class="box">
        <div class="m-title">关于我们</div>
        <div class="m-box">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
  }

</script>
<style lang="scss" scoped>
.box{
  width:930px;
  background:#373738;
  border-radius:0 0 10px 10px;
  color:#fff;
  min-height:788px;
  .m-title{
    font-size:24px;
    color:#ffdc98;
    height:60px;
    line-height:60px;
    background:#2d2d2e;
    padding:0 30px;
  }
  .m-box{
    padding:20px 30px;
    line-height:1.8;
    font-size:14px;
  }
}
</style>
