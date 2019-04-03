<template>
    <ul class="financial-problems">
        <li class="liList" :class="{active: cur == item.title}" v-for="(item,i) in data" :key="i" @click="changecur(item)">
            <h2 class="title01">{{item.title}}<i class="i-arrow-d"></i></h2>   
            <div class="h-con" v-html="item.content"></div>
        </li>
    </ul>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
            title: "澳盈官方咨询邮箱？",
            content:"您好，澳盈官方客服邮箱为cs@ow8.com 如有任何问题可发送邮件至我们的邮箱！我们会在收到后第一时间回复您！"
        },
        {
            title: "综合老虎机是什么？",
            content:"综合老虎机包括DT/MG/SW/QT/PNG/NT/HYG，如果您要玩以上游戏平台，请转账至【综合老虎机】账户，即可随意在这7大平台内进行游戏！"
        },
        {
            title:"存款提醒？",
            content:"您好，请您打开官网登录游戏账号在个人中心——自助存款进行操作，请认准官网唯一通道，任何个人收款信息或个人联系方式提供的存款账户，都不要轻信，如有问题，请您联系在线客服确认。"
        },
        {
            title:"打开网址进入其他网站？",
            content:"您好，您的这个情况是DNS被劫持了，请先不要担心，您可以联系我们在线客服，让客服为您解决被劫持的问题，切勿相信任何关于，网站更名、网站合并……等相关信息，切勿通过任何方式把自己的账号密码、个人信息发送给他人，澳盈官方是不会通过任何方式向您索取账号密码的，请悉知！"
        },
        {
            title:"转账存款没到账原因？",
            content:'一般有一下几点原因，导致无法自动到账，您可以参考注意一下：<br />1.姓名不一致：官网订单填写存款姓名，和实际支付账户的姓名不一样。<br />2.金额不一致：官网订单填写的存款金额，和实际转账金额不一样。<br />3.未生成订单：直接转账到历史交易的收款账户，没有先在官网下单获取实时最新的收款账户，请切记收款账户是会变更的，每次存款需先在官网获取最新收款账户，否则可能会存错到停用账户内，造成不必要的资金损失。<br />4.作废订单：转帐后，又在官网重新生成订单，导致上笔实际订单被作废。建议留意官网提示信息，转账成功后，等待自动到账即可。<br />5.存错账户：官网订单获取到A收款账户，实际转账到B收款账户，请务必注意转账至实时获取到的收款账户中。<br />6.方式不对：交叉使用方式存款，比如官网上在支付宝转账下单，获取了收款账户，实际使用网银转账支付。'
        },
        {
            title:"APP下载安装无法打开？",
            content:'您好，如果您出现"尚未信任企业级开发人员"提醒信息的话，请您进入设置>通用>设备管理>Golden Skydragon Marketing Corp>点击信任后，再重新打开即可，谢谢您'
        },
        {
            title:"我可以对押吗？",
            content:"您好，对押是完全禁止的。一旦发现对押，将会采取冻结资金和账号的措施。优惠的对象是娱乐玩家，如发现会员为职业赌徒或只为寻求红利的玩家，例如进行对投，博林将保留取消红利，扣除本金的权利。"
        },
        {
            title:"我的个人资料是否安全？",
            content:"博林（www.6n6w.com ）采用了256位SSL国际标准加密技术，其安全级别已经超越了国内大多数银行。更配合我们的专业技术人员精密设计的严格安全管理系统，所有的客户资料都在极其安全机密的情况下处理，任何情况下，我们都不会向任何第三方透露我们的客户资料，请您放心。"
        }
      ],
      cur: ""
    };
  },
  watch:{},
  props: {},
  methods: {
    changecur(item){          
        if(this.cur ==item.title){
            this.cur = "";
        }else {
        this.cur =item.title
        }
    }
  },
  created(){},
  components: {}
};
</script>
<style lang="scss">
.financial-problems {
  background-color: #ffffff;
  min-height: 98vh;
  .liList.active {
    .title01 {
      background: #ffeec3;
      border-bottom: 1px solid #dadada;
      cursor: pointer;
      .i-arrow-d {
        transform: rotate(180deg);
      }
    }
    .h-con {
      display: block;
      border-bottom: 1px solid #dadada;
    }
  }
  .title01 {
    background: #ffffff;
    border-bottom: 1px solid #dadada;
    font-size: 15px;
    color: #000000;
    padding-left: 20px;
    font-weight: normal;
    height: 44px;
    line-height: 44px;
  }
  .i-arrow-d {
    background: url(./images/icons.png) no-repeat;
    display: inline-block;
    background-size: 80px;
    width: 20px;
    background-position: -53px -126px;
    height: 10px;
    position: absolute;
    right: 15px;
    margin-top: 15px;
    transition: all 0.3s ease-in;
  }
  .h-con {
    font-size: 15px;
    color: #666666;
    padding: 10px 15px;
    display: none;
    line-height: 24px;
  }
}
</style>
