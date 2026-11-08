import { createApp } from "vue";
import router from "./Router";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useStore } from "./Store";
import { setUnauthorizedHandler } from "./utils/request";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
setUnauthorizedHandler(() => {
  useStore().logout();
  router.replace("/login");
});
app.use(router); //路由挂载
app.use(ElementPlus);
app.mount("#app");
