<template>
  <div class="content-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin:10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <span style="float:right;" v-if="categoryTemp">数据集合:{{categoryTemp.name}}</span>
    </div>
    <el-table v-loading="listLoading" :data="contentList" border fit highlight-current-row style="width: 100%;" v-if="modelTemp">
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <!-- 渲染系统内置数据 -->
      <el-table-column fixed label="封面" prop="thumbnail" v-if="modelTemp.system.thumbnail" width="80">
        <template slot-scope="scope">
          <a target="_blank" v-if="scope.row.thumbnail&&scope.row.thumbnail.src" :href="`${cdnurl}${scope.row.thumbnail.src}`" class="img-view" :style="`background-image:url(${cdnurl}${scope.row.thumbnail.src});`"></a>
        </template>
      </el-table-column>
      <el-table-column label="摘要" prop="abstract" v-if="modelTemp.system.abstract"></el-table-column>
      <el-table-column label="标签" prop="tags" v-if="modelTemp.system.tags"></el-table-column>
      <!-- 内容太多了，以缩略图展示 -->
      <el-table-column label="内容" prop="content" v-if="modelTemp.system.content" width="50" align="center;">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看内容" placement="top-start">
            <svg-icon icon-class="documentation" />
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 渲染扩展字段 -->
      <el-table-column :label="extend.name" v-for="(extend,i) in modelTemp.extensions" :key="i">
        <template slot-scope="scope">
          <div v-if="extend.type=='media'">

          </div>
          <div v-else>
            {{scope.row.extensions[extend.key]}}
          </div>
        </template>
      </el-table-column>
      <!-- 操作部分 -->
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">
              {{
              $t('table.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="900px">

    <el-card class="box-card" hover v-if="contentTemp">
      <div slot="header" class="clearfix">
        <span>系统参数--{{isthumbnail}}</span>
      </div>
      <el-form ref="dataFormTemp" :model="contentTemp" label-position="right" label-width="70px">
          <el-form-item label="封面" prop="thumbnail" v-if="modelTemp.system.thumbnail">
              <el-upload
                class="avatar-uploader"
                action="/api/media"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <a v-if="contentTemp.thumbnail"
                  @click="beforeClick('thumbnail',true)"
                  class="img-view"
                  style="width:120px;height:120px;display:block;"
                  :style="`background-image:url(${cdnurl}${contentTemp.thumbnail.src});`">
                  {{contentTemp.thumbnail.fileName}}
                  <div>点击上传图片</div>
                </a>
                <i v-else class="el-icon-plus avatar-uploader-icon" @click="beforeClick('thumbnail',true)"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="摘要" prop="abstract" v-if="modelTemp.system.abstract">
            <el-input v-model="contentTemp.abstract"/>
          </el-form-item>
          <el-form-item label="标签" prop="tags" v-if="modelTemp.system.tags">
            <el-input v-model="contentTemp.tags"/>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <tinymce :height="400" v-model="contentTemp.content"/>
          </el-form-item>
      </el-form>
    </el-card>
    <br/>
    <br/>
    <el-card class="box-card" hover v-if="contentTemp">
      <div slot="header" class="clearfix">
        <span>扩展参数--{{isthumbnail}}</span>
      </div>
      <el-form ref="dataFormTempExtend" :model="contentTemp" label-position="right" label-width="70px">
        
          <el-form-item :label="extend.name" :prop="extend.key" v-for="(extend,i) in modelTemp.extensions" :key="i">
            <!-- 数字输入框 -->
            <el-input-number controls-position="right"  v-model="contentTemp.extensions[extend.key]" :placeholder="`请输入${extend.name}`" :min="0" v-if="extend.type=='number'" ></el-input-number>
            <!-- 日期-时间输入框 -->
            <el-date-picker v-model="contentTemp.extensions[extend.key]" :placeholder="`请输入${extend.name}`" type="datetime" v-if="extend.type=='date'"></el-date-picker>
            <!-- 文本域输入框 -->
            <tinymce :height="400" v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='textarea'"></tinymce>
            <!-- 文本输入框 -->
            <el-input :placeholder="`请输入${extend.name}`" v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='text'"></el-input>
            <!-- 多选 -->
            <el-checkbox-group v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='checkbox'">
              <el-checkbox v-for="(checkbox,i) in extend.mixed.select" :label="checkbox.value" :key="i">{{checkbox.name}}</el-checkbox>
            </el-checkbox-group>
            <!-- 下拉选项 -->
            <el-select v-model="contentTemp.extensions[extend.key]" :placeholder="`请选择${extend.name}`" v-if="extend.type=='select'">
              <el-option
                v-for="(option,i) in extend.mixed.select"
                :key="i"
                :label="option.name"
                :value="option.value">
              </el-option>
            </el-select>
            <!-- 颜色选择器 -->
            <el-color-picker v-model="contentTemp.extensions[extend.key]" v-if="extend.type=='color'" color-format='rgb' :show-alpha="true"></el-color-picker>
            <!-- 文件上传框 -->
                <el-upload
                v-if="extend.type=='media'"
                  class="avatar-uploader"
                  action="/api/media"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <a v-if="contentTemp.extensions[extend.key]&&contentTemp.extensions[extend.key].src"
                    @click="beforeClick(extend.key,false)"
                    class="img-view"
                    style="width:120px;height:120px;display:block;"
                    :style="`background-image:url(${cdnurl}${contentTemp.extensions[extend.key].src});`">
                    {{contentTemp.extensions[extend.key].fileName}}
                    <div>点击上传图片</div>
                  </a>
                  <i v-else class="el-icon-plus avatar-uploader-icon" @click="beforeClick(extend.key,false)"></i>
                </el-upload>
          </el-form-item>
      </el-form>
    </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?addContents():updateCategories()"
        >
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    getContents,
    addContents,
    addRoles,
    updateRoleOne,
    deleteRoleOne
  } from "@/api/contents";
  import Tinymce from "@/components/Tinymce";
  import {
    getAuthorities
  } from "@/api/authorities";
  import {
    getModels
  } from "@/api/model";
  import {
    getCategories,
    getCategoryOne,
    addCategories,
    deleteCategories,
    updateCategories
  } from "@/api/categories";
  import waves from "@/directive/waves"; // Waves directive
  import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

  export default {
    name: "ComplexTable",
    components: {
      Pagination
    },
    directives: {
      waves
    },
    data() {
      return {
        authorList: null,
        roleList: null,
        contentList: null,
        modelList: null,
        // 栏目模版
        // categoryTemp: {
        //   model: "",
        //   name: "",
        //   path: "",
        //   description: ""
        // },

        categoryTemp: null,
        contentTemp:null,
        modelTemp: null,
        total: 0,
        listQuery: {
          _id: this.$route.query.categoryId,
          currentPage: "1",
          pageSize: "20"
        },
        listLoading: true,
        dialogFormVisible: false,
        dialogStatus: "",
        isthumbnail:false,
        contentKey:null,
        textMap: {
          update: "Edit",
          create: "Create"
        }
      };
    },
    created() {
      // 读取数据列表
      this.getContents();
      // 读取数据模型
      this.getCategoryOne();
    },
    methods: {
      // 查询数据分类列表
      getContents() {
        this.listLoading = true;
        getContents(this.listQuery)
          .then(res => {
            this.contentList = res.data.contents;
            this.listLoading = false;
          })
          .catch(err => {
            this.listLoading = false;
          });
      },
      // 重置表单模型
      resetContentTemp(){
        let _obj={};
        _obj.category=this.categoryTemp._id
        // 检查系统默认的字段
        if(this.modelTemp.system.thumbnail){
          _obj.thumbnail={
            _id:'',
            fileName:'',
            src:''
          }
        }
        if(this.modelTemp.system.abstract){
          _obj.abstract=''
        }
        if(this.modelTemp.system.tags){
          _obj.tags=''
        }
        if(this.modelTemp.system.content){
          _obj.content=''
        }
        _obj.extensions={}
        // 遍历扩展的数据类型
        for(let i=0;i<this.modelTemp.extensions.length;i++){
          if(this.modelTemp.extensions[i].type=='checkbox'){
            // 多选框
            _obj.extensions[this.modelTemp.extensions[i].key]=[]
          }else if(this.modelTemp.extensions[i].type=='media'){
            // 文件上传框
            _obj.extensions[this.modelTemp.extensions[i].key]={
              _id:'',
              fileName:'',
              src:''
            }
          }else{
            _obj.extensions[this.modelTemp.extensions[i].key]=''
          }
        }
        // 数据原始模版，处理完毕
        this.contentTemp=_obj
      },
      // 重组提交前的数据
      setPostData(){
        this.contentTemp.media=[]
        // 把文件类型的_id提取处理
        if(this.contentTemp.thumbnail&&this.contentTemp.thumbnail._id){
          this.contentTemp.thumbnail=this.contentTemp.thumbnail._id
        }
        // 遍历扩展数据的文件
        for(var key in this.contentTemp.extensions) {
          console.log(key,this.contentTemp.extensions[key])
          if(this.contentTemp.extensions[key]._id){
            this.contentTemp.media.push(this.contentTemp.extensions[key]._id)
          }
          // if(!this.contentTemp.extensions[key]){
          //   delete this.contentTemp.extensions[key]
          // }
        }
        console.log(this.contentTemp)
      },
      // console.log('lskdjf')
      getCategoryOne() {
        getCategoryOne({
          _id: this.$route.query.categoryId
        }).then(res => {
          // 保存数据模型
          this.modelTemp = res.data.model;
          // 保存数据集
          this.categoryTemp = res.data
          // 保存表单模型
          this.resetContentTemp()
        }).catch(err => {

        })
      },
      // 获取模型
      getModels() {
        getModels()
          .then(res => {
            this.modelList = res.data;
          })
          .catch(err => {});
      },

      // 新建数据
      addContents() {
        console.log(this.contentTemp)
        this.setPostData()
        addContents(this.contentTemp)
          .then(res => {
            this.getContents();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          })
          .catch(err => {});
      },
      // 重置数据
      resetTemp() {
        this.categoryTemp = {
          model: "",
          name: "",
          path: "",
          description: ""
        };
      },
      // 点击创建按钮
      handleCreate() {
        this.resetContentTemp();
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
      },
      // 点击更新按钮
      handleUpdate(row) {
        Object.assign(this.contentTemp,row)
        // this.contentTemp=row
        return 
        this.categoryTemp = Object.assign({}, row); // copy obj
        this.categoryTemp.model = row.model._id;
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].clearValidate();
        });
      },
      // g更新操作
      updateCategories() {
        updateCategories(this.categoryTemp)
          .then(res => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.getContents();
          })
          .catch(err => {});
      },
      // 删除事件
      handleDelete(data) {
        this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            deleteCategories(data).then(res => {
              this.getContents();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      beforeClick(key,isthumbnail){
        if(isthumbnail){
          this.isthumbnail=true;
        }else{
          this.isthumbnail=false;
          this.contentKey=key
        }
      },
      handleAvatarSuccess(res, file) {
        if(this.isthumbnail){
          this.contentTemp.thumbnail={
            _id:res._id,
            fileName:file.name,
            src:res.src
          }
        }else{
          this.contentTemp.extensions[this.contentKey]={
            _id:res._id,
            fileName:file.name,
            src:res.src
          }
        }
        // this.siteInfo.value.favicon = res.src;
      },
      beforeAvatarUpload(file) {
        const isImg =file.type.includes('image')
        if(this.isthumbnail&&!isImg){
          this.$message.error("封面只能上传图片类型文件!");
        }
        return (this.isthumbnail&&isImg||!this.isthumbnail)
      },
    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    components: {
      Tinymce
    }
  };

</script>
<style lang="scss">
.content-container{
  padding:20px;
  .img-view {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #eee;
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height:2;
  }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .favicon {
    height: 90px;
    display: block;
  }
}
</style>
