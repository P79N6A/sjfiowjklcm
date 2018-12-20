<template>
  <div class="app-container">
    <tree-table :data="data" :columns="columns" border/>
  </div>
</template>

<script>
import treeTable from "./components/TreeTable";
export default {
  components: {
    treeTable
  },
  data() {
    return {
      columns: [
        {
          text: "页面地址",
          value: "url",
          width: 200
        },
        {
          text: "名称",
          value: "name"
        },
        {
          text: "创建时间",
          value: "createTime"
        },
        {
          text: "备注",
          value: "description"
        }
      ],
      data: [
        {
          name: "首页",
          url: "/index",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "老虎机大厅",
          url: "/slot",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "真人大厅",
          url: "/real",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "体育大厅",
          url: "/sport",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "棋牌大厅",
          url: "/chess",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "彩票",
          url: "/lottery",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "优惠大厅",
          url: "/promos",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "下载中心",
          url: "/download",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "vip专属福利",
          url: "/vip",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "代理加盟",
          url: "/Cooperation",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "关于我们",
          url: "/about",
          createTime: "2018-12-12",
          description: "无",
          children: [
            {
              name: "平台介绍",
              url: "/aboutus",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "服务优势",
              url: "/service",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "隐私保护",
              url: "/protect",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "理性博彩",
              url: "/play",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "女郎福利",
              url: "/girls",
              createTime: "2018-12-12",
              description: "无"
            }
          ]
        }
      ]
    };
  }
};
</script>
