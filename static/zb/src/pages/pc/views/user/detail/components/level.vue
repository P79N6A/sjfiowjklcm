<template>
    <div class="u-c-shows">
        <div class="imgGroup">
            <div v-for="item in level" :key="item.level" class="imgDev">
                <div class="logos" :class="`level${item.level}`"></div>
                <span>{{item.levelName}}</span>
                <div class="tips" :class="`pos${item.level}`">
                    <div class="triangle"></div>
                    <div class="msgbox" v-if="item.level == 0">无要求</div>
                    <div class="msgbox" v-else>升级到该等级需投注{{item.upgradethreshold}}元</div>
                </div>
            </div>
        </div>
        <el-steps :active="userData.levelNumber + 1" finish-status="success" :align-center='true' space="16.67%">
            <el-step v-for="item in level" :key="item.level" :description="item.tip"></el-step>
        </el-steps>
    </div>
</template>

<script>
import {    mapGetters,    mapActions  } from 'vuex'
import {vipGold} from '@/controls/discount/vipGold'
export default {
    mixins:[vipGold],
    data() {
      return {
          levels:[
          ],
      };
    },
    props: {},
    methods: {},
    computed: {
      ...mapGetters(["userData","isUser","unread"]),
    },
    created() {
        this.getVipInfo(this.userData)
    }
}
</script>

<style lang="scss" scoped>
    .imgGroup{
        background-position:center center;
        background-repeat: no-repeat;
        background-size: contain!important;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        .imgDev{
            width: 16.67%;
            .logos{
                background-position: center center;
                background-repeat: no-repeat;
                background-size: contain !important;
                height: 80px;
                width: 100%;  
                margin-bottom: 10px;
            }
            .level0{
                background-image: url(/static/images/level/0.png);
            }
            .level1{
                background-image: url(/static/images/level/1.png);
            }
            .level2{
                background-image: url(/static/images/level/2.png);
            }
            .level3{
                background-image: url(/static/images/level/3.png);
            }
            .level4{
                background-image: url(/static/images/level/4.png);
            }
            .level5{
                background-image: url(/static/images/level/5.png);
            }
            .level6{
                background-image: url(/static/images/level/6.png);
            }
            .tips{
                position: absolute;
                display: none;
                left: 8%;
                // width: 250px;
                min-height: 40px;
                margin-top: 36px;
                .msgbox{
                    background: #16705e;
                    color: #fff;
                    width: 100px;
                    text-align: center;
                    line-height: 1.3rem;
                    border-radius: 5px;
                    margin: 0 auto;
                    padding: 2px 5px;
                }
                .triangle{
                    width: 0;
                    height: 0;
                    border: 10px solid;
                    margin: 0 auto;
                    border-color: transparent transparent #16705e transparent;
                }
            }
            .pos0{
                left: 3%;
            }
            .pos1{
                left: 3%+16.67%;
            }
            .pos2{
                left: 3%+16.67%*2;
            }
            .pos3{
                left: 3%+16.67%*3;
            }
            .pos4{
                left: 3%+16.67%*4;
            }
            .pos5,{
                left: 3%+16.67%*5;
            }
            .pos6{
                left: 3%+16.67*6;
            }
            &:hover{
                .tips{
                    display: block;
                }
            }
        }
    }
    .tips{
        position: absolute;
        display: none;
        left: 8%;
        // width: 250px;
        min-height: 40px;
        margin-top: 36px;
        .msgbox{
            background: #16705e;
            color: #fff;
            width: 100px;
            text-align: center;
            line-height: 1.3rem;
            border-radius: 5px;
            margin: 0 auto;
            padding: 2px 5px;
        }
        .triangle{
            width: 0;
            height: 0;
            border: 10px solid;
            margin: 0 auto;
            border-color: #fff #fff #16705e #fff;
        }
    }
    .pos0{
        left: 1.8%;
    }
    .pos1{
        left: 1.8%+14.28%;
    }
    .pos2{
        left: 1.8%+14.28%*2;
    }
    .pos3{
        left: 1.8%+14.28%*3;
    }
    .pos4{
        left: 1.8%+14.28%*4;
    }
    .pos5,{
        left: 1.8%+14.28%*5;
    }
    .pos6{
        left: 1.8%+14.28*6;
    }
</style>

