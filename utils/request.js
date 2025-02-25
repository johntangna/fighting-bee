import {
  HTTP_REQUEST_URL,
  HTTP_LOGIN_URL,
  TOKENNAME,
  HEADER
} from "@/config/app.js"
import {
  toLogin,
  checkLogin
} from '../libs/login';
import store from "@/store/index.js"

/**
 * 基础请求
 * @param url 请求基础连接
 * @param method 请发方法
 * @param data  请求数据
 * @param object noAuth 是否需要授权获取数据请求，noVerify是否需要验证进入，这个参数是想法
 */
function baseRequest(url, method, data, {
  noAuth = false,
  noVerify = false,
  loginState = false
}) {
  let Url = HTTP_REQUEST_URL,
    header = HEADER
  if (!noAuth) {
    // 登陆过期自动登陆
    if (!store.state.app.token && !checkLogin()) {
      // toLogin();
      return Promise.reject({
        msg: '未登陆'
      });
    }
  }

  if (store.state.app.token) header[TOKENNAME] = store.state.app.token;
  return new Promise((resolve, reject) => {
    uni.request({
      url: Url + '/' + url,
      method: method || 'GET',
      header: header,
      data: data || {},
      success: (res) => {
        if (noVerify) {
          resolve(res.data, res);
        } else if (res.data.status == 1 || res.data.code != 500) {
          resolve(res.data, res);
        } else if ([410000, 410001, 410002].indexOf(res.data.status) !== -1) {
          toLogin();
          reject(res.data);
        } else if (res.data.code == 401 || res.data.code == 500) {
          uni.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '我知道了'
          });
          reject(res.data);
        } else
          reject(res.data.msg || '系统错误');
      },
      fail: (msg) => {
        reject('请求失败');
      }
    })
  })
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});


// 封装请求暴露出来
export default request;