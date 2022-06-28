<!--
 * @Author: Cram
 * @Date: 2022-06-19 18:42:48
-->
<template>
  <el-dialog
    v-model="props.userDialog"
    title="用户详情"
    :width="dialogWidth"
    :before-close="() => confirmClose()"
  >
    <div class="detail-main">
      <div class="detail-descriptions">
        <el-descriptions border :column="isPhone ? 1 : 3">
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Monitor /></el-icon> 用户ID
              </div>
            </template>
            {{ userDetail.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><User /></el-icon> 用户名
              </div>
            </template>
            {{ userDetail.userName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Lock /></el-icon> 密码
              </div>
            </template>
            {{ userDetail.userPass }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Lock /></el-icon> 手机号码
              </div>
            </template>
            {{ userDetail.phoneNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Clock /></el-icon> 注册时间
              </div>
            </template>
            {{ userDetail.regdate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><TurnOff /></el-icon> 是否审核
              </div>
            </template>
            <el-switch v-model="userDetail.isAudit" />
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="detail-collapse">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item, index) in userDetail.userTrack"
            :title="'登录时间：' + item.loginTime"
            :name="index"
            :key="index"
          >
            <div class="collapse-chunk">
              <div class="collapse-chunk-title">浏览记录</div>
              <el-tag
                v-for="(log, site) in item.visitLog"
                :key="site"
                :type="randomType[Math.floor(Math.random() * 5)]"
                effect="dark"
                round
                class="tag-item"
              >
                {{ log }}
              </el-tag>
            </div>
            <div class="collapse-chunk">
              <div class="collapse-chunk-title">搜索记录</div>
              <el-tag
                v-for="(log, site) in item.searchLog"
                :key="site"
                :type="randomType[Math.floor(Math.random() * 5)]"
                effect="dark"
                round
                class="tag-item"
              >
                {{ log }}
              </el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-button type="primary" :icon="Download" @click="handleDownLoad"
        >下载日志</el-button
      >
    </div>
    <template #footer>
      <el-button @click="() => confirmClose()"> 关闭 </el-button>
      <el-button type="primary" @click="handleConfirm"> 修改 </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch, computed, inject, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import {
  Monitor,
  User,
  Lock,
  Clock,
  TurnOff,
  Download,
} from "@element-plus/icons-vue";
import type { IUser, IUserDetail } from "../../../api/userApi";

const randomType = ["", "success", "info", "danger", "warning"];

const store = useStore();
const userDetail: ComputedRef<IUserDetail> = computed(
  () => store.state.userStore.userDetail
);

/**
 * 响应式
 */
const isPhone: Ref<boolean> = inject("isPhone", ref<boolean>(false));
const dialogWidth: ComputedRef<string> = computed(() =>
  isPhone.value ? "94%" : "60%"
);

const props = defineProps<{
  userDialog: boolean;
  openUserId: string;
}>();

const emit = defineEmits<{
  (
    e: "handleOpenDetail",
    openFlag: boolean,
    fetchFlag?: boolean,
    row?: IUser
  ): void;
}>();

watch(
  () => props.openUserId,
  async (newV: string) => {
    if (newV) {
      await store.dispatch("userStore/fetchSingleUser", newV);
    }
  }
);

/**
 * 下载日志
 */
const handleDownLoad = () => {};

/**
 * 确认
 */
const handleConfirm = async () => {
  await store.dispatch("userStore/updateSingleUser");
  confirmClose(true);
};

/**
 * 确认关闭
 */
const confirmClose = (fetchFlag?: boolean) => {
  emit("handleOpenDetail", false, fetchFlag);
};
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
