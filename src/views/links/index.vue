<template>
  <div class="link-lists">
    <el-container>
      <el-container width="300px">
        <el-header>
          <el-button-group>
            <el-button type="primary">pc桌面端</el-button>
            <el-button type="primary">mobile端</el-button>
          </el-button-group>
        </el-header>
        <el-aside>
          <el-tree :data="data5" :expand-on-click-node="false" node-key="id" default-expand-all>
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                  +子页
                </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">
                  删除
                </el-button>
                <el-button type="text" size="mini">
                  禁用
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-aside>
      </el-container>
      <el-container>
        <el-main>
          页面概览区域
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
let id = 1000

export default {
  data() {
    const data = [{
      id: 1,
      label: 'pc端',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }]
    return {
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append(data) {
      const newChild = {
        id: id++,
        label: 'testtest',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .link-lists {}

</style>
