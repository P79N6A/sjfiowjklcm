<template>
  <div class="layers-show">
    <div class="layer-control">
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="当前图层设置" placement="top">
          <el-button type="primary" icon="el-icon-setting" @click="$bus.$emit('openLayerSet')"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="复制当前图层" placement="top">
          <el-button
            type="primary"
            icon="el-icon-printer"
            @click="$bus.$emit('copyTemp',activeTempIndex)"
          ></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="删除当前图层" placement="top">
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="$bus.$emit('deleteTemp',activeTempIndex)"
          ></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="layer-show">
      <div
        class="layers"
        v-for="(item,i) in tempJson"
        :key="i"
        :class="{active:activeTempIndex==i}"
        @click="$bus.$emit('selectTemp',i)"
      >
        <i
          :class="item.config.isShow?'el-icon-view':'el-icon-circle-close-outline'"
          @click="$bus.$emit('toggleTempShow',i)"
        ></i>
        <i
          :class="item.config.isLock?'el-icon-circle-check':'el-icon-circle-close'"
          @click="$bus.$emit('toggleTempLock',i)"
        ></i>
        <input v-model="tempJson[i].title">
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "Layers",

  data() {
    return {};
  },
  methods: {
    setSort() {
      const el = document.querySelectorAll(".layer-show")[0];
      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          this.tempJson = [];
          // dom变化后再次刷新
          this.$nextTick(() => {
            this.$bus.$emit("sortTemp", evt);
          });
          // const targetRow = this.tempJson.splice(evt.oldIndex, 1)[0];
          // this.tempJson.splice(evt.newIndex, 0, targetRow);
          // // ，强制渲染当前列表
          // const newArray = this.tempJson.slice(0);
          // this.tempJson = [];
          // // dom变化后再次刷新
          // this.$nextTick(() => {
          //   this.layers = newArray;
          // });
        }
      });
    }
  },
  props: ["tempJson", "activeTempIndex"],
  mounted() {
    this.setSort();
  },
  created() {}
};
</script>

<style scoped lang="scss">
.layers-show {
  min-width: 220px;

  .layer-control {
    text-align: center;
    margin: 20px 0;
  }

  .layer-show {
    .layers {
      display: flex;
      justify-content: start;
      padding: 10px;
      border-top: solid 1px #eee;
      cursor: pointer;

      &:last-child {
        border-bottom: solid 1px #eee;
      }

      i {
        margin: 0 5px;
      }

      input {
        border: none;
        outline: 0;
        background: none;
      }

      &.active {
        background: #eee;
        color: #409eff;
      }
    }
  }
}

.sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #409eff !important;
}
</style>
