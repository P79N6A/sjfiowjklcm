<template>
	<div class="jackpot-num cfx">
		<div class="jackpot-title">
			<span class="line"></span>
			<span class="cl-fff">JACKPOT超级大奖池</span>
			<span class="line"></span>
		</div>
		<div class="jackpot-nums">
			<span class="num">￥</span>
			<span class="num" v-for="(item,i) in total" :key="i"
                  :class="i==3||i==7?'':('num'+item)"
            >{{item}}</span>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				total: 0,
				tickerStartTime: (new Date()).getTime(),
				startNum: 0,
				step: 0.1,
				interval: null
			};
		},
		beforeDestroy() {
			window.clearInterval(this.interval)
		},
		methods: {
			randomMoney() {
				let _this = this;
				let x = _this.startNum * 1 + ((((new Date()).getTime() - _this.tickerStartTime) / 5009) * _this.step);
				_this.total = x.toString().$toFixed().strSplit();
			},
			Start() {
				let _this = this;
				_this.interval = setInterval(() => {
					_this.randomMoney();
				}, 59)
			}
		},
		created() {
			if(!window.xmlstring || !window.xmlstring.jpxml) {
				let _this = this;
				window.xmlstring = {}
				let _script = document.createElement('script');
				_script.src = '//tickers.playtech.com/jpdata/datalink/playtech.xml.js';
				_script.onload = function() {
					let xmldoc = {};
					if(typeof(DOMParser) != "undefined") {
						var parser = new DOMParser();
						xmldoc = parser.parseFromString(xmlstring.jpxml, "text/xml");
					} else {
						try {
							xmldoc = new ActiveXObject("Microsoft.XMLDOM");
							xmldoc.async = false;
							xmldoc.loadXML(xmlstring.jpxml);
						} catch(e) {}
					}
					var a = xmldoc.querySelector('amount[currency="cny"]');
					xmlstring.jpxml = '1';
					_this.startNum = xmlstring.startNum = Number(a.firstChild.nodeValue);
					_this.step = xmlstring.step = Number(a.getAttribute("step"));
					_this.Start();
				}
				document.body.appendChild(_script)
			} else {
				this.startNum = window.xmlstring.startNum || 552568331.52;
				this.step = window.xmlstring.step || 40.10874;
				this.Start();
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "~mobile/assets/scss/mixin.scss";
	.jackpot-num {
		position: relative;
		text-align: center;
		background-color: #424245;
		padding-bottom:r(20);
		background:url(./images/jackpot-bg.png) no-repeat top center/100% 100%;
		.jackpot-title {
			width:100%;
			height:r(60);
			line-height:r(60);
			.line {			
				display: inline-block;
				width: r(100);	
				position: relative;		
			}
			.line::before {
				width: r(100);
				height: r(4);
				content: " ";
				position: absolute;
				left: 0;
				top: r(-15);
				background-color: #bda059;
			}
			.cl-fff {
				color: #FFFFFF;
				font-size: r(36);
				padding: 0 r(20);
			}
		}
		.jackpot-nums {
			width: 100%;
			text-align: center;
			.num {
				display: inline-block;
				@include f(78px);
				font-weight: bold;
				color: #bda059;
				vertical-align: middle;
			}
		}
	}
</style>