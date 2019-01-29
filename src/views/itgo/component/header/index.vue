<template>
  <div class="i-header">
    <div class="logo">
      <img src="/favicon.ico">
    </div>
    <div class="control">
      <div class="item">
        <i class="el-icon-edit"></i>
        <p>文本</p>
      </div>
      <div class="item">
        <i class="el-icon-picture-outline"></i>
        <p>图片</p>
      </div>
      <div class="item">
        <i class="el-icon-rank"></i>
        <p>背景</p>
      </div>
      <div class="item">
        <i class="el-icon-news"></i>
        <p>形状</p>
      </div>
      <!-- <div class="item">
        <i class="el-icon-edit"></i>
        <p>表单</p>
      </div> -->
      <div class="item">
        <i class="el-icon-menu"></i>
        <p>组件</p>
      </div>
      <div class="item">
        <i class="el-icon-star-off"></i>
        <p>特效</p>
      </div>

    </div>
    <div class="btns">
      <el-button type="primary">预览和设置</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="info">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Iheader',

  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
 .i-header{
   display:flex;
   justify-content: space-between;
   align-items: center;
   .logo{
     border-right:solid 1px #ccc;
     width:70px;
     text-align:center;
     img{
       max-height:50px;
     }
   }
   .control{
     display:flex;
     .item{
       margin:0 10px;
       cursor:pointer;
       transition:all 0.3s;
       &:hover,&.active{
         color:#fff;
         background:#409EFF;
       }
       i{
         font-size:20px;
       }
       p{
         margin:0;
         font-size:16px;
         line-height:1.5;
       }
     }

   }
 }
</style>