<template>
  <div class="page_content_wrap thirdPay_type" style="padding-top: 0;">
    <div v-show="!isShowBank">
      <div class="sec_box">
        <div class="main_nav_with_arrow ul_auto_wrap align_center">
          <ul class="title">
            <li
              v-for="(item,i) in payTypeCh"
              :class="[item.type==paySelect?'active':'']"
              v-show="item.show"
              @click="setPaytype(item)">
              <span :class="['iconfont',item.class]"></span>
              <span class="img_text">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <div class="panel-wp">
          <!--秒存步骤1{-->
          <div v-show="isMcPlay">
            <input-inline label="支付类型" select="1">
              <select v-model="submitData.payBy">
                <option value="">请选择支付类型</option>
                <option v-for="(item,i) in mcData.payChannelList"
                        :value="item">{{mcTypech[item].label}}
                </option>
              </select>
            </input-inline>
            <div>
              <input-inline label="存款姓名">
                <input v-model="submitData.accountName" placeholder="请输入存款人姓名" type="text">
              </input-inline>
            </div>
          </div> 
          <!--}秒存步骤1-->
          <div v-show="!isMcPlay">
            <input-inline label="支付类型" select="1">
              <input type="hidden" value="alipay">
              <select v-model="submitData.id">
                <option value="">请选择支付类型</option>
                <option v-for="(item, index) in payItemData"
                        :value="item.id">{{item.remark}}
                </option>
              </select>
            </input-inline>
            <input-inline label="支付银行" select="1" v-show="this.bankCodeData.length>0">
              <select v-model="submitData.bankCode">
                <option value="">请选择支付银行</option>
                <option v-for='item in bankCodeData' :value="item.value">
                  {{item.name}}
                </option>
              </select>
            </input-inline>
          </div> 
          <input-inline label="充值金额">
            <input type="text" :placeholder="placeholder" v-model="submitData.order_amount" name="order_amount">
            <span slot="right">元</span>
          </input-inline>
        </div>
      </div>
      <div class="btn_wrap j-btn">
        <!--部分电子银行需要该选项-->
        <input type="hidden" v-model="submitData.bankCode" name="bankCode">
        <v-button @click="depositPost()">提交</v-button>
      </div>
      <form-tip style="margin: 0.4rem;">
        <p v-show="paySelect=='mcpay'">
          1.请务必按照填写的姓名和存款金额进行存款，否则您的款项将无法及时到账！！<br>
          2.如果您的款项5分钟未能到账，请联系24小时在线客服！<br>
          3.支付宝转账招商23：00-凌晨01：00有延迟到帐现象，期间建议您使用其他支付方式！
        </p>
        <p v-show="paySelect=='unionpay'">
          1.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。</p>
        <p v-show="paySelect=='jdpay'">
          1.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。</p>
        <p v-show="paySelect=='wechat'">
          1.微信支付第三方需收取一定的手续费。<br>
          2.若使用手机微信支付,必须使用第二部手机进行扫码支付,不能截屏保存支付.<br>
          3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。</p>
        <p v-show="paySelect=='ebank'">
          1.通过第三方支付进行存款的会员，如果出现掉单的情况，请及时联系在线客服，并提供订单号，存款金额，存款时间，以便我们尽快为您补单。<br>
          2.第三方支付单笔存款最低额度为1元，最高10000元。<br>3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询
        </p>
        <p v-show="paySelect=='qqpay'">
          1.QQ支付第三方需收取一定的手续费。<br>
          2.若不显示支付通道,代表该支付方式正在维护,请选用其他支付方式.<br>
          3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。
        </p>
        <p v-show="paySelect=='alipay'">1.支付宝支付第三方需收取一定的手续费。<br>
          2.若不显示支付通道,代表该支付方式正在维护,请选用其他支付方式.<br>
          3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。</p>

      </form-tip>

    </div>
    <div class="show-order panel-wp" v-show="isShowBank">
      <div v-if="mcStep==2">
        <div class="mc_wx_tips inputbox">
          <p class="m_w_t_title">请您在
            <span class="m_w_t_money">
              <span class="m_w_t_time">{{help_time.min}}</span>：
              <span class="m_w_t_time">{{help_time.sec}}</span>
            </span>时间内按下【确认】
          </p>
          <p>
            确认金额：<span class="m_w_t_money">{{submitData.order_amount}}元</span>
          </p>
          <p class="m_w_t_tips">温馨提示:按下【确认】，方可产生订单
            <br/>否则无法自动到账</p>
        </div>
        <div class="agrees">
          <p class="mc_wx_tips_agree">
            <label>
              <input type="checkbox" id="mc_wx_1" v-model="submitData.agree_first"> 我已明白需要转账
              <span class="red">{{submitData.order_amount}}</span>元。
            </label>
          </p>
          <p class="mc_wx_tips_agree">
            <label>
              <input type="checkbox" id="mc_wx_2" v-model="submitData.agree_second"> 本人已同意，如未转账
              <span class="red">{{submitData.order_amount}}</span>元，导致系统无法匹配存款，乐娱国际概不负责。
            </label>
          </p>
        </div>
        <v-button @click="wxSecCheck">确认</v-button>
      </div>
      <div v-if="mcStep==3">
        <div>
          <h3 class="order-title mb20">我们的收款账户</h3>
          <input-inline label="银行类别：">
            <input type="text" :value="orderData.bank" readonly="readonly">
          </input-inline>
          <input-inline label="开户人：">
            <input type="text" :value="orderData.accountname" readonly="readonly">
            <strong slot="right" class="btn-copy"
                    v-clipboard:copy="orderData.accountname" v-clipboard:success="onCopy"
                    v-clipboard:error="onError">复制</strong>
          </input-inline>
          <input-inline label="银行卡号：">
            <input type="text" :value="orderData.bankno" readonly="readonly">
            <strong slot="right" v-clipboard:copy="orderData.bankno" v-clipboard:success="onCopy"
                    v-clipboard:error="onError">复制</strong>
          </input-inline>
        </div>
        <div class="form_field_warp">
          <h3 class="order-title mb20">您的存款信息</h3>
          <input-inline label="存款姓名：">
            <div class="input">
              {{orderData.uaccountname}}
            </div>
          </input-inline>
          <input-inline label="存款金额：">
            <div class="input">{{orderData.amount}}</div>
          </input-inline>
          <input-inline label="存款方式：" v-if="orderData.payBy">
            <div class="input">{{mcTypech[orderData.payBy]}}</div>
          </input-inline>
        </div>
        <v-button @click="mcStep=4" v-if="orderData.payBy=='wechat'">微信转账教程</v-button>
        <v-button @click="isShowBank=false;mcStep=1">我已成功付款</v-button>
      </div>
      <div v-if="mcStep==4&&orderData.payBy=='wechat'">
        <div class="mc_wx_helps inputbox">
          <div class="mc-banner">
            <swiper style="height:100%;" :options="swiperOption">
              <swiper-slide>
                <img src="./img/helps/01.jpg">
                <p class="mc_wx_h_tips">
                  点击微信
                  <span class="mc_wx_red">【钱包】</span>-
                  <span class="mc_wx_red">【收付款】</span>页面，使用
                  <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
                </p>
              </swiper-slide>
              <swiper-slide>
                <img src="./img/helps/02.jpg">
                <p class="mc_wx_h_tips">
                  点击微信
                  <span class="mc_wx_red">【钱包】</span>-
                  <span class="mc_wx_red">【收付款】</span>页面，使用
                  <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
                </p>
              </swiper-slide>
              <swiper-slide>
                <img src="./img/helps/03.jpg">
                <p class="mc_wx_h_tips">
                  点击微信
                  <span class="mc_wx_red">【钱包】</span>-
                  <span class="mc_wx_red">【收付款】</span>页面，使用
                  <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
                </p>
              </swiper-slide>
              <swiper-slide>
                <img src="./img/helps/04.jpg">
                <p class="mc_wx_h_tips">
                  <span class="mc_wx_red">【请输入我方的收款人姓名和对应的银行卡号，核对无误点击确定】</span>
                </p>
              </swiper-slide>
              <swiper-slide> 
                <img src="./img/helps/05.jpg">
                <p class="mc_wx_h_tips">
                  输入
                  <span class="mc_wx_red">【系统指定的金额】</span>进行转账操作，转账成功后，方可自动到账！
                </p>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <v-button @click="mcStep=3">继续存款</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getPaymentConfigInfo, mobilePayByEbank, onlinePayDispathcer, createDepositeOrder,    getWxZzQuota
} from "@/api/payment"
  import {generateQRCode} from "@/api/show"
  import formTip from "mobile/components/form-tip"
  import {copy} from "@/vue-extend/mixins/index"
  import check from '@/util/RegExp'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    mixins: [copy],
    data() {
      return {
        isMcPlay: false,
        isShowBank: false,  // 显示秒存步骤二的支付详情
        isMcTips: false,
        loadMoney: [{name: "10元", value: 10}, {name: "20元", value: 20}, {name: "30元", value: 30}, {
          name: "50元",
          value: 50
        }, {name: "100元", value: 100}],
        paySelect: 'wechat',
        payItem: [],//支付详细数据组
        payMin: '',//存款最低额度
        payMax: '',//存款最高额度
        bankCodeData: [],
        submitData: {
          id: "",
          order_amount: "",
          bankCode: "",
          payBy: "wechat", //存款方式
          accountName: "", //秒存的数据
          agree_first: false, //微信秒存协议1
          agree_second: false //微信秒存协议2
        },
        orderData: {  // 秒存 orderData
          bankno: "",
          accountname: "",
          uaccountname: '',
          amount: '',
          payBy: "", //存款方式
        },
        help_img: 1, //秒存教程
        help_time: {
          Interval: null,
          init: '00', //分钟整数，接口获取
          min: '00', //显示的分钟
          sec: '00', //显示的秒
        },
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          // direction : 'vertical',
          effect: "coverflow",
          grabCursor: true,
          setWrapperSize: true,
          // autoHeight: true,
          paginationType: "bullets",
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
        },
        mcTypech: {
          "zfb": {
            "label": "支付宝转账",
            "class": "icon-alipay",
          },
          "bank_phone": {
            "label": "手机银行转账",
            "class": "icon-renminbi",
          },
          "bank_web": {
            "label": "网上银行转账",
            "class": "icon-unionpay",
          },
          "wechat": {
            "label": "微信转账",
            "class": "icon-wechat-pay",
          },
        },
        mcData: {
          payChannelList: ""
        },
        mcStep: 1,
        payTypeCh: [
          {
            type: "mcpay",
            title: '微信/网银/支付宝转账',
            class: "icon-renminbi",
            show:false,
            order:-1
          },
          {
            type: 'wechat',
            title: '微信',
            class: "icon-wechatpay",
            show:false,
            order:-1
          },
          {
            type: "ebank",
            title: '网银支付',
            class: "icon-unionpay",
            show:false,
            order:-1
          },
          {
            type: 'alipay',
            title: '支付宝',
            class: "icon-alipay",
            show:false,
            order:-1
          },
          {
            type: "qqpay",
            title: 'QQ',
            class: "icon-qqpay",
            show:false,
            order:-1
          },
          {
            type: "jdpay",
            title: '京东',
            class: "icon-jdpay",
            show:false,
            order:-1
          },
          {
            type: "unionpay",
            title: '银联扫码',
            class: "icon-unionpay2",
            show:false,
            order:-1
          }
        ]
      }
    },
    watch: {
      "submitData.bankCode"(val) {
        if (val == "") return;
        let cur = this.payItem.find(item => {
          return item.id == val;
        })
      },
      "submitData.id"(val) {
        this.bankCodeData = [];
        if (val == '') return;
        let curpay = this.payItem.find(item => {
          return item.id == val;
        })
        if (curpay != undefined) {
          this.payMin = curpay.lowerlimit;
          this.payMax = curpay.upperlimit;
        }

        if (this.paySelect == 'ebank') {
          mobilePayByEbank({paymentId: val}).then((res) => {
            if (res.success) {
              if (Array.isArray(res.data) && res.data[0] != null) {
                this.bankCodeData = res.data;
              }
            }
          });
        }
      },
      mcStep(val){
        if(val!=2){
          window.clearInterval(this.help_time.Interval);
        }
        if(val==1){
          this.submitData.order_amount='';
        }
      }
    },
    methods: {
      setPaytype(item) {      // 支付方式
        this.paySelect = item.type;
        this.submitData.id = '';
        this.payMin = '';
        this.payMax = '';
        if (item.type == 'mcpay') {
          this.submitData.accountName = '';
          this.isMcPlay = true;
          this.submitData.id = ""; //当为秒存的时候 id 设置为空
        }
        else {
          this.isMcPlay = false;
        }
      },
      depositCheck() {
        if (!this.submitData.order_amount) {
          window.toast('请输入金额');
          return false;
        }

        // 秒存
        if (this.isMcPlay) {
          if (!this.submitData.payBy) {
            window.toast('请选择支付类型');
          } else if (this.submitData.accountName == '') {
            window.toast('存款账户姓名不能为空');
          } else if (!check.intNum.test(this.submitData.order_amount)) {
            window.toast("请输入整数金额！");
          } else {
            return true;
          }

        } else {
          // 非秒存
          if (!this.submitData.id) {
            window.toast('请选择支付类型');
          } else if (this.submitData.order_amount < this.payMin) {
            window.toast('最低存款' + this.payMin + '元');
          }
          else if (this.submitData.order_amount > this.payMax) {
            window.toast('最高存款' + this.payMax + '元');
          } else {
            return true;
          }
        }

      },
      depositPost(e) {
        if (this.depositCheck()) {
          if (this.isMcPlay) {
            if (this.submitData.payBy == 'wechat') {
              this.getWxZzQuota();
            } else {
              this.mcSubmit(false);
            }
            // this.mcSubmit(false);
          }
          else {
            onlinePayDispathcer(this.submitData);
          }
        }
        return false;
      },
      getWxZzQuota() {

        getWxZzQuota({
          amount: this.submitData.order_amount
        }).then((result) => {
          $load.close();
          if (result.success) {
            this.isShowBank = true;
            this.submitData.order_amount = result.data.amount;
            this.mcStep = 2;
            this.timer(result.data.min);
          } else {
            window.toast(result.message)
          }
        }).catch((err) => {

        })

      },
      timer(min) {
        // 倒计时
        this.help_time.init = min;
        this.help_time.min = min;
        this.help_time.sec = 0;
        window.clearInterval(this.help_time.Interval);
        this.help_time.Interval = window.setInterval(() => {
          if (this.help_time.min == 0 && this.help_time.sec == 0) {
            window.clearInterval(this.help_time.Interval);
            this.mcStep = 1;
            this.isShowBank=false;
          } else {
            if (this.help_time.sec > 0) {
              this.help_time.sec--;
            } else if (this.help_time.sec <= 0) {
              this.help_time.min--;
              this.help_time.sec = 59;
            }
            this.help_time.sec < 10 ? this.help_time.sec = '0' + parseInt(this.help_time.sec) : this.help_time.sec;
            this.help_time.min < 10 ? this.help_time.min = '0' + parseInt(this.help_time.min) : this.help_time.min;
          }
        }, 1000)
      },
      wxSecCheck() {
        if (this.submitData.agree_first && this.submitData.agree_second) {
          this.mcSubmit(false);
        } else {
          window.toast("请同意协议")
        }
      },
      // 秒存表单提交
      mcSubmit(discard) {
        let data = {
          "payBy": this.submitData.payBy,
          "accountName": this.submitData.accountName,
          "amount": this.submitData.order_amount,
          "discard": discard,
        };
        createDepositeOrder(data).then((res) => {
          if (res.success) {
            let data = res.data;
            let type = data.type;

            //this.cardType = data.bank;
            /*this.playName = data.accountname;
            this.playBankCode = data.bankno;

            this.saveName = data.uaccountname;
            this.saveAmount = data.amount;*/

            this.orderData = res.data;
            if ('UNPAID_ORDER' == type) {

              //this.alreadyExist = false;
              //this.isMcTips = true;
              $confirm("<p>1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单 <br> 2. 如果未支付，请您先支付该笔订单或者选择废弃该订单</p>"
                , "提示：您存在未处理的订单", {
                  cancelText: "查看订单",
                  confirmText: "废弃并生成新订单"
                }).then(() => {
                // 确认 废弃并生成新订单
                this.mcSubmit(true);
              }, () => {
                // 取消  查看订单
                this.isShowBank = true;
                this.mcStep = 3;
              });
            }
            else if ('NEW_ORDER' == type) {
              //this.payTrue = true;
              this.isShowBank = true;
              this.mcStep = 3;
            }
            else if ('BANKCARD_NOTAVAILABLE' == type) {
              this.mcStep = 1;
              window.toast('通道维护中，请选择其他存款方式');
            }
          }
          else {
            window.toast(res.message);
          }
        }).catch(err => {
          //this.myData.discard = false;
        });
      }
    },
    computed: {
      payItemData() {
        return this.payItem.filter(item => {
          return item.type == this.paySelect;
        });
      },
      placeholder() {
        if (this.payMin && this.payMax) {
          return "最少" + this.payMin + "元，最多" + this.payMax + "元";
        } else {
          return "请输入存款金额";
        }
      }
    },
    created() {
      this.mcStep=1;
      getPaymentConfigInfo({terminalType: 1}).then((res) => {
        if (res.success) {
          this.payItem = res.data;
          for (let i = 0; i < this.payTypeCh.length; i++) {
            let item = this.payTypeCh[i];
            let index = this.payItem.findIndex(z => {
              return item.type == z.type;
            });

            item.show=index>-1;
            item.order=index;
            //特殊需求，处理秒存；
            if (index > -1 && this.payTypeCh[i].type == "mcpay") {
              this.mcData = res.data[index];
            }
          }

          this.payTypeCh=this.payTypeCh.sort((a,b)=>{
            return a.order-b.order;
          });
          let activtType=this.payTypeCh.findIndex(v=>{
            return v.show===true;
          });
          activtType!=-1 && this.setPaytype(this.payTypeCh[activtType]);
        }
      });
    },
    components: {formTip}
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .page_content_wrap {
    .panel-wp {
      padding: r(30);
      .order-title{
        margin-bottom: r(30);
      }
    }
    padding-top: 15px;
    .main_nav_with_arrow {
      padding: 15px 0 0 15px;
      border-bottom: 1px solid #ddd;
      background: #eee;
      .title {
        display: flex;
        overflow:auto;
        li {
          flex: 1;
          position: relative;
          padding-bottom: 17px;
          width: 88px;
          text-align: center;
          display: inline-block;
          margin-right: 10px;
          display: flex;
          align-items: center;
          flex-direction: column;
          min-width:25%;
          .iconfont {
            @include f(60px);
            margin-bottom: r(10);
          }
          &.active {
            color: $iconcl;
          }
        }
      }
    }
    .form_field {
      position: relative;
      height: r(42*2);
      line-height: r(42*2);
      border-bottom: 1px solid #ccc;
      padding: 0 12px;
      margin-bottom: 16px;
      background: #fff;
      .form_field_label {
        display: block;
        float: left;
        width: r(150);
        height: 100%;
        color: #666;
        padding-left: 8px;
      }
      .form_field_input {
        overflow: hidden;
        margin: 0 0 0 70px;
        height: 100%;
        white-space: nowrap;
        position: relative;
        input, select {
          padding: 0;
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: none;
          color: #999;
        }
      }
      .right_label {
        position: absolute;
        top: 0;
        right: 16px;
        color: #666;
      }
    }
    .btn_wrap {
      padding-left: r(15);
      padding-right: r(15);
      margin-bottom: r(12);
      .btn01, .btn02 {
        display: inline-block;
        text-align: center;
        width: 100%;
        height: r(50);
        line-height: r(50);
        color: #fff;
        font-weight: 600;
        background: #1196bb;
        border: none;
        @include f(24px);
        &[disabled] {
          background: #ccc;
        }
      }
    }
  }

  .mc_wx_tips {
    color: #e7091a;
    text-align: left;
    line-height: 1.5;
    padding: 0 r(40);
    @include f(30px);
    .m_w_t_money {
      @include f(40px);
      font-weight: bold;
    }

  }

  .agrees {
    line-height: 2.5;
    margin-top: r(30);
    padding: 0 r(40);
    input {
      background: #fff;
      width: r(40);
      height: r(40);
    }
  }

  .red {
    color: #e7091a;
    font-weight: bold;
  }

  .mc_wx_helps {
    img {
      display: block;
      width: 100%;
    }
  }
 
  .mc_wx_h_tips {
    color: #333;
    margin: 20px 0;
    line-height: 1.2;
    padding: 0 r(20);
    .mc_wx_red {
      color: red;
      font-weight: bold;
    }
  }

  .mc-banner {
    position: relative;
    min-height: r(71);
    img {
      width: 100%;
    }
    .marquee-info {
      height: r(71);
      line-height: r(71);
      width: 100%;
      padding-left: r(26);
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      .icon-voice {
        float: left;
        color: #EE9D06;
        @include f(44px);
        margin-right: r(12);
      }
    }

  }

  .swiper-container {
    overflow: hidden;
    position: static;
    height: 100%;
  }
  .swiper-container-3d {
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    -o-perspective: 1200px;
    perspective: 1200px;
}
.swiper-container-3d .swiper-cube-shadow, .swiper-container-3d .swiper-slide, .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-wrapper {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
}
  .swiper-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    }

    .swiper-slide {
      -ms-flex-negative: 0;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      position: relative;
    }
.swiper-pagination{
      position: absolute;
    text-align: center;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 10;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 10px;
    left: 0;
    width: 100%;
}
.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: .2;
    margin:0 5px;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    background: #007aff;
}
</style>
