<template>
  <div v-if="isUser" class="mainDev content">
      <div class="next" v-show="gamebox.length>=8" @click="pregame()"><span class="ico-pre"></span></div>
      <div class="gameDev" v-for="(item,i) in gamebox" :key="item.name">
          <div class="name">{{item.name}} <i class="pointer iconyg yg-f14" :class="{active:i==actived}" @click="getGameMoney(item,i)"></i></div>
          <div class='money'><span>{{item.money}}</span></div>
      </div>
      <div class="next" v-show="gamebox.length>=8" @click="nextgame()"><i class="ico-next"></i></div>
  </div>
</template>
<script>
  import {    mapGetters,    mapActions  } from 'vuex'
  import {    Money  } from '@/assets/data'
  import {getGameMoney} from '@/api/user'

  export default {
    data() {
      return {
        Money,
        searchMoney:'',
        showMoney:'刷新余额',
        gamebox:[],
        gameMinIndex:0,
        gameMaxIndex:8,
        gamelen:"",
        actived:-1,
        mainMoney: ''
      };
    },
    props: {},
    methods: {
      ...mapActions(["LOGIN_OUT"]),
      getGameMoney(item,idx) {
        let index = ''
        this.actived = idx;
        for (let i = 0; i < this.gamebox.length; i++) {
          if (item.value == this.gamebox[i].value) {
            index = i
          }
        } 
        let obj = this.gamebox[index]
        obj.money = '正在查询'
        Vue.set(this.gamebox, index,obj) 
        getGameMoney({gameCode: item.value}).then(res => {
          this.actived = -1;
          if (res.success) {
            obj.money = res.data + '元'
            Vue.set(this.gamebox, index,obj) 
            if (item.value == 'MAIN') {
              this.$store.commit("SET_USERDATA", {accountMoney: res.data})
            }
          }
          else {
            toast(res.message)
            obj.money = '查询失败'
            Vue.set(this.gamebox, index,obj) 
          }
        })
      },
      pregame(){
        if (this.gameMinIndex == 0) {
          window.toast('已无更多')
          return false;
        } else {
          this.gameMinIndex = this.gameMinIndex - 1
          this.gameMaxIndex = this.gameMaxIndex - 1
          this.gamebox = this.Money.slice(this.gameMinIndex,this.gameMaxIndex)
        }
      },
      nextgame(){
        if (this.gameMaxIndex < 8 || this.gameMaxIndex >= this.gamelen) {
          window.toast('已无更多')
          return false;
        } else {
          this.gameMinIndex = this.gameMinIndex + 1
          this.gameMaxIndex = this.gameMaxIndex + 1
          this.gamebox = this.Money.slice(this.gameMinIndex,this.gameMaxIndex)
        }
      }
    },
    computed: {
      ...mapGetters(["userData","isUser","unread"]),
    },
    created() {
      this.newMoney = this.Money
      this.gamelen = this.newMoney.length
      for (let i = 0; i < this.newMoney.length; i++) {
        this.newMoney[i].money = '刷新余额'
        if ('MAIN' == this.newMoney[i].value) {
          this.$bus.$on('getMainMoney',eventData=>{
            this.newMoney[i].money = eventData
          })
        }
      }
      this.gamebox = this.newMoney.slice(0,8)
    },
    components: {},
    watch: {
    }
  };

</script>
<style lang="scss" scoped>
    .mainDev{
        background: #010a24;
        color: #ecf4f2;
        height: 80px;
        overflow: hidden;
        .gameDev{
            padding: 15px 0;
            border-right: 1px solid #1c2233;
            width: 11.8%;
            display: inline-block;
            text-align: center;
            height: 80px;  
            .name{
                font-size: 17px;
                .iconyg{
                  font-size: 22px;
                }
                @keyframes rotateImg {
                  0% {transform : rotate(0deg);}
                  100% {transform : rotate(360deg);}
                }
                @-webkit-keyframes rotateImg {
                    0%{-webkit-transform : rotate(0deg);}
                  100%{-webkit-transform : rotate(360deg);}
                }
                .active{
                  &.yg-f14:before{
                    -webkit-animation:rotateImg 1s linear infinite;
                    display: inline-block;
                  }
                }
            }
            .money{
                color: #ecf4f2;
                font-size: 16px;
                margin-top: 12px;
            }
        }
        .gameDev:nth-child(9){
            border-right: none;
        }
        .next{
            width: 2.5%;
            background: #142246;
            display: inline-block;
            height: 80px;
            vertical-align: top;
            cursor: pointer;
            
            .ico-pre{
              width: 0;
              height: 0;
              border: 10px solid;
              position: absolute;
              border-color: #142246 #fff #142246 #142246;
              /* top: 40px; */
              margin-top: 30px;
            }
            .ico-next{
              width: 0;
              height: 0;
              border: 10px solid;
              position: absolute;
              border-color: #142246 #142246 #142246 #fff;
              margin-left: 10px;
              /* top: 40px; */
              margin-top: 30px;
            }
        }
    }
</style>
