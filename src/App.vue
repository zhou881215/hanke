<!--
 * @Author: Cram
 * @Date: 2022-06-15 15:41:52
-->
<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { UserLocal } from "./store/constant";

const router = useRouter();

onMounted(() => {
  const localUserInfo: string | null = localStorage.getItem(UserLocal);
  if (!localUserInfo) {
    router.push({ name: "login" });
  }
});
</script>
