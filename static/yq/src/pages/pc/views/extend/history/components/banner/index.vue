<template>
    <div class="historybanner">
        <annunciate></annunciate>
        <img src="./images/banner.jpg" alt="">
    </div>
</template>
<script>
import annunciate from 'pc/components/annunciate'
export default {
    data() {
        return {
            
        }
    },
    components:{annunciate}
}
</script>
<style lang="scss" scoped>
.historybanner{
    width: 100%;
    position: relative;
    img{
        width: 100%;
    }
}
</style>
