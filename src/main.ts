/*
 * @Author: cram
 * @Date: 2022-06-15 15:41:52
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./styles/reset.css";
import "./styles/flexible.js";
/**
 * 全局组件
 */
import Copyright from "./components/common/Copyright.vue";
import Logo from "./components/common/Logo.vue";

const app = createApp(App);

/**
 * 注册全局组件
 */
for (const [key, component] of Object.entries(ElementIcons)) {
  app.component(key, component);
}
app.component("Copyright", Copyright);
app.component("Logo", Logo);

app.use(ElementPlus).use(router).use(store);
app.mount("#app");
