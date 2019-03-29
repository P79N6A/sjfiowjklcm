<template>
  <div>
    <agent></agent>
    <user></user>
    <games></games>
    <top-menus></top-menus>
  </div>
</template>
<script>
  
  
  import agent from './components/agent'
  import user from './components/user'
  import games from './components/games'
  import topMenus from './components/top-menus'
  export default {
    data() {
      return {

      };
    },
    components: {agent,user,games,topMenus}
  };

</script>
<style lang="scss">
    .pointer{
      cursor: pointer;
    }
</style>

