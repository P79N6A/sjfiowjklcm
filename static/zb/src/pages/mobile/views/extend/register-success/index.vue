<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap join_succ_content_wrap">
      <div class="join_succ_content_main">
        <img class="top_icon" src="static/images/join/icon01.png" width="88" height="89">
        <div class="join_succ_tip_text">
          <h2 class="text_red">恭喜您，注册成功</h2>
          <p>您的账号为：<span class="text_black">{{account}}</span></p>
        </div>
        <div class="btn_wrap_2">
          <div class="btn_wrap_col">
            <router-link :to="{name:'usercenter'}" class="btn btn01">
              <span class="icon_with_text"><span class="icon icon_user02"></span><span>会员中心</span></span>
            </router-link>
          </div>
          <div class="btn_wrap_col">
            <a href="static/slotGame.jsp" class="btn btn01"><span class="icon_with_text"><span class="icon icon_game"></span><span>游戏大厅</span></span>
            </a>
          </div>
        </div>
        <div class="bottom_ad">
          <a href="static/personal.jsp" class="layout_item_image_text display_flex_h">
            <img class="item_image" src="static/images/join/tiyanjin.jpg" width="120" height="77">
            <div class="item_text flex_1">
              <p>完善资料即获得<br><span class="text_red">8-88元</span>体验金</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                account: ''
            }
        },
      created(){
          this.account=this.$route.query.account
      }
    }
</script>
