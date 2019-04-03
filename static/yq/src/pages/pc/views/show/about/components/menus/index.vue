<template>
  <div class="sidebar">
    <ul>
      <li v-for="(menu,i) in menus" :key="i" @click="setRouter(menu)" :class="{move:isShowChild == menu.key}">{{menu.title}}</li>
    </ul>
  </div>
  <!-- <div class="tutorials_left">
    <ul class="tutorials_left_ul">
      <li v-for="(menu,i) in menus" :key="i">
        <a href="javascript:void(0);" @click="setRouter(menu)" :class="{active:isShowChild == menu.title}">
          <div class="tutorials_level">
            <img :src="getImg(menu.ico)" alt="">
            <span>{{menu.title}}</span>
          </div>
        </a>
      </li>
    </ul>
  </div> -->
</template>
<script>
  export default {
    data() {
      return {
        isShowChild: 'tab1',
        menus: [{
            title: '关于我们',
            ico: 'icon1',
            key: 'tab1'
          },
          {
            title: '用户协议',
            ico: 'icon2',
            key: 'tab2'
          },
          {
            title: '代理专区',
            ico: 'icon3',
            key: 'tab3'
          },
          {
            title: '隐私保护',
            ico: 'icon4',
            key: 'tab4'
          },
          {
            title: '理性博彩',
            ico: 'icon5',
            key: 'tab5'
          },
          {
            title: '免责声明',
            ico: 'icon6',
            key: 'tab6'
          },
          {
            title: '防域名劫持教程',
            ico: 'icon6',
            key: 'tab7'
          },
        ]
      };
    },
    methods:{
      setRouter(menu){
        this.isShowChild = menu.key
        this.$router.push({name:'aboutIndex',params:{'tab':menu.key}})
      },
      getImg(ico){
        return require(`./images/${ico}.png`)
      }
    },
    watch: {
      '$route'(val){
        // 监听路由，根据params切换显示选项
        if(this.$route.params&&this.$route.params.tab){
          this.isShowChild=this.$route.params.tab
        }else{
          this.isShowChild='tab1'
        }
      }
    },
    created() {
      if(this.$route.params&&this.$route.params.tab){
        this.isShowChild=this.$route.params.tab
      }else{
        this.isShowChild='tab1'
      }
    },
  }

</script>
<style lang="scss" scoped>
  .sidebar{
    width: 1200px;
    height: 60px;
    ul{
      width: 100%;
      height: 60px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li{
        flex: 1;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid #FFF;
        font-size: 18px;
        color: #fff;
        background: #4db7f4;
        cursor: pointer;
        &:hover,&.move{
          background: #59dbd0;
        }
        &:last-child{
          border-right: none;
        }
      }
    }
  }
</style>
