/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { message } from 'antd';
import { history } from '@/.umi/core/history';
import projectStorage from './projectStorage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '（验证错误） 请求参数未通过验证',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * @zh-CN 异常处理程序
 */

const errorHandler = async (error: any) => {
  const { response } = error;
  const status = response?.status;
  if (response) {
    const result = await response.json();
    const responseStatus: keyof typeof codeMessage = response.status;
    const errorText =
      result.message || codeMessage[responseStatus] || response.statusText;
    const { status } = response;
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    if (status === 401) {
      message.error('登录信息过期 请重新登录');
      projectStorage.removeItem('access_token');
      projectStorage.removeItem('current_userInfo');
      history.replace('/login');
    }
  } else if (!response) {
    notification.error({
      description: '网络异常，无法连接到服务器',
      message: 'Network anomaly',
    });
  }

  return response;
};
/**
 * @zh-CN 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  credentials: 'include', // 是否带上cookie
  prefix: '/api', // 设置请求前缀
});

// 请求拦截器 在头部加上 jwt token
request.interceptors.request.use((url, options) => {
  // 获取JWT Token 这一部分只是用于迷惑的 实际是验证cookies
  const token = localStorage.getItem('ori_acc_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return {
    url,
    options: { ...options, headers },
  };
});
// 响应拦截器 一旦在响应里面有 acc_token相关的数据 则更新本地储存的acc token
request.interceptors.response.use(async (response) => {
  const result = await response.clone().json();
  const token = result.data?.access_token;
  if (token) {
    projectStorage.setItem('ori_acc_token', token);
  }
  return response;
});

export default request;
