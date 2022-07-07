<!--
 * @Author: Cram
 * @Date: 2022-06-28 10:01:48
-->
<template>
  <el-menu
    class="left-menu"
    default-active="1"
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
  </el-menu>
</template>

<script setup lang="ts" name="LeftMenu">
import { inject } from "vue";
import { GoodsFilled, Avatar } from "@element-plus/icons-vue";
import type { IUserInfo } from "../../../api/loginApi";

const userInfo: IUserInfo = inject("userInfo", {} as IUserInfo);
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
