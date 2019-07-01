<template>
  <div id="app">
      <div>
        <el-menu router
                 unique-opened
                 menu-trigger='click'
                 class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">导航到Home</el-menu-item>
          <el-menu-item index="/about">导航到About</el-menu-item>
          <el-menu-item index="/login">导航到Login</el-menu-item>
        </el-menu>
      </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
