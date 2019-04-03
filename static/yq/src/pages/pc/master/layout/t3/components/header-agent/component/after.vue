<template>
    <div class="agent-head-after">
        <table border="0" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="header_icon">
                        <img src="../images/logintb.png" alt="">
                    </td>
                    <td>账号：<span>{{userData.loginname}}</span></td>
                    <td>账户结余：<span v-if="isUser">{{wallet['MAIN']}}</span><span v-if="isAgent">{{wallet['SLOT']}}</span></td>
                    <td class="space"></td>
                    <td v-if="isUser">等级：<span>{{userData.level}}</span></td>
                    <td class="space"></td>
                    <td class="header_icon">
                        <img src="../images/logintb01.png" alt="">
                    </td>
                    <td width="100">
                        <router-link :to="{name:'message'}" v-if="isUser"><span style="color:#fff;">站内信：</span><span class="bookCount">{{unread}}封</span></router-link>
                        <router-link :to="{name:'agent_message'}" v-if="isAgent"><span style="color:#fff;">站内信：</span><span class="bookCount">{{unread}}封</span></router-link>

                    </td>
                    <td class="space"></td>
                    <td class="header_icon"><img src="../images/logintb02.png"></td>
                    <td class="manage_new">
                        <router-link :to="{name:'user'}" v-if="isUser">账户管理</router-link>
                        <router-link :to="{name:'agent_summary'}" v-if="isAgent">账户管理</router-link>
                    </td>
                    <td class="space"></td>
                    <td class="exit"><a href="javascript:void(0);" @click="$store.dispatch('LOGIN_OUT')">退出</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed: {
      ...mapGetters(["userData", "isUser", "isAgent", "unread", "wallet"]),
    },
}
</script>
<style lang="scss" scoped>
.agent-head-after{
    float: right;
    width: 807px;
    height: 38px;
    color: #fff;
    table{
        width: 870px;
        font-size: 12px;
        border-spacing: 0;
        border-collapse: collapse;
        tr{
            height: 38px;
            td{
                line-height: 38px;
                &.header_icon{
                    width: 25px;
                }
                span{
                    color: #fff;
                    &.bookCount{
                        position: relative;
                        top: 0;
                        left: 0;
                        border-radius: 50%;
                        background-color: #fff;
                        color: #333;
                        display: inline-block;
                        height: 27px;
                        width: 27px;
                        line-height: 27px;
                    }
                }
                a{
                    color: #fff;
                }
                &.exit{
                    width: 30px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
