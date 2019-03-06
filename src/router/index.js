import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'entry',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/documentation/index'),
  //     name: 'Documentation',
  //     meta: {
  //       title: 'documentation',
  //       icon: 'documentation',
  //       noCache: true
  //     }
  //   }]
  // },
  {
    path: '/entry',
    component: () => import('@/views/entry/index'),
    redirect: '/entry/projects',
    hidden: true,
    name: 'entry',
    meta: {
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
        path: 'user',
        component: () => import('@/views/users/setting'),
        name: 'UserSetting',
        meta: {
          title: 'UserSetting',
          noCache: true
        }
      },
      {
        path: 'projects',
        component: () => import('@/views/projects/index'),
        name: 'UserProjects',
        meta: {
          title: 'UserProjects',
          noCache: true
        }
      },
      {
        path: 'message',
        component: () => import('@/views/messages/index'),
        name: 'UserMessage',
        meta: {
          title: 'UserMessage',
          icon: 'email',
          noCache: true
        }
      },
      {
        path: 'requirement',
        component: () => import('@/views/requirement/index'),
        name: 'Userrequirement',
        meta: {
          title: 'Userrequirement',
          icon: 'email',
          noCache: true
        }
      }
    ]
  }
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/guide/index'),
  //     name: 'Guide',
  //     meta: {
  //       title: 'guide',
  //       icon: 'guide',
  //       noCache: true
  //     }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  //   {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [{
  //     path: 'page',
  //     component: () => import('@/views/permission/page'),
  //     name: 'PagePermission',
  //     meta: {
  //       title: 'pagePermission',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   },
  //   {
  //     path: 'directive',
  //     component: () => import('@/views/permission/directive'),
  //     name: 'DirectivePermission',
  //     meta: {
  //       title: 'directivePermission'
  //       // if do not set roles, means: this page does not require permission
  //     }
  //   }
  //   ]
  // },
  {
    path: '/messages',
    component: Layout,
    meta: {
      authorities: [120201]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/messages/index'),
      name: 'messages',
      meta: {
        title: '站内信',
        icon: 'email',
        authorities: [120201]
      }
    }]
  },
  {
    path: '/requirement',
    component: Layout,
    meta: {
      authorities: [120301]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/requirement/index'),
      name: 'requirement',
      meta: {
        title: '需求列表',
        icon: 'tree',
        authorities: [120301]
      }
    }]
  },
  {
    path: '/project',
    component: Layout,
    meta: {
      authorities: [120301]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/projects/index'),
      name: 'projects',
      meta: {
        title: '项目列表',
        icon: 'tree',
        authorities: [120301]
      }
    }]
  },
  {
    path: '/datas',
    component: Layout,
    meta: {
      title: '数据管理',
      icon: 'nested',
      authorities: [110301, 110201, 100201]
    },
    children: [{
        path: 'moedls',
        component: () => import('@/views/models/index'),
        name: 'models',
        meta: {
          title: '数据模型',
          icon: 'nested',
          authorities: [110301]
        }
      }, {
        path: 'categories',
        component: () => import('@/views/categories/index'),
        name: 'categories',
        meta: {
          title: '数据集合',
          icon: 'nested',
          authorities: [110201]

        }
      },
      {
        path: 'index',
        component: () => import('@/views/contents/index'),
        name: 'contents',
        hidden: true,
        meta: {
          title: '数据内容',
          icon: 'nested',
          authorities: [100201]
        }
      }
    ]
  },
  {
    path: '/accounts',
    component: Layout,
    meta: {
      title: '账号管理',
      icon: 'peoples',
      authorities: [110501, 109001]

    },
    children: [{
      path: 'roles',
      component: () => import('@/views/roles/index'),
      name: 'roles',
      meta: {
        title: '权限角色',
        icon: 'password',
        authorities: [110501]
      }
    }, {
      path: 'users',
      component: () => import('@/views/users/index'),
      name: 'users',
      meta: {
        title: '后台用户',
        icon: 'peoples',
        authorities: [109001]

      }
    }]
  },
  {
    path: '/preview',
    // component: {
    //   template: '<router-view></router-view>'
    // },
    hidden: true,
    component: () => import('@/views/pages/views.vue')
  },
  {
    path: '/pages',
    component: Layout,
    meta: {
      title: '页面管理',
      icon: 'table',
      authorities: [110801, 110901, 120101]
    },
    children: [{
        path: 'index',
        component: () => import('@/views/frames/index.vue'),
        name: 'frames',
        meta: {
          title: '框架列表',
          noCache: true,
          authorities: [110801]
        }
      },
      {
        path: 'layout',
        component: () => import('@/views/layouts/index.vue'),
        name: 'layout',
        meta: {
          title: '页面内容',
          noCache: true,
          authorities: [110901]
        }
      },
      {
        path: 'page',
        component: () => import('@/views/pages/index.vue'),
        name: 'page',
        meta: {
          title: '页面列表',
          noCache: true,
          authorities: [120101]
        }
      }
    ]
  },
  {
    path: '/games',
    component: Layout,
    meta: {
      authorities: [100401]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/games/index'),
      name: 'games',
      meta: {
        title: '游戏库',
        icon: 'documentation',
        authorities: [100401]
      }
    }, {
      path: 'platform',
      component: () => import('@/views/games/platforms.vue'),
      name: 'platform',
      hidden: true,
      meta: {
        title: '游戏平台',
        icon: 'documentation',
        authorities: [100401]
      }
    }]
  },
  {
    path: '/items',
    component: Layout,
    meta: {
      authorities: [120201]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/items/index'),
      name: 'messages',
      meta: {
        title: '游戏大厅',
        icon: 'email',
        authorities: [120201]
      }
    }]
  },
  // {
  //   path: '/promos',
  //   component: Layout,
  //   meta: {
  //     authorities: [100401]
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/promos/index'),
  //     name: 'promos',
  //     meta: {
  //       title: '优惠列表',
  //       icon: 'documentation',
  //       authorities: [100401]
  //     }
  //   }]
  // },
  {
    path: '/components',
    component: Layout,
    meta: {
      authorities: [100401]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/components/index'),
      name: 'components',
      meta: {
        title: '功能组件',
        icon: 'documentation',
        authorities: [100401]
      }
    }]
  },
  {
    path: '/ishows',
    component: Layout,
    meta: {
      authorities: [120301]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/ishow/index'),
      name: 'ishows',
      meta: {
        title: 'H5组件',
        icon: 'tree',
        authorities: [120301]
      }
    }]
  },
  // {
  //   path: '/ishowsDesign',
  //   component: {
  //     template: '<router-view></router-view>'
  //   },
  //   hidden: true,
  //   meta: {
  //     authorities: [120301]
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/ishow/design'),
  //     name: 'ishowsDesign',
  //     meta: {
  //       title: '自定义组件库编辑',
  //       icon: 'documentation',
  //       authorities: [120301]
  //     }
  //   }]
  // },
  {
    path: '/design',
    component: {
      template: '<router-view></router-view>'
    },
    hidden: true,
    meta: {
      authorities: [120301]
    },
    children: [{
        path: 'compc',
        component: () => import('@/views/design/index'),
        name: 'design',
        meta: {
          title: '自定义组件库编辑',
          icon: 'documentation',
          authorities: [120301]
        }
      },
      {
        path: 'commobile',
        component: () => import('@/views/design/mobile'),
        name: 'designMobile',
        meta: {
          title: '自定义组件库编辑',
          icon: 'documentation',
          authorities: [120301]
        }
      },
      {
        path: 'layoutdesign',
        component: () => import('@/views/layouts/design.vue'),
        name: 'layoutDesign',
        hidden: true,
        meta: {
          title: '布局设置',
          noCache: true,
          authorities: [110901]
        }
      }, {
        path: 'layoutDesignMobile',
        component: () => import('@/views/layouts/designMobile.vue'),
        name: 'layoutDesignMobile',
        hidden: true,
        meta: {
          title: '布局设置',
          noCache: true,
          authorities: [110901]
        }
      },
      {
        path: 'design',
        component: () => import('@/views/frames/design.vue'),
        name: 'frameDesign',
        hidden: true,
        meta: {
          title: '布局框架',
          noCache: true,
          authorities: [110801]
        }
      }, {
        path: 'designMobile',
        component: () => import('@/views/frames/designMobile.vue'),
        name: 'frameDesignMobile',
        hidden: true,
        meta: {
          title: '布局内容',
          noCache: true,
          authorities: [110801]
        }
      },
    ]
  },

  {
    path: '/imgs',
    component: Layout,
    meta: {
      authorities: [100401]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/imgs/index'),
      name: 'imgs',
      meta: {
        title: '图片库',
        icon: 'documentation',
        authorities: [100401]
      }
    }]
  },
  {
    path: '/svgs',
    component: Layout,
    meta: {
      authorities: [100401]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/svgs/index'),
      name: 'svgs',
      meta: {
        title: '形状库',
        icon: 'documentation',
        authorities: [100401]
      }
    }]
  },
  {
    path: '/medias',
    component: Layout,
    meta: {
      authorities: [100401]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/medias/index'),
      name: 'medias',
      meta: {
        title: '文件中转站',
        icon: 'documentation',
        authorities: [100401]
      }
    }]
  },
  {
    path: '/site-set',
    component: Layout,
    meta: {
      authorities: [110101]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/site-set/index'),
      name: 'SiteSet',
      meta: {
        title: '网站配置',
        icon: 'component',
        authorities: [110101]
      }
    }]
  },
  {
    path: '/config',
    component: Layout,
    meta: {
      authorities: [110101]
    },
    children: [{
      path: 'index',
      component: () => import('@/views/config/index'),
      name: 'Config',
      meta: {
        title: '项目配置',
        icon: 'component',
        authorities: [110101]
      }
    }]
  },
  // {
  //   path: '/users',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/users/index'),
  //     name: 'users',
  //     meta: {
  //       title: '后台用户',
  //       icon: 'peoples',
  //       authorities: [110600, 110601]

  //     }
  //   }]
  // },
  // {
  //   path: '/roles',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/roles/index'),
  //     name: 'roles',
  //     meta: {
  //       title: '权限角色',
  //       icon: 'password',
  //       authorities: [110500, 110501]

  //     }
  //   }]
  // },
  // {
  //   path: '/codepage',
  //   component: Layout,
  //   redirect: '/codepage/edit',
  //   meta: {
  //     icon: 'table',
  //     title: 'codepage',
  //     authorities: [999]
  //     // roles: ['admin'] // or you can only set roles in sub nav
  //   },
  //   children: [{
  //     path: 'codeedit',
  //     component: () => import('@/views/codepen/index.vue'),
  //     name: 'codeedit',
  //     meta: {
  //       title: 'codeedit',
  //       noCache: true
  //     }
  //   }]
  // },
  // {
  //   path: '/links',
  //   component: Layout,
  //   alwaysShow: true, // will always show the root menu
  //   redirect: '/links/index',
  //   meta: {
  //     icon: 'table',
  //     title: 'links',
  //     authorities: [999]
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/links/index.vue'),
  //     name: 'LinksList',
  //     meta: {
  //       title: 'LinksList',
  //       noCache: true
  //     }
  //   }]
  // },

  // {
  //   path: '/layoutpage',
  //   component: Layout,
  //   // alwaysShow: true, // will always show the root menu
  //   redirect: '/layoutpage/list',
  //   meta: {
  //     title: 'layoutpage',
  //     icon: 'table',
  //     // roles: ['admin'] // or you can only set roles in sub nav
  //   },
  //   children: [{
  //       path: 'list',
  //       component: () => import('@/views/layoutPage/LayoutList.vue'),
  //       name: 'LayoutList',
  //       meta: {
  //         title: 'LayoutList',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'widget',
  //       component: () => import('@/views/layoutPage/LayoutWidget.vue'),
  //       name: 'LayoutWidget',
  //       meta: {
  //         title: 'LayoutWidget',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'design',
  //       component: () => import('@/views/layoutPage/LayoutDesign.vue'),
  //       name: 'LayoutDesign',
  //       meta: {
  //         title: 'LayoutDesign',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   meta: {
  //     authorities: [999]
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/svg-icons/index'),
  //     name: 'Icons',
  //     meta: {
  //       title: 'icons',
  //       icon: 'icon',
  //       noCache: true
  //     }
  //   }]
  // },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example',
  //     authorities: [999]
  //   },
  //   children: [{
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: {
  //         title: 'createArticle',
  //         icon: 'edit'
  //       }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: {
  //         title: 'editArticle',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: {
  //         title: 'articleList',
  //         icon: 'list'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   meta: {
  //     authorities: [999]
  //   },
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/tab/index'),
  //     name: 'Tab',
  //     meta: {
  //       title: 'tab',
  //       icon: 'tab'
  //     }
  //   }]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [{
  //     path: '401',
  //     component: () => import('@/views/errorPage/401'),
  //     name: 'Page401',
  //     meta: {
  //       title: 'page401',
  //       noCache: true
  //     }
  //   },
  //   {
  //     path: '404',
  //     component: () => import('@/views/errorPage/404'),
  //     name: 'Page404',
  //     meta: {
  //       title: 'page404',
  //       noCache: true
  //     }
  //   }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'log',
  //     component: () => import('@/views/errorLog/index'),
  //     name: 'ErrorLog',
  //     meta: {
  //       title: 'errorLog',
  //       icon: 'bug'
  //     }
  //   }]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel',
  //     authorities: [999]
  //   },
  //   children: [{
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: {
  //         title: 'exportExcel'
  //       }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: {
  //         title: 'selectExcel'
  //       }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: {
  //         title: 'uploadExcel'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'zip',
  //     icon: 'zip',
  //     authorities: [999]

  //   },
  //   children: [{
  //     path: 'download',
  //     component: () => import('@/views/zip/index'),
  //     name: 'ExportZip',
  //     meta: {
  //       title: 'exportZip'
  //     }
  //   }]
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/theme/index'),
  //     name: 'Theme',
  //     meta: {
  //       title: 'theme',
  //       icon: 'theme'
  //     }
  //   }]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/clipboard/index'),
  //     name: 'ClipboardDemo',
  //     meta: {
  //       title: 'clipboardDemo',
  //       icon: 'clipboard'
  //     }
  //   }]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/i18n-demo/index'),
  //     name: 'I18n',
  //     meta: {
  //       title: 'i18n',
  //       icon: 'international'
  //     }
  //   }]
  // },
  // {
  //   path: '/setting',
  //   component: Layout,
  //   // hidden: true,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/users/setting'),
  //     name: 'setting',
  //     meta: {
  //       title: '账户设置',
  //       icon: 'international',
  //       authorities: [109000,109001]
  //     }
  //   }]
  // },

  {
    path: 'external-link',
    component: Layout,
    meta: {
      authorities: [999]
    },
    children: [{
      path: 'https://itgo88.com',
      meta: {
        title: '官网',
        icon: 'link'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
