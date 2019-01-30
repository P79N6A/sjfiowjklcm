<template>
  <div class="i-tool">
    <div class="icons">
      <el-tooltip class="item" effect="dark" content="收起菜单" placement="left">
        <span class="item">
          <i class="el-icon-caret-right"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="撤销" placement="left">
        <span class="item">
          <i class="el-icon-d-arrow-left"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="恢复" placement="left">
        <span class="item">
          <i class="el-icon-d-arrow-right"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="复制当前页" placement="left">
        <span class="item">
          <i class="el-icon-printer"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="当前页设置" placement="left">
        <span class="item">
          <i class="el-icon-setting"></i>
        </span>
      </el-tooltip>
      <el-tooltip class="item warning" effect="dark" content="超出虚线框部分将不会展示" placement="left">
        <span class="item">
          <i class="el-icon-warning"></i>
        </span>
      </el-tooltip>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" :stretch="true">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-menu"></i> 图层管理</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-tickets"></i> 页面管理</span>
          <div class="page-control">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="添加普通页" placement="top">
                <el-button type="primary" icon="el-icon-plus"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="复制当前页" placement="top">
                <el-button type="primary" icon="el-icon-printer"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除当前页" placement="top">
                <el-button type="primary" icon="el-icon-delete"></el-button>
              </el-tooltip>
            </el-button-group>
          </div>
          <div v-for="(item,i) in pages" :key="i" class="page-list">
            <span class="num">
              {{i+1}}
            </span>
            <div>第{{item}}页</div>
            <i class="el-icon-more"></i>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Iheader',

    data() {
      return {
        pages: [1, 2, 3]
      }
    },
    methods: {

    }
  }

</script>

<style scoped lang="scss">
  .i-tool {
    display: flex;
    height:calc(100vh - 50px);
    .icons {
      background: #fff;
      border-left: solid 1px #eee;
      border-right: solid 1px #eee;

      .item {
        display: block;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &.warning {
          background: #e6a23c !important;
          color: #fff;
        }

        &:hover {
          background: #409EFF;
          color: #fff;

        }
      }
    }
    .page-control{
      margin-bottom:20px;
    }
      .page-list{
        display:flex;
        justify-content: space-between;
        padding:10px 0;
        border-bottom:solid 1px #ccc;
        .num{
          display:inline-block;
          width:25px;
          height:25px;
          text-align:center;
          line-height:25px;
          border:solid 1px #ccc;
          border-radius:20em;
        }
        &.active{
          .num{
            background:#409EFF;
          }
        }
      }
  }

</style>
