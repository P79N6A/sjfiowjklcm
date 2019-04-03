<template>
    <div class="historyDataList">
        <div class="dataListHd">
            <div class="titleItem">
                <div class="year" v-for="item in history" :key="item.year" @click="chooseIt(item)" :class="{active:chooseYear == item.year}">
                    <span>{{item.year}}</span>
                </div>
            </div>
            <!-- <div class="arrow">
                <a href="javascript:void(0);" class="next" @click="next"></a>
                <a href="javascript:void(0);" class="prev" @click="prev"></a>
            </div> -->
        </div>
        <div class="dataListBd">
            <div class="line"></div>
            <div class="fl">
                <div class="dataListItem" v-for="(item,i) in datalist" :key="item.id" v-if="i%2==0">
                    <p class="time">{{item.time}}</p>
                    <p class="title">{{item.title}}</p>
                    <div class="imgItem">
                        <div class="imgDetail">
                            <img v-lazy="item.pic" alt="">
                            <div class="detailBox" v-show="cur == item.id">
                                <div class="detail"><p>{{item.des}}</p></div>
                            </div>
                        </div>
                        <div class="tishi">
                            <a :href="item.url" target="_blank" v-if="item.des == ''&&cur != item.id">点击查看详情</a>
                            <a href="javascript:void(0);" @click="showDes(item)" v-if="item.des != '' && cur != item.id">点击查看详情</a>
                            <a href="javascript:void(0);" @click="closeDes(item)" v-if="item.des != '' && cur == item.id">取消查看</a>
                        </div>
                    </div>
                    <div class="icos">
                        <span class="triangle"></span>
                        <span class="circle"></span>
                    </div>
                </div>
            </div>
            <div class="fr">
                <div class="dataListItem" v-for="(item,i) in datalist" :key="item.id" v-if="i%2==1">
                    <p class="time">{{item.time}}</p>
                    <p class="title">{{item.title}}</p>
                    <div class="imgItem">
                        <div class="imgDetail">
                            <img v-lazy="item.pic" alt="">
                            <div class="detailBox" v-show="cur == item.id">
                                <div class="detail"><p>{{item.des}}</p></div>
                            </div>
                        </div>
                        <div class="tishi">
                            <a :href="item.url" target="_blank" v-if="item.des == ''&&cur != item.id">点击查看详情</a>
                            <a href="javascript:void(0);" @click="showDes(item)" v-if="item.des != '' && cur != item.id">点击查看详情</a>
                            <a href="javascript:void(0);" @click="closeDes(item)" v-if="item.des != '' && cur == item.id">取消查看</a>
                        </div>
                    </div>
                    <div class="icos">
                        <span class="circle"></span>
                        <span class="triangle"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getHistory} from '@/api/show'
export default {
    data() {
        return {
            history:null,
            showCur:null,
            chooseYear: '2018',
            cur:null,
            datalist:null
        }
    },
    methods: {
        showDes(item){
            this.cur = item.id
            console.log('test')
        },
        closeDes (item){
            this.cur = ''
        },
        chooseIt(item){
            this.chooseYear = item.year
        },
        change(){
            let _this = this
            let i = 0;
            let len = _this.history.length;
            setInterval(function () {
                _this.chooseIt(_this.history[i%len])
                i++;
            }, 60000)
        },
        // next(){
        //     if (this.chooseYear == '2011') {
        //         this.chooseYear = '2018'
        //     }else{
        //         this.chooseYear = (this.chooseYear*1 + 1).toString()
        //     }
        // },
        // prev(){
        //     if (this.chooseYear == '2018') {
        //         this.chooseYear = '2011'
        //     }else{
        //         this.chooseYear = (this.chooseYear*1 - 1).toString()
        //     }
        // }
    },
    created() {
        getHistory().then(res=>{
            this.history = res.data
            let t = this.history.filter(item=>{
                return item.year == this.chooseYear
            })
            this.datalist = t[0].list
            this.change()
        }).catch(err=>{
            console.log(err)
        })
    },
    watch: {
        'chooseYear'(val){
            if (val) {
                let t = this.history.filter(item=>{
                    return item.year == val
                })
                this.datalist = t[0].list
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.historyDataList{
    width: 100%;
    position: relative;
    .dataListHd{
        position: relative;
        top: 1px;
        left: 0;
        height: 120px;
        line-height: 120px;
        background: #fff;
        .titleItem{
            width: 950px;
            height: 120px;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .year{
                box-sizing: border-box;
                display: inline-block;
                margin: 0 auto;
                height: 100%;
                padding: 0 15px;
                cursor: pointer;
                border-bottom: 5px solid transparent;
                span{
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    border: 2px solid #ccc;
                    border-radius: 5px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 22px;
                    transition: all .3s;
                }
                &.active{
                    background: #fff;
                    color: #fd4747;
                    border-bottom: 5px solid #fd4747;
                    span{
                        border: 2px solid #fd4747;
                    }
                }
            }
        }
        .arrow{
            a{
                position: absolute;
                width: 30px;
                height: 30px;
                top: 45px;
                overflow: hidden;
                cursor: pointer;
                &.next{
                    right: 14%;
                    background: url(./images/history-arrow-r1.png) no-repeat center;
                    &:hover{
                        background: url(./images/history-arrow-r-a1.png) no-repeat center;
                    }
                }
                &.prev{
                    left: 14%;
                    background: url(./images/history-arrow-l.png) no-repeat center;
                    &:hover{
                        background: url(./images/history-arrow-l-a.png) no-repeat center;
                    }
                }
            }
            
        }
    }
    .dataListBd{
        position: relative;
        max-width: 1200px;
        overflow: hidden;
        margin: 0 auto;
        padding-bottom: 30px;
        .line {
            position: absolute;
            height: 100%;
            width: 2px;
            background: #ccc;
            transform: translateX(-50%);
            left: 50%;
        }
        .fl{
            float: left;
            .dataListItem{
                padding: 20px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 10px;
                width: 567px;
                margin-top: 40px;
                position: relative;
                .time{
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    padding-bottom: 10px;
                    text-align: right;
                }
                .title{
                    font-size: 14px;
                    color: #333;
                    padding-bottom: 10px;
                    text-align: right;
                }
                .imgItem{
                    height: 320px;
                    width: 517px;
                    background: #4db7f4;
                    text-align: center;
                    padding: 5px;
                    .imgDetail{
                        position: relative;
                        width: 100%;
                        height: 270px;
                        border-bottom: none;
                        transition: all .3s;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .detailBox{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 507px;
                            height: 270px;
                            opacity: 1;
                            .detail{
                                display: table;
                                height: 270px;
                                width: 100%;
                                padding: 15px;
                                background: rgba(0, 0, 0, .7);
                                p{
                                    display: table-cell;
                                    height: 235px;
                                    vertical-align: middle;
                                    color: #fff;
                                    font-size: 16px;
                                    text-align: left;
                                    line-height: 1.6;
                                    padding-bottom: 0;
                                }
                            }
                        }
                        
                    }
                    .tishi{
                        width: 100%;
                        line-height: 45px;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        transition: all .3s;
                        cursor: pointer;
                        a {
                            display: block;
                        }
                    }
                    &:hover{
                        background: #fd4747;
                    }
                }
            }
            .icos {
                position: absolute;
                left: 100%;
                top: 48%;
                width: 80px;
                text-align: left;
                .triangle {
                    display: inline-block;
                    background: #fff;
                    border-top: solid 1px #ddd;
                    border-right: solid 1px #ddd;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    transform: rotate(45deg) translateX(-60%);
                }
                .circle {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    z-index: 10;
                    border-radius: 50%;
                    background: #4db7f4;
                }
                }
        }
        .fr{
            float: right;
            margin-top: 40px;
            .dataListItem{
                padding: 20px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 10px;
                width: 567px;
                margin-top: 40px;
                position: relative;
                .time{
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    padding-bottom: 10px;
                    text-align: left;
                }
                .title{
                    font-size: 14px;
                    color: #333;
                    padding-bottom: 10px;
                    text-align: left;
                }
                .imgItem{
                    height: 320px;
                    width: 517px;
                    background: #4db7f4;
                    text-align: center;
                    padding: 5px;
                    .imgDetail{
                        position: relative;
                        width: 100%;
                        height: 270px;
                        border-bottom: none;
                        transition: all .3s;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .detailBox{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 507px;
                            height: 270px;
                            opacity: 1;
                            .detail{
                                display: table;
                                height: 270px;
                                width: 100%;
                                padding: 15px;
                                background: rgba(0, 0, 0, .7);
                                p{
                                    display: table-cell;
                                    height: 235px;
                                    vertical-align: middle;
                                    color: #fff;
                                    font-size: 16px;
                                    text-align: left;
                                    line-height: 1.6;
                                    padding-bottom: 0;
                                }
                            }
                        }
                        
                    }
                    .tishi{
                        width: 100%;
                        line-height: 45px;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        transition: all .3s;
                        cursor: pointer;
                        a {
                            display: block;
                        }
                    }
                    &:hover{
                        background: #fd4747;
                    }
                }
            }
            .icos {
                position: absolute;
                right: 100%;
                top: 48%;
                width: 80px;
                text-align: right;
                .triangle {
                    display: inline-block;
                    background: #fff;
                    border-top: solid 1px #ddd;
                    border-right: solid 1px #ddd;
                    width: 20px;
                    height: 20px;
                    transform: rotate(-135deg) translateX(-60%);
                }
                .circle {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    z-index: 10;
                    border-radius: 50%;
                    background: #4db7f4;
                }
            }
        }
    }
}
</style>
