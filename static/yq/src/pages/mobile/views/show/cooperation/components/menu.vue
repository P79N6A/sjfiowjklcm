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
                "title":"奇幻城优势",
                'value':'advantage'
              },{
                'title':'佣金计划',
                'value':'proce'
              },{
                'title':'联系我们',
                'value':'contact'
              },{
                'title':'常见问题',
                'value':'question'
              },{
                'title':'代理注册',
                'value':'register'
              }
              ]
            };
        },
        methods:{
          setTab(tab){
            if(tab == 'register'){
              this.$router.push({name:'registerAgent'})
            }else {
              this.select=tab
              this.$bus.$emit('agentTagShow',tab)
            }
            
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
  background: #ffffff;
  width: 100%;
  padding: r(20) 1%;
  display: flex;
  justify-content: space-between;
    .menu-item{
      width: 19%;
      display: inline-block;
      text-align: center;
      line-height: r(50);
      @include f(24px);
      color:#090e1d;
      border-radius: r(25);
      border: 1px solid #8d8d8f;
      &.active{
        background-color:#4db7f4;
        border: 1px solid #4db7f4;
        color:#f4faff;
      }
    }
}
</style>
