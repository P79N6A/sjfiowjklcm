<template>
  <div class="code-container">
        <iframe src="/static/codePend/index.html" style="border:none;width:100%;height:100vh;"></iframe>
  </div>
</template>

<script>
import { getModels, addModels, deleteModels, updateModels } from "@/api/model";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  data(){
    return {
      input5:'',
      select:''
    }
  },
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      componentMenu: null,
      componentList: null,
      // 不重要的值
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.code-container {
}
</style>
