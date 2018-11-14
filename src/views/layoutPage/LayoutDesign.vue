<template>
  <div class="LayoutDesigh-container">
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-button type="primary">
          <svg-icon icon-class="tab" />容器</el-button>
          <el-button type="primary">
          <svg-icon icon-class="list" />行</el-button>
          <el-dropdown split-button type="primary">
            <svg-icon icon-class="tree" />列宽
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>1/12</el-dropdown-item>
              <el-dropdown-item>2/12</el-dropdown-item>
              <el-dropdown-item>3/12</el-dropdown-item>
              <el-dropdown-item>4/12</el-dropdown-item>
              <el-dropdown-item>5/12</el-dropdown-item>
              <el-dropdown-item>6/12</el-dropdown-item>
              <el-dropdown-item>7/12</el-dropdown-item>
              <el-dropdown-item>8/12</el-dropdown-item>
              <el-dropdown-item>9/12</el-dropdown-item>
              <el-dropdown-item>10/12</el-dropdown-item>
              <el-dropdown-item>11/12</el-dropdown-item>
              <el-dropdown-item>12/12</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-warning"/>
        </el-col>
        <el-col :span="12">
          <el-button-group>
            <el-button type="primary" icon="el-icon-error">取消</el-button>
            <el-button type="primary" icon="el-icon-menu">内容</el-button>
            <el-button type="primary" icon="el-icon-info">属性</el-button>
            <el-button type="primary" icon="el-icon-success">保存</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="show">
      <el-row v-for="(row,i) in layout" :key="i" :style="row.style">
        <el-col v-for="(col,j) in row.children" :span="col.width" :key="j">
          <div>
            <el-tag type="success" class="ico-width">{{ (col.width/24*100).toFixed(2) }}%</el-tag>
            区域-{{ i+1 }}-{{ j+1 }}
            <div>
              <i class="el-icon-arrow-left el-icon--left"/>
              <i class="el-icon-arrow-right el-icon--right"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-aside :class="{active:leftActive}" class="leftMenu">
      <el-button type="primary">
      <svg-icon icon-class="list" />行</el-button>
      <el-button :icon="leftActive?'el-icon-arrow-left':'el-icon-arrow-right'" type="primary" class="toggle" @click="leftActive=!leftActive"/>
    </el-aside>
    <el-aside :class="{active:rightActive}" class="rightMenu">
      <el-row v-for="(row,i) in layout" :key="i" :style="row.style">
        <el-col v-for="(col,j) in row.children" :span="col.width" :key="j">
          <div>
            <el-tag type="success" class="ico-width">{{ (col.width/24*100).toFixed(2) }}%</el-tag>
            区域-{{ i+1 }}-{{ j+1 }}
            <div>
              <i class="el-icon-arrow-left el-icon--left"/>
              <i class="el-icon-arrow-right el-icon--right"/>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-button :icon="rightActive?'el-icon-arrow-right':'el-icon-arrow-left'" type="primary" class="toggle" @click="rightActive=!rightActive"/>
    </el-aside>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      layout: [{
        style: 'width:100%;margin:0;',
        children: [{
          text: '区域1',
          width: 24
        }, {
          text: '区域1',
          width: 6
        }, {
          text: '区域2',
          width: 18
        }]
      },
      {
        style: 'width:1200px;margin:0 auto;',
        // width:'1200px',
        children: [{
          text: '区域1',
          width: 18
        }, {
          text: '区域2',
          width: 6
        }, {
          text: '区域3',
          width: 9
        }, {
          text: '区域4',
          width: 15
        }]
      },
      {
        style: 'width:1200px;margin:0 auto;',
        children: [{
          text: '区域1',
          width: 2
        }, {
          text: '区域2',
          width: 22
        }, {
          text: '区域3',
          width: 10
        }, {
          text: '区域4',
          width: 14
        }]
      }
      ],
      leftActive: false,
      rightActive: false,
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({
          path: '/dashboard'
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .LayoutDesigh-container {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 84px);
  }

  .show {
    .el-row {
      border: solid 1px #666;
      margin-bottom: 5px !important;
      padding: 5px;

      .el-col {

        >div {
          position: relative;
          border: dashed 1px #ccc;
          padding: 10px;
          text-align: center;
          margin: 5px;
          height: 70px;
          cursor:move;
        }

        .ico-width {
          position: absolute;
          top: 5px;
          left: 5px;
        }
      }
    }
  }

  .leftMenu {
    position: absolute;
    z-index: 9;
    transition: all 0.3s;
    top: 0;
    left: 0-300px;
    ;
    background: blue;
    height: 100%;
    overflow: visible;

    &.active {
      left: 0;
    }

    .toggle {
      position: absolute;
      top: 50%;
      left: calc(100% - 10px);
    }
  }

  .rightMenu {
    position: absolute;
    z-index: 9;
    transition: all 0.3s;
    top: 0;
    right: 0-300px;
    height: 100%;
    background: yellow;
    overflow: visible;

    &.active {
      right: 0;
    }

    .toggle {
      position: absolute;
      top: 50%;
      right: 100%;
    }
  }

</style>
