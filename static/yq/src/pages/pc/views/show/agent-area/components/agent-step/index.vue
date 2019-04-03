<template>
    <div class="agent_step">
        <div class="container">
            <ul>
                <li>
                    <div class="step_icon">
                    <img src="../../images/cooperation_icon.png" >
                    </div>
                    <h1>提交申请</h1>
                    <p>
                    10秒快速填写代理申请表，一旦申请成功， 您将即刻成为最有吸引力的合营计划的 一份子。马上加入吧！
                    </p>
                </li>
                <li>
                    <div class="step_icon">
                    <img src="../../images/promotion_icon.png" >
                    </div>
                    <h1>推广</h1>
                    <p>
                    除了运用您自身的资源外，我们也提供 多种市场推广工具、资源与您一起开拓 您的代理事业，让您如虎添翼！
                    </p>
                </li>
                <li>
                    <div class="step_icon">
                    <img src="../../images/make_money.png" >
                    </div>
                    <h1>开始赚钱</h1>
                    <p>
                    您的佣金来自每位您所推荐的会员。 会员越多、投注越大，您获得的佣金也就越多。
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.agent_step{
    height: 527px;
    background: #EAEAEA;
    .container{
        padding-top: 42px;
        margin: 0 auto;
        width: 1200px;
        overflow: hidden;
    }
    ul{
        li{
            width: 380px;
            float: left;
            margin: 0 10px;
            h1{
                font-size: 48px;
                color: #3f3f3f;
                text-align: center;
                line-height: 80px;
            }
            p{
                font-size: 20px;
                color: #3f3f3f;
                line-height: 30px;
                text-align: center;
            }
        }
    }
    .step_icon{
        text-align: center;
        img{
            width: 213px;
            height: 264px;
        }
    }
}
</style>
