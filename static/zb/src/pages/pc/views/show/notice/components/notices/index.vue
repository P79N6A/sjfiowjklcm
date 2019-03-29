<template>
  <div class="notice-show fr">
    <div class="notice-show-title">最新公告 NOTICES</div>
    <div class="notice-show-content">
      <div class="notice-item cfx" v-for="(item,i) in data" :key="i" @click="itemClk(item,i)">
        <div class="fl">{{item.title}}</div>
        <div class="fr">{{item.createtime | Date}}</div>
      </div>
    </div>
    <Tips v-model="show" :data="cur"></Tips>
  </div>
  
</template>
<script>
  import Tips from "./tips";
  import { getNewAnnouncement} from "@/api/show";
  import {SETTING} from "@/assets/data"
  // 这里需要添加一个功能，点击进来后自动打开某个公告的详情
  export default {
    data() {
      return {
        cur: {},
        show: false,
        SETTING,
        data: [] //records
      };
    },
    components:{Tips},
    methods: {
      itemClk(item,i){
        this.show=true;
        this.cur=item;
      },
      checkOpen(){
        // 看下是否有带参数过来，自动展开对应的的详情
        if(this.$route.params&&this.$route.params.id){
          const _index=this.data.findIndex(item=>{
            return item.id==this.$route.params.id
          })
          console.log(_index)
          if(_index>=0){
            this.itemClk(this.data[_index])
          }
        }
      }
    },
    created() {
      //加载数据
      getNewAnnouncement().then(res => {
        if (res.success) {
          this.data = res.data.map(item => {
            item.already = false;
            return item;
          });
          this.checkOpen()
          console.log(this.$route)
        } else {
          toast(data.message);
        }
      })
    },
    activated(){
      this.checkOpen()
    }
  }

</script>
<style lang="scss" scoped>
  .notice-show {
        position: relative;
        width: 880px;
        border-radius: 10px;
        overflow: hidden;
        &:before {
          position: absolute;
          bottom: -10px;
          display: block;
          width: 100%;
          height: 10px;
          content: '';
          background-repeat: no-repeat;
          background-position: bottom;
        }
        .notice-show-title {
          font-size: 34px;
          line-height: 80px;
          height: 80px;
          text-align: center;
          background: #0b6dc3;
          color: #fff;
          background: -webkit-linear-gradient(top, #008edf 0%, #005bad 50%, #0b6dc3 100%);
          background: -webkit-gradient(linear, left top, left bottom, from(#008edf), color-stop(50%, #005bad), to(#0b6dc3));
          background: linear-gradient(to bottom, #008edf 0%, #005bad 50%, #0b6dc3 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#008edf', endColorstr='#0b6dc3', GradientType=1);
        }
        .notice-show-content {
          padding: 30px 70px 30px 40px;
          color: #000000;
          background: #fff;
          .notice-item{
            padding-bottom:30px;
            font-size:18px;
            cursor:pointer;
            // &:hover{
            //   background:blue;
            // }
          }
        }
      }
  // .notice-list {
  //   padding: 0 20px 20px;
  //   background: #373738;
  //   width: 910px;
  //   border-radius: 10--px;
  //   .list-item {
  //     cursor: pointer;
  //   }
  //   .list-title {
  //     padding-top: 24px;
  //     padding-bottom: 11px;
  //     border-bottom: dashed 1px #666666;
  //     font-size: 16px;
  //     white-space: nowrap;
  //     color: #fff;
  //     &:hover{
  //       border-bottom: dashed 1px #ffdc98;
  //     }
  //     &:active{
  //       border-bottom: dashed 1px transparent;
  //     }
  //     &.active,
  //     &:hover {
  //       color: #ffdc98;
  //       .list-time {
  //         .arrow{
  //           transform:rotate(90deg);
  //         }
  //       }
  //     }

  //     .list-time {
  //       float: right;
  //       font-weight: lighter;
  //       .arrow{
  //         transition:all 0.5s;
  //         display:inline-block;
  //       }
  //     }
  //   }
  //   .item-info {
  //     margin-top: 3px;
  //     background: #2d2d2e;
  //     padding: 20px 20px;
  //     line-height: 25px;
  //     font-size: 14px;
  //     color: #ffdc98;
  //   }
  // }

  // .message-enter-active,
  // .message-leave-active {
  //   transition: all 1s;
  //   overflow: hidden;
  // }

  // .message-enter,
  // .message-leave-to {
  //   height: 0 !important;
  // }

</style>
