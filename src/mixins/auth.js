export default {
  methods: {
    // 检查是否已登录
    isLoggedIn() {
      return sessionStorage.getItem('isLoggedIn') === 'true';
    },

    // 获取当前登录用户
    getCurrentUser() {
      return sessionStorage.getItem('username');
    },

    // 登出
    logout() {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('username');
      this.$router.push('/login');
    },

    // 检查登录状态，如果未登录则跳转到登录页面
    checkAuth() {
      if (!this.isLoggedIn()) {
        this.$router.push('/login');
        return false;
      }
      return true;
    }
  },

  created() {
    // 如果是受保护的组件，检查登录状态
    if (this.$options.requiresAuth) {
      this.checkAuth();
    }
  }
};