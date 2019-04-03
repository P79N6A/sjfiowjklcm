<template>
    <div class="historyPage">
        <banner></banner>
        <div class="historyContent">
            <data-List></data-List>
        </div>
    </div>
</template>
<script>
import banner from './components/banner'
import dataList from './components/datalist'
export default {
    data() {
        return {
        }
    },
    components:{
        banner,dataList
    }
}
</script>
<style lang="scss" scoped>
    .historyPage{
        position: relative;
        width: 100%;
        .historyContent{
            background: #f1f1f1;
        }
    }
</style>
