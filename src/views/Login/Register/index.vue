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
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="loginId">
          <el-input
            v-model="registerForm.loginId"
            placeholder="请输入账号"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPwd">
          <el-input
            v-model="registerForm.loginPwd"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPwdCheck">
          <el-input
            v-model="registerForm.loginPwdCheck"
            placeholder="确认密码"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPhone">
          <el-input
            v-model="registerForm.loginPhone"
            placeholder="请输入手机号"
            :prefix-icon="Phone"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginAuth">
          <div class="flex-layout">
            <el-input
              v-model="registerForm.loginAuth"
              placeholder="验证码"
              :prefix-icon="Document"
              size="large"
            />
            <el-button
              class="code-btn"
              size="large"
              :disabled="userLoading || !canSend"
              @click="getAuthCode(registerForm.loginPhone)"
            >
              {{ authCodeText }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="flex-layout">
            <el-button
              class="register-btn"
              type="primary"
              :loading="userLoading"
              size="large"
              @click="handlerRegister(registerFormRef)"
            >
              注册
            </el-button>
            <router-link :to="{ name: 'login' }">使用已有账户登录</router-link>
          </div>
        </el-form-item>
        <el-form-item class="register-tip">
          * 新注册用户需等管理员审核授权后，才能登录访问
        </el-form-item>
      </el-form>
    </div>
    <Copyright />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onUnmounted } from "vue";
import type { ComputedRef } from "vue";
import { useStore } from "vuex";
import type { ElForm } from "element-plus";
import { User, Lock, Phone, Document } from "@element-plus/icons-vue";
import useRule from "./useRule";
import useAuthCode from "./useAuthCode";
import type { IRegisterInfo } from "../../../api/loginApi";

const store = useStore();

const userLoading: ComputedRef<boolean> = computed(
  () => store.state.loginStore.userLoading
);

const registerFormRef = ref<InstanceType<typeof ElForm>>();

const registerForm: IRegisterInfo = reactive({
  loginId: "",
  loginPwd: "",
  loginPwdCheck: "",
  loginPhone: "",
  loginAuth: "",
});

/**
 * 表单验证规则
 */
const { rules, RegPhone } = useRule(registerForm);

/**
 * 验证码
 */
let { authCodeText, canSend, getAuthCode, timer } = useAuthCode(
  store,
  registerForm,
  RegPhone
);

const handlerRegister = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      store.dispatch("loginStore/userRegister", registerForm);
    }
  });
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="less" src="./index.less"></style>
