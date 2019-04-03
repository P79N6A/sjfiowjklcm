<template>
    <ul class="financial-problems">
        <li class="liList" :class="{active: cur == i}" v-for="(item,i) in data" :key="i" @click="changecur(i)">
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
            title: "如何注册？",
            content:"进入博林官网/App，在登录界面点击“免费注册”按钮，在跳转页面中设置游戏账号、游戏密码、手机号码；填写验证码，再勾选“我已阅读并同意接受所有《规则》与《条款》”，最后点击“立即注册”按钮即可。"
        },
        {
            title: "我可以注册多个账号吗？",
            content:"您好，不可以，一位用户只能拥有一个账户，包括同一姓名，同一邮件地址，同一借记卡/信用卡，同一银行账户，同一电话，都视为一位用户。"
        },
        {
            title:"账号忘记？",
            content:"您好，请联系在线客服提供您注册姓名、手机、邮箱。客服会第一时间核实以及为您找回您的游戏账号。"
        },
        {
            title:"账号被锁？",
            content:"您好，请联系在线客服提供您的会员账号，注册姓名，注册邮箱以及您的注册手机，在线客服会为您查询锁定原因并解锁。"
        },
        {
            title:"如何完善个人信息？",
            content:'您好，请您进入个人中心（我的）＞账户设置，进行完善您的个人信息。'
        },
        {
            title:"怎么更改绑定手机和绑定邮箱？",
            content:"您好，注册信息是无法进行修改更变，您更换手机号或邮箱都是不会影响您的游戏状况，请您放心。"
        },
        {
            title:"怎么更改注册姓名？",
            content:" 您好，更改姓名只可更改同音不同字的姓名，申请方法：请您发送邮件到邮箱 cs@ow8.com 进行申请（邮箱格式为 主题：申请更改姓名 内容:账号,注册邮箱,注册电话,身份证正、反面高清照片，以及正脸手持身份证照片)。然后等待上级部门的审核，大概1-5个工作日，谢谢。"
        },
        {
            title:"如何绑定提款的银行卡？",
            content:"您好，请您在“个人中心--账户设置”有“提款卡绑定”按钮，进行绑定,您只需绑定您平日所使用的银行账号，以后提款时无须再填写，选择银行即出现对应账号。每位玩家可以绑定三个不同的银行，每个银行可绑定一个账号。如需更换银行账号，可联系客服进行解绑后再次自行绑定其他账号。"
        },
        {
            title:"怎么解绑已经绑定的银行卡？",
            content:"您好，解绑银行卡请您点击个人中心（我）—帐户设置—提款卡解绑，输入您的注册姓名、邮箱、电话即可解绑，谢谢。"
        },
        {
            title:"怎么看我的存款记录？",
            content:"您好，请您进入个人中心（我的）＞账户清单＞　在线存款记录、手工存款记录即可看到您的存款记录。"
        },
        {
            title:"怎么看我的提款记录？",
            content:" 您好，请您进入个人中心（我的）＞账户清单＞　提款记录即可看到您的提款记录。"
        },
        {
            title:"我转账到哪里了？",
            content:"您好，请您进入个人中心（我的）＞账户清单＞　户内转账记录即可看到您的游戏转账记录。"
        },
        {
            title:"我得到了什么优惠了？",
            content:"您好，请您进入个人中心（我的）＞账户清单＞　优惠活动记录即可看到您得到的反水记录。"
        },
        {
            title:"站内信怎么删除？",
            content:" 您好，请您进入个人中心（我的）＞站内信，点击您要删除的站内信进行查看删除。"
        },
        {
            title:"忘记登录密码怎么办？",
            content:" 您好，如果您遗失了您的登录密码，可以登录我们官网点击登入->忘记密码，使用注册邮箱或者手机进行自助找回密码。"
        },
        {
            title:"如何修改密码？",
            content:'您好，您在首页登录后，在登录区域点击"个人中心(我的)"按钮，进入“账户设置”后再点击"修改密码"按钮，即可修改您的密码。'
        }
      ],
      cur: ""
    };
  },
  watch:{
      "$route"(val){
          this.changecur(this.$route.params.id)
      }
  },
  props: {},
  methods: {
      changecur(item){          
          if(this.cur ==item){
              this.cur = -1;
          }else {
            this.cur =item
          }
      }
  },
  created(){
    this.cur = this.$route.params.id
  },
  components: {}
};
</script>
<style lang="scss">
.financial-problems {
  background-color: #ffffff;
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
