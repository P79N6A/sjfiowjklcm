<template>
	<div>
  	<transition name="fade">
		<div class="tool-warp" v-show="myValue" @click.self="myValue=false">
			<transition name="slideLeft">
				<div v-show="myValue" class="tool-bar">
					<div class="tool-close" @click="myValue=false">
						<div class="iconfont icon-close">
						</div>
					</div>
					<div @click="myValue=false" class="tool-user-info">
						<div class="account-img">
					<span class="iconfont icon-zhanghu">
					</span>
						</div>
						<div class="user-name">{{userData.loginname || "您好！请先登录"}}</div>
					</div>
					<div  @click="myValue=false">
						<router-link class="tool-item-href" :to="{name:'login'}" v-if="!islogin">
							<i class="iconay ay-denglu1"></i>登录
						</router-link>
						<router-link class="tool-item-href" :to="{name:'register'}" v-if="!islogin">
							<i class="iconay ay-register-copy"></i>立刻注册
						</router-link>						
						<!-- <router-link class="tool-item-href" :to="{name:'personalList'}" v-if="islogin">
							<i class="iconay ay-zhanghuanquan-"></i> 账户安全
						</router-link> -->
						<router-link class="tool-item-href" :to="{name:'personalList'}" v-if="islogin">
							<i class="iconay ay-zhanghushezhi"></i> 账户设置
						</router-link>
						<a class="tool-item-href" :href="SETTING.live800" target="_blank">
							<i class="iconay ay-xiaotuziCduan-"></i>在线客服
						</a>				 
						<!-- <router-link class="tool-item-href" :to="{name:'backCall',params:{show:true}}">
							<i class="iconay ay-dianhua"></i> 电话回拨
						</router-link> -->
						<!-- <a href="javascript:void(0);" @click="showWindow = true,myValue = false" class="tool-item-href">
							<i class="iconay ay-dianhua"></i> 电话回拨
						</a> -->
						<router-link class="tool-item-href" :to="{name:'message'}" v-if="islogin">
							<i class="iconay ay-mail"></i> 站内信
							<span class="unread" v-if="unread">{{unread}}</span>
						</router-link>
						<div  v-if="islogin" class="tool-item-href" @click="$store.dispatch('LOGIN_OUT')">
							<i class="iconay ay-tuichu2"></i> 退出
						</div>
					</div>
				</div>
			</transition>
			
		</div>
	</transition>
	<call-back :showWindow=showWindow @closeBox="closeBox"></call-back>
	</div>
</template>
<script>
  import {SETTING ,Download} from "@/assets/data"
  import {mapGetters} from 'vuex'
  import callBack from 'mobile/views/common/back-Call'

  export default {
    data() {
      return {
		SETTING,
		Download,
		myValue:false,
		showWindow:false
      }
    },
    props: ["value"],
    computed: {
      ...mapGetters(["userData", 'islogin', 'isUser', 'unread'])

	},
	methods:{
		closeBox(){
			this.showWindow =false;
		}
	},
    created(){
    //   监听setToolBar控制事件
    //   this.$bus.$on('setToolBar',eventData=>{
    //     this.myValue=eventData
    //   })
	},
	watch: {
		value(val) {
			this.myValue = val;
		},
		myValue(val) {
			this.$emit("input", val);
		}
	},
	components:{
		callBack
	}
  }

</script>
<style lang="scss" scoped>
	@import "~mobile/assets/scss/mixin.scss";
	.tool-warp {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		.tool-bar {
			@include f(30px);
			transition: transform 0.5s;
			top: 0;
			left: 0;
			text-align: left;
			height: 100%;
			width: 60%;
			background: url("./images/bg.jpg") no-repeat top/100%;
			padding-top:r(20);
			&.active {
				display: block;
				transform: translateX(0);
			}
			.unread {
				margin-left: r(20);
				background: #FF7E28;
				border-radius: 20em;
				display: inline-block;
				padding: r(6);
				line-height: 1;
				color: #ffffff;
			}
			.tool-close {
				height: r(120);
				line-height: r(120);
				text-align: right;
				.iconay {
					@include f(72px);
					margin-right: r(32);
				}
				.icon-close{
					font-size: 36px;
					margin-right: 18px;
				}
			}
			.tool-user-info {
				text-align: center;
				margin-bottom: r(40);
				.user-level{
					height: r(40);
					line-height: r(40);
				}
				.user-name {
					display: inline-block;
					width: 173px;
					height: 35px;
					line-height: 35px;
					color: #fff;
					border-radius: 5px;
				}
			}
			.account-img {
				border: solid r(7) #fff;
				border-radius: 100px;
				width: r(150);
				margin: 0 auto;
				background: #1dc4ec;
				height: r(150);
				text-align: center;
				line-height: r(140);
				.iconfont {
				@include f(100px);
				}
			}
			.tool-item-href {
				display: block;
				padding: r(16) 0 r(16) r(80) ;
				line-height: 1.5;
				color: #fff;
				margin-bottom: 10px;
				position: relative;
				font-size: 16px;
				background: #1e327e;
				@include f(32px);
				.iconay {
					@include f(60px);
					margin-right: r(20);
				}
			}
			.tool-item-href.active {
				background-color: #1e327e;
				color: #ffffff;
				.iconay {
					color: #fff;
				}
			}

			.contack_btn {
				display: flex;
				justify-content: space-between;
				padding: 0 r(40);
				margin-top: r(20);
				a {
					display: block;
					border: 1px solid #996b3d;
					border-radius: 5px;
					text-align: center;
					height: 35px;
					line-height: 35px;
					width:100px;
					color: #cca352;
				}
			}
			
			.tool-user-info-login {
				display: block;
				padding-left: r(40);
				.account-info-login {
					display: inline-block;
					color: #ffffff;
					padding-top: r(40);
					padding-left: r(20);
					p {
						line-height: 2;
					}					
					.info-money {
						color:#cca352; 
					}
				}
				.ay-xiangyou {
					color:#cca352; 
					font-weight: bolder;
					margin-top: r(50);
					margin-right: r(30);
				}
			}
			.money-item {
				display: flex;
				justify-content: space-between;
				padding: r(40) r(40) 0;
				border-top: 1px solid #3a342e;
				margin: r(20) 0 r(40) 0;
				
				a {
					display: block;
					background-color: #2c2e36;
					border-radius: 5px;
					padding: r(10) r(30);
					color: #cca352; 
					line-height: 2;
					img {
						width: r(60);
						margin-right: r(10);
					}
				}
			}
		}
	}

</style>
