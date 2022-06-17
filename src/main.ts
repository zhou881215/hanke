/*
 * @Author: cram
 * @Date: 2022-06-15 15:41:52
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus).use(router).use(store);
app.mount("#app");

// store.dispatch("loginUser/loginOrNot");
