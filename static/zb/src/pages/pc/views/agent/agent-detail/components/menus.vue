<template>
  <div class="u-c-shows">
    <div class="userSet">
      <div class="u-c-menu">
        <router-link class="u-c-router" v-for="item in Menus" :to="{name:item.to}" :key="item.name">
          <span class="iconay" :class="item.ico"></span>{{item.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Menus: [{
          to: 'agent_setting',
          name: '个人资料',
          ico: 'ay-gerenshezhi'
        }, {
          to: 'agent_banks',
          name: '银行卡管理',
          ico: 'ay-bangdingyinhangqia'
        }, {
          to: 'agent_password',
          name: '修改密码',
          ico: 'ay-mima2'
        }, {
          to: 'agent_payword',
          name: '修改支付密码',
          ico: 'ay-zhifu'
        }]
      };
    },
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    methods: {

    },
    computed: {
      ...mapGetters(["userData", "unread", "isUser"]),
    },
    created() {}
  };

</script>
<style lang="scss" scoped>
 .u-c-shows{
    width:100%;
    flex: 1;
    .u-c-menu{
      margin-right: 20px;
      /*display:flex;
      justify-content:space-between;*/
      .u-c-router{
        padding: 0 30px!important;
      	background-color: rgba(0, 0, 0, 0.705);
      	display: block;
      	height: 60px;
      	line-height: 60px;
        border:1px solid #303030;
        font-size:16px;
        color:#fff;
        padding-left: 30px;
        position:relative;
        cursor:pointer;
          &:before{
            content:'';
            width:100%;
            background:none;
            height:5px;
            position:absolute;
            bottom:-4px;
            left:0;
          }
        &:hover,&.active{
          color: #fff;
          background: #0181fa; /* Old browsers */
					background: -moz-linear-gradient(left,  #0181fa 0%, #16d6ff 100%); /* FF3.6-15 */
					background: -webkit-linear-gradient(left,  #0181fa 0%,#16d6ff 100%); /* Chrome10-25,Safari5.1-6 */
					background: linear-gradient(to right,  #0181fa 0%,#16d6ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0181fa', endColorstr='#16d6ff',GradientType=1 ); /* IE6-9 */
          .iconay{
            color:#fff;
          }
        }
        .iconay{
          color:#fff;
          margin-right:10px;
          font-size:26px;
          vertical-align:middle;
          height:40px;
          line-height:40px;
        }
      }
    }
  }

</style>
