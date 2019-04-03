<template>
  <div class="tips-circular">
    <div class="content">
      <span class="icobjh bjh-tongzhi"></span>
      <marquee style="vertical-align: middle;">
        <router-link v-for="item in myData" :key="item.id" :to="{name:'notice',params:{id:item.id}}">
          {{item.title}}&nbsp;[{{item.createtime|Date}}]&nbsp;&nbsp;&nbsp;
        </router-link>
      </marquee>
    </div>
  </div>
</template>
<script>
  import  {getNewAnnouncement} from '@/api/show';
  export default {
    name: "",
    data() {
      return {
        myData:[]
      }
    },
    props: {},
    created() {
      getNewAnnouncement().then(res=>{
        res.success&&(this.myData=res.data);
      })
    },
  }
</script>
<style lang="scss" scoped>
  .tips-circular {
    height: 40px;
    background: #0e0e1e;
    color: #3ec1fe;
    line-height: 40px;
    font-size:14px;
    .content {
      display:flex;
      box-sizing: border-box;
      .icobjh{
        font-size:20px;
        width:30px;
      }
    }
  }
</style>
