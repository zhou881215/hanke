<!--
 * @Author: Cram
 * @Date: 2022-06-19 12:34:52
-->
<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="(props.activeId ? '修改' : '新增') + '数据'"
    draggable
    :width="dialogWidth"
    :before-close="handleClose"
  >
    <div class="dialog-main">
      <el-row class="dialog-count">
        <el-col class="dialog-count-item" :span="12">
          数据总数：<span>400</span>
        </el-col>
        <el-col class="dialog-count-item" :span="12">
          今日新增：<span>100</span>
        </el-col>
      </el-row>
      <el-form
        class="dialog-form"
        :label-position="'top'"
        :model="productDetail"
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
            <el-form-item :label="item.label">
              <el-select
                v-if="item.select"
                :disabled="saveSingleLoading"
                v-model="productDetail[item.prop]"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
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
        @click="handleConfirm"
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
import type { IProduct } from "../../../api/productApi";
import { cloneDeep } from "../../../utils";
import { defaultDetail } from "../../../store/productStore";
import { typeOptions } from "../constant";

const store = useStore();
const productDetail: ComputedRef<IProduct> = computed(
  () => store.state.productStore.productDetail
);
const saveSingleLoading: ComputedRef<boolean> = computed(
  () => store.state.productStore.saveSingleLoading
);

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
  showColumn: any;
}>();

const emit = defineEmits<{
  (
    e: "handleOpenForm",
    openFlag: boolean,
    fetchFlag?: boolean,
    row?: IProduct
  ): void;
}>();

watch(
  () => props.activeId,
  async (newV: string) => {
    if (newV) {
      await store.dispatch("productStore/fetchDetail", newV);
    }
  }
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
const handleConfirm = async () => {
  await store.dispatch("productStore/saveSingleProduct");
  clearStoreDetail(true);
};

/**
 * 关闭并重置store
 */
const clearStoreDetail = (fetchFlag?: boolean) => {
  emit("handleOpenForm", false, fetchFlag);
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
