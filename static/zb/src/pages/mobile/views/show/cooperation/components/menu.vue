<template>
  <div class="cooperation-menu">
    <span v-for="menu in menus" class="menu-item" :key="menu.value" @click="setTab(menu.value);" :class="{active:select==menu.value}">{{menu.title}}</span>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              select:'',
              menus:[{
                "title":"品牌介绍",
                'value':'advantage'
              },{
                'title':'代理制度',
                'value':'proce'
              },{
                'title':'常见问题',
                'value':'question'
              },{
                'title':'联系我们',
                'value':'contact'
              }
              // ,{
              //   'title':'代理注册',
              //   'value':'register'
              // }
              ]
            };
        },
        methods:{
          setTab(tab){
            this.select=tab
            this.$bus.$emit('agentTagShow',tab)
          }
        },
        created(){
          this.setTab(this.menus[0].value);
          this.$bus.$on("agentMenutag",eventData=>{
            this.select = eventData
          })
          if(this.$route.params.type){
            this.setTab(this.$route.params.type);
          }
        },
        components:{
        }
    };
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.cooperation-menu{
  width: 100%;
  padding: r(20) 1%;
  display: flex;
  justify-content: space-between;
    .menu-item{
      width: 24%;
      display: inline-block;
      text-align: center;
      line-height: r(50);
      @include f(24px);
      color:#090e1d;
      background:#f4faff;
      border-radius: r(25);
      &.active{
        background-color:#ff5544;
        background-image:linear-gradient(-51deg, #ff5544 0%, #ff3751 100%);
        color:#f4faff;
      }
    }
}
</style>
