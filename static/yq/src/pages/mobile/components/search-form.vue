<template>
  <div class="search-form">
    <!-- <div class="form-warp">
      <input-inline label="开始日期：">
        <input v-model="startTime" class="date_picker_value" type="date"
               placeholder="请选择">
      </input-inline>
      <input-inline label="结束日期：">
        <input v-model="endTime" class="date_picker_value" type="date"
               placeholder="请选择">
      </input-inline>
      <slot name="form"></slot>
    </div>
    <div class="search-data">
      <slot></slot>
    </div>
    <div class="search-footer">
      <vButton @click="submit">查询</vButton>
    </div> -->
    <slot name="form"></slot>
    <div class="mask-time">
      <div class="start-time">
        <input type="date" v-model="startTime" placeholder="选择开始日期">
        <!-- <i class="iconcent ct-rili"></i>         -->
      </div>
      <div class="end-time">
        <input type="date" v-model="endTime" placeholder="选择结束日期">
        <!-- <i class="iconcent ct-rili"></i>         -->
      </div>   
      <div class="searchBtn" @click="submit">查询</div>   
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: ""
    };
  },
  props: {
    title: String,
    data: {
      type: Object
    }
  },
  created() {
    this.endTime = this.data.endtime || new Date().addDay(1).format();
    this.startTime = this.data.starttime || new Date().addDay(-30).format();

    //默认查询
    this.data.starttime = this.startTime;
    this.data.endtime = this.endTime;
    if(this.$route.name != 'agent_memberbill'){
    this.$emit("search","1");
    }
  },
  methods: {
    submit() {
      if (this.startTime == "") return window.toast("请选择开始时间");
      if (this.endTime == "") return window.toast("请选择结束时间");
      this.data.starttime = this.startTime;
      this.data.endtime = this.endTime;
      this.$emit("search");
    }
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

.search-form {
  background: #ffffff;
  .mask-time {  
    padding: r(20) r(20) r(30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .start-time,
    .end-time {
      border: 1px solid rgba($color: #ddd, $alpha: 0.6);
      border-radius: r(40);
      height: r(60);
      position: relative;
      overflow: hidden;
      padding-left: r(20);
      width: 40%;
      margin-right: r(15);
      input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        background: #ffffff;
      }
      .iconcent {
        position: absolute;
        right: r(20);
        top: 50%;
        transform: translateY(-50%);
        color: $cl1;
        @include f(38px);
      }
    }
  }
  .searchBtn {
    width: 20%;
    border-radius: r(40);
    background: $cl1;
    color: #ffffff;
    text-align: center;
    height: r(60);
    line-height: r(60);
  }
}
</style>
