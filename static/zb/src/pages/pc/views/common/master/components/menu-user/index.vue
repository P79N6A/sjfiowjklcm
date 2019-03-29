<template>
  <div>
    <user></user>
    <agent></agent>
  </div>
</template>
<script>
  import agent from './components/agent'
  import user from './components/user'
  export default {
    data() {
      return {

      };
    },
    props: {
    },

    components:{agent,user}
  };

</script>
