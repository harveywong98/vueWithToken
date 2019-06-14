import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import store from "../store/store";

Vue.use(Router);
const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.state.token) {
      next({
        path: "/Login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

export default router;
