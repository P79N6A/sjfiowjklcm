<template>
  <!-- ctype,id,position,width -->
  <div
    class="ishow-elementWrapper"
    v-bind:id="showId"
    v-bind:ctype="type"
    :style="{
          top: cursorTop + 'px',
          left: cursorLeft + 'px',
          width: elWidth + 'px',
          height: elHeight + 'px',
          zIndex:zIndex,
          transform:'rotate('+rotate+'deg)'
        }"
    :class="{cursor:childJson.onClick}"
  >
    <!-- {{childJson.onClick}} -->
    <!-- 各种样式 -->
    <div
      v-if="type===1"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem" v-html="content"></div>
      </div>
    </div>
    <!-- 图片 -->
    <div
      v-if="type===2"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem">
          <img
            :src="content"
            alt
            class="ishow-elementItem_img ishow-elementItem_drap"
            :style="{
                    width: elWidth + 'px',
                    height: elHeight + 'px'
                  }"
          >
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div
      v-if="type===3"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem ishow-elementItem_drap">
          <textarea
            :name="json.form.name"
            :placeholder="json.form.cname"
            class="ishow-elementItem_textarea"
            :style="{
                    width: elWidth + 'px',
                    height: elHeight + 'px'
                  }"
          ></textarea>
        </div>
      </div>
    </div>
    <!-- 单选 -->
    <div
      v-if="type===4"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem ishow-elementItem_drap ishow-elementItem_radio tl">
          <div
            class="ishow-elementItem_title"
            v-html="json.form.cname"
            :style="{'background-color':json.text.themeColor}"
          ></div>
          <el-radio-group :class="{vertical:json.form.dire==='v'}" value="[]">
            <el-radio v-for="radioItem in json.form.options" :key="radioItem.id">{{radioItem}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 多选 -->
    <div
      v-if="type===5"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem ishow-elementItem_drap ishow-elementItem_checkbox tl">
          <div
            class="ishow-elementItem_title"
            v-html="json.form.cname"
            :style="{'background-color':json.text.themeColor}"
          ></div>
          <el-checkbox-group :class="{vertical:json.form.dire==='v'}">
            <el-checkbox
              v-for="radioItem in json.form.options"
              :label="radioItem.id"
              :key="radioItem.id"
            >{{radioItem}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!-- 下拉框 -->
    <div
      v-if="type===6"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem ishow-elementItem_drap ishow-elementItem_select tl">
          <el-select
            :value="json.form.options[json.form.selectedVal]"
            :style="{'font-size':json.text.fontSize+'px'}"
          >
            <el-option
              v-for="(selectItem,selectIndex) in json.form.options"
              :key="selectIndex"
              :label="selectItem"
              :value="selectIndex"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      v-if="type===7"
      v-bind:style="[textJson,animateJson,modifyData]"
      class="ishow-elementWrapper_main"
    >
      <div class="element-contents text-item">
        <div class="ishow-elementItem ishow-elementItem_drap ishow-elementItem_button tc">
          <a
            class="ishow-elementItem_button_a"
            :href="json.form.link"
            :style="{
                    width: elWidth + 'px',
                    height: elHeight + 'px',
                    'line-height':elHeight + 'px',
                    color:json.text.color
                  }"
          >{{json.form.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @input="changeText"
// v-html="content"
// import bus from 'views/ishow/js/bus';
const specialName = ["typewriter"];
export default {
  data() {
    return {
      json: this.parseJson(this.childJson),
      showId: 0,
      textJson: "",
      animateJson: "",
      animateAll: true,
      animateIndex: 0,
      cursorTop: 0,
      cursorLeft: 0,
      modifyData: {},
      isAuto: false,
      content: this.childJson.content,
      elWidth: this.childJson.width,
      elHeight: this.childJson.height,
      zIndex: this.childJson.zIndex,
      isActive: false,
      typewriter: {
        isActive: false,
        content: "",
        timer: null
      },
      isEditable: false,
      lastRange: "",
      caretPos: 0,
      rotate: 0
    };
  },
  props: ["childJson", "showJson", "type"],
  created() {
    // 设置showId
    // bus.$on('drap-size-update', function (w,h,t,l) {
    //     this.elWidth=w;
    //     this.elHeight=h;
    //     this.cursorTop=t;
    //     this.cursorLeft=l;
    // }.bind(this));
  },
  mounted() {
    this.initJson();
    const target = this.$el.querySelector(".ishow-elementWrapper_main");
    this.addAnimateEnd(target);
    // 首次加载播放全部动画
    this.playAnimate(false);
  },
  watch: {
    childJson: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.initJson();
        }
      },
      deep: true
    }
  },

  methods: {
    // 初始化
    initJson() {
      this.json = JSON.parse(JSON.stringify(this.childJson));
      this.showId = this.json.id;
      this.modifyJson();
      this.textJson = this.json.text;
      this.cursorTop = this.json.position.top;
      this.cursorLeft = this.json.position.left;
      this.zIndex = this.json.zIndex;
      this.elWidth = this.json.width;
      this.elHeight = this.json.height;
      this.content = this.json.content;
      this.rotate = this.textJson.rotate;
    },
    // 修正样式值
    modifyJson() {
      this.modifyData.opacity = this.json.text.opacity * 0.01;
      this.modifyData.boxShadow = this.handleShadowDire();
      for (const val in this.json.text) {
        if (
          val === "fontSize" ||
          val === "padding" ||
          val === "borderWidth" ||
          val === "borderRadius"
        ) {
          this.modifyData[val] = this.json.text[val] + "px";
        }
      }
    },
    whichAnimationEvent() {
      let t;
      const el = document.createElement("fakeelement");
      const animations = {
        animation: "animationend",
        Webkitanimation: "webkitAnimationEnd"
      };

      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    },
    addAnimateEnd(e) {
      const animationEvent = this.whichAnimationEvent();
      if (animationEvent) {
        e.addEventListener(animationEvent, e => {
          const animate = this.json.animate;
          const len = animate.length;
          // 判断播放全部动画时是最后一个结束||单个动画结束
          if (animate && len) {
            if (
              (this.animateAll === true &&
                e.animationName === animate[len - 1].animationName) ||
              this.animateAll === false
            ) {
              if (animate[len - 1].animationIterationCount != "infinite") {
                this.animateJson = {};
              }
            }
          }
        });
      }
    },
    // 播放动画
    playAnimate(index) {
      if (this.json.animate && this.json.animate.length) {
        if (index !== false) {
          // change
          this.animateAll = false;
          if (this.isSpecialAnimate(this.json.animate[index]) === false) {
            this.animateJson = this.addS(this.json.animate[index]);
          }
        } else {
          // preview
          this.animateAll = true;
          this.animateJson = this.renderAnimate();
        }
      }
    },
    // 添加单位s
    addS(json) {
      // console.log("adds");
      const data = this.parseJson(json);
      data.animationDuration = data.animationDuration + "s";
      data.animationDelay = data.animationDelay + "s";
      return data;
    },
    // 渲染全部动画
    renderAnimate() {
      const animate = this.parseJson(this.json.animate);
      const result = {
        "-webkit-animation-timing-function": "ease"
      };
      const delay = [],
        duration = [],
        name = [],
        mode = [],
        infinity = [];
      let delayTime;
      if (animate && animate.length) {
        for (let i = 0; i < animate.length; i++) {
          // 不是特殊动画
          // console.log(animate[i]);
          if (this.isSpecialAnimate(animate[i]) === false) {
            name.push(animate[i].animationName);
            duration.push(animate[i].animationDuration + "s");
            infinity.push(animate[i].animationIterationCount);
            // iterationCount.push(animate[i].animationIterationCount || 1);
            // 0%是否是opacity:0
            if (animate[i].isOut === true || i === 1) {
              mode.push("forwards");
            } else {
              mode.push("both");
            }

            // 判断延迟是否需要加前面的值
            if (i === 0) {
              delayTime = animate[i].animationDelay + "s";
            } else {
              delayTime =
                animate[i - 1].animationDelay +
                animate[i].animationDelay +
                animate[i - 1].animationDuration +
                "s";
            }

            delay.push(delayTime);
          }
        }
        result.animationName = name.join(",");
        result.animationDuration = duration.join(",");
        result.animationFillMode = mode.join(",");
        result.animationDelay = delay.join(",");
        result.animationIterationCount = infinity.join(",");
        // console.log(result);
        // result.animationIterationCount = iterationCount.join(',');
        return result;
      }
      return "";
    },
    // 判断是否是特殊动画，是：播放
    isSpecialAnimate(animate) {
      for (let i = 0; i < specialName.length; i++) {
        const type = specialName[i];
        const name = animate.animationName.split("j-");
        const data = this[type];
        // 判断是否是选中的特殊动画
        data.isActive = name.length >= 2 && name[1] === type;
        if (data.isActive) {
          clearInterval(data.timer);
          this.runSpecialAnimate(data, animate, name);
          return true;
        }
      }
      return false;
    },
    // 播放动画
    runSpecialAnimate(data, animate) {
      if (animate.animationName === "j-typewriter") {
        const arr = this.content.split("<br>");
        const brIndex = [];
        const duration = animate.animationDuration || 0.1;
        data.content = "";
        // 提取换行的位置
        for (let k = 0, len = arr.length; k < len; k++) {
          const index =
            k === 0 ? arr[k].length - 1 : brIndex[k - 1] + arr[k].length;
          brIndex.push(index);
        }
        // 延时
        setTimeout(() => {
          const content = arr.join("").split("");
          const len = arr.join("").length;
          let i = 0;
          let j = 0;
          // 定时循环
          data.timer = setInterval(() => {
            data.content += content[i];
            if (i === brIndex[j]) {
              data.content += "<br>";
              j++;
            }
            i++;
            if (i >= len) {
              clearInterval(data.timer);
              data.isActive = false;
            }
          }, duration * 1000);
        }, animate.animationDelay * 1000);
      }
    },
    // 处理阴影方向值
    handleShadowDire() {
      const width = this.json.text.shadowWidth;
      if (!width) {
        return "none";
      }
      const arr = [[1, -1], [-1, -1], [-1, 1], [1, 1]];
      const result = [];
      const dire = this.json.text.shadowDire;

      const arrVal = [[0, width], [width, 0], [0, -width], [-width, 0]];
      const angle = 90 / width;
      let index = Math.floor(dire / 90);
      const count = Math.floor((dire % 90) / angle);
      if (index === 4) {
        index = 0;
      }
      result[0] = arrVal[index][0] + arr[index][0] * count;
      result[1] = arrVal[index][1] + arr[index][1] * count;
      return (
        this.json.text.shadowColor +
        " " +
        result[0] +
        "px " +
        result[1] +
        "px " +
        this.json.text.shadowRadius +
        "px"
      );
    },
    // 转换showJson to renderJson
    converJson(data) {
      const result = {};
      for (let i = 0; i < data.length; i++) {
        result[data[i].id] = data[i];
      }
      return result;
    },
    // 深拷贝
    parseJson(json) {
      return JSON.parse(JSON.stringify(json));
    },
    // json是否相等
    jsonEq(val1, val2) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    },
    // 同步this.content
    changeText() {
      this.content = this.$el.querySelector(".ishow-elementItem").innerHTML;
    }
  }
};
</script>
<style lang="scss">
.cursor {
  cursor: pointer;
}
</style>