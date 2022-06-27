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
        ref="recoverFormRef"
        :model="recoverForm"
        :rules="rules"
        status-icon
      >
        <el-form-item prop="loginPhone">
          <el-input
            v-model="recoverForm.loginPhone"
            placeholder="输入手机号"
            :prefix-icon="Phone"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginAuth">
          <div class="flex-layout">
            <el-input
              v-model="recoverForm.loginAuth"
              placeholder="验证码"
              :prefix-icon="Document"
              size="large"
            />
            <el-button
              class="code-btn"
              size="large"
              :disabled="userLoading || !canSend"
              @click="getAuthCode(recoverForm.loginPhone)"
            >
              {{ authCodeText }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item prop="loginPwd">
          <el-input
            v-model="recoverForm.loginPwd"
            placeholder="重置密码"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="loginPwdCheck">
          <el-input
            v-model="recoverForm.loginPwdCheck"
            placeholder="确认密码"
            :prefix-icon="Lock"
            type="password"
            autocomplete="off"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex-layout">
            <el-button
              class="register-btn"
              type="primary"
              :loading="userLoading"
              size="large"
              @click="handlerRecover(recoverFormRef)"
            >
              提交
            </el-button>
            <router-link :to="{ name: 'login' }">返回登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <Copyright />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onUnmounted } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import type { ElForm } from "element-plus";
import { Lock, Phone, Document } from "@element-plus/icons-vue";
import useRule from "../Register/useRule";
import useAuthCode from "../Register/useAuthCode";
import type { IRecoverInfo } from "../../api/loginApi";

const router = useRouter();
const store = useStore();

const userLoading: ComputedRef<boolean> = computed(
  () => store.state.loginStore.userLoading
);

const recoverFormRef = ref<InstanceType<typeof ElForm>>();

const recoverForm: IRecoverInfo = reactive({
  loginPwd: "",
  loginPwdCheck: "",
  loginPhone: "",
  loginAuth: "",
});

/**
 * 表单验证规则
 */
const { rules, RegPhone } = useRule(recoverForm);

/**
 * 验证码
 */
const { authCodeText, canSend, getAuthCode, timer } = useAuthCode(
  store,
  recoverForm,
  RegPhone
);

const handlerRecover = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const isSucceed: boolean = await store.dispatch(
        "loginStore/recoverPass",
        recoverForm
      );
      if (isSucceed) {
        ElNotification.success({
          title: "修改成功",
          message: "请牢记新密码",
        });
        router.push({ name: "login" });
      }
    }
  });
};

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
