/*
 * @Author: Cram
 * @Date: 2022-06-15 15:41:52
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/Api": {
        target: "http://test.zanbox.net", // 请求路径/Api前面的都替换成这个
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""), // 把/api替换成''
      },
    },
  },
});
