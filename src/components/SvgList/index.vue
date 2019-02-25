<template>
  <div class="svg-container">
    <!-- 系统形状库 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible" title="形状列表" width="800px" :modal="false"
      :close-on-click-modal="false">
      <el-row>
        <el-col :span="4" style="background:#606266;height: 610px;">
          <div class="menu-title">
            形状库
            <i class="el-icon-warning" @click="dialogRuleVisible=true;"></i>
          </div>
          <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64"
            text-color="#fff" active-text-color="#409eff">
            <el-menu-item index="1">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">我的形状</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-star-off"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-goods"></i>
              <span slot="title">正版形状</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <div class="svg-list">
            <!-- <div></div> -->
            <div class="search">
              分类：
              <span v-for="(item,i) in dataTypeOption" :key="i">{{item}}</span>
            </div>
            <div class="search">
              排序：
              <span v-for="(item,i) in dataSortOption" :key="i">{{item}}</span>
              价格：
              <span v-for="(item,i) in dataPriceOption" :key="i">{{item}}</span>
            </div>
            <div class="svg-box">
              <div class="svg-content" v-for="(item,i) in svgList" :key="i">
                <div class="svg-view">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"
                    y="0px" width="100%" height="100%" :viewBox="item.viewBox" xml:space="preserve" preserveAspectRatio="none">
                    <path :d="item.value" fill="#409eff"></path>
                  </svg>
                </div>
                <div class="svg-control">
                  <el-button @click="select(item)">使用</el-button>
                  <div class="icons">
                    <i class="el-icon-star-off"></i>
                    <i class="el-icon-view" @click="preList=svgList;preIndex=i;showPre=true;"></i>
                  </div>
                </div>
                <div class="svg-price">{{item.price}}元</div>
              </div>
            </div>
            <div class="svg-pre" v-if="showPre">
              <i class="el-icon-back pre-close" @click="showPre=false;"></i>
              <el-carousel :autoplay="false" indicator-position="none" height="562px" :initial-index="preIndex" :change="handleChange">
                <el-carousel-item v-for="item in preList" :key="item">
                  <div style="display:flex;justify-content:center;align-items:center;height:100%;padding:20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"
                      y="0px" width="100%" height="100%" :viewBox="item.viewBox" xml:space="preserve"
                      preserveAspectRatio="none">
                      <path :d="item.value" fill="#409eff"></path>
                    </svg>
                  </div>
                </el-carousel-item>
              </el-carousel>
              <div class="pre-foot">
                <div>形状预览</div>
                <div>
                  <i class="el-icon-star-off"></i>
                  <span>{{preList[preIndex].price}}</span>
                  <el-button type="primary" @click="select(preList[preIndex])">使用</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="dialogRuleVisible" title="页面设置" width="800px" :close-on-click-modal="false">
      <div style="padding:20px;line-height:1.5;">本平台形状版权许可与服务协议
        <h3>第一条 形状版权声明</h3>本平台平台形状库中所有收费形状素材均是经版权方合法授权的正版素材，其知识产权和所有权归版权方所有。用户须购买后方可享有有限使用权。
        <h3>第二条 授权使用方式</h3>本平台提供的形状授权是免版税金（RF,
        Royalty-Free）使用形状版权的方式。用户购买形状使用授权后，形状的使用权是非排他性的、全球性的、单用户的使用权，不受使用次数的限制，使用权不可转让。
        <br>用户只有完成付款后，才能按照本协议的约定获得形状的有限使用权，否则，形状的使用授权不成立。
        <h3>第三条 授权使用范围</h3>本平台平台提供的收费形状仅供用户付费后在本平台平台（编辑器）内使用并通过各种途径对在本平台场景中所创作的设计作品进行传播。用户不得用于本平台平台以外的其他范围或项目，不得将付费后的形状用在需要正式注册的商标或服务标志上，不得将形状用于其他任何违法场合、包括违法的宣传品等。
        <h3>第四条 授权使用期限</h3>形状的授权使用期限为1年。用户自完成付费之日起算1年内享受本协议第二条和第三条约定的使用权限；授权到期后，用户如需继续使用形状版权，须重新付费购买。
        <h3>第五条 权利与义务</h3>用户有权利按照本协议的约定许可条件，合理的使用形状素材版权，并遵守《中华人名共和国著作权法》等相关法律法规的规定，未经授权任何单位和个人不得非法复制、转载或以其他任何方式使用，否则产生的一切法律责任和后果均由侵权方承担。
        <h3>第六条 法律风险声明</h3>本平台平台为用户提供自主上传形状素材的通道和入口，鼓励用户上传和使用原创优质素材，鼓励用户使用本平台平台所提供的正版素材。如因用户的作品内容或使用的素材被他人投诉或第三方公司向本平台公司提出异议，本平台公司有权下架、删除有关作品信息和素材内容且不承担任何责任。
        <br>同时，用户对自主上传的形状素材侵权风险承担全部责任，即用户因未经版权方授权进行上传和使用第三方平台或版权方的形状素材而引发的任何侵权纠纷事件，以及情节较为严重的经济索赔责任，均由用户全部承担，本平台公司不承担任何责任。
        <br>故用户须谨慎上传和使用版权来源不明确的任何形状素材。
        <h3>第七条 协议生效及其他</h3>本协议是用户与北京中网本平台科技有限公司之间关于用户在本平台平台上使用形状授权等相关服务所签订的一份具有法律效力的协议。用户在购买形状版权前，须充分阅读和理解、同意并遵守本协议有关条款的内容，否则用户无权购买和使用。
        <br>用户完成付费购买的行为视为已经充分理解和同意本协议。在此协议发布之前，已经完成形状版权购买的用户，须在本协议约定的条件和范围内使用形状版权等有关服务。
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    getSvgs
  } from "@/api/svgs";
  export default {
    name: "FileList",
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        dialogRuleVisible: false,
        emitEvent: null, // 选择形状后，需要促发的函数
        dataTypeOption: [
          "猪年专题",
          "春节专题",
          "精选",
          "促销",
          "邀请函",
          "科技"
        ],
        dataSortOption: ["最新", "最热"],
        dataPriceOption: ["", "0", "0-10元", "11-20元"],
        picJson: [],
        tempUrl: "",
        isLoading: true,
        //搜索条件
        filterData: {
          // 设置
          price: '',
          type: '',
          festival: '',
          style: '',
          color: '',
        },
        svgList: [],
        showPre: false,
        preList: [],
        preIndex: 0
      };
    },
    created() {
      this.$bus.$on("openSvgList", emitEvent => {
        this.dialogFormVisible = true;
        this.getSvgs();
        this.emitEvent = emitEvent;
      });
    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    methods: {
      // 查询用户列表
      getSvgs() {
        this.listLoading = true;
        getSvgs(this.filterData)
          .then(res => {
            this.svgList = res.data
            this.listLoading = false;
          })
          .catch(err => {
            this.listLoading = false;
          });
      },
      handleChange(index) {
        this.preIndex = index;
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      preview(url) {
        window.open(url);
      },
      select(item) {
        this.$bus.$emit(this.emitEvent, item);
        this.dialogFormVisible=false;
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .svg-container {
    .el-dialog__body {
      padding: 0;
    }

    .menu-title {
      font-size: 24px;
      padding: 20px;
      color: rgb(255, 255, 255);
      background-color: rgb(84, 92, 100);

      i {
        color: red;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .svg-list {
      padding: 0 10px;
      position: relative;

      .search {
        margin-bottom: 10px;

        span {
          padding: 0 10px;
          border-right: solid 1px #343434;
          line-height: 1;
          vertical-align: middle;
        }
      }

      .svg-box {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        height: 550px;
        overflow-y: scroll;
        height: auto;
      }

      .svg-content {
        position: relative;
        margin: 4px;

        &:hover {
          .svg-control {
            opacity: 1;
          }
        }

        .svg-view {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
          background-color: #eee;
          text-align: center;
          width: 150px;
          height: 150px;
          display: inline-block;
          cursor: pointer;
        }

        .svg-control {
          position: absolute;
          transition: all 0.4s;
          top: 0;
          left: 0;
          width: 150px;
          height: 150px;
          background: rgba(0, 0, 0, 0.6);
          text-align: center;
          padding-top: 50px;
          opacity: 0;

          .icons {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            color: #fff;
            padding: 10px;

            i {
              cursor: pointer;
              transition: all 0.3s;
              font-size: 18px;

              &:hover,
              &.active {
                color: #409eff;
              }
            }
          }
        }

        .svg-price {
          font-size: 12px;
        }
      }

      .svg-pre {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 610px;
        background: rgba(0, 0, 0, 0.3);

        .pre-close {
          font-size: 30px;
          font-weight: bold;
          border: solid 2px #fff;
          border-radius: 20em;
          color: #fff;
          padding: 2px;
          position: absolute;
          cursor: pointer;
          left: 10px;
          top: 10px;
          z-index: 999;
        }

        .pre-foot {
          display: flex;
          justify-content: space-between;
          background: #fff;
          padding: 10px;
        }
      }
    }
  }

</style>
