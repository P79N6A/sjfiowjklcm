<template>
    <div class="index-pros">
			<div class="titleBox">
				<div class="titleText">最新优惠<router-link :to="{name:'promo'}" class="small">更多&gt;&gt;</router-link></div>     	
			</div>
			<div class="promo-box">
				<router-link class="welfareBox cfx" v-for="(item,i) in allData.slice(0,4)" :key="i" :to="{name:'promo',params:{id:item.id}}">
					<!-- <span class="icon-title" :class="'icon'+item.type"></span> -->
					<div class="pic">
						<img :src="item.activityImageUrl" :alt="item.activitySummary" :title="item.activitySummary">
					</div>
				</router-link>
			</div>    
    </div>
</template>
<script>
  import {promos} from '@/controls/shows/promos'
  export default {
    mixins:[promos],
    created(){
      this.getPromos('mobile').then(res=>{
        // 设置菜单
        this.$bus.$emit('setProMenu',res.data.types)
      }).catch(err=>{
        window.toast(err.message)
      })
    }
}
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.index-pros{
    width: 100%;
		margin: r(20) auto;
		background-color: $main-bg;
		border-bottom: 1px solid #31537b;
		.titleBox{
			padding:r(20);
			text-align: left;
			@include f(32px);
			// margin-bottom: r(20);
			color: #00c5ff;
			position: relative;
			border-bottom: 1px solid #31537b;
			.titleText {
				padding-left: r(20);
				position: relative;
				letter-spacing: 1px;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: r(6);
					height: r(26);
					background: #00c5ff;
        	box-shadow: 0 0 10px 0px #26a2ff;
				}
			}
			.small{
				color: #c6c6c6;
				position: absolute;
				right: 0;
				top: 51%;
				transform: translateY(-50%);
			}
		}
		.promo-box {
			display: flex;
			flex-wrap: nowrap;
			// width: 100%;
      overflow: hidden;
      overflow-x: auto;
			padding:r(20);
		}
    .welfareBox{
				display:block;
				position: relative;
				min-width: r(400);
      	// height: r(180);
				box-sizing: border-box;
				margin-right: r(20);
			.icon-title {
        position: absolute;
        left: 50%;
        top: r(-25);
        transform: translateX(-50%);
        width: r(60);
        height: r(60);
      }
			.pic{
				img{
					display:block;
					width:100%;
					height: 100%;
					border-radius:r(10);				
				}
			}
		}
}
</style>
