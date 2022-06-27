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
        <div class="tool-logo">
          <Logo @click="openDrawer" />
        </div>
        <div class="tool-btn">
          <span>用户名：{{ userInfo.userName }}； </span>
          <span>用户等级：{{ userInfo.userRank ? "管理员" : "用户" }}</span>
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
        <router-view />
      </div>
      <Copyright />
    </div>
    <el-drawer
      custom-class="phone-drawer"
      direction="ltr"
      size="50%"
      v-model="drawerFlag"
      :with-header="false"
    >
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GoodsFilled, Avatar, SwitchButton } from "@element-plus/icons-vue";
import { UserLocal } from "../../store/loginStore";
import type { IUserInfo } from "../../store/loginStore";
import useResize from "./useResize";

const router = useRouter();
const store = useStore();

const userLoading: ComputedRef<boolean> = computed(
  () => store.state.loginStore.userLoading
);

/**
 * 用户
 */
const userInfo: IUserInfo = ((): IUserInfo => {
  const localUserInfo: string | null = localStorage.getItem(UserLocal);
  try {
    return JSON.parse(localUserInfo as string);
  } catch (error) {
    return {} as IUserInfo;
  }
})();
provide("userInfo", userInfo);

/**
 * 退出
 */
const handleLoginOut = async () => {
  const isSucceed: boolean = await store.dispatch("loginStore/loginOut");
  if (isSucceed) {
    router.push({ name: "login" });
  }
};

/**
 * 尺寸响应
 */
const { phoneWidth, isPhone, recodeWidth, drawerFlag, openDrawer } =
  useResize();

onMounted(() => {
  if (document.documentElement.clientWidth <= phoneWidth) {
    isPhone.value = true;
  }
  window.addEventListener("resize", recodeWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", recodeWidth);
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
<style lang="less">
@import "../../styles/var.less";
@media (max-width: 768px) {
  .phone-drawer {
    background-color: #001529;

    .el-drawer__body {
      padding: 0;
    }
  }
}
</style>
