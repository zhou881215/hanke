<!--
 * @Author: Cram
 * @Date: 2022-06-19 12:34:52
-->
<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="(props.activeId && !props.copyFlag ? '修改' : '新增') + '数据'"
    :width="dialogWidth"
    :before-close="handleClose"
  >
    <div class="dialog-main">
      <el-row class="dialog-count">
        <el-col class="dialog-count-item" :span="12">
          数据总数：<span>{{ currentToday.totalcount }}</span>
        </el-col>
        <el-col class="dialog-count-item" :span="12">
          今日新增：<span>{{ currentToday.todaycount }}</span>
        </el-col>
      </el-row>
      <el-form
        ref="ruleFormRef"
        class="dialog-form"
        :label-position="'top'"
        :model="productDetail"
        :rules="addProductRules"
      >
        <el-row :gutter="10">
          <el-col
            v-for="item in props.showColumn"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :key="item.prop"
          >
            <el-form-item :label="item.label" :prop="item.prop">
              <el-select
                v-if="item.select"
                :disabled="saveSingleLoading"
                v-model="productDetail[item.prop]"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-input
                v-else
                :disabled="saveSingleLoading"
                v-model="productDetail[item.prop]"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button :loading="saveSingleLoading" @click="handleClose">
        取消
      </el-button>
      <el-button
        :loading="saveSingleLoading"
        type="primary"
        @click="handleConfirm(ruleFormRef)"
      >
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch, computed, inject, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import type { ElForm } from "element-plus";
import type { IUserInfo } from "../../../api/loginApi";
import type {
  ICategoryOptions,
  IProduct,
  ICurrentToday,
} from "../../../api/productApi";
import { cloneDeep } from "../../../utils";
import { defaultDetail } from "../../../store/productStore";
import { addProductRules } from "../constant";

const store = useStore();
const categoryOptions: ComputedRef<Array<ICategoryOptions>> = computed(
  () => store.state.productStore.categoryOptions
);
const currentToday: ComputedRef<ICurrentToday> = computed(
  () => store.state.productStore.currentToday
);
const productDetail: ComputedRef<IProduct> = computed(
  () => store.state.productStore.productDetail
);
const saveSingleLoading: ComputedRef<boolean> = computed(
  () => store.state.productStore.saveSingleLoading
);

/**
 * 表单ref
 */
const ruleFormRef = ref<InstanceType<typeof ElForm>>();

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
  dialogVisible: boolean;
  activeId: string;
  copyFlag: boolean;
  showColumn: any;
}>();

const emit = defineEmits<{
  (e: "handleOpenForm", openFlag: boolean, params?: any): void;
}>();

/**
 * 监听开关，开的时候查询总数
 */
watch(
  () => props.dialogVisible,
  async (newV: boolean) =>
    newV &&
    (await store.dispatch("productStore/fetchCurrentTotal", {
      ssid: userInfo.ssid,
    }))
);

/**
 * 监听id，判断是否是修改
 */
watch(
  () => props.activeId,
  async (newV: string) =>
    !!newV &&
    (await store.dispatch("productStore/fetchDetail", {
      xh: +newV,
      ssid: userInfo.ssid,
    }))
);

/**
 * 关闭
 */
const handleClose = () => {
  ElMessageBox.confirm("是否直接关闭编辑框?").then(() => clearStoreDetail());
};

/**
 * 确认
 */
const handleConfirm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const originParams: IProduct = {
        ...productDetail.value,
        xh: +productDetail.value.xh,
        ssid: userInfo.ssid,
      };

      if (props.copyFlag) {
        originParams.xh = 0;
        originParams.id = "";
        delete originParams.addtime;
        delete originParams.ishidden;
        delete originParams.user_id;
      }

      const isSucceed: boolean = await store.dispatch(
        "productStore/saveSingleProduct",
        originParams
      );
      isSucceed && clearStoreDetail(true);
    }
  });
};

/**
 * 关闭并重置store
 */
const clearStoreDetail = (fetchFlag?: boolean) => {
  emit("handleOpenForm", false, { fetch: fetchFlag });
  store.commit("productStore/setDetail", cloneDeep(defaultDetail));
};
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
<style>
@media (max-width: 450px) {
  .el-message-box {
    width: 80%;
  }
  .el-dialog__body {
    padding: 0.24rem;
  }
}
</style>
