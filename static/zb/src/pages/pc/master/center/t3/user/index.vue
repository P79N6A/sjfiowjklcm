<template>
      <div class="user-page">
  	    <!-- <banner></banner> -->
        <div class="user-top">
          <info>
            <!-- 用户信息模块 -->
          </info>
        </div>
        <div class="user-content content">
          <user-menus>
            <!-- 左边的菜单内容 -->
          </user-menus>
          <div class="u-c-shows">
            <router-view>
              <!-- 路由内容区域 -->
            </router-view>
          </div>
        </div>
      </div>
</template>
<script>
  import info from './components/info' // 用户信息栏目
  // import games from './components/games' // 用户钱包数据
  import userMenus from './components/user-menus' // 用户菜单
  // import banner from "./components/banner/" //个人中心banner
  export default {
    name: "userMaster",
    data() {
      return {
        myData: []
      }
    },
    components: {
      info,
      // games,
      userMenus,
      // banner
    }
  }

</script>
<style lang="scss">
.user-page{
    // background:#202020;
    background: url('./images/bg2.jpg');
    padding-top: 43px;
    padding-bottom: 40px;
    // .user-content{
    //   // background:#202020;
    //   /*min-height:800px;
    //   display:flex;
    //   justify-content: space-between;*/
    // }
  .u-c-shows{
    width:100%;
    .userSet{
		display: flex;
    justify-content: space-between;
    .u-c-menu{
      margin-right: 20px;
      flex: 1;
      /*display:flex;
      justify-content:space-between;*/
      .u-c-router{
      	background-color: rgba(9, 11, 20, 0.70);;
      	display: block;
      	// width: 140px;
      	height: 60px;
      	line-height: 60px;
        border-bottom:1px solid #303030;
        font-size:16px;
        color:#fff;
        padding-left: 30px;
        position:relative;
        cursor:pointer;
          &:before{
            content:'';
            width:100%;
            background:none;
            height:5px;
            position:absolute;
            bottom:-4px;
            left:0;
          }
        &:hover,&.active{
          background: #0181fa; /* Old browsers */
					background: -moz-linear-gradient(left,  #0181fa 0%, #16d6ff 100%); /* FF3.6-15 */
					background: -webkit-linear-gradient(left,  #0181fa 0%,#16d6ff 100%); /* Chrome10-25,Safari5.1-6 */
					background: linear-gradient(to right,  #0181fa 0%,#16d6ff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0181fa', endColorstr='#16d6ff',GradientType=1 ); /* IE6-9 */
          .icobjh{
            color:#fff;
          }
        }
        .icobjh{
          color:#b4b4b4;
          margin-right:10px;
          font-size:26px;
          vertical-align:middle;
          height:40px;
          line-height:40px;
        }
      }
    }
		.u-c-box {
      flex: 4;
			width: 100%;
      background-color: rgba(9, 11, 20, 0.70);;
			border: 1px solid #303030;
      padding: 20px;
		}
	}
  }
  }
  

/*更改ui默认样式*/
.search .el-input__inner {
  border: none!important;
  background-color:#fff!important;
  color: #000!important;
}

.el-input-group__append{
  background: #0181fa!important;
  border: none!important;
  span{
    color: #fff!important;
  }
  i{
    color: #fff!important;
  }
}
.u-c-box .el-input__inner {
  border: none!important;
  background-color:#fff!important;
  color: #666!important;
}
.el-table th,.el-table tr ,.el-table,.el-table__expanded-cell{
  background-color: rgba(0,0,0,.1) !important;
}
.el-button--primary {
	background-color:#0181fa!important;
	border-color:#0181fa!important;
}
.el-radio__input.is-checked+.el-radio__label{
  color: #0181fa!important;
}
.el-radio__input.is-checked .el-radio__inner{
  border-color: #0181fa!important;
  background: #0181fa!important;
}
.el-radio.is-bordered.is-checked{
  border-color: #0181fa!important;
}
.el-form-item__label {
	color: #fff!important;
}
.el-button--text {
	color: #f6d48d!important;
}
.el-carousel__mask, .el-cascader-menu, .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header {
	background-color: rgba(0,0,0,0.9)!important; 
}
.el-collapse-item__wrap {
	background-color: rgba(0,0,0,0.7)!important; 
	.el-collapse-item__content {
		padding-bottom: 0!important;
		.letter-content {
			border:none!important;
			color: #fff!important;
			.html {
				border: none!important;
			}
		}
	}
}
.el-collapse-item__header {
	color: #fff!important;
}
.user-message .message-item .u-m-head .date{
	color: #fff!important;
}
.el-step__title.is-process {
	color: #fff!important;
}
</style>
