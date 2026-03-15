import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/index/index.vue')
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('../views/works/index.vue')
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/notes/index.vue')
  },
  {
    path: '/travel',
    name: 'Travel',
    component: () => import('../views/travel/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/index.vue'),
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/work',
  //   name: 'Work',
  //   component: () => import('../views/baohuhaiyang/haiyanqingfei.html')
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查页面是否需要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      // 如果未登录，重定向到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存目标路径，登录后跳转
      });
    } else {
      // 如果已登录，允许访问
      next();
    }
  } else {
    // 不需要身份验证的页面，直接允许访问
    next();
  }
});

export default router;
