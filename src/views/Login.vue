<template>
  <div>
    <input type="text" v-model="username" id="username" />
    <input type="password" v-model="password" id="password" />
    <button @click="mylogin">点击登录</button>
    <br />
    <span v-text="token"></span>
    <br />
    <button @click="getMsg">点击发送带 TOKEN 的请求</button>
  </div>
</template>

<script>
// import { loginByUsername as login } from "../api/login";
import { getMessage } from "../api/test";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      token: ""
    };
  },
  methods: {
    mylogin: function() {
      let t = {
        username: this.username,
        password: this.password
      };
      this.$store
        .dispatch("LoginByUsername", t)
        .then(() => {
          // this.$router.push({ path: this.redirect || '/' })
          // this.token = response.data.token;
        })
        .catch(() => {
          console.log("emmm");
        });

      // login({
      //   name: this.username,
      //   password: this.password
      // }).then(response => {
      //   this.token = response.data.token;
      // });
    },
    getMsg: function() {
      getMessage().then(Response => console.log(Response.data));
    }
  }
};
</script>

<style scoped></style>
