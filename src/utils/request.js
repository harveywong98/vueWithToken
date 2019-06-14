import axios from "axios";
import { Message } from "element-ui";
import store from "../store/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: "http://210.46.141.35:8888", // api 的 base_url
  timeout: 30000,
  headers: {
    "Content-type": "application/json;charset=UTF-8"
  }
});

// 拦截器
service.interceptors.request.use(
  config => {
    if (store.state.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // console.log(store.getters.token);
      config.headers["Authorization"] = store.state.token;
    }
    console.log(store.state.token);
    return config;
  },
  error => {
    setTimeout(function() {
      store.dispatch("SetLoading", 0);
    }, 300);

    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    // const res = response.data
    const res = response;
    // 这里处理一些response 正常放回时的逻辑

    return res;
  },
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    store.dispatch("SetLoading", false);
    console.log(error);
    console.log("err123" + error.message); // for debug
    Message({
      message: "账号身份失效！",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
