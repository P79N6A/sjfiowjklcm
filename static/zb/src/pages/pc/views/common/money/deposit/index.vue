<template>
  <div class="deposit">
      <types @setClasses="setClasses"></types>
      <classes @selectPayInfo="selectPayInfo" :classes="classesSelect.data"></classes>
      <pay-form :payItem='infoSelect'></pay-form>
      <!-- <tips></tips> -->
  </div>
</template>
<script>
  import types from './components/types'
  import classes from './components/classes'
  import payForm from './components/payForm'
  import tips from './components/tips'
  export default {
    data() {
      return {
        classesSelect: [],
        infoSelect: {},
        paySelect: 'wechat',
      }
    },
    watch: {

    },
    methods: {
      setClasses(data) {
        this.classesSelect = data;
        this.infoSelect = {};
      },
      selectPayInfo(info) {
        this.infoSelect = info
      }
    },
    components: {
      types,
      classes,
      payForm,
      tips
    }
  };

</script>
<style lang="scss">
.deposit {			
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #333333;
  padding: 20px;
}
</style>
