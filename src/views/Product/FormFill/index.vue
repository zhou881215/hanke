<!--
 * @Author: Cram
 * @Date: 2022-06-19 12:34:52
-->
<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="(props.activeId ? '修改' : '新增') + '数据'"
    draggable
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
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="序号">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别">
              <el-select
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检测项目">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目别名">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检测标准">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标准名称">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检出限">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="判定标准">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="样品需求">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最小样品量">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="测试仪器实验方法">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="周期类型">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检测周期">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="userInfo.userRank" :span="6">
            <el-form-item label="成本">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="CMA资质">
              <el-select
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              >
                <el-option
                  v-for="item in certOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="CNAS资质">
              <el-select
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              >
                <el-option
                  v-for="item in certOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="userInfo.userRank" :span="6">
            <el-form-item label="供应商名称">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否制样">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制样周期">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制样费用">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作">
              <el-input
                :disabled="saveSingleLoading"
                v-model="productDetail.lb"
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
import { watch, computed } from "vue";
import type { ComputedRef } from "vue";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import type { IUserInfo } from "../../../store/loginStore";
import type { IProduct } from "../../../api/productApi";
import { cloneDeep } from "../../../utils/utils";
import { defaultDetail } from "../../../store/productStore";

const store = useStore();
const productDetail: ComputedRef<IProduct> = computed(
  () => store.state.productStore.productDetail
);
const saveSingleLoading: ComputedRef<boolean> = computed(
  () => store.state.productStore.saveSingleLoading
);

const props = defineProps<{
  dialogVisible: boolean;
  activeId: string;
  userInfo: IUserInfo;
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

const typeOptions = [
  { value: "产品类" },
  { value: "研发类" },
  { value: "售卖类" },
];
const certOptions = [{ value: "有" }, { value: "无" }];

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
