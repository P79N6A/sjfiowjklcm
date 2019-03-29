<template>
  <div class="search fr">
  <div class="searchbox">
    <input v-model="inputVal" placeholder="搜索游戏" type="text">
    <span @click="search">
      <img src="./images/search_ico.png?v=1705bdd7f4">
    </span>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputVal: '',
        inputData: [],
        search_result:false
      }
    },
    props: {
      data: {
        // type: Array,
        // required: true
      }
    },
    computed: {},
    watch: {
      inputVal(val) {
        if (val == "") {
          return this.inputData = []
        }
        this.inputData = this.data.filter((item, i) => {
          return item.name.includes(val) || item.eName.toLowerCase().includes(val);
        });
        this.$emit("change", val);
        // if(this.inputData){
        //   this.search_result=true;
        // }else{
        //   this.search_result=false;
        // }
      }
    },
    methods: {
      search() {
        if (this.inputVal == "") return;//没有数据不查询
        this.$emit("search", this.inputVal, this.inputData || [])
        this.inputData = [];
      },
      itemClick(item) {
        this.inputVal = "";
        this.$emit("item", item);
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
.game-main{
  .search {
    width: 180px;
    .searchbox {
      background: #d7d7d7;
      border-radius: 4px;

      input {
        box-sizing: border-box;
        width: 140px;
        height: 30px;
        padding: 0 12px;
        color:#333;
        border: 0;
        outline: 0;
        background: none;
      }
      img {
        padding: 4px 5px;
      }
    }
  }
}
</style>
