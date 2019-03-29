<template>
    <div class="account-box">
        <div class="title">
            快速转账:
        </div>
        <div class="selectdev">
            <el-select v-model="data.transferGameOut" class="w150" size="small">
                <el-option v-for="option in Money" :value="option.value" :key="option.value" :label="option.name"></el-option>
            </el-select>
            <input type="hidden" v-model="money.gameOut">
            TO
            <el-select v-model="data.transferGameIn" class="w150" size="small">
                <el-option v-for="option in Money" :value="option.value" :key="option.value" :label="option.name"></el-option>
            </el-select>
            <input type="hidden" v-model="money.gameIn">
        </div>
        <div class="moneydev">
            输入金额：<el-input v-model="data.transferGameMoney" class="inputwidth" size="small" placeholder="请输入金额"></el-input>
        </div>
        <div class="submitdev">
            <button @click="submitForm('transferForm')">立即转账</button>
        </div>
    </div>
</template>

<script>
import {    mapGetters,    mapActions  } from 'vuex'
import {transfer} from '@/controls/money/transfer'
import {    Money  } from "@/assets/data"
export default {
    mixins:[transfer],
    data() {
      return {
        Money
      };
    },
    props: {},
    methods: {
        submitForm() {
            this.drawSuccess = true
            if (this.data.transferGameOut != ''&& this.data.transferGameIn != '' && this.data.transferGameMoney !='') {
                this.transferSubmit(this.data).then(res=>{
                    window.toast(res.message)
                    // this.resetForm('transferForm')
                }).catch(err=>{
                    window.toast(err.message)
                })
            }else{
            }
        },
    },
    computed: {
//      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
      ...mapGetters(["userData","isUser","unread"]),
    },
    created() {
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
   .account-box{
        width: 48.5%;
        border: 1px solid #ccc;
        padding: 15px 10px;
        float: left;
        height: 260px;
        .title{
            margin-bottom: 10px;
            border-bottom: 1px dotted #ccc;
            padding: 10px 0;
            font-size: 16px;
            color: #ed7e12;
        }
        .selectdev{
            margin: 10px auto;
            padding: 10px 0;
            .w150{
                width: 150px;
            }
        }
        .moneydev{
            margin: 10px auto;
            padding: 10px 0;
            font-size: 14px;
            color: #656565;
            .inputwidth{
                width: 180px;
            }
        }
        .submitdev{
            margin: 10px auto;
            padding: 10px 0;
            text-align: center;
            button{
                width: 98%;
                background: #ed7e12;
                color: #fff;
                line-height: 1.8rem;
                font-size: 17px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
   }
</style>

