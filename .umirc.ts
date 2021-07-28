/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/login',
      component: '../pages/Login',
    },
  ],
  fastRefresh: {},
  mfsu: {},
  theme: {
    'primary-color': '#06b799',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:5001/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  publicPath: '/',
});
