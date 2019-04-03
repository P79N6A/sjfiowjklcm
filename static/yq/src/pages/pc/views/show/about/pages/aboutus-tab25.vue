<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="hc_txt_box ng-scope">
            <div class="tutorials_right_Top">
              <div class="tutorials_right_Top_navbar">
                <div class="tutorials_right_Top_navbar_gameTab divline tutorials_right_Top_navbar_sport_i" :class="{'action': tutorials.helpIndex == 3}"
                  style="">
                  <span>体育问题</span>
                  <div class="sport">
                    <ul>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 3;tutorials.subpageId = 1;" :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 1) ? 'actionDotline' : ''"
                          class="" style="">足球</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 2) ? 'actionDotline' : ''">
                        <a href="#" ng-click="tutorials.helpIndex = 3;tutorials.subpageId = 2;" :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 2) ? 'actionDotline' : ''">篮球</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 3) ? 'actionDotline' : ''">
                        <a href="#" ng-click="tutorials.helpIndex = 3;tutorials.subpageId = 3;" :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 3) ? 'actionDotline' : ''">网球</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 4) ? 'actionDotline' : ''">
                        <a href="#" ng-click="tutorials.helpIndex = 3;tutorials.subpageId = 4;" :class="(tutorials.helpIndex == 3 &amp;&amp; tutorials.subpageId == 4) ? 'actionDotline' : ''">其他</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="tutorials_right_Top_navbar_gameTab divline tutorials_right_Top_navbar_esports_i action" ng-click="tutorials.helpIndex = 4;"
                  :class="{'action': tutorials.helpIndex == 4}" role="button" tabindex="0" style="">
                  <span>电子竞技</span>
                </div>
                <div class="tutorials_right_Top_navbar_gameTab divline tutorials_right_Top_navbar_casino_i" :class="{'action': tutorials.helpIndex == 1}">
                  <span>真人视讯</span>
                  <div class="casino">
                    <ul>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 1;tutorials.subpageId = 1;" :class="(tutorials.helpIndex == 1 &amp;&amp; tutorials.subpageId == 1) ? 'actionDotline' : ''">百家乐</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 1;tutorials.subpageId = 2;" :class="(tutorials.helpIndex == 1 &amp;&amp; tutorials.subpageId == 2) ? 'actionDotline' : ''">二十一点</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 1;tutorials.subpageId = 3;" :class="(tutorials.helpIndex == 1 &amp;&amp; tutorials.subpageId == 3) ? 'actionDotline' : ''">骰宝</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 1;tutorials.subpageId = 4;" :class="(tutorials.helpIndex == 1 &amp;&amp; tutorials.subpageId == 4) ? 'actionDotline' : ''">轮盘</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="tutorials_right_Top_navbar_gameTab divline tutorials_right_Top_navbar_lottery_i" :class="{'action': tutorials.helpIndex == 2}">
                  <span>彩票问题</span>
                  <div class="lottery">
                    <ul>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 2;tutorials.subpageId = 1;" :class="(tutorials.helpIndex == 2 &amp;&amp; tutorials.subpageId == 1) ? 'actionDotline' : ''">快乐彩</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 2;tutorials.subpageId = 2;" :class="(tutorials.helpIndex == 2 &amp;&amp; tutorials.subpageId == 2) ? 'actionDotline' : ''">时时彩</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 2;tutorials.subpageId = 3;" :class="(tutorials.helpIndex == 2 &amp;&amp; tutorials.subpageId == 3) ? 'actionDotline' : ''">北京PK拾</a>
                        <div class="dotline">..................................</div>
                      </li>
                      <li>
                        <a href="#" ng-click="tutorials.helpIndex = 2;tutorials.subpageId = 4;" :class="(tutorials.helpIndex == 2 &amp;&amp; tutorials.subpageId == 4) ? 'actionDotline' : ''">六合彩</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div style="clear:both"></div>
              </div>
            </div>
            <!--電子競技-->
            <div class="main_txt" ng-show="tutorials.helpIndex == 4" aria-hidden="false" style="">
              <h3>赛事没有完成怎么办？</h3>
              <p>如果比赛没有完成（例如：队员退赛、取消资格或游戏服务器的问题）所有该赛事的投注将被视为无效</p>
              <h3>队伍/选手名字出现错误怎么办？</h3>
              <p>如果填写运动队/选手名字时出现拼写错误，所有投注仍会有效</p>
              <h3>并非使用本队人员进行比赛怎么办？</h3>
              <p>如一个队伍或者两个队伍有较少队员进行比赛，所有的投注视为有效。</p>
              <h3>赛事提前开赛怎么办？</h3>
              <p>如赛事在原定比赛前提前开始，在赛事开始后的所有注单视为无效</p>
              <h3>投注类型</h3>
              <p>独赢盘： 预测谁将会赢得这场比赛，任何形式的加时或补时将予以计算在内。</p>
              <p>让分盘： 电子竞技比赛的让分可以是轮/赛局或根据比赛不同选择其他的计量方式。</p>
              <p>例如：</p>
              <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td>让分盘</td>
                    <td>赔率</td>
                  </tr>
                  <tr>
                    <td>选手A</td>
                    <td>-1.5</td>
                    <td>2.00</td>
                  </tr>
                  <tr>
                    <td>选手B</td>
                    <td>+1.5</td>
                    <td>1.85</td>
                  </tr>
                </tbody>
              </table>
              <p>如果选手A赢比赛两赛局或以上，则投注选手A的玩家胜出，投注选手B的玩家落败。如果选手A只多赢了一局或选手B获胜，则投注选手B的玩家胜出，投注选手A的玩家落败。</p>
              <h3>大/小盘：</h3>
              <p>预测在比赛中的总地图数/回合数是否大于或小于盘口数，任何形式的额外时间或加时赛均计算在内。</p>
              <h3>特别投注类型</h3>
              <p>第一座防御塔：第一个被毁掉一座防御塔的队伍在该投注中落败</p>
              <p>第一滴血：宣布在游戏中获得“第一滴血”的队伍是该项投注中的胜出者。</p>
              <p>第一个获得10杀：在游戏中的计分板中首先得到10杀的队伍是该项投注中的胜出者。</p>
              <p>第一轮：赢得第一轮的队伍是该项投注中的胜出者。</p>
              <p>第一个赢得前5轮：赢得前5轮的队伍是该项投注中的胜出者。</p>
              <p>持续时间：地图比赛总持续时间，根据游戏内的计时器</p>
              <p>配对最高死亡数/击杀数：获得死亡次数/击杀数最高的玩家</p>
              <p>GODLIKE会出现：任何队员的杀人数达到9个</p>
              <p>信使被击杀：任何信使被其中一个队伍击杀</p>
              <p>第一回合赢家（手枪局）：一个地图中第一回合赢家（手枪局）</p>
              <p>第十六回合赢家（手枪局）：一个地图中第十六回合赢家（手枪局）</p>
              <p>首个男爵击杀：最先杀死第一个男爵的队伍</p>
              <p>首个小龙击杀：最先杀死第一个小龙的队伍</p>
              <p>首个罗山击杀：最先杀死第一个罗山的队伍</p>
              <p>摧毁首个防御塔：最先摧毁对方防御塔的队伍，包括对方队伍自毁防御塔</p>
              <p>摧毁首个炮塔：最先摧毁对方炮塔的队伍</p>
            </div>
            <!--體育問題-->
            <div class="main_txt ng-hide" ng-show="tutorials.helpIndex == 3" aria-hidden="true" style="">
              <!--足球-->
              <div ng-show="tutorials.subpageId == 1" aria-hidden="false" class="">
                <h3>足球的结算以什么时间为准？</h3>
                <p>所有足球投注的结算皆以球赛所规定的完场时间90分钟为准，完场时间90分钟包括球员伤停补时。加时赛、淘汰赛、点球，以及赛事后如果裁判或相关管理机构更改任何赛果则不计算在内。</p>
                <p>对于某些以全场完场时间为80分钟（2 x40分钟）的特定赛事或者友谊赛，所有投注的结算皆以完场时间为准。</p>
                <p>若少年赛、友谊赛的完场时间为70分钟（2 x 35分钟）或更少，本公司将在开赛前做出公布，否则该场赛事的注单一律作废。</p>
                <h3>赛事中断怎么办？</h3>
                <p>如果赛事中断或延迟，并且没有在36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别投注类型规则里另有指定注明。</p>
                <h3>多久可以结算？</h3>
                <p>1. 单注派彩：正常情况下，单场赛事投注会在赛事结束后15到30分钟内完成确认赛果并返彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。</p>
                <p>2. 上半场派彩：正常情况下，上半场投注会在赛事上半场结束后30分钟内完成确认赛果并返彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。</p>
                <p>3. 连串过关派彩：正常情况下，连串过关将会在您该注单最后一场连串过关赛事结束2小时内，官方公布结果后进行派彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。</p>
                <h3>危险球的定义？</h3>
                <p>会员在投注滚球时，如果赛场中出现以下几种情况，会员的投注将会维持在‘危险球-待确认’ 的状态。危险球的定义有:</p>
                <p>1. 12码罚球</p>
                <p>2. 自由球(攻方在守方禁区附近的自由球)。</p>
                <p>3. 角球 /掷入球(攻方靠近守方禁区的掷入球)。</p>
                <p>4. A队向B队禁区附近进攻(或是B队在A队的禁区附近进攻)。</p>
                <p>在以下的状况，会员所下注注单将会被取消，而会员所下注的金额将会全数退回：</p>
                <p>1. 进球。</p>
                <p>2. 红卡。</p>
                <p>在以下这几种状况将会释放危险球，而会员在危险球下注的注单都会以当时下注的盘口、赔率和金额为准。</p>
                <p>1. 门将开球。</p>
                <p>2. 皮球重新去到中场线。</p>
                <p>3. 己方球员在自己的后场抢回控球权。</p>
                <p>4. 攻防转换，原来的防守一方在自己後场开出自由球 。</p>
                <h3>主要投注盘口类型</h3>
                <p>1x2（独赢盘）：</p>
                <p>盘口提供两支球队和平局为投注选项，预测哪一支球队将在90分钟比赛胜出或赛事和局。</p>
                <p>让球盘：</p>
                <p>1. 根据盘口让球信息预测最终获得胜利的球队。</p>
                <p>2. 投注的结算皆以球赛所规定的完场时间90分钟为准。</p>
                <p>3. 如果赛事在90分钟结束前取消或中断，那已有明确结果并且之后没有任何显著会影响赛事结果的注单将会结算，其他所有注单将会被视为无效。</p>
                <p>足球滚球让球盘：</p>
                <p>1. 根据盘口让球信息预测，从投注当时到赛事结束最终获得胜利的球队。</p>
                <p>2. 投注的结算皆以球赛所规定的完场时间90分钟为准。</p>
                <p>3. 如果赛事在90分钟结束前取消或中断，那已有明确结果并且之后没有任何显著会影响赛事结果的注单将会结算，其他所有注单将会被视为无效。</p>
                <p>大小：</p>
                <p>1. 预测赛事总入球数将大于或小于在盘口指定的大/小盘球数。</p>
                <p>2. 如果赛事的总入球数多于盘口的大/小盘球数，则为大盘。如果少于盘口的大/小盘球数，则为小盘。</p>
                <p>3. 所有注单将按盘口开出的大/小盘球数在玩法的时节结束后结算。</p>
                <p>单双：</p>
                <p>1. 预测90分钟内，赛事总入球对单或双。</p>
                <p>2. 若最终比分为：0-0，将会按照“双”来计算。</p>
                <p>波胆：</p>
                <p>1. 预测一场特定赛事中相关时间段的准确比分。</p>
                <p>2. "任何其他比分"是指任何的比分，而不是一个市场选项列表中已存在的类型。</p>
                <p>净胜值：</p>
                <p>净胜值是指一个用数字价值来区分赛事获胜者和其他参与者比分或进球的差值，例如：比分或进球差值越大，净胜值就越高。</p>
                <p>如果赛事结局是平局，将会根据平分或“0-0”进行结算。</p>
                <p>半场/全场：</p>
                <p>预测赛事的半/全场结果。</p>
                <p>双重机会：</p>
                <p>1. 在三种可能出现的赛果中选择两种进行投注; 主场赢或打平（1和X）, 客场赢或打平（2和X）或主场或客场赢（1和2）。 共有三种选择: 1 X, X 2, 1 2</p>
                <p>2. 如果比赛在中立场进行﹐列在盘面的上方球队则被视为主队。</p>
                <p>3. "1" 代表: 主场赢。</p>
                <p>4. "X" 代表: 平手。</p>
                <p>5. "2" 代表: 客场赢。</p>
                <p>胜负平让球盘：</p>
                <p>1. 这是一个类似于标准让球盘的盘口，不同的是它包括平局的投注类型。</p>
                <p>2. 让球（-1）- 如果您的球队以2个或更多净胜球赢得比赛，您就获胜。</p>
                <p>3. 平局：如果球队在让1球（-1）的情况下以1球赢得比赛，您就获胜。</p>
                <p>4. 让球（+1） 如果您的球队是平局或赢得比赛，您就获胜</p>
                <p>总进球数：</p>
                <p>1. 预测全场两队的总入球数。</p>
                <p>2. 全场总入球数注单结算是根据全场“90分钟”为准。</p>
                <h3>什么是并列名次（冠军）规则？</h3>
                <p>并列名次规则适用于所有多个获胜者或冠军的市场（以市场显示信息为准），例如一场赛事的盘口产生2名或者以上的获胜者，那么赢利金额将减少。计算方法是将本金除以获胜者人数，然后乘以原赔率。这部分本金及赢利将返还给会员，剩余的本金将输掉。</p>
                <h3>连串投注是指什么？</h3>
                <p>连串过关（Parlay）：采用欧洲赔率【包含本金】-- 选择二个或更多的赛事在一个单一的注单中，每一个选择连串投注的赛事必须获胜此连串的注单才视为赢，只要其中有一场赛事输，注单为输。</p>
                <h3>复式连串投注是指什么？</h3>
                <p>复式连串过关，是指将多场赛事串做多个单式连串过关，至少3场最多8场。复式连串过关可以容错，如果有一场比赛赛果为输，那么所有包含该比赛的单式连串全部算输扣除本金，其它单式连串继续计算输赢。</p>
              </div>
              <!--藍球-->
              <div ng-show="tutorials.subpageId == 2" aria-hidden="true" class="ng-hide">
                <h3>篮球的结算以什么时间为准？</h3>
                <p>篮球的结算以上下半场完赛为准，投注在全场或下半场都包括加时赛，只投注第四节不包括加时赛。</p>
                <h3>赛事中断怎么办？</h3>
                <p>如果赛事是在上半场中断，所有上半场的注单将被视为无效。如果赛事是在下半场中断，所有上半场的投注保持有效，但所有下半场的注单将被视为无效。</p>
                <h3>投注篮球多久可以结算？</h3>
                <p>体育类投注结算基本都一致，单场赛事投注会在赛事结束后15到30分钟内完成确认赛果并返彩，连串投注一般会在最后一场连串过关赛事结束2小时内，官方公布结果后进行派彩，有些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。</p>
                <h3>投注盘口类型</h3>
                <p>1x2（独赢盘）：</p>
                <p>1. 预测哪一支球队将在比赛胜出。盘口提供两支球队为投注选项。</p>
                <p>2. 赛事盘口包括全场、半场或单节投注。</p>
                <p>让球盘：</p>
                <p>1. 预测哪一支球队在盘口指定的让分球数在半场/全场/赛事单节赢得比赛。</p>
                <p>2. 如果赛事在下半场取消或中断，所有上半场注单保持有效。</p>
                <p>3. 如果赛事在下半场取消或中断，所有下半场注单将被视为无效。</p>
                <p>4. 赛事盘口包括全场、半场或单节投注。</p>
                <p>总分大/小：</p>
                <p>1. 预测比赛双方总比分将大于或小于在盘口指定的大/小盘分数。</p>
                <p>2. 赛事盘口包括全场、半场或单节投注。</p>
                <p>3. 如果赛事中断，除已经有明确赛果并且之后没有任何显著会影响赛事结果的情况注单才会被结算，其他投注将视为无效</p>
                <p>单节最高得分球队：</p>
                <p>1. 预测单节最高得分的球队。</p>
                <p>2. 加时赛不计算在内。</p>
                <p>3. 如果赛事中断，所有单节最高得分球队的注单将被视为无效。</p>
                <p>4. 如果赛事在4节完场时间以及加时赛内没有球队得分，所有最后单节最高得分球队的注单将被视为无效。</p>
                <p>梦幻篮球游戏规则：</p>
                <p>1. 梦幻篮球游戏将从同一天的赛事中任意选择两个球队（且原定不是在同一场赛事比赛的球队）进行投注。</p>
                <p>2. 梦幻比赛赛果会根据球队真实的比分为准；梦幻比赛的让分数则以球队真实比分来计算。</p>
                <p>3. 梦幻赛中的两支球队必须在同一天比赛，投注才被视为有效。</p>
                <p>4. 如果球队的比赛时间和本公司网站显示的时间不同，所有涉及此球队的梦幻赛注单将被视为无效。</p>
                <p>5. 梦幻赛投注将不考虑赛事实际进行的场地。</p>
                <p>6. 梦幻赛的举例如下:</p>
                <p>7. 波士顿凯尔特人101 – 98 芝加哥公牛，洛杉矶湖人118 – 101 奥兰多魔术</p>
                <p>8. 梦幻赛1： 波士顿凯尔特人vs 洛杉矶湖人</p>
                <p>9. 梦幻赛赛果：波士顿凯尔特人 101 – 118洛杉矶湖人</p>
                <p>10. 梦幻赛的结算会根据各球队原定比赛的真实得分为准。</p>
                <p>11. 球队一定要实际完成原定比赛并且已在赛事的官方机构（例如：NBA）留下赛果记录，才能让涉及此球队的梦幻赛注单保持有效。如果球队没有完成原定比赛或最终赛果被官方否定，所有涉及此球队的梦幻赛注单将被视为无效。</p>
              </div>
              <!--網球-->
              <div ng-show="tutorials.subpageId == 3" aria-hidden="true" class="ng-hide">
                <h3>网球比赛结算方式？</h3>
                <p>1. 男子组比赛：五盘中先赢三盘的球员，为胜方。</p>
                <p>2. 女子组比赛：三盘中先赢两盘的球员，为胜方。</p>
                <h3>球员没有参与比赛？</h3>
                <p>如果投注的球员没有参与比赛，所有投注此球员的注单将被取消。</p>
                <h3>球员被取消资格或提前退出？</h3>
                <p>如果一名球员或组合在比赛未结束前退出或被取消资格，所有该场比赛的注单将被取消，除非另有注明。</p>
                <h3>比赛被中断怎么办？</h3>
                <p>如果赛事延期或中断，只要比赛最后有完成，所有投注将保持有效。</p>
                <h3>投注盘口类型</h3>
                <p>独赢盘：</p>
                <p>预测哪一位球员将在比赛胜出。盘口提供两位球员为投注选项。</p>
                <p>让盘：</p>
                <p>预测哪一位球员在盘口指定的让盘数赢得比赛。</p>
                <p>让局：</p>
                <p>1. 预测哪一位球员在盘口指定的让局数在某个时节（例如:全场比赛/第一盘/第二盘）赢得最多局。</p>
                <p>2. 决胜局(抢七局)将视为一局。</p>
                <p>总局数大小：</p>
                <p>1. 预测比赛中的某个时节（例如:全场比赛/第一盘/第二盘）进行的总局数将大于或小于在盘口指定的大/小盘局数。</p>
                <p>2. 决胜局(抢七局)将视为一局。</p>
                <p>3. 如果比赛中断前已有明确结果并且之后没有任何显著会影响赛事结果的情况，大/小盘注单才会被结算。若遇到任何其他情况，注单将一律被取消。</p>
                <p>总局数单双：</p>
                <p>1. 预测比赛中的某个时节（例如:全场比赛/第一盘/第二盘）进行的总局数是单数或双数。</p>
                <p>2. 决胜局(抢七局)将视为一局。</p>
              </div>
              <!--其他-->
              <div ng-show="tutorials.subpageId == 4" aria-hidden="true" class="ng-hide">
                <h3>体育游戏有哪些规定？</h3>
                <p>1. 所有投注项目的最高和最低投注额将由公司决定，如有任何更改无需提前通知。</p>
                <p>2. 如果比赛或赛事取消，中断或延迟并且没有在官方指定开球时间的36小时内重新开始，所有该场赛事的投注即被视为无效且取消。</p>
                <p>3. 赛果均在赛事结束后判定，赛果公布72小时后，若对任何赛果有争议，本公司将不认可。在赛果公布72小时内，除了任何体育纪律委员会所重新裁决之赛果，本公司只会修正人为、系统或参考赛果的相关网页失误等原因的错误。</p>
                <h3>什么是棒球的上下半场？</h3>
                <p>1. 上半场投注是按照第1局到第5局的结果为准。</p>
                <p>2. 下半场投注是按照第6局到第9局的结果为准。出于结算的用意，下半场的加时(局)赛将计算在内。</p>
                <h3>棒球游戏投注是否包含加时？</h3>
                <p>棒球投注在结算时, 加时(局)赛将计算在内。</p>
                <h3>体育投注中的金融投注怎么计算？</h3>
                <p>新九州体育博彩页面的金融投注市场会员可以预测不同的金融市场收盘后的最后一个数字（不包括小数部分）。</p>
                <h3>体育投注中的金融单双是什么？</h3>
                <p>1. 单：1、3、5、7、9</p>
                <p>2. 双：0、2、4、6、8</p>
              </div>
            </div>
            <!--真人問題-->
            <div class="main_txt ng-hide" ng-show="tutorials.helpIndex == 1" aria-hidden="true">
              <!--百家樂-->
              <div ng-show="tutorials.subpageId == 1" aria-hidden="false" class="">
                <h3>百家乐介绍</h3>
                <p>百家乐是一种简单的纸牌游戏，庄闲各首发两张手牌。双方最多三张牌，玩家可押注于【庄】或【闲】，点数最接近9点的一方即获胜，也可押注【和】局（即庄家和闲家的牌总点数相同）。</p>
                <h3>百家乐牌面</h3>
                <p>公仔牌（J、Q、K）和10计算为0点，A是1点，其他牌按面值计算点数，每手牌的点值按照牌面总和的最后一位数字计算，比如，一手牌为K、9、9，点值为8（0+9+9=18）。</p>
                <h3>投注类型及赔付</h3>
                <p>1. 庄家赢: 1赔0.95</p>
                <p>2. 闲家赢: 1赔1</p>
                <p>3. 和局: 1赔8</p>
                <p>百家乐第三张牌规则</p>
                <p>百家乐的第三张牌规则是用来决定庄家和闲家什么时候补第三张牌，规则如下：</p>
                <table>
                  <thead>
                    <tr>
                      <td colspan="2">闲家</td>
                      <td colspan="2">庄家</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>起手牌点数总和</td>
                      <td>补牌规则</td>
                      <td>起手牌点数总和</td>
                      <td>补牌规则</td>
                    </tr>
                    <tr>
                      <td>0</td>
                      <td>须补牌</td>
                      <td>0</td>
                      <td>须补牌</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>须补牌</td>
                      <td>1</td>
                      <td>须补牌</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>须补牌</td>
                      <td>2</td>
                      <td>须补牌</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>须补牌</td>
                      <td>3</td>
                      <td>当闲家补得第三张牌是8，不须补牌；其余则须补牌</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>须补牌</td>
                      <td>4</td>
                      <td>当闲家补得第三张牌是0.1.8.9，不须补牌；其余则须补牌</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>须补牌</td>
                      <td>5</td>
                      <td>当闲家补得第三张牌是0.1.2.3.8.9，不须补牌；其余则须补牌</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>不须补牌</td>
                      <td>6</td>
                      <td>当闲家补得第三张牌是0.1.2.3.4.5.8.9，不须补牌；其余则须补牌</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>不须补牌</td>
                      <td>7</td>
                      <td>不须补牌</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>天生赢家</td>
                      <td>8</td>
                      <td>天生赢家</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>天生赢家</td>
                      <td>9</td>
                      <td>天生赢家</td>
                    </tr>
                  </tbody>
                </table>
                <h3>百家乐牌面</h3>
                <p>百家乐中的对子是指，庄家或闲家首发两张牌是一对，称之为对子。</p>
                <h3>百家乐游戏中的单双是指什么？</h3>
                <p>百家乐游戏中的单双是指牌局最终点数，类型分为：庄单，庄双，闲单，闲双</p>
                <p>1. 单：1、3、5、7、9</p>
                <p>2. 双：0、2、4、6、8</p>
                <h3>百家乐游戏中的大小是指什么？</h3>
                <p>百家乐游戏中大小是指总发牌数，总发牌数4张为“小”；总发牌数5或者6张为“大”</p>
                <h3>什么是任意对子？</h3>
                <p>任意对子指庄或闲的首发两张牌为同数字</p>
                <h3>什么是完美对子？</h3>
                <p>完美对子指庄或闲的首发两张牌为同花色且同数字</p>
                <h3>什么是免佣百家乐？</h3>
                <p>超6百家乐也称为免佣百家乐，是由传统百家乐演变而来，两者的玩法非常相似，不同的是免佣百家乐增加了一项超6的特别投注，以及投注庄</p>
                <p>家免抽水，即投注庄家的赔率有别于传统百家乐为1赔1.</p>
                <p>免佣百家乐中，如果投注庄家以6点获胜怎么赔付？</p>
                <p>如果投注庄家且以6点获胜，则按2赔1进行赔付，其他点获胜，按1赔1赔付免抽水。如果选择押超6（即庄家6点赢），则按1赔12赔付免抽水。</p>
                <h3>什么是龙宝百家乐？</h3>
                <p>龙宝百家乐和传统的版本相似，唯一不同的是玩家可以投注边注，我们称为庄龙宝或闲龙宝，赔率将根据赢的点数和类型而有不同，请参考以下表格</p>
                <table>
                  <tbody>
                    <tr>
                      <td>是否搏牌</td>
                      <td>赢得对方点数</td>
                      <td>赔付</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>9</td>
                      <td>30:1</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>8</td>
                      <td>10:1</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>7</td>
                      <td>6:1</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>6</td>
                      <td>4:1</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>5</td>
                      <td>2:1</td>
                    </tr>
                    <tr>
                      <td>搏牌</td>
                      <td>4</td>
                      <td>1:1</td>
                    </tr>
                    <tr>
                      <td colspan="2">不搏牌情况下获胜</td>
                      <td>1:1</td>
                    </tr>
                    <tr>
                      <td colspan="3">注备：搏牌是指庄闲任意一家有获得第三方牌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--21點-->
              <div ng-show="tutorials.subpageId == 2" aria-hidden="true" class="ng-hide">
                <h3>二十一点介绍</h3>
                <p>黑杰克，又称为二十一点，是世界上最受欢迎的一种桌面游戏。黑杰克是一个庄家和玩家（多个玩家）共同参与竞技的纸牌游戏，是指玩家和庄家对比点数，而玩家和其他玩家将不会做任何的对比。游戏的目标是使用手中的牌点数之和不超过21点且尽量最大。</p>
                <p>黑杰克前身就是二十一点，游戏的起源地并没有统一说法。起初二十一点在美国并不流行，因此赌场试着提供各种额外的奖金吸引玩家参与牌局。</p>
                <p>其中之一的额外奖金是当玩家手中同时拥有黑桃A和黑色J（黑桃J或梅花J都可以）时，奖金将会变成10倍。</p>
                <p>这样的牌被称为“黑杰克”，而这个名字就渐渐称为二十一点游戏的名称，即使后来这项额外奖金规则停止，“黑杰克”名称还是继续存在。规则发展到今日，黑杰克指的是任何一个A加上一个十或者公仔牌组成的组合。</p>
                <h3>二十一点牌面</h3>
                <p>公仔牌（J、Q、K）和10计算为10点，A可当做1点或者11点，其他牌按面值计算点数。</p>
                <p>牌面点数超过21点怎么办？</p>
                <p>如果牌局点数超过21点即为爆牌，无论庄家是什么牌型您都为输。</p>
                <h3>赔付介绍</h3>
                <p>1. 玩家一般获胜赔付1赔1</p>
                <p>2. 玩家通过“黑杰克”获胜1赔1.5。（黑杰克是指，首发两张牌是任何一个A加上一个十或者公仔牌组成的组合。）</p>
                <h3>庄家规则介绍</h3>
                <p>二十一点游戏中，庄家没有选择权利，当庄家牌面小于或者等于16点时必须要牌，当庄家牌面大于或者等于17点时必须停牌</p>
                <h3>玩家规则介绍</h3>
                <p>玩家在游戏中，可以获得多种选择类型，可通过当时的牌局做出必要的抉择。</p>
                <p>1. 要牌：玩家可随时要牌</p>
                <p>2. 停牌：玩家可随时要求停牌</p>
                <p>3. 加注：发了首两张牌后，如手牌为硬牌9点，10点或11点(硬牌即该手牌没有A牌)，可以把初始注金增加一倍作投注，但只能要一张牌，所有注金一赔一。</p>
                <p>4. 保险：庄家首张牌面是A时，用初始注金的一半投注保险，庄家是BJ时，保险注金一赔二。如果庄家不是BJ即为输的。</p>
                <p>5. 分牌： 玩家初始两张牌面值相同可进行分牌，两张牌将分开为两手牌，分牌的投注金相等于初始下注金额。本游戏同一局每手牌不接受再分牌。如玩家分牌后任何一手牌获得10点+A牌组合的手牌，并不以Blackjack计算，只按普通21点1:1赔付玩家。</p>
              </div>
              <!--骰寶-->
              <div ng-show="tutorials.subpageId == 3" aria-hidden="true" class="ng-hide">
                <h3>骰宝介绍</h3>
                <p>骰宝，也成为幸运骰子或买大小，骰宝是一种古老的中国骰子游戏。字面意思骰宝是指“珍贵的骰子”，买大小的意思是“大或小”。游戏是使用三个骰子和一个桌面上投注区域组成，每一个区域代表着不同的骰子结果或组合。</p>
                <p>骰宝游戏历史可以追溯到上百年，很久很久以前据说人们是用砖头代替骰子。这些砖头骰子被染上符号，在碗里摇来摇去，然后掷到地上查看符合或数字的组合。玩家猜测正确的符合或数字。随着时间的推移，砖头骰子变成现在的骰子，同时骰宝游戏通过网络传递到全世界，成为今天最受欢迎的游戏之一。</p>
                <h3>骰宝投注类型</h3>
                <p>小：总点数为4至10，围骰除外。</p>
                <p>大：总点数为11至17，围骰除外。</p>
                <p>单：总点数为5, 7, 9, 11, 13, 15, 17，围骰除外。</p>
                <p>双：总点数为4, 6, 8, 10, 12, 14, 16，围骰除外。</p>
                <p>对子：投注的两个点数(双骰)必须在结果内出现</p>
                <p>围骰：投注出现指定的三颗相同骰子。</p>
                <p>全围：投注出现任何的三颗相同骰子。</p>
                <p>单骰点数：投注1到6任意点数。如果投注的点数出现1次，赔率1：1，如果出现2次，赔率2：1，如果出现3次，赔率3：1.</p>
                <p>两颗骰组合：投注1到6任意两个点数。投注的两个点数必须在结果内出现。</p>
                <h3>骰宝游戏中出现围骰怎么办？</h3>
                <p>当游戏结果出现围骰，投注（大／小 ）或（单／双）项目均作为输计算。</p>
              </div>
              <!--輪盤-->
              <div ng-show="tutorials.subpageId == 4" aria-hidden="true" class="ng-hide">
                <h3>轮盘介绍</h3>
                <p>轮盘不仅仅是一个简单的娱乐场游戏，它也是一款最有活力的游戏。今天我们了解的第一种形式的轮盘是在18世纪法国，距今已经有很长的时间。轮盘的投注方式多样，新九州的真人视讯轮盘代表着顶尖的经典娱乐场游戏。由于这些原因，使轮盘成为在线玩家首选的游戏之一，我们真人视讯目标是给玩家提供最好的在线轮盘体验。</p>
                <h3>轮盘玩法</h3>
                <p>轮盘中转轮有 37个槽，号码为0，1到36。下注结束後，荷官会把轮盘向一个方向转动，然後把象牙制滚球抛到轮盘的外侧，让滚球在轮盘内转动多周後慢慢停下来，并降落在其中一个细沟内为该局结果。 轮盘投注类型</p>
                <table>
                  <tbody>
                    <tr>
                      <td style="width:100px">投注类型</td>
                      <td>说明</td>
                    </tr>
                    <tr>
                      <td>直接注</td>
                      <td>您可以投注包括 0在内的任意一个数位。下注时将筹码放到那个数位的中心 (如8丶23或35)。</td>
                    </tr>
                    <tr>
                      <td>分注</td>
                      <td>您可以投注於两个号码之间的格线上 (如2和3，或13和16)。</td>
                    </tr>
                    <tr>
                      <td>街注</td>
                      <td>您可以投注三个号码。将筹码押在轮盘桌上有三个数位那一行顶部的那条边线上即可 (如7丶8和9)。</td>
                    </tr>
                    <tr>
                      <td>三数</td>
                      <td>您可以投注於 0, 1, 2或0, 2, 3的交接区域。</td>
                    </tr>
                    <tr>
                      <td>角注</td>
                      <td>您也可以将筹码放到四个数位方框交差的那个角区以下注那四个数位 (如19丶20丶22和23)。</td>
                    </tr>
                    <tr>
                      <td>四个号码</td>
                      <td>您可将筹码放到 0和3交线的左侧以下注数位 0, 1, 2 和3。</td>
                    </tr>
                    <tr>
                      <td>线注</td>
                      <td>您可将筹码下注到两行相交的最顶部的交点处 ， 您可以赌两个街注，也就是两行的六个数位。 (如28丶29丶30及31丶32丶33便组成一条Line)。</td>
                    </tr>
                    <tr>
                      <td>列注</td>
                      <td>桌上每列数位底部都有带‘ 2 比 1 ' 字样的方框，一共有三个。 如果被击中的号码是那一列中的数位，那麽您就按 1:2 的比率赢钱。这种赌区不包括 0，若开0则通杀。 (如：3丶6丶9丶12丶15丶18丶21丶24丶27丶30丶33丶36)。</td>
                    </tr>
                    <tr>
                      <td>下注一打</td>
                      <td>您可以将筹码下到有 ”1st 12”，”2nd 12”和”3rd 12 “字样的赌区以同时下注 12个数位 (分别为1-12丶13-24及25-36)，若开0则通杀。</td>
                    </tr>
                    <tr>
                      <td>红色 /黑色</td>
                      <td>投注中彩号码将为红色或是黑色的，共投注十八个数位。(若开0则通杀)。</td>
                    </tr>
                    <tr>
                      <td>双数 / 单数</td>
                      <td>投注中彩号码将为单数或是双数，共投注十八个数位。(若开0则通杀)。</td>
                    </tr>
                    <tr>
                      <td>大 / 小</td>
                      <td>投注中彩号码将算小 (1-18)或是算大(19-36)，共十八个数位。(若开0则通杀)。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--彩票问题-->
            <div class="main_txt ng-hide" ng-show="tutorials.helpIndex == 2" aria-hidden="true">
              <!--快樂彩-->
              <div ng-show="tutorials.subpageId == 1" aria-hidden="false" class="">
                <h3>快乐彩介绍</h3>
                <p>快乐彩传统玩法是玩家从号码01到80任意选择1到10个不等的号码，快乐彩系统会从80个号码中随机抽出20个开奖号码。</p>
                <p>然后玩家挑选的数字与系统官方开奖结果号码比对是否获奖。</p>
                <h3>提供哪些快乐彩市场？</h3>
                <p>快乐彩提供中国（北京）、加拿大、加拿大西部、澳洲、斯洛伐克地区及LB KENO彩票自主开发市场</p>
                <h3>投注类型及说明</h3>
                <p>1. 大小/总数810: 开奖结果20个号码总和大于810的数值(大), 开奖结果20个号码总和小于810的数值(小) 或等于810 (总和810)。</p>
                <p>2. 单双: 开奖结果20个号码总和的最后一个数字是奇数还是偶数。</p>
                <p>3. 奇,偶,和: 开奖结果20个号码中, 如果有超过10个单数则为奇数, 投注奇为赢; 如果开奖结果20个号码中, 有超过10个双数则为偶数, 投注偶为赢。如果开奖结果的20个号码中,刚好有10个单数及10个偶数,
                  投注和为赢。</p>
                <p>4. 大小和单双连串: 例如, 大/单是指开奖结果20个号码的总额大于810同时总和的最后一个数字是单数. 其他组合您可以投注大/双、小/单、小/双。</p>
                <p>5. 上,下,和: 开奖结果的20个号码,其中有超过10个数字范围落在01到40(上) 或41到80(下), 刚好有10个数字范围落在01到40以及10个数字范围落在41到80(和)。</p>
                <p>6. 五行: 预测开奖结果20个号码的总和范围在指定的范围名称。一共有5个不同的范围名称可以投注: 210-695 (金), 696-763 (木),764-855 (水), 856-923 (火) 和 924-1410
                  (土)。</p>
                <p>7. 珠仔: 玩家可以从01到80个号码中选择1到5个号码. 快乐彩官方系统会从01到80个号码中开出20个号码. 派彩方式是按照玩家选择的号码跟开奖结果符合个数计算,号码顺序排列并无限制。</p>
              </div>
              <!--時時彩-->
              <div ng-show="tutorials.subpageId == 2" aria-hidden="true" class="ng-hide">
                <h3>时时彩介绍</h3>
                <p>新九州时时彩是由5位数投注的中国数字游戏，由中国重庆、天津和新疆官方彩票所提供的5个数字球为正式结果。结算以官方彩票网站特定时间及各自的开奖结果，由右至左的确切顺序组合的5个数字为依据。</p>
                <p>若彩票官网没有在24小时内提供官方开奖结果，所有下注于该期的注单将被取消并返回本金。</p>
                <p>在彩票结果公布于24小时后官方若有任何修改，将不予认可。</p>
                <h3>投注类型及说明</h3>
                <p>新九州提供多种时时彩投注玩法，主要包括选号玩法，和数玩法，以及两面玩法，详细规则，您可以点击以下链接进行了解 玩法规则链接：</p>
                <a href="http://lt.groom88.net/charon/#/rule/3081976/CQSC/zh-cn"
                  target="_blank">http://lt.groom88.net/charon/#/rule/3081976/CQSC/zh-cn</a>
              </div>
              <!--北京PK拾彩-->
              <div ng-show="tutorials.subpageId == 3" aria-hidden="true" class="ng-hide">
                <h3>北京PK拾介绍</h3>
                <p>北京PK拾是由中国福利彩票发行，北京福利彩票发行中心承销。</p>
                <p>每日共开奖179期、每5分钟开奖1次。</p>
                <p>开奖时间：早上9点至晚上12点。如开奖时间异动以中国福利彩票管理中心公告为准。</p>
                <p>官方网站：http://www.bwlc.net/</p>
                <h3>投注类型及说明</h3>
                <p>新九州提供多种北京PK拾投注玩法，主要包括单码/双面玩法，冠亚军玩法，以及选号玩法，详细规则，您可以点击以下链接进行了解 玩法规则链接：
                  <a href="http://lt.groom88.net/charon/#/rule/3081976/BJPK/zh-cn"
                    target="_blank">http://lt.groom88.net/charon/#/rule/3081976/BJPK/zh-cn</a>
                </p>
              </div>
              <!--六合彩-->
              <div ng-show="tutorials.subpageId == 4" aria-hidden="true" class="ng-hide">
                <h3>香港六合彩介绍</h3>
                <p>香港六合彩是基于由香港奖券管理局发行的乐透彩票。6个正式号码+1个特码是从49个号码中选出，结算以官方网站特定时间及开奖结果为依据。</p>
                <p>每期六合彩开奖球数共七颗(包括特码)，开出的前6个号码叫正码或者平码，开出的最后一码为特别号或特码。</p>
                <h3>香港六合彩开奖时间？</h3>
                <p>六合彩的开奖时间为每周2，周4，周6，21:30进行开奖。</p>
                <h3>如何查询六合彩官方结果？</h3>
                <p>香港六合彩官方网址：
                  <a href="http://bet.hkjc.com/marksix/default.aspx" target="_blank">http://bet.hkjc.com/marksix/default.aspx</a>
                </p>
                <h3>投注类型及说明</h3>
                <p>新九州提供多种香港六合彩投注玩法，主要包括特码，平码，生肖，以及色波等，详细规则您可以点击以下链接进行了解 玩法规则链接：
                  <a href="http://lt.groom88.net/charon/#/rule/3081976/LT/zh-cn"
                    target="_blank">http://lt.groom88.net/charon/#/rule/3081976/LT/zh-cn</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tutorials:{
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tutorials_right {
    background: #fff;
    border-right: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    margin: 0;
    padding: 0;
    width: 50%;
    float: left;
    table, td, th {
      text-align: center;
      border: 1px solid #2293fc;
      border-collapse: collapse;
    }
    .tutorials_right_row {
      .tutorials_right_Top {
        text-align: center;
        vertical-align: middle;
        .tutorials_right_Top_navbar {
          background: url(./images/nav_bg.png) 50% no-repeat;
          background-size: 100% 100%;
          margin-top: 35px;
          height: 50px;
          .divline {
            text-align: center;
            vertical-align: middle;
            line-height: 50px;
            margin: 0 3em;
            &:before {
              content: "";
              position: absolute;
              top: 1.7em;
              left: -5em;
              width: 4em;
              height: .1em;
              background: #e7e7e7;
              z-index: 2;
            }
            &:first-child:before {
              display: none;
            }
            span {
              padding-left: 30%;
              font-size: 16px;
            }
          }
          .tutorials_right_Top_navbar_gameTab {
            outline: none;
            ul a {
              color: #787878;
            }
            .dotline {
              font-size: 1px;
              font-weight: 100;
            }
            .actionDotline {
              color: #2293fc;
            }
            &.tutorials_right_Top_navbar_casino_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/casino_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/casino_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .casino {
                position: absolute;
                left: -20px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                background-size: 100% 100%;
                display: none;
                ul {
                  font-size: 16px;
                  color: #787878;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                    &:hover {
                      color: #2293fc;
                    }
                  }
                }
              }
              &:hover .casino {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_esports_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/esports_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/esports_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
            }
            &.tutorials_right_Top_navbar_lottery_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/lottery_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/lottery_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .lottery {
                position: absolute;
                left: -15px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                display: none;
                ul {
                  color: #787878;
                  font-size: 16px;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                  }
                  a:hover {
                    color: #2293fc;
                  }
                }
              }
              &:hover .lottery {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_sport_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/sport_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/sport_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .sport {
                position: absolute;
                left: -20px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                background-size: 100% 100%;
                display: none;
                ul {
                  font-size: 16px;
                  color: #787878;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                    &:hover {
                      color: #2293fc;
                    }
                  }
                }
              }
              &:hover .sport {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_esport_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/esports_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/esports_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
            }
          }
        }
      }
      .tutorials_right_middle {
        padding: 50px;
        padding-top: 0;
        margin: 20px 0;
        .subject, h5 {
          padding-top: 40px;
          text-align: center;
          font-weight: 700;
          font-size: 16px;
          color: #2293fc;
        }
        .sub_title, h3 {
          font-size: 16px;
          font-weight: 700;
          margin-top: 1em;
          line-height: 1.1;
          color: inherit;
          margin-bottom: 10px;
        }
        p {
          margin: 20px 0;
          font-size: 14px;
          color: #787878;
          line-height: 1.5;
        }
        ul {
          margin-left: 50px;
          list-style-type: decimal;
          > li {
            margin-bottom: 10px;
            line-height: 22px;
            list-style: none;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
</style>


