<template>
  <div class="editStyle" v-if="value">
    <el-button-group>
      <el-button icon="el-icon-close" @click="$emit('input',false)">取消</el-button>
      <el-button icon="el-icon-check" type="danger">保存</el-button>
    </el-button-group>
    <el-collapse>
      <el-collapse-item title="背景" name="1">
        <el-form ref="form" label-width="80px">
          <el-form-item label="背景颜色">
            <el-color-picker v-model="style.backgroundColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="重复模式">
            <el-select v-model="style.backgroundRepeat" placeholder="请选择">
              <el-option
                v-for="item in BgRepeatOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景大小">
            <el-select v-model="style.backgroundSize" placeholder="请选择">
              <el-option
                v-for="item in BgSizeOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景位置">
            <el-select v-model="style.backgroundPosition" placeholder="请选择">
              <el-option
                v-for="item in BgPositionOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="边距" name="2">
        <el-form ref="form" label-width="80px">
          <el-form-item label="内边距">
            <el-slider v-model="style.padding" :max="100" show-input></el-slider>
          </el-form-item>
          <el-form-item label="外边距">
            <el-slider v-model="style.margin" :max="100" show-input></el-slider>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="边框" name="3">
        <el-form ref="form" label-width="80px">
          <el-form-item label="边框大小">
            <el-slider v-model="style.borderSize" :max="100" show-input></el-slider>
          </el-form-item>
          <el-form-item label="边框颜色">
            <el-color-picker v-model="style.borderColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="边框类型">
            <el-select v-model="style.borderStyle" placeholder="请选择">
              <el-option
                v-for="item in BorderStyleOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="定位" name="4">
        <el-form ref="form" label-width="80px">
          <el-form-item label="定位方式">
            <el-select v-model="style.PositionOption" placeholder="请选择">
              <el-option
                v-for="item in PositionOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顶部距离">
            <el-slider v-model="style.top" :max="500" :min="-500" show-input></el-slider>
          </el-form-item>
          <el-form-item label="底部距离">
            <el-slider v-model="style.bottom" :max="500" :min="-500" show-input></el-slider>
          </el-form-item>
          <el-form-item label="左边距离">
            <el-slider v-model="style.left" :max="500" :min="-500" show-input></el-slider>
          </el-form-item>
          <el-form-item label="右边距离">
            <el-slider v-model="style.right" :max="500" :min="-500" show-input></el-slider>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="阴影" name="5">
        <el-form ref="form" label-width="80px">
          <el-form-item label="阴影类型">
            <el-select v-model="style.PositionOption" placeholder="请选择">
              <el-option
                v-for="item in PositionOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="水平位置">
            <el-slider v-model="style.top" :max="100" :min="-100" show-input></el-slider>
          </el-form-item>
          <el-form-item label="底部距离">
            <el-slider v-model="style.bottom" :max="100" :min="-100" show-input></el-slider>
          </el-form-item>
          <el-form-item label="左边距离">
            <el-slider v-model="style.left" :max="100" :min="-100" show-input></el-slider>
          </el-form-item>
          <el-form-item label="右边距离">
            <el-slider v-model="style.right" :max="100" :min="-100" show-input></el-slider>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="宽高" name="6">
        <el-form ref="form" label-width="80px">
          <el-form-item label="宽">
            <el-slider v-model="style.width" :max="1920" show-input></el-slider>
          </el-form-item>
          <el-form-item label="高">
            <el-slider v-model="style.height" :max="1000" show-input></el-slider>
            <el-input placeholder="请输入内容" v-model="style.height" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {},
      // 背景重复
      BgRepeatOption: [
        {
          name: "默认",
          value: ""
        },
        {
          name: "水平重复",
          value: "repeat-x"
        },
        {
          name: "垂直重复",
          value: "repeat-y"
        },
        {
          name: "不重复",
          value: "no-repeat"
        },
        {
          name: "水平&垂直重复",
          value: "repeat"
        }
      ],
      // 背景大小
      BgSizeOption: [
        {
          name: "cover",
          value: "cover"
        },
        {
          name: "contain",
          value: "contain"
        },
        {
          name: "100% 100%",
          value: "100% 100%"
        }
      ],
      // 背景位置
      BgPositionOption: [
        {
          name: "上对齐",
          value: "top center"
        },
        {
          name: "居中",
          value: "center center"
        },
        {
          name: "左对其",
          value: "left center;"
        }
      ],
      // 边框类型
      BorderStyleOption: [
        {
          name: "实线",
          value: "solid"
        },
        {
          name: "虚线",
          value: "dashed"
        },
        {
          name: "点线",
          value: "dotted"
        }
      ],
      PositionOption: [
        {
          name: "静止",
          value: "static"
        },
        {
          name: "相对",
          value: "relative"
        },
        {
          name: "绝对",
          value: "fixed"
        },
        {
          name: "固定",
          value: "absolute"
        }
      ]
    };
  },
  props: {
    value: Boolean,
    styleData: {
      // type:"object",
      defalut: {}
    }
  },
  methods: {},
  watch: {
    value(val) {
      if (val) {
        console.log("init");
      } else {
        console.log("emit");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editStyle {
  position: absolute;
  z-index: 9;
  transition: all 0.3s;
  top: 0;
  // left: 0-300px;
  height: 100%;
  overflow: visible;
  background: #fff;
  border-right: solid 1px #1f2d3d;
  width: 300px;
  left: 0;
  .toggle {
    position: absolute;
    top: 300px;
    left: calc(100% - 10px);
  }
}
</style>
