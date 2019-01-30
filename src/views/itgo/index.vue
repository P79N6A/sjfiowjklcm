<template>
  <div class="itgo-container">
    <header>
      <Iheader></Iheader>
    </header>
    <div class="contain">
      <!-- <div class="left">
        <Isidebar></Isidebar>
      </div>-->
      <div class="center">
        <Ishow :pageJson="appJson[activePageIndex]"></Ishow>
      </div>
      <div class="right">
        <Itool></Itool>
      </div>
    </div>
  </div>
</template>

<script>
  import Iheader from "./component/header";
  import Itool from "./component/tool";
  import Isidebar from "./component/sidebar";
  import Ishow from "./component/show"
  export default {
    data() {
      return {
        appJson: {
          "description": "",
          "device": "",
          "name": "",
          "type": "",
          "tag": "",
          "value": {
            "pageJson": [{
              "page": 1,
              "json": [],
              "bg": {
                "backgroundImage": "",
                "backgroundColor": "",
                "backgroundSize": "",
                "backgroundRepeat": "",
                "backgroundPosition": ""
              },
              "border": {
                "borderWidth": 0,
                "borderRadius": 0,
                "borderColor": "",
                "borderStyle": ""
              },
              "shadow": {
                "shadowColor": "",
                "shadowWidth": 0,
                "shadowRadius": 0,
                "shadowDire": 0
              },
              "enterAnimation": {},
              "leaveAnimation": {},
              "width": 400,
              "height": 300,
              "opacity": 100,
              "rotate": 0,
              "timer": null
            }],
            "pageSetting": {
              "autoAnimation": true,
              "infinite": false,
              "interval": 3
            }
          }
        },
        activePageIndex:0,
      };
    },
    methods: {

    },
    components: {
      // 基本菜单
      Iheader,
      Itool,
      Isidebar,
      Ishow
    }
  };

</script>

<style scoped lang="scss">
  .itgo-container {
    background: #eee;

    header {
      border-bottom: solid 1px #ccc;
    }

    .contain {
      display: flex;
      justify-content: space-between;
    }

    .left {
      width: 70px;
      border-right: solid 1px #ccc;
    }

    .center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>
