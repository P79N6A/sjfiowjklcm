<template>
    <div class="account-box">
        <div class="title">
            公告:
        </div>
        <ul>
            <li class="cfx" v-for="(item,i) in data" :key="i" @click="itemClk(item,i)">
                <div class="fl">{{item.title}}</div>
                <div class="fr">{{item.createtime | Date}}</div>
            </li>
        </ul>
        <Tips v-model="show" :data="cur"></Tips>
    </div>
</template>

<script>
import {SETTING} from "@/assets/data"
import { getNewAnnouncement} from "@/api/show";
import Tips from "./tipsbox"
export default {
    data() {
      return {
        cur: {},
        show: false,
        SETTING,
        data: [] //records
      };
    },
    props: {},
    methods: {
      itemClk(item,i){
        this.show=true;
        this.cur=item;
      },
    },
    computed: {
//      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
    },
    created() {
        //加载数据
      getNewAnnouncement().then(res => {
        if (res.success) {
          this.data = res.data.map(item => {
            item.already = false;
            return item;
          });
        } else {
          toast(data.message);
        }
      })
    },
    components: {
        Tips
    }
}
</script>

<style lang="scss" scoped>
   .account-box{
        width: 48.5%;
        border: 1px solid #ccc;
        padding: 15px 10px;
        // display: inline-block;
        height: 260px;
        float: right;
        // overflow-y: scroll;
        .title{
            margin-bottom: 10px;
            border-bottom: 1px dotted #ccc;
            padding: 10px 0;
            font-size: 16px;
            color: #ed7e12;
            // position: fixed;
        }
        ul{
            width: 100%;
            height: 185px;
            overflow: hidden;
            &:hover{
                overflow-y: scroll;
            }
            li{
                cursor: pointer;
                font-size: 14px;
                color: #656565;
                width: 100%;
                display: block;
                line-height: 1.7rem;
            }
            .cfx {
                clear: both;
                zoom: 1;
            }
        }
   }
</style>

