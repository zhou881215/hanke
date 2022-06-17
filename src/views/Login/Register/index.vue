<!--
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
-->
<template>
  <div class="login-wrapper">
    <div class="login-header">register</div>
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
            placeholder="账号"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPwd">
          <el-input
            v-model="registerForm.loginPwd"
            placeholder="密码"
            :prefix-icon="Lock"
            type="password"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPwdAgain">
          <el-input
            v-model="registerForm.loginPwdAgain"
            placeholder="确认密码"
            :prefix-icon="Lock"
            type="password"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPhone">
          <el-input
            v-model="registerForm.loginPhone"
            placeholder="11位手机号"
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
              :disabled="authCodeFlag"
              @click="getCode"
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
              size="large"
              @click="handlerRegister(registerFormRef)"
            >
              注册
            </el-button>
            <router-link to="/login">使用已有账户登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      Copyright © 2022 瀚科检测 All rights reserved.
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { FormInstance, ElMessage } from "element-plus";
import { User, Lock, Phone, Document } from "@element-plus/icons-vue";
import { IRegisterInfo, rules } from "./constant";

const router = useRouter();
const store = useStore();

const registerFormRef = ref<FormInstance>();

const registerForm: IRegisterInfo = reactive({
  loginId: "",
  loginPwd: "",
  loginPwdAgain: "",
  loginPhone: "",
  loginAuth: "",
});

const authCodeFlag = ref<boolean>(false);
const authCodeText = ref<string>("获取验证码");

const getCode = () => {
  authCodeFlag.value = true;
  let count = 5;
  authCodeText.value = count + "s";
  const timer = setInterval(() => {
    count--;
    authCodeText.value = count + "s";
    if (count <= 0) {
      authCodeFlag.value = false;
      authCodeText.value = "获取验证码";
      clearInterval(timer);
    }
  }, 1000);
};

const handlerRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      const user = await store.dispatch("loginUser/loginIn", registerForm);
      if (user) {
        ElMessage.success("注册成功");
        router.push("/login");
      } else {
        ElMessage.error("注册失败");
      }
    }
  });
};
</script>

<style scoped lang="less" src="./index.less"></style>
