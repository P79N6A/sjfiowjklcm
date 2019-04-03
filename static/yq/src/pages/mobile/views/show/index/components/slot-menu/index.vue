<template>
	<div class="slotListBox">
		<div class="sectionDiv" v-for="(games,i) in gameList" :key="i">
			<div class="section-tit">
				<i :class="games.ico"></i>
				<h2>{{games.title}}</h2>
			</div>
			<div class="listBox cfx">
				<div class="trueMan" v-for="(item,j) in games.list" :key="j">
					<router-link  v-if="item.to" :to="item.to">
            <img v-lazy="getimg(item)" :alt="item.name">
          </router-link>
				</div>				
			</div>
		</div>
	</div>
</template>
<script>
	import { Games } from "@/assets/data"
  const slotData=[ 
    {name:"PT",to:{name:"slotgame",params:{type:"PT"}},img:"pt.png"},
    {name:"MG",to:{name:"slotgame",params:{type:"MGS"}},img:"mg.png"},
    // {name:"PNG",to:{name:"slotgame",params:{type:"PNG"}},img:"ttg.png"},
    {name:"DT",to:{name:"slotgame",params:{type:"DT"}},img:"dt.png"},
    {name:"QT",to:{name:"slotgame",params:{type:"QT"}},img:"qt.png"},
    {name:"NT",to:{name:"slotgame",params:{type:"NT"}},img:"nt.png"}, 
    {name:"更多",to:{name:"slotgame"},img:"more.png"},
  ]
	export default {
		data() {
			return {
				Games,
				gameList: [
					{
						"title":"老虎机平台",
						"ico":"icobjh bjh-casino",
						"list":slotData
					}
				]
			};
		},
		methods:{
			getimg(item){
	            return require(`./img/${item.img}`)
	          }
		},
		created() {

		},
		components: {}
	};
</script>
<style lang="scss" scoped>
	@import "~mobile/assets/scss/mixin.scss";
	.slotListBox {
		.sectionDiv {
			padding: r(30) r(10);
      margin-bottom: r(24);
			.section-tit{
				margin-bottom: r(24);
				h2 {
					display: inline-block;
					vertical-align: middle;
					font-weight: normal;
					@include f(34px);
				}
				.icobjh{
    				@include  f(36px);
					color:#666;
					vertical-align:middle;

				}
			}
			.listBox {
        width: 100%;
        display:flex;
        overflow-x:scroll;
        overflow-y:hidden;
				.trueMan {
					min-width: 47%;
          margin-bottom: r(20);
          float: left;
			    margin-right: r(30);
					a {
						display: inline-block;
						width: 100%;
						img {
							width: 100%;
							height: 100%;
							border-radius: 10px;
						}
					}
				}
			}
		}
	}
</style>