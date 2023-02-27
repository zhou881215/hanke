<!--
 * @Author: Cram
 * @Date: 2022-06-28 10:01:48
-->
<template>
  <el-menu
    class="left-menu"
    :default-active="currentIndex"
    :collapse-transition="false"
    router
  >
    <el-menu-item index="1" :route="{ name: 'product' }">
      <el-icon><GoodsFilled /></el-icon>
      <template #title>产品中心</template>
    </el-menu-item>
    <el-menu-item
      v-if="userInfo.userRank === '1'"
      index="2"
      :route="{ name: 'user' }"
    >
      <el-icon><Avatar /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item index="3" :route="{ name: 'composite' }">
      <el-icon><Tickets /></el-icon>
      <template #title>综合查询</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts" name="LeftMenu">
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { GoodsFilled, Avatar, Tickets } from "@element-plus/icons-vue";
import type { IUserInfo } from "../../../api/loginApi";
const staticNavIndex = {
  product: "1",
  user: "2",
  composite: "3",
};
const router = useRouter();
const { href } = router.currentRoute.value as any;
const currentHash: "product" | "user" | "composite" = href.split("/")[1];
const currentIndex: Ref<string> = ref(staticNavIndex[currentHash]);

const userInfo: IUserInfo = inject("userInfo", {} as IUserInfo);
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
