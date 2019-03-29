<template>
	<transition name="fade">
		<div class="tool-warp" v-show="myValue" @click.self="myValue=false">
			<transition name="slideRight">
				<div v-show="myValue" class="tool-bar">
					<a class="tool-item-href" target="_blank" :href="SETTING.live800">
						<i class="iconay ay-zaixiankefu1"></i>在线客服
					</a>
					<!-- <a class="tool-item-href" target="_blank" href="javascript:;">
						<i class="iconay ay-QQ"></i>QQ客服
					</a> -->
					<!-- <router-link class="tool-item-href" :to="{name:'backCall'}" v-if="islogin">
						<i class="iconay ay-dianhua"></i>电话回拨
					</router-link> -->
					<!-- <div class="tool-item-href">
						<i class="iconay ay-weixin"></i>微信客服
						<div><img src="./images/waiting.png" alt=""></div>
					</div> -->
				</div>
			</transition>
		</div>
	</transition>
</template>
<script>
	import { SETTING } from "@/assets/data"
	import { mapGetters } from 'vuex'
	 import {backCall} from "@/controls/common/backCall"

	export default {
		data() {
			return {
				SETTING,
				myValue: false,
				searchData: { //查询条件
					total: "10", //true string
					v: "", //true string
					size: "10", // true string
					pageIndex: "1" //
				}
			}
		},
		props: ["value"],
		computed: {
			...mapGetters(["userData", 'islogin', 'isUser'])
		},
		watch: {
			value(val) {
				this.myValue = val;
			},
			myValue(val) {
				this.$emit("input", val);
			}
		},
		methods: {
		
		},
		created() {
		
		}
	}
</script>
<style lang="scss" scoped>
	@import "~mobile/assets/scss/mixin.scss";
	.tool-warp {
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
		.tool-bar {
			@include f(28px);
			transition: transform 0.5s;
			position:absolute;
			top: 0;
			right: 0;
			text-align: left;
			height: 100%;
			width: r(300);
			color: #bda059;
			background-color: #fff;
			border-left:r(12) solid #bda059;
			padding-top:r(300);
			&.active {
				display: block;
				transform: translateX(0);
			}
			.tool-item-href {
				display: block;
				padding: r(24) r(32);
				border-bottom: 1px solid #bda059;
				line-height: 1.4;
				.iconay {
					@include f(48px);
					margin-right: r(20);
				}
			}
			.tool-item-href:first-child {
				border-top: 1px solid #bda059;
			}
		}
	}
</style>