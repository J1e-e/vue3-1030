import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from "@/Store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../Views/Main.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("@/Views/login/index.vue"),
  },
  {
    path: "/menu",
    component: () => import("@/Views/menu.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    component: () => import("@/Views/login/register.vue"),
  },
  {
    path: "/cart",
    component: () => import("@/Views/cart.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLogin = store.isLogin;
  const WHITE_LIST = ["/login", "/register"];
  if (WHITE_LIST.includes(to.path)) {
    if (isLogin && to.path === "/login") return next("/menu");
    return next();
  }

  if (to.meta.requiresAuth && isLogin) return next();

  if (to.meta.requiresAuth && !isLogin) return next("/login");

  next();
});

export default router;
