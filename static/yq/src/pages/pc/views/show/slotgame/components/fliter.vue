<template>
  <div class="menu-container">
    <ul class="menu_box">
      <li class="box_item" :class="{active:item.value==data.active}" v-for="(item,i) in data.data" :key="item.name+i"
        @click="search(item,i,data)">
        {{item.name}}
      </li>
    </ul>
    <div class="search_container">
      <div class="searchbox">
        <input type="text" placeholder="请输入游戏名称" v-model="inputVal">
        <a href="javascript:void(0);" class="search" @click="searchByValue">
          <img src="../images/Find_02.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import fliterInput from "./fliter-input"
  const line = {
    title: "赔付线数：",
    filter: "line",
    active: "",
    data: [{
        name: "全部",
        value: ""
      }, {
        name: "全赔",
        value: "100-1024"
      }, {
        name: "1-15",
        value: "1-15"
      }, {
        name: "16-40",
        value: "16-40"
      },
      {
        name: "41-100",
        value: "41-100"
      }, {
        name: "其它",
        value: "1025-2048"
      }
    ]
  }
  const tag = {
    title: "游戏类型：",
    filter: "tag",
    active: "",
    data: [{
        name: "全部",
        value: ""
      }, {
        name: "热门游戏",
        value: "HOT"
      }, {
        name: "最新游戏",
        value: "NEW"
      }, {
        name: "经典游戏",
        value: "CLA"
      },
      {
        name: "彩金池游戏",
        value: "AMA"
      },
      {
        name: "多旋转老虎机",
        value: "CIR"
      },
      {
        name: "消消乐游戏",
        value: "ETL"
      },
      {
        name: "其他游戏",
        value: "OTH"
      }

    ]
  }
  // const history = {
  //   title:'历史纪录：',
  //   filter:'his',
  //   active:'',
  //   data:[{
  //     name:'全部',
  //     value:''
  //   },{
  //     name:'玩过',
  //     value:'yes'
  //   },{
  //     name:'未玩过',
  //     value:'no'
  //   }]
  // }
  const users = {
    title: "收藏记录：",
    filter: 'fav',
    active: '',
    data: [{
      name: "全部",
      value: ''
    }, {
      name: "已收藏",
      value: "yew"
    }, {
      name: "未收藏",
      value: "no"
    }]
  }

  export default {
    data() {
      return {
        data: {
          title: "游戏类型：",
          filter: "tag",
          active: "",
          data: [{
              name: "全部游戏",
              value: ""
            }, {
              name: "热门游戏",
              value: "HOT"
            }, {
              name: "最新游戏",
              value: "NEW"
            }, {
              name: "经典游戏",
              value: "CLA"
            },
            {
              name: "彩金池游戏",
              value: "AMA"
            },
            {
              name: "多旋转老虎机",
              value: "CIR"
            },
            {
              name: "消消乐游戏",
              value: "ETL"
            },
            {
              name: "其他游戏",
              value: "OTH"
            }

          ]
        },
        inputVal:null
      }
    },
    methods: {
      search(item, i, filter) {
        // 当前tag点击事件
        if (filter.active == item.value) return;
        filter.active = item.value;
        this.$bus.$emit('serachGame', filter.filter, item.value);
      },
      searchByValue() {
        this.$bus.$emit('searchByInput', this.inputVal);
      }
    },
    components: {
      fliterInput
    }
  };

</script>
<style lang="scss" scoped>
  .menu_box {
    padding-left: 0;
    list-style-type: none;
    margin: 14px auto;
  }

  .searchbox {
    input {
      border: 1px solid #efefef;
      padding: 0 16px;
      box-sizing: border-box;
      font-size: 14px;
      height: 2.7em;
      margin: 0 0 14px;
      background-color: transparent;
      outline: none;
      width: 100%;
      box-shadow: none;
      line-height: normal;

      &:focus {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2) !important;
        border: 1px solid rgba(34, 147, 252, .9) !important;
      }
    }

  }

</style>
