<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import {
    debounce
  } from '@/utils'

  const animationDuration = 3000

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          radar: {
            radius: '66%',
            center: ['50%', '42%'],
            splitNumber: 8,
            splitArea: {
              areaStyle: {
                color: 'rgba(127,95,132,.3)',
                opacity: 1,
                shadowBlur: 45,
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 15
              }
            },
            indicator: [{
                name: '首次加载',
                max: 10000
              },
              {
                name: '缓存加载',
                max: 10000
              },
              {
                name: '接口请求',
                max: 10000
              },
              {
                name: '图片加载',
                max: 10000
              },
              {
                name: '进入游戏',
                max: 10000
              },
              {
                name: '存款接口',
                max: 10000
              }
            ]
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['东北', '华东', '华北', '华中', '华南', '西南', '西北']
          },
          series: [{
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
              }
            },
            data: [{
                value: [3003, 7000, 1200, 1100, 1350, 1400],
                name: '东北'
              },
              {
                value: [3454, 9000, 7834, 1000, 3455, 8945],
                name: '华东'
              },
              {
                value: [5500, 3453, 4564, 3454, 5345, 1200],
                name: '华北'
              },
              {
                value: [5500, 1000, 2000, 2233, 9087, 1200],
                name: '华中'
              },
              {
                value: [5500, 9843, 4357, 5300, 1870, 2343],
                name: '华南'
              },
              {
                value: [5500, 2343, 8927, 1500, 1200, 8763],
                name: '西南'
              },
              {
                value: [5500, 1100, 1200, 1000, 1200, 3567],
                name: '西北'
              }
            ],
            animationDuration: animationDuration
          }]
        })
      }
    }
  }

</script>
