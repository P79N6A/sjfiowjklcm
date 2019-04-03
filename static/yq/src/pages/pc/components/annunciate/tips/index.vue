<template>
  <div class="noticeTips" v-show="getTipsShow.isShow">
    <div class="noticeTipsContent">
      <img src="./images/close.png" @click="getTipsShow.isShow = false">
      <h1>
        系 统 公 告 NOTICES
        <span>
          system notification
        </span>
      </h1>
      <div class="n-show">
        <h2 class="n-title">{{getTipsShow.showData.title}}</h2>
        <div class="n-content">
          {{getTipsShow.showData.content}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "tips",
    data() {
      return {
        value: false,
        data: {
          required: true,
          default: {
            title: "",
            content: ""
          }
        }
      }
    },
    props: {
      getTipsShow :Object 
    },
    computed: {},
    watch: {},
    methods: {
      close() {
        this.value = false;
      }
    },
    created() {},
    activated() {},
    components: {}
  }

</script>
<style scoped lang="scss">
.noticeTips {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index:9999;
  .noticeTipsContent{
    box-shadow: 0px 0px 25px rgba(255, 255, 255, 0.3);
    width: 605px;
    min-height: 355px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    border: 3px solid #cd983f;
    border-radius: 10px;
    img{
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .t6 {
      position: absolute;
      top: 15px;
      right: 10px;
      cursor: pointer;
      font-size: 36px;
    }

    h1{
      font-size: 36px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      padding: 15px 0;
      background: #cd983f; 
      span{
        font-size: 16px;
        display: block;
        line-height: 22px;
      }
    }

    .n-show{
      margin: 20px 50px 30px;
    }

    .n-title{
      font-size: 30px;
      color: #3ec1fe;
      text-align: center;
      margin-bottom: 15px;
    }

    .n-content{
      font-size: 18px;
      color: #000000;
      line-height:1.6;
      max-height:300px;
      overflow:hidden;
      padding-right:8px;
      &:hover{
        padding-right:0;
        overflow-y:scroll;
      }
    }
  }
}
</style>
