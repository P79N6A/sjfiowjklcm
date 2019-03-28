<!-- <meta name="viewport" id="viewport" content="width=320, initial-scale=1.2875, maximum-scale=1.2875, user-scalable=no"> -->
<template>
  <div class="ishow-contain">
    <div class="ishow-headerWrapper">
      <header class="header">
        <div class="ishow-headerBtn">
          <el-button
            size="small"
            @click="$bus.$emit('openIshowList')"
            type="success"
            icon="el-icon-sold-out"
          >模块市场</el-button>
          <el-button
            size="small"
            @click="linkNewSence"
            type="warning"
            icon="el-icon-circle-plus-outline"
          >新建模块</el-button>
        </div>
      </header>
    </div>
    <el-table
      v-loading="listLoading"
      :data="activityList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed align="center" label="封面" prop="thumbnail" width="220">
        <template slot-scope="scope">
          <div class="pre-content">
            <img :src="`${cdnurl}/${scope.row.thumbnail}`" style="width:100%;">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>

      <el-table-column label="价格" prop="style">
        <template slot-scope="scope">
          <el-tag>{{scope.row.price}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="标签" prop="tags" min-width="150px">
        <template slot-scope="scope">
          <el-tag v-for="(tag,i) in scope.row.tags" :key="i">{{tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="desc" min-width="150px"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isPublic">公开</el-tag>
          <el-tag v-else type="danger">私有</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="danger"
              size="mini"
              v-if="scope.row.isPublic"
              @click="toStop(scope.row)"
            >私有</el-button>
            <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">公开</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >{{ $t('table.edit') }}</el-button>
            <el-button
              v-if="scope.row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              {{
              $t('table.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <IshowList></IshowList>
  </div>
</template>
<script>
import { getIshows, deleteIshows, updateIshows } from "@/api/ishow";
import IshowPre from "@/components/H5Preview";
import IshowList from "@/components/IshowList";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pageSize: 30,
      pageNum: 1,
      dialogVisible: false,
      activityList: [],
      loading: false
    };
  },
  components: {
    IshowPre,
    IshowList
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  created() {
    this.getIshows();
    // this.fetchImgList().then(function(data){
    //     this.$refs.picTool.setLoading(false);
    // }.bind(this));
  },
  methods: {
    handleEdit(item) {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        let routeData = this.$router.resolve({
          name: "design",
          query: {
            ishowsId: item._id
          }
        });
        window.open(routeData.href, "_blank");
      } else {
        let routeData = this.$router.resolve({
          name: "designMobile",
          query: {
            ishowsId: item._id
          }
        });
        window.open(routeData.href, "_blank");
      }
    },
    //获取列表
    getIshows() {
      getIshows().then(response => {
        if (response.data && response.data.length) {
          console.info(response.data);
          this.activityList = response.data;
        }
        //console.info(response)
        //console.info(JSON.parse(response.data))
      });
    },
    // 设置为上线
    toOnline(row) {
      row.isPublic = true;
      this.updateIshow(row);
    },
    // 设置为下架
    toStop(row) {
      row.isPublic = false;
      this.updateIshow(row);
    },
    updateIshow(data) {
      updateIshows(data)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteIshows({
            _id: row._id
          }).then(res => {
            this.getIshows();
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新建场景
    linkNewSence() {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        let routeData = this.$router.resolve({
          name: "design"
        });
        window.open(routeData.href, "_blank");
      } else {
        let routeData = this.$router.resolve({
          name: "designMobile"
        });
        window.open(routeData.href, "_blank");
      }
    },
    //复制
    copy() {}
  }
};
</script>
<style lang="scss" scope>
.ishow-contain {
  .pre-content {
    padding: 6px;
    display: block;
    border: solid 1px #ccc;
    border-radius: 6px;
    font-size: 12px;
    transition: all 0.6s;
    width: 200px;
    overflow: hidden;
    position: relative;
    background: #eee;
  }
}
</style>
