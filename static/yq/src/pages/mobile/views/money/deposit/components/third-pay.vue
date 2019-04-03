<template>
  <div>
    <div class="page_content_wrap thirdPay_type" v-if="wx_mc_step_index==1">
      <div v-if="paySelect!='directpay'&&!show_ysf_order">
        <div class="sec_box j-sec_box">
          <p class="pay-title">支付通道:</p>
          <div>
            <div class="pay-type" v-for="(item, index) in payItemData" :key="index">
              <span @click="savetype(item)" :class="submitData.id==item.id?'active':''">{{item.remark}}</span>
            </div>
          </div>
          <div v-if="is_wx_mc!='wechat'">
            <!-- 云闪付 -->
            <p class="pay-title" v-if="paySelect=='ysfpay'">存款卡号:</p>
            <div class="pay-input" v-if="paySelect=='ysfpay'">
              <input type="text" placeholder="请输入您要付款的银行卡号后四位" v-model="ysfpayData.bankno" name="order_amount">
            </div>

            <p class="pay-title" v-show="submitItem.platformtype!='wtwx' && submitItem.platformtype!='wtzfb'">存款金额:</p>
            <div class="pay-input" v-show="submitItem.platformtype!='wtwx' && submitItem.platformtype!='wtzfb'">
              <input type="text" :placeholder="placeholder" v-model="submitData.order_amount" name="order_amount">
            </div>

            <p class="pay-title" v-if="this.bankCodeData.length>0">支付银行:</p>
            <div class="pay-input" v-if="this.bankCodeData.length>0">
              <select v-model="submitData.bankCode" select="1">
                <option value="">请选择支付银行</option>
                <option v-for='item in bankCodeData' :value="item.value" :key="item.value">
                  {{item.name}}
                </option>
              </select>
            </div>
            <div class="select-group cfx" v-if="submitItem.platformtype=='wtwx' || submitItem.platformtype=='wtzfb'">
              <div class="select-box" v-for="item in wtMoney" v-if="item<=payMax&&item>=payMin" :key="item">
                <span href="javascript:void(0);" @click="submitData.order_amount=item" :class="{active:submitData.order_amount==item}">{{item}}</span>
              </div>
            </div>
            <div class="select-group cfx" v-else>
              <div class="select-box" v-for="item in loadMoney" v-if="item<=payMax&&item>=payMin" :key="item">
                <span href="javascript:void(0);" @click="submitData.order_amount=item" :class="{active:submitData.order_amount==item}">{{item}}</span>
              </div>
              <div class="select-box">
                <span href="javascript:void(0);" @click="submitData.order_amount=''" :class="{active:loadMoney.indexOf(submitData.order_amount)<0}">其他</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 部分电子银行需要该选项 -->
        <div v-if="is_wx_mc!='wechat'&&paySelect!='ysfpay'">
          <input type="hidden" v-model="submitData.bankCode" name="bankCode">
          <div class="btns">
            <span class="t_btn" @click="depositPost($event)">确认存款</span>
          </div>
          <div class="pay_tips">
            <p class="p_tips_title">温馨提示</p>
            <div class="p_tips_content" v-if="submitItem.platformtype=='wtwx' || submitItem.platformtype=='wtzfb'">
                1.最低存款额度为<span class="red">{{payMin?payMin:'1'}}元</span>，最高<span
                class="red">{{payMax?payMax:'5000'}}元</span>。<br/>
                2.此通道必须输入指定的金额方可成功扫码付款。否则无法查看收款码。指定金额有：<br/>
                <p style="color:#ea5048;">【10,20,50,100,300,500,600,800,1000,1500,3000,5000】</p>
                3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。<br/>
            </div>
            <div class="p_tips_content" v-else>
              1、若选择的存款通道无法存款, 请点击其他支付通道支付
              <br/> 2、若支付成功未及时到账,请联系我们24小时客服。
            </div>
          </div>
        </div>
        <div v-if="paySelect=='ysfpay'">
          <input type="hidden" v-model="submitData.bankCode" name="bankCode">
          <div class="btns">
            <span class="t_btn" @click="showYsfTech=true">云闪付存款流程</span>
            <span class="t_btn"  @click="createOrderForYsfpay(false)">获取收款二维码</span>
          </div>
          <div class="pay_tips">
            <p class="p_tips_title">温馨提示</p>
            <p class="p_tips_content">
              1、请先下载云闪付APP（中国银联），需使用云闪付APP扫码进行支付<br/>
              2、填写的存款银行卡号（后4位），需与实际付款的银行卡一致，（不可填写A卡号，实际使用B银行卡支付）。<br/>
              3、填写的存款金额，需与实际支付的金额一致，系统方可自动匹配到账。
            </p>
          </div>
        </div>

      </div>
      <div v-if="paySelect=='directpay'">
        <!-- 微信/支付宝扫码支付 -->
        <div class="cfx dir_show">
          <div class="dir_content" v-for="pay_config in directpay" :key="pay_config.id">
            <p class="dir_c_title">{{pay_config.remark}}</p>
            <img class="dir_c_img" v-lazy="pay_config.qrcodeImageUrl">
          </div>
        </div>
        <div class="pay_tips">
          <p class="p_tips_title">温馨提示</p>
          <p class="p_tips_content">
            1、支付宝扫码：仅支持使用“支付宝扫一扫”操作
            <br/> 2、微信支付：仅支持使用“微信扫一扫”操作
            <br/> 3、存款时，填写金额后，请务必在下方【添加备注】一栏，输入您的游戏账号，即可快速到账噢！
          </p>
        </div>
        <div class="pay_tips">
          <p class="p_tips_title">存款操作步骤</p>
          <p class="p_tips_content">
            1. 请先将二维码图片截取放入手机相册。
            <br/> 2. 打开支付宝扫码/微信扫码，点击“扫一扫”按钮，选择"从相册选择二维码/条码"。
            <br/> 3. 扫码成功即可支付
            <br/>
          </p>
        </div>
      </div>
      <div v-if="show_ysf_order" class="ysf-order">
              <table>
                <tbody>
                  <tr>
                    <td>您的支付卡尾号：</td>
                    <td>{{orderData.ubankno}}</td>
                  </tr>
                  <tr>
                    <td>存款金额为：</td>
                    <td>{{orderData.amount}}</td>
                  </tr>
                </tbody>
              </table>
              <p>* 请使用以上存款信息，转账至以下收款账户。</p>
              <div>
                <img :src="orderData.qrcodeUrl" class="ysf_qr">
                <p class="red-text">请务必保存存款成功截图，未到账可提供在线客服上分</p>
                <div class="btns">
                  <span class="t_btn" @click="show_ysf_order=false">我已经成功转账</span>
                  <span class="t_btn" @click="show_ysf_order=false">重新填写</span>
                </div>
              </div>
            <div class="pay_tips">
              <p class="p_tips_title">温馨提示</p>
              <p class="p_tips_content">
                  1.云闪付请下载云闪付APP绑定您常用银行卡进行存款支付。<br/>
                  2.云闪付存款需要填写正确支付<span class="red-text">银行卡号末四位</span>系统才会正确匹配到帐，无需附言。<br/>
                  3.支付金额需要与填写存款金额一样系统才会匹配上分。<br/>
              </p>
            </div>
      </div>
    </div>
    <sec-save v-if="is_wx_mc=='wechat'" :from_wx="true" @wx_mc_step="mc_step"></sec-save>
    <ysf-tech v-model="showYsfTech">云闪付教程</ysf-tech>
    <!-- <v-button  @click="depositPost($event)">提交</v-button> -->
  </div>
</template>
<script>
  import {
    getPaymentConfigInfo,
    mobilePayByEbank,
    onlinePayDispathcer,
    createOrderForYsfpay
  } from "@/api/payment";
  import {
    generateQRCode
  } from "@/api/show";
  import secSave from "./sec-save";
  import ysfTech from "./ysf-tech";
  export default {
    data() {
      return {
        pay_type_ebank: true,
        paySelect: 'wechat',
        is_wx_mc: "",
        wx_mc_step_index:1,
        payItem: [], //支付详细数据组
        payMin: '', //存款最低额度
        payMax: '', //存款最高额度
        loadMoney: [50, 100, 200, 500, 1000, 2000, 3000],
        wtMoney:[10,20,50,100,300,500,600,800,1000,1500,3000,5000],
        bankCodeData: [],
        submitItem:{platformtype:''},
        submitData: {
          id: "",
          order_amount: "",
          bankCode: ""
        },
        mcData:{
          payChannelList:""
        },
        show_ysf_order:false,
        showYsfTech:false,
        orderData:{},
        ysfpayData:{
          bankno:'',
          amount:'',
          discard:false
        },//云闪付提交数据
        payTypeCh: [{
            name: "秒存转账",
            type: "mcpay",
            show: false,
            tips: "返赠2%",
            order: -1
          },
          {
            type: 'wechat',
            title: '微信',
            class: "icon-wechatpay",
            show: false,
            order: -1
          },
          {
            type: 'alipay',
            title: '支付宝',
            class: "icon-alipay",
            show: false,
            order: -1
          },
          {
            type: "qqpay",
            title: 'QQ',
            class: "icon-qqpay",
            show: false,
            order: -1
          },
          {
            type: "ebank",
            title: '网银',
            class: "icon-unionpay",
            show: false,
            order: -1
          },
          {
            type: "jdpay",
            title: '京东支付',
            class: "icon-jdpay",
            show: false,
            order: -1
          },
          {
            type: "ysfpay",
            title: '云闪付',
            class: "icon-jdpay",
            show: false,
            order: -1
          },
          {
            title: "久安钱包",
            type: "janPay",
            class: "icon-directpay",
            show: false,
            order:-1
          },
          {
            name: "支付宝/微信快速支付",
            type: "directpay",
            show: false,
            tips: "快速到账",
            order: -12
          },
           {
            name: '快捷支付',
            type: "speedPay",
            show:false
          },
          {
            name: "线下银行转账", 
            type: "offbank",
            show: false,
          }
        ]
      }
    },
    watch: {
      "submitData.bankCode" (val) {
        if (val == "") return;
        let cur = this.payItem.find(item => {
          return item.id == val;
        })
      },
      "submitData.id" (val) {
        if (val == '') return;
        let curpay = this.payItem.find(item => {
          return item.id == val;
        })
        if (curpay != undefined) {
          this.payMin = curpay.lowerlimit;
          this.payMax = curpay.upperlimit;
        }
        this.bankCodeData = [];
        if (this.paySelect == 'ebank') {
          mobilePayByEbank({
            paymentId: val
          }).then((res) => {
            if (res.success) {
              if (Array.isArray(res.data)) {
                this.bankCodeData = res.data;
              }
            }
          });
        }
      }
    },
    methods: {
      savetype(item) {
        this.submitData.id = this.is_wx_mc = item.id;
        this.submitItem = item;
        // 针对万通支付
        if(this.submitItem&&(this.submitItem.platformtype=='wtwx' || this.submitItem.platformtype=='wtzfb')){
          this.submitData.order_amount=''
        }
      },
      mc_step(step){
        if(step){
          this.wx_mc_step_index=step;
        }else{
          this.wx_mc_step_index=1;
        }
      },
      setPaytype(item) { // 支付方式
        this.paySelect = item.type;
        this.submitData.id = '';
        this.bankCodeData = [];
        this.payMin = '';
        this.payMax = '';
      },
      depositCheck() {
        if (!this.submitData.id) {
          toast('请选择支付类型');
        } else if (!this.submitData.order_amount) {
          toast('请输入金额');
        } else if (this.submitData.order_amount < this.payMin) {
          toast('最低存款' + this.payMin + '元');
        } else if (this.submitData.order_amount > this.payMax) {
          toast('最高存款' + this.payMax + '元');
        } else {
          return true;
        }
      },
      depositPost(e) {
        if (this.depositCheck()) {
          onlinePayDispathcer(this.submitData);
        } else {
          // e.stopPropagation();
          // e.preventDefault();
        }
      },
      createOrderForYsfpay(discard){
        console.log("lsakjdflkj")
        this.ysfpayData.discard=discard;
        this.ysfpayData.amount=this.submitData.order_amount;
        createOrderForYsfpay(this.ysfpayData).then(res => {
            this.ysfpayData.discard = false;
            if (res.success) {
              this.orderData = res.data;
              let type = res.data.type;

              if (type == "UNPAID_ORDER") {
                $confirm("您有未处理订单", "提示", {
                  message: "1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单<br/> 2. 如果未支付，请您先支付该笔订单或者选择废弃该订单 ",
                  confirmText: "生成新订单",
                  cancelText: "查看订单"
                }).then(() => {
                  // 废弃并生成新订单
                  this.createOrderForYsfpay(true);
                }, () => {
                  // 查看订单
                  this.show_ysf_order=true;
                })
              } else if (type == 'NEW_ORDER') {
                this.show_ysf_order=true;
              } else if ('BANKCARD_NOTAVAILABLE' == type) {
                toast("通道维护中，请选择其他存款方式");
              }

            } else {
              toast(res.message);
                // this.mcStep=1;
            }
          }).catch(err => {
            this.ysfpayData.discard = false;
          })
      }
    },
    mounted(){
      this.$nextTick(function () {
        console.log()
      })
    },
    computed: {
      payItemData() {
        return this.payItem.filter(item => {
          if(this.$route.fullPath === '/money/online/ysfpay'){
            if(item.type == this.paySelect){
              this.is_wx_mc  = item.id;
              this.submitData.id = item.id;
            }
          }
          return item.type == this.paySelect;
        });
      },
      placeholder() {
        if (this.payMin && this.payMax) {
          return "最少" + this.payMin + "元，最多" + this.payMax + "元";
        } else {
          return "请输入存款金额";
        }
      },
      directpay() {
        // 微信/支付宝扫码支付
        let pay_config = [];
        for (let i = 0, n = this.payItem.length; i < n; i++) {
          if (this.payItem[i].type == "directpay") {
            let _data = {};
            _data.remark = this.payItem[i].remark;
            // customParams
            _data.qrcodeImageUrl = this.payItem[i].customParams.qrcodeImageUrl;
            pay_config.push(_data)
          }
        }
        return pay_config;
      },
    },
    created() {
      // console.log(this.$route)
      getPaymentConfigInfo({
        terminalType: 1
      }).then((res) => {
        if (res.success) {
          this.payItem = res.data;
          for (let i = 0; i < this.payTypeCh.length; i++) {
            let item = this.payTypeCh[i];
            let index = this.payItem.findIndex(z => {
              return item.type == z.type;
            });
            item.show = index > -1;
            item.order = index;
            //尊亿特殊需求，处理秒存；
            if (index > -1 && this.payTypeCh[i].type == "mcpay") {
              this.mcData = res.data[index];
            }
            //尊亿特殊需求，处理微信秒存；
            if (this.mcData && index > -1 && this.payTypeCh[i].type == "wechat"&&this.mcData.payChannelList!=undefined&&this.mcData.payChannelList.indexOf('wechat')>-1) {
              this.payItem.push({
                "id": "wechat",
                "type": "wechat",
                "remark": "微信秒存转账",
                "lowerlimit": 1,
                "upperlimit": 0,
                "platformtype": "other_mc"
              });
            }
          }


          this.payTypeCh = this.payTypeCh.sort((a, b) => {
            return a.order - b.order;
          });

          let activtType = this.payTypeCh.findIndex(v => {
            return v.show === true;
          });
          this.paySelect = this.$route.params.type;
          document.title = this.$route.params.type + '支付'
        }
      });
    },
    components: {
      secSave,ysfTech
    }
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .pay-title {
    line-height: 2;
    @include f(35px);
  }

  .pay-type {
    width: 33.33%;
    display: inline-block;
    text-align: center;
    margin-bottom: r(60);
    span {
      border: solid 1px #555;
      display: inline-block;
      width: 90%;
      line-height: 2.3;
      border-radius: 6px;
      &.active {
        background: #4db7f4;
        color: #fff;
      }
    }
  }

  .pay-input {
    width: 90%;
    margin-bottom: r(40);
    input,
    select {
      width: 100%;
      display: block;
      background: none;
      border: solid 1px #ccc;
      padding: r(20);
      background-color: #fff;
    }
    /*select {*/
      /*background-image: url(~mobile/assets/images/triangle.png);*/
      /*background-repeat: no-repeat;*/
      /*background-position: right 5% center;*/
      /*background-size: auto 30%;*/
    /*}*/
  }

  .btns {
    margin-bottom: r(40);
    text-align: center;
    .t_btn {
      padding: r(20);
      @include f(36px);
      border-radius: 6px;
      display: inline-block;
      width: 45%;
      box-sizing: border-box;
      margin: 0 r(10);
      background: #4db7f4;
      color: #fff;
    }
  }

  .select-group {
    width: 90%;
    margin-bottom: r(30);
    .select-box {
      float: left;
      width: 20%;
      text-align: center;
      margin-bottom: r(20);
      span {
        width: 90%;
        @include f(28px);
        line-height: 2.2;
        border: solid 1px #555;
        display: inline-block;
        &.active {
          background: #4db7f4;
          color: #fff;
        }
      }
    }

  }

  .pay_tips {
    background: #f2f2f2;
    padding: r(30);
    margin-bottom: r(30);
    text-align:left;
    .p_tips_title {
      line-height: 2;
      @include f(35px);

    }
    .p_tips_content {
      line-height: 1.4;
      @include f(28px);
      word-wrap:break-word;
    }
  }

  .page_content_wrap {
    padding: r(30);
  }

  .dir_show {
    display: flex;
    flex-wrap: wrap;
    .dir_content {
      text-align: center;
      margin-bottom: r(20);
      width: 50%;
      .dir_c_title {
        @include f(40px);
        color: #CC6633;
        font-weight: bold;
        margin-bottom: r(10);
      }
      .dir_c_img {
        display: inline-block;
        width: 60%;
      }
    }
  }
  .ysf-order{
    color:#333;
    text-align:center;
    .user-tips{
      text-align:left;
    }
    table{
      table-layout:fixed;
      width:100%;
      margin:r(10) auto;
      td{
        padding:r(10);
        border:solid 1px #ccc;
      }
    }
    p{
      line-height:2;
    }
    .ysf_qr{
      display:inline-block;
      width:100%;
    }
  }
</style>
