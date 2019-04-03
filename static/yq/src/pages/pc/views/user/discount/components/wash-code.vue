<template>
  <div class="wash-code">
    <el-form :model="data" label-width="120px" class="discount-form">
      <!-- 游戏平台 -->
      <el-form-item label="申请平台：">
        <el-select v-model="type" placeholder="请选择游戏平台" @change="search(type)">
          <el-option
            :label="item.name"
            v-for="item  in platformData"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 开始时间 -->
      <el-form-item label="起始时间：" prop="data">
        <el-input class="readonly" v-model.number="data.startDate" readonly placeholder="无投注记录"></el-input>
      </el-form-item>

      <!-- 结束时间 -->
      <el-form-item label="截止时间：" prop="data">
        <el-input class="readonly" v-model.number="data.endDate" readonly placeholder="无投注记录"></el-input>
      </el-form-item>

      <!-- 总有效投注额 -->
      <el-form-item label="有效投注额：" prop="data">
        <el-input class="readonly" v-model.number="data.validAmount" readonly placeholder="无投注记录"></el-input>
      </el-form-item>

      <!-- 洗码比率 -->
      <el-form-item label="返水比率%：" prop="data">
        <el-input class="readonly" v-model.number="data.rate" readonly placeholder="无投注记录"></el-input>
      </el-form-item>

      <!-- 返水金额 -->
      <el-form-item label="返水金额(元)：" prop="data">
        <el-input class="readonly" v-model.number="data.ximaAmount" readonly placeholder="无投注记录"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="doXima" :disabled="!show">确定洗码</el-button>
      </el-form-item>
    </el-form>
    <div class="ui-fast-game clear cfx">
      <div class="fl icons">
        <img src="./images/icon-quickgame.png" alt>
        <p>快速游戏</p>
      </div>
      <div class="fl links">
        <ul>
          <li>老虎机：</li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PT2TIGER'}}" target="_blank">PT国际版</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'DT'}}" target="_blank">DT老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'MG'}}" target="_blank">MG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'CQ9'}}" target="_blank">CQ9老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'SW'}}" target="_blank">SW老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'JDBSLOT'}}" target="_blank">JDB老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'AMEBA'}}" target="_blank">AE老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PG'}}" target="_blank">PG老虎机</router-link>
          </li>
           <li>
            <router-link :to="{name:'gameIndex',params:{type:'TGP'}}" target="_blank">TGP老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'RTG'}}" target="_blank">RTG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PNG'}}" target="_blank">PNG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'QT'}}" target="_blank">QT老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'NT'}}" target="_blank">NT老虎机</router-link>
          </li>
        </ul>
        <ul>
          <li>真人&amp;体育&amp;电竞：</li>
          <li>
            <a :href="Games.href_ag" target="_blank">AG真人</a>
          </li>
          <li>
            <a :href="Games.href_og" target="_blank">OG真人</a>
          </li>
          <li>
            <a :href="Games.href_bbin" target="_blank">BBIN真人</a>
          </li>
          <li>
            <a :href="Games.href_sunbet" target="_blank">申博真人</a>
          </li>
          <li>
            <a :href="Games.href_dg_pc" target="_blank">DG真人</a>
          </li>
          <li>
            <a :href="Games.href_sb_pc" target="_blank">沙巴体育</a>
          </li>
          <li>
            <a :href="Games.href_ug_pc" target="_blank">皇冠体育</a>
          </li>
          <li>
            <a :href="Games.href_bti" target="_blank">BTI体育</a>
          </li>
          <li>
            <a :href="Games.href_avia" target="_blank">泛亚电竞</a>
          </li>
        </ul>
        <ul>
          <li>彩票&amp;棋牌&amp;捕鱼:</li>
          <li>
            <a :href="Games.href_vr" target="_blank">VR彩票</a>
          </li>
          <li>
            <a :href="Games.href_ig_ssc" target="_blank">IG时时彩</a>
          </li>
          <li>
            <a :href="Games.href_ig_hk" target="_blank">IG香港彩</a>
          </li>
          <li>
            <a :href="Games.href_cb" target="_blank">彩播彩票</a>
          </li>
          <li>
            <a :href="Games.href_kyqp" target="_blank">开元棋牌</a>
          </li>
          <li>
            <a :href="Games.href_city761" target="_blank">761棋牌</a>
          </li>
          <li>
            <router-link :to="{name:'chessHall',params:{type:'DTQP'}}" target="_blank">DT棋牌</router-link>
          </li>
          <li>
            <a :href="Games.href_lgqp" target="_blank">幸运棋牌</a>
          </li>
          <li>
            <a :href="Games.href_by" target="_blank">BY棋牌</a>
          </li>
          <li>
            <a :href="Games.href_fish_jdb" target="_blank">JDB捕鱼</a>
          </li>
          <li>
            <a :href="Games.href_fish" target="_blank">AG捕鱼</a>
          </li>
          <li>
            <a :href="Games.href_fish_mw" target="_blank">大满贯捕鱼</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-tip cfx">
      <p>温馨提示：</p>
      <p>
        1.若提示您“
        <span style="color:#ea5048;">上一笔洗码审核中</span>”，或投注后仍提示无投注记录，请联系在线客服。
      </p>
      <p>
        2.自助返水
        <span style="color:#ea5048;">仅限老虎机平台</span>，真人与体育平台无法自助返水，最低金额为
        <span style="color:#ea5048;">10元</span>（若未达到要求是无法自助返水操作的）。
      </p>
      <p>
        3.每天的
        <span style="color:#ea5048;">23：00-01:00</span>系统结算时间，暂不能申请自助返水。
      </p>
      <p>
        4.PNG返水结算的时间为：从昨天
        <span style="color:#ea5048;">8点</span>到今天
        <span style="color:#ea5048;">8点</span>，所产生的有效投注额*返水比例，未自助返水将通过系统返水进行结算派发。
      </p>
      <p>5.自助返水无次数限制，自助返水申请提交后，会在5分钟内通过审核，返水金额会自己添加到您的主账户余额内。</p>
    </div>
  </div>
</template>

<script>
import { platformData } from "@/assets/data";
import { Games } from "@/assets/data";
import { washCode } from "@/controls/discount/washCode";
export default {
  mixins: [washCode],
  data() {
    return {
      Games,
      platformData
    };
  },
  methods: {
    // 查询洗码结果
    search(type) {
      this.searchSubmit({
        gameId: type
      })
        .then(res => {
          // window.toast(res.message)
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    // 确认洗码
    doXima() {
      this.doXimaSubmit({
        gameId: this.type
      })
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.wash-code {
  .discount-form {
    width: 600px;
    .el-select {
      display: block !important;
    }
  }
  .ui-fast-game {
    display: block;
    width: 100%;
    padding: 20px 0;
    color: #333333;
    .icons {
      width: 15%;
      height: 190px;
      text-align: center;
      line-height: 43px;
      background: #44a7e0;
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .links {
      width: 77%;
      background: #fff;
      border: 1px solid #4db7f4;
      border-left: none;
      line-height: 2;
      padding: 10px;
      li {
        display: inline-block;
        margin-right: 6px;
        cursor: pointer;
        &:hover {
          background: #4db7f4;
          color: #fff;
        }
      }
    }
  }
}
</style>
