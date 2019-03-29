<template>
  <div class="user-top content" v-if="isUser">
    <div class="logoDev">
      <img :src="userData.avator" alt="">
      <div class="logoTitle"><i class="iconfont icon-huangguan"></i>{{userData.level}}</div>
    </div>
    <div class="infos">
        <div class="texts fz20">
         	 亲爱的{{WEBCONFIG.title}}会员：<span class="cl-y">{{userData.loginname}}</span>
        </div>
        <div class="level">
	        <div class="u-level-box" v-for="(item,i) in level" :key="i">
	        	<p class="u-l-label">{{item.levelName}}</p>
	        	<span class='u-l-dot'></span>
            <!-- <div class="tips">
                <div class="triangle"></div>
                <div class="msgbox" v-if="item.level == 0">无要求</div>
                <div class="msgbox" v-else>升级到该等级需投注{{item.upgradethreshold}}元</div>
            </div> -->
	        </div>
	        <div class="level-meter"></div>
        </div>
    </div>
    <div class="control">
    	<span class="con-text">账户余额：</span>
      <div class="search">
        <el-select 
        placeholder="请选择查询类型" 
        v-model="searchMoney"
        width=700
        @change="getGameMoney(searchMoney)"
        >
          <el-option 
          v-for="item in Money" 
          :key="item.value" 
          :label="item.name" 
          :value="item.value">
          </el-option>
        </el-select>       
      </div>
      <br>
      <span class="money">{{wallet[searchMoney]}}元
        <a href="javascript:;" @click="getGameMoney(searchMoney)" class="iconyg yg-f14 btn003" :class="{xuanzhuan:actived==true}"></a></span>
    </div>
  </div>
</template>
<script>
  import {    mapGetters,    mapActions  } from 'vuex'
  import {    Money,WEBCONFIG  } from '@/assets/data'
  import {getGameMoney,doSignRecord} from '@/api/user'
  import {vipGold} from '@/controls/discount/vipGold'

  export default {
    mixins:[vipGold],
    data() {
      return {
        Money,
        WEBCONFIG,
        searchMoney:'MAIN',
        actived: false
        // level:["普通会员","青铜会员","白银会员","黄金会员","铂金会员","钻石会员"]
      };
    },
    props: {},
    methods: {
      ...mapActions(["LOGIN_OUT","UPDATE_MONEY"]),
      getGameMoney(val) {
        this.actived = !this.actived
        this.UPDATE_MONEY(val).then(res=>{
          this.actived = !this.actived
        }).catch(err=>{
          this.actived = !this.actived
          window.toast(err.message)
        })
      },
    },
    watch: {},
    computed: {
      ...mapGetters(["userData","isUser","unread","wallet"]),
    },
    created() {
      this.getVipInfo(this.userData)
      this.getGameMoney('MAIN')
      if (this.userData.levelNumber == "6") {
        this.userData.level = "贵宾";
      }
    },
    components: {}
  };

</script>
<style lang="scss" scoped>
  .user-top { 	
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: rgba(0, 119, 208,.9);
    padding: 20px 0;
    margin-bottom: 20px;
    .logoDev{
      margin-left:15px; 
      img{
        width: 108px;
      }
    }
    .logoTitle {
    	text-align: center;
    	width: 80px;
    	height: 24px;
    	line-height: 24px;
    	margin: 0 auto;
    	background-color:#fff;
    	color: #000;
    	border-radius: 20px;
    	margin-top: 5px;
    	.iconfont{
    		margin-right: 2px;
    	}
    }
    .infos {
      width: 590px;
      height: 109px;
      color: #fff;
      .texts {
        margin-left: 19px;
        margin-bottom: 20px;
        height: 28px;
        font-size: 16px;
        .cl-y{
        	color: #f7ec00;
        }
        .iconfont {
        	margin-left: 10px;
        	cursor: pointer;
        }
      }
    }
    .control {
      width: 400px;
      padding: 30px 20px 0;
      border-radius: 8px;
      margin-right: 20px;
      background: #1b98f5; 
			.con-text {
				font-size: 24px;
				color: #fff;
			}
			.search {
				display: inline-block;
				margin-bottom: 10px;
			}
			.money {
				color: #f7ec00;
				font-size: 25px;
				margin-left: 15px;
			}
      .inputs {
        width: 320px;
        background: #fff;
        border-radius: 6px;
        color: red;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        select {
          display: block;
          height: 100%;
          width: 100%;
          background: 0;
          border: 0;
          outline: 0;
          color: red;
        }
      }
      .btns {
        margin-top: 20px;
        .item {
          display: inline-block;
          height: 34px;
          line-height: 34px;
          width: 90px;
          margin-right: 3px;
          text-align: center;
          background: #7087c3;
          border-radius: 6px;
          color: #fff;
          cursor:pointer;
          .icobjh {
            font-size: 18px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .level {
  	width: 100%;
  	position: relative;
  	padding:6px 0;
  	margin-bottom: 4px;
    display: flex;
  	.level-meter {
  		position: absolute;
  		left: 50%;
  		top: 37px;
  		transform: translateX(-50%);
  		width: 500px;
  		height: 10px;
			background: #575757; /* Old browsers */
			background: -moz-linear-gradient(left,  #575757 0%, #fff 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(left,  #575757 0%,#fff 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to right,  #575757 0%,#fff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#575757', endColorstr='#fff',GradientType=1 ); /* IE6-9 */

  	}
		.u-level-box {
				flex: 1;
	      text-align: center;
	      z-index: 333;
	      cursor:pointer;
	      position:relative;
	      .u-l-ico{
	        transition:all 0.3s;
	        &:hover{
	          transform:scale(1.1);
	        }
	      }
	      .u-l-label {
	        font-size: 16px;
	      }
	      .u-l-dot {
	        display: inline-block;
	        height: 18px;
	        width: 18px;
	        border-radius: 50%;
	        background: #0181fa;
	        margin-top: 3px;
	        border: 2px solid #16d6ff;
	        &.active {
	          background: #00a5d9;
          }
	      }
	      .u-l-money {
	        font-size: 14px;
	        &.active {
	          color: #c9cbcc
	        }
        }
        &:hover{
          .tips{
            display: block;
          }
        }
        .tips{
          position: absolute;
          display: none;
          z-index: 9999;
          // left: 8%;
          // width: 250px;
          min-height: 40px;
          // margin-top: 36px;
          .msgbox{
              background: #0181fa;
              background: -webkit-gradient(linear, left top, right top, from(#0181fa), to(#16d6ff));
              background: linear-gradient(to right, #0181fa 0%, #16d6ff 100%);
              color: #fff;
              width: 100px;
              text-align: center;
              line-height: 1.3rem;
              border-radius: 5px;
              margin: 0 auto;
              padding: 2px 5px;
          }
          .triangle{
              width: 0;
              height: 0;
              border: 10px solid;
              margin: 0 auto;
              border-color: transparent transparent #0181fa transparent;
          }
        }
	    }	    
    }
    .fz20 {
	    	font-size: 20px!important;
      }
      .xuanzhuan{
        &.yg-f14:before{
          -webkit-animation:rotateImg 1s linear infinite;
          animation: rotateImg 1s linear infinite;
          display: inline-block;
        }
      }
      @keyframes rotateImg {
        0% {transform : rotate(0deg);}
        100% {transform : rotate(360deg);}
      }
      @-webkit-keyframes rotateImg {
          0%{-webkit-transform : rotate(0deg);}
        100%{-webkit-transform : rotate(360deg);}
      }
</style>
