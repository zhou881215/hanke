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
        <el-descriptions border :column="isPhone ? 1 : 2">
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Monitor />
                </el-icon>
                用户ID
              </div>
            </template>
            {{ userDetailInfo.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <User />
                </el-icon>
                用户名
              </div>
            </template>
            {{ userDetailInfo.username }}
          </el-descriptions-item>
          <!-- <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon><Lock /></el-icon> 密码
              </div>
            </template>
            {{ userDetailInfo.userpass }}
          </el-descriptions-item> -->
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Lock />
                </el-icon>
                手机号码
              </div>
            </template>
            {{ userDetailInfo.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Clock />
                </el-icon>
                注册时间
              </div>
            </template>
            {{ userDetailInfo.regdate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <TurnOff />
                </el-icon>
                是否审核
              </div>
            </template>
            <el-switch
              :disable="userDetailLoading"
              v-model="userDetailInfo.status"
            />
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="detail-collapse">
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item, index) in userDetailLogo"
            :title="'登录时间：' + item.loginTime"
            :name="index"
            :key="index"
            :disable="userDetailLoading"
          >
            <div class="collapse-chunk">
              <div class="collapse-chunk-title">浏览记录</div>
              <el-tag
                v-for="(log, site) in filterLog(item.visitLog)"
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
                v-for="(log, site) in filterLog(item.searchLog)"
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
      <el-button type="primary" :icon="Download" @click="handleDownLoad">
        下载日志
      </el-button>
    </div>
    <template #footer>
      <el-button :loading="userDetailLoading" @click="() => confirmClose()">
        关闭
      </el-button>
      <el-button
        :loading="userDetailLoading"
        type="primary"
        @click="handleConfirm"
      >
        修改
      </el-button>
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
import type { IUserInfo } from "../../../api/loginApi";
import type {
  IUser,
  IUpdateUser,
  IUserDetailInfo,
  IUserLog,
  ILog,
} from "../../../api/userApi";

const randomType = ["", "success", "info", "danger", "warning"];

const store = useStore();
const userDetailLoading: ComputedRef<boolean> = computed(
  () => store.state.userStore.userDetailLoading
);
const userDetailInfo: ComputedRef<IUserDetailInfo> = computed(
  () => store.state.userStore.userDetail.userinfo
);
const userDetailLogo: ComputedRef<Array<IUserLog>> = computed(
  () => store.state.userStore.userDetail.logdata
);

/**
 * 权限
 */
const userInfo: IUserInfo = inject("userInfo", {} as IUserInfo);

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
  async (id: string) =>
    !!id &&
    (await store.dispatch("userStore/fetchSingleUser", {
      id,
      ssid: userInfo.ssid,
    }))
);

/**
 * filter log
 */
const filterLog = (item: Array<ILog>) => {
  const result: Array<string> = [];
  item.forEach(({ content }) => {
    if (!result.includes(content)) {
      result.push(content);
    }
  });

  return result;
};

/**
 * 下载日志
 */
const handleDownLoad = async () =>
  await store.dispatch("userStore/downloadLog", {
    id: userDetailInfo.value.id,
    ssid: userInfo.ssid,
  });

/**
 * 确认
 */
const handleConfirm = async () => {
  const { id, status } = userDetailInfo.value;
  const updateInfo: IUpdateUser = {
    id: +id,
    status: status ? "1" : "0",
    ssid: userInfo.ssid,
  };
  const isSucceed: boolean = await store.dispatch(
    "userStore/updateSingleUser",
    updateInfo
  );
  isSucceed && confirmClose(true);
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
