<template>
    <div class="chessHall">
        <div class="mainContent">
            <platform></platform>
            <dataList></dataList>
        </div>
    </div>
</template>
<script>
import platform from './components/platform'
import dataList from './components/dataList'
export default {
    data(){
        return{

        }
    },
    components:{
        platform,dataList
    }
}
</script>
<style lang="scss" scoped>
.chessHall{
    background: url('./images/bg.jpg') no-repeat;
    background-size: cover;
    background-position: top center;
    width: 100%;
    min-height: 1000px;
    padding: 427px 0 100px;
    position: relative;
    .mainContent{
        width: 1200px;
        margin: 0 auto ;
        background: #141414;
        padding-bottom: 40px;
    }
}
</style>
