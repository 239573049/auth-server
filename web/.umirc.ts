import { defineConfig } from 'umi';
import routes from './src/routers/index';

export default defineConfig({
  title: '统一授权中心',
  favicon:'favicon.ico',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
});
