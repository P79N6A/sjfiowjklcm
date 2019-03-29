<template>
    <div class="mainbtn">
        <router-link v-for="item in items" :to="{name:item.to}" :key="item.to" class="pointer">
            <div class="btn">
                <i class="mr5" :class="item.ico"></i>{{item.text}}
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[
                // {name: "体验金", to: "discount_experience"},
                {name: "存送优惠", to: "discount_savesend"},
                // {name: "洗码", to: "discount_washcode"},
                {name: "存送券", to: "discount_coupon"},
                {name: "红包券", to: "discount_redenvelope"},
                // {name: "救援金", to: "discount_help"},
                {name: "VIP礼金", to: "discount_vip"},
                {name: "生日礼金", to: "discount_birthday"},
                // {name: "推荐好友", to: "discount_recommend"}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.mainbtn{
    width: 95%;
    text-align: justify;
    background: #fff;
    margin: 0 auto;
    .pointer{
        cursor: pointer;
    }
    .btn{
        width: 15%;
        background: #f7f7f7;
        color: #656565;
        display: inline-block;
        padding: 10px;
        margin: 5px 4px;
        border: 1px solid #ccc;
        text-align: center;
        .iconyg{
            font-size: 24px;
            color: #353f8d;
        }
        .mr5{
            margin-right: 5px;
        }
    }

}
</style>


