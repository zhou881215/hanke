<!--
 * @Author: Cram
 * @Date: 2022-06-18 03:44:12
-->
<template>
  <div class="main-wrapper">
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
        v-if="userInfo.userRank"
        index="2"
        :route="{ name: 'user' }"
      >
        <el-icon><Avatar /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
    </el-menu>
    <div class="right-layout">
      <div class="top-tool">
        <div class="tool-logo"><Logo /></div>
        <div class="tool-btn">
          用户名：{{ userInfo.userName }}； 用户等级：{{
            userInfo.userRank ? "管理员" : "用户"
          }}
          <el-button
            type="primary"
            size="small"
            :loading="userLoading"
            :icon="SwitchButton"
            @click="handleLoginOut"
          >
            退出
          </el-button>
        </div>
      </div>
      <div class="main-area">
        <router-view :userInfo="userInfo" />
      </div>
      <Copyright />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { GoodsFilled, Avatar, SwitchButton } from "@element-plus/icons-vue";
import { UserLocal } from "../../store/loginStore";
import type { IUserInfo } from "../../store/loginStore";

const router = useRouter();
const store = useStore();

const userLoading: ComputedRef<boolean> = computed(
  () => store.state.loginStore.userLoading
);

/**
 * 用户
 */
const userInfo: ComputedRef<IUserInfo> = computed(() => {
  const localUserInfo: string | null = localStorage.getItem(UserLocal);
  try {
    return JSON.parse(localUserInfo as string);
  } catch (error) {
    return {};
  }
});

/**
 * 退出
 */
const handleLoginOut = async () => {
  await store.dispatch("loginStore/loginOut");
  router.push({ name: "login" });
};
</script>

<style scoped lang="less" src="./index.less"></style>
