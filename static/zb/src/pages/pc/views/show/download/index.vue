<template>
  <div class="mobile ng-scope">
    <div class="container">
      <div class="row">
        <banner></banner>
        <pros></pros>
        <menus></menus>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    queryLatestPreferential
  } from '@/api/show'
  import annunciate from 'pc/components/annunciate'
  import banner from './components/banner'
  import menus from './components/menus'
  import pros from './components/pros'
  export default {
    name: "",
    data() {
      return {}
    },
    created() {

    },
    components: {
      menus,
      banner,
      pros,
      annunciate
    }
  }

</script>
<style lang="scss">
  .mobile {
    background: linear-gradient(339deg, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9);
    background-size: 800% 800%;
    overflow: hidden;
    -webkit-animation: ocean-wave 15s ease infinite;
    animation: ocean-wave 15s ease infinite;
    height: 937px;
    width: 100%;
    .container {
      padding-top: 60px;
      width: 1200px;
      .row{
        margin-left: -.75rem;
        margin-right: -.75rem;
        margin-bottom: 20px;
        display: flex;
      }
      .teachBtn {
        color: #fff;
        display: block;
        width: 155px;
        height: 46px;
        line-height: 44px;
        background: url(./images/button_01.png);
        text-align: center;
        &:hover {
          background: url(./images/button_02.png);
        }
      }
    }
  }
@-webkit-keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}


@keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}
</style>
