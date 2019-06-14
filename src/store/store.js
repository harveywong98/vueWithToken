import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import { loginByUsername } from "../api/login";
import { setToken } from "../utils/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  getters: {
    [types.LOGIN]: (state, value) => {
      state.token = value;
    },
    [types.USERINFO]: (state, info) => {
      state.userInfo = info;
    },
    [types.LOGINSTATUS]: (state, bool) => {
      state.loginStatus = bool;
    },
    [types.TOKEN]: state => state.token
  },
  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        let t = {name:username,password:userInfo.password};
        loginByUsername(t)
          .then(response => {
            const data = response.data.token;
            console.log("token 是 "+data);
            commit("SET_TOKEN", data);
            setToken(response.data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
