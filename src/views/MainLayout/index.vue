<!--
 * @Author: Cram
 * @Date: 2022-06-18 03:44:12
-->
<template>
  <div class="main-wrapper">
    <LeftMenu class="pc-menu" />
    <div class="right-layout">
      <div class="top-tool">
        <div class="tool-logo">
          <Logo @click="openDrawer" />
        </div>
        <div class="tool-btn">
          <span>用户名：{{ userInfo.userName }}； </span>
          <span
            >用户等级：{{ userInfo.userRank === "1" ? "管理员" : "用户" }}</span
          >
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
      <LeftMenu />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SwitchButton } from "@element-plus/icons-vue";
import { UserLocal } from "../../store/loginStore";
import type { IUserInfo } from "../../api/loginApi";
import LeftMenu from "./LeftMenu/index.vue";
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
  const localUserInfo: string | null = sessionStorage.getItem(UserLocal);
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
  const isSucceed: boolean = await store.dispatch("loginStore/loginOut", {
    ssid: userInfo.ssid,
  });
  isSucceed && router.push({ name: "login" });
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
    background-color: @DarkColor;

    .el-drawer__body {
      padding: 0;
    }
  }
}
</style>
