<!--
 * @Author: Cram
 * @Date: 2022-06-18 03:44:12
-->
<template>
  <div class="main-wrapper">
    <el-menu
      class="left-menu"
      :style="{ width: isCollapse ? '' : '230px' }"
      default-active="1"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <el-menu-item index="1" :route="{ name: 'product' }">
        <el-icon><GoodsFilled /></el-icon>
        <template #title>产品中心</template>
      </el-menu-item>
      <el-menu-item index="2" :route="{ name: 'user' }">
        <el-icon><Avatar /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
    </el-menu>
    <div class="right-layout">
      <div class="top-tool">
        <div class="collapse" @click="switchCollapse">
          <el-icon v-show="isCollapse"><Expand /></el-icon>
          <el-icon v-show="!isCollapse"><Fold /></el-icon>
        </div>
        <div class="tool-right">
          <div class="right-logo"><Logo /></div>
          <div class="right-btn">
            {{ userInfo.userName }}
            <el-button type="primary" size="small" @click="handleLoginOut">
              退出登录
            </el-button>
          </div>
        </div>
      </div>
      <div class="main-area"><router-view /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  GoodsFilled,
  Avatar,
  Expand,
  Fold,
  SwitchButton,
} from "@element-plus/icons-vue";
import { UserLocal } from "../../store/constant";

const router = useRouter();
const store = useStore();

/**
 * 伸缩
 */
const isCollapse = ref(false);
const switchCollapse = () => (isCollapse.value = !isCollapse.value);

/**
 * 用户
 */
const userInfo = computed(() => {
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
  await store.dispatch("loginUser/loginOut");
  router.push({ name: "login" });
};
</script>

<style scoped lang="less" src="./index.less"></style>
