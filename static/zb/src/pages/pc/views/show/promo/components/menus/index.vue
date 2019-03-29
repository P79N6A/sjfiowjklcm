<template>
  <!-- <div class="select">
    <img src="./images/save.png" alt="">
    <div class="mail" @click="setMenu('')" :class="{active:filter==''}"><i class="slider slider0"></i>全部优惠</div>
    <div :class="['mail',{active:filter==item.typeId}]" v-for="(item,i) in menuData" @click="setMenu(item.typeId)" :key="item.typeId"><i class="slider" :class="`slider${i+1}`"></i>{{ item.typeName }}</div> -->

  <!-- <span class="tabs" @click="setMenu('')" :class="{active:filter==''}">全部优惠</span>
    <span :class="['tabs',{active:filter==item.typeId}]" v-for="item in menuData" @click="setMenu(item.typeId)" :key="item.typeId">{{ item.typeName }}</span> -->
  <!-- </div> -->
  <div class="tab-block">
    <div class="container">
      <ul class="tabs-fixed-width ng-isolate-scope tabs" tabs="">
        <!-- ngRepeat: item in promo.GameTypeList -->
        <li class="tab col ng-scope">
          <a href="javascript:void(0);" @click="setMenu('')" class="ng-binding" :class="{active:filter==''}">全部活动</a>
        </li>
        <li class="tab col ng-scope" v-for="(item,i) in menuData" :key="item.typeId + i">
          <a href="javascript:void(0);" @click="setMenu(item.typeId)" :class="{active:filter==item.typeId}" class="ng-binding ">{{ item.typeName }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        filter: "",
        myData: {
          types: [],
        },
        menuData: []
      }
    },
    computed: {
      filterData() {
        if (this.filter == '') {
          return this.myData.records;
        }
        return this.myData.records.filter((item, i) => {
          return item.type == this.filter;
        })
      }
    },
    watch: {},
    methods: {
      setMenu(type) {
        this.filter = type;
        this.$bus.$emit('filtPros', type);
      }
    },
    created() {
      this.$bus.$on('setProMenu', eventData => {
        this.menuData = eventData;
      })
      console.log(this.menus);
    },
  }

</script>
<style lang="scss" scoped>
  .tab-block {
    background: #0d1932;
    .tabs {
      background: transparent;
      font-size: 14px;
      li a {
        color: #b7b7b7;
        &.active, &:hover {
          color: #2293fc;
          border-bottom: 4px solid #2293fc;
        }
      }
      .indicator {
        background-color: #2293fc;
        height: 4px;
      }
    }
  }

</style>
