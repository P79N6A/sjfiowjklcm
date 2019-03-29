<template>
  <div class="pt-jackpot">
    <span class="ng-scope ng-isolate-scope">{{total|stringSplit}}</span>
  </div>
</template>
<script>
import {jackpot} from '@/controls/shows/jackpot'
  // export default {
  //   mixins:[jackpot],
  //   data() {
  //     return {
  //     };
  //   },

  //   created() {
  //     this.getjackpot('cny').then(res=>{
  //       console.log(res)
  //     }).catch(err=>[
  //       console.log(err)
  //     ])
  //   }
  // }
  export default {
    data() {
      return {
        total: 0,
        tickerStartTime: (new Date()).getTime(),
        startNum: 0,
        step:0.1,
        interval:null
      };
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
    methods: {
      randomMoney() {
        let _this=this;
        let x = _this.startNum*1+( (((new Date()).getTime() - _this.tickerStartTime)/2689)*_this.step);
        _this.total=x.toString().$toFixed().strSplit();
      },
      Start(){
        let _this=this;
        _this.interval=setInterval(() => {
          _this.randomMoney();
        },199)
      }
    },
    created() {
      // if (!window.xmlstring||!window.xmlstring.jpxml){
      //   let _this = this;
      //   window.xmlstring = {}
      //   let _script = document.createElement('script');
      //   _script.src = '//tickers.playtech.com/jpdata/datalink/playtech.xml.js';
      //   _script.onload = function () {
      //     let xmldoc = {};
      //     if (typeof(DOMParser) != "undefined") {
      //       var parser = new DOMParser();
      //       xmldoc = parser.parseFromString(xmlstring.jpxml, "text/xml");
      //     } else {
      //       try {
      //         xmldoc = new ActiveXObject("Microsoft.XMLDOM");
      //         xmldoc.async = false;
      //         xmldoc.loadXML(xmlstring.jpxml);
      //       } catch (e) {
      //       }
      //     }
      //     var a = xmldoc.querySelector('amount[currency="cny"]');
      //     xmlstring.jpxml='1';
      //     _this.startNum =xmlstring.startNum= Number(a.firstChild.nodeValue);
      //     _this.step =xmlstring.step=Number(a.getAttribute("step"));
      //     _this.Start();
      //   }
      //   document.body.appendChild(_script)
      // }else{
      //   this.startNum =window.xmlstring.startNum||552568331.52;
      //   this.step =window.xmlstring.step||40.10874;
      //   this.Start();
      // }
      this.startNum = 740252258.64;
      this.step = 40.10874;
      this.Start();
    }
  }
</script>
