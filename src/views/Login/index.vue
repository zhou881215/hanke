<!--
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
-->
<template>
  <div class="login-wrapper">
    <div class="login-header">
      <div class="logo-img">
        <Logo />
      </div>
    </div>
    <div class="login-main">
      <el-form :model="loginForm">
        <el-form-item>
          <el-input
            v-model="loginForm.loginId"
            placeholder="账号"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.loginPwd"
            placeholder="密码"
            type="password"
            :prefix-icon="Lock"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item class="remember">
          <div class="flex-layout">
            <el-checkbox v-model="remember" label="记住密码" size="large" />
            <router-link :to="{ name: 'recover' }">忘记密码?</router-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="full-btn"
            type="primary"
            :loading="userLoading"
            size="large"
            :disabled="!(loginForm.loginId && loginForm.loginPwd)"
            @click="submitForm"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="register">
            还没有账号？
            <router-link :to="{ name: 'register' }">马上注册</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <Copyright />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import type { ILoginData } from "../../api/login";

const router = useRouter();
const store = useStore();

const userLoading = computed(() => store.state.loginUser.userLoading);

const loginForm: ILoginData = reactive({
  loginId: "",
  loginPwd: "",
});
const remember = ref<boolean>(false);
const submitForm = async () => {
  const user = await store.dispatch("loginUser/loginIn", loginForm);
  if (user) {
    router.push({ name: "product" });
  } else {
    ElMessage.error("账号或密码错误");
  }
};
</script>

<style scoped lang="less" src="./index.less"></style>
