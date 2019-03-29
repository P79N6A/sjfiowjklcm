<template>
  <div v-if="isAgent" class="mainDev content">
      <router-link class="gameDev" v-for="item in gamebox" :key="item.name" :to="{name: item.routerName}">
            <div class="name">{{item.name}}</div>
            <div class="triangle-right"></div>
      </router-link>
  </div>
</template>
<script>
  import {    mapGetters,    mapActions  } from 'vuex'

  export default {
    data() {
      return {
        searchMoney:'',
        showMoney:'刷新余额',
        gamebox:[
            {name:'数据汇总',routerName:'agent_summary'},
            {name:'佣金报表',routerName:'agent_ptcommission'},
            {name:'会员列表',routerName:'agent_memberlist'},
            {name:'会员帐务',routerName:'agent_memberbill'},
            {name:'额度记录',routerName:'agent_creditlog'},
            {name:'个人中心',routerName:'agentDetail'},
            {name:'申请提款',routerName:'finance_drawmoney'},
            {name:'站内信',routerName:'user_message'},
            {name:'绑定银行卡/折号',routerName:'user_banks'},
        ],
      };
    },
    props: {},
    methods: {
      ...mapActions(["LOGIN_OUT"]),
    },
    computed: {
      ...mapGetters(["userData","isAgent","unread"]),
    },
    created() {
    },
    components: {},
    watch: {

    }
  };

</script>
<style lang="scss" scoped>
    .mainDev{
        background: #010a24;
        color: #ecf4f2;
        height: 80px;
        // overflow: hidden;
        margin-bottom: 21px;
        .gameDev{
            border-right: 1px solid #1c2233;
            width: 11%;
            display: inline-block;
            text-align: center;
            line-height: 79px;
            .name{
                font-size: 17px;
            }
            .money{
                color: #ecf4f2;
                font-size: 16px;
                margin-top: 12px;
            }
            &.active {
                border-bottom: 4px solid #ed7e12;
                line-height: 33px;
                padding-top: 22px;
                .triangle-right{
                    position: relative;
                    right: -57px;
                    top: 24px;
                    width: 0;
                    height: 0;
                    border: 10px solid;
                    border-color: #ed7e12 transparent transparent transparent;
                }
            }
        }
        .gameDev:nth-child(9){
            border-right: none;
        }
        .next{
            width: 2.5%;
            background: #16705e;
            display: inline-block;
            height: 80px;
            vertical-align: top;
            .ico-pre{
              width: 0;
              height: 0;
              border: 10px solid;
              position: absolute;
              border-color: #16705e #fff #16705e #16705e;
              /* top: 40px; */
              margin-top: 30px;
            }
            .ico-next{
              width: 0;
              height: 0;
              border: 10px solid;
              position: absolute;
              border-color: #16705e #16705e #16705e #fff;
              margin-left: 10px;
              /* top: 40px; */
              margin-top: 30px;
            }
        }
    }
</style>
