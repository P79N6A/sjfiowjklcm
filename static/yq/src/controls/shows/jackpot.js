export const jackpot = {
  data() {
    return {
      total: 0, // 显示出来的奖池数据
      tickerStartTime: (new Date()).getTime(), //
      startNum: 0, // 奖池初始值
      step: 0.1, // 奖池跳动步伐
      interval: null, // 奖池计时器
      jackpotUrl: '//tickers.playtech.com/jpdata/datalink/playtech.xml.js' // 获取奖池的链接
    }
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    // 生成奖池数据
    randomMoney() {
      const _this = this
      const x = _this.startNum * 1 + 300000000 + ((((new Date()).getTime() - _this.tickerStartTime) / 2689) * _this.step)
      _this.total = x.toString().$toFixed().strSplit()
    },
    // 定时器，开始倒计时渲染奖池
    Start() {
      const _this = this
      _this.interval = setInterval(() => {
        _this.randomMoney()
      }, 500)
    },
    /**
     *
     * @param {string} currency 奖池的货币类型
     */
    getjackpot(currency) {
      // 不重复读取
      return new Promise((resolve, reject) => {
        // 判断是否已经加载过奖池数据
        if (!window.xmlstring || !window.xmlstring.jpxml) {
          const _this = this
          window.xmlstring = {}
        var xmlDoc = this.loadXML(this.jackpotUrl);//读取到xml文件中的数据
        //JS读取 XML 文件中的 area 节点的方式如下:
            var a = xmlDoc.querySelector(`amount[currency="${currency}"]`)
            window.xmlstring.jpxml = '1'
            _this.startNum = window.xmlstring.startNum = Number(a.firstChild.nodeValue)
            _this.step = window.xmlstring.step = Number(a.getAttribute('step'))
            _this.Start()
            return resolve({
              success: true,
              code: '10000',
              data: {
                startNum: _this.startNum,
                setp: _this.step
              }
            })
        } else {
          this.startNum = window.xmlstring.startNum || 552568331.52
          this.step = window.xmlstring.step || 40.10874
          this.Start()
          return resolve({
            success: true,
            code: '10000',
            data: {
              startNum: this.startNum,
              setp: this.step
            }
          })
        }
      })
    },
    // 加载xml文件
    loadXML(xmlFile) {
      let xmlDoc;
      let xmlhttp = new window.XMLHttpRequest();
          xmlhttp.open("GET",xmlFile,false);
          xmlhttp.send(null);
          if(xmlhttp.readyState == 4){
              xmlDoc = xmlhttp.responseXML;
          }
      return xmlDoc;
  },
    // 数字转化成class
    /**
     * @param {string} val //传入的符号
    */
    toClass (val) {
      if (val) {
        if (val == ',') {
          return 'comma'
        } else if (val == '.') {
          return 'dot'
        } else {
          return val
        }
      }
    }
  }
}
