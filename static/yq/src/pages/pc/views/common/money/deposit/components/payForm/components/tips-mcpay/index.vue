
<template>
    <el-carousel height="300px" :autoplay="false">
      <el-carousel-item v-for="item in helps" :key="item">
        <img v-lazy="getHelp(item)">
      </el-carousel-item>
    </el-carousel>
</template> 
<script>

  export default {
    data() {
      return {
        helps:[
          "01.jpg",
          "02.jpg",
          "03.jpg",
          "04.jpg",
          "05.jpg",
        ]
      }
    },
    methods:{
      getHelp(url){
        return require(`./images/${url}`)
      }
    }
  };

</script>
