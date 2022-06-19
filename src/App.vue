<!--
 * @Author: Cram
 * @Date: 2022-06-15 15:41:52
-->
<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { UserLocal } from "./store/loginStore";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const router = useRouter();

onMounted(() => {
  const localUserInfo: string | null = localStorage.getItem(UserLocal);
  if (!localUserInfo) {
    router.push({ name: "login" });
  }
});
</script>
