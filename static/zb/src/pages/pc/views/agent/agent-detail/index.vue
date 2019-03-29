<template>
  <div class="mainAgentDiv">
    <div class="userSet">
      <menus></menus>
      <div class="u-c-box">
        <!-- 需要缓存的页面 -->
        <keep-alive v-if="!$route.meta.noCache">
          <router-view >
          <!-- 页面内容可视部分 -->
          </router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import menus from './components/menus'
export default {
  
    components: {
      menus
    }  
}
</script>

<style lang="scss" scoped>
.mainAgentDiv{
  width: 100%;
  .sidebar{
    display: inline-block;
  }
  .u-c-router{
    padding:0 30px!important;
  }
  .user-page{
    
    background:#000;
    padding: 40px 0;
    border: 1px solid #303030;
    color: #fff;
    // display: inline-block;
    float:right;
    .u-c-shows{
      padding: 0 20px;
      width: 930px!important;
    }
  }
}


</style>

