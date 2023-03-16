<template>
  <el-form :inline="true" :model="searchParam" class="search-area">
    <el-form-item v-if="userInfo.userRank !== '0'" label="产品类别">
      <!-- <el-select
        :disabled="productNewLoading"
        v-model="searchParam.lb"
        clearable
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select> -->
      <el-input
        :disabled="productNewLoading"
        v-model="searchParam.bindname"
        placeholder="产品类别"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="产品名称">
      <el-input
        :disabled="productNewLoading"
        v-model="searchParam.title"
        placeholder="产品名称"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-input
        :disabled="productNewLoading"
        v-model="searchParam.xm"
        placeholder="检测项目"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="检测标准">
      <el-input
        :disabled="productNewLoading"
        v-model="searchParam.bz"
        placeholder="检测标准"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="城市">
      <el-input
        :disabled="productNewLoading"
        v-model="searchParam.city"
        placeholder="城市"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="() => handleSearch()"
        :loading="productNewLoading"
        :icon="Search"
      >
        查询
      </el-button>
      <el-button
        v-if="userInfo.userRank !== '0'"
        @click="() => handleSearch(true)"
        :loading="productNewLoading"
        :icon="Refresh"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <el-checkbox-group v-model="checkedList" class="checkbox-area">
    <el-checkbox
      v-for="item in allShowColumn"
      :key="item.prop"
      :label="item.label"
    />
  </el-checkbox-group>
  <div class="product-main">
    <el-table
      v-loading="productNewLoading"
      element-loading-text="Loading..."
      :data="productNewData.list"
      :span-method="arraySpanMethod"
      :row-class-name="tableRowClassName"
      :height="450"
      border
      stripe
      style="width: 100%"
      scrollbar-always-on
      :header-cell-style="{ background: '#E6E8EB', color: '#303133' }"
    >
      <template #empty>
        <el-empty description="哎呀，暂时没有数据！请查询" />
      </template>
      <el-table-column
        v-for="item in finalColumns"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.prop"
      />
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:currentPage="searchParam.p"
        v-model:page-size="searchParam.pageSize"
        :background="true"
        :page-sizes="[20, 50, 100]"
        :layout="paginationLayout"
        :total="+productNewData.count"
        @size-change="() => handleSearch()"
        @current-change="() => handleSearch()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref, inject } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { Search, Refresh } from "@element-plus/icons-vue";
import useSearch from "./useSearch";
import type { IProductNewData } from "../../api/productNewApi";
import type { IUserInfo } from "../../api/loginApi";
import { ProColumn } from "./constant";

const store = useStore();
const productNewLoading: ComputedRef<boolean> = computed(
  () => store.state.productNewStore.productNewLoading
);
const productNewData: ComputedRef<IProductNewData> = computed(
  () => store.state.productNewStore.productNewData
);

/**
 * 合并单元格
 * @param param0
 */
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  const { customTitle, titleFlagArr, xmFlagArr } = row;
  const { property } = column;
  if (customTitle) {
    return [1, ProColumn.length];
  }
  if (property === "title") {
    return handleMerge(rowIndex, titleFlagArr);
  }
  if (property === "xm") {
    return handleMerge(rowIndex, xmFlagArr);
  }
};

/**
 * 从标记的相同索引开始，合并到个数
 * 两个计数索引区间内的去掉，返回[0, 0]
 * @param rowIndex
 * @param arr
 */
const handleMerge = (rowIndex: number, arr: number[]) => {
  for (let index = 0; index < arr.length; index++) {
    if (rowIndex === arr[index]) {
      return [arr[index + 1] - arr[index], 1];
    }
    if (rowIndex > arr[index] && rowIndex < arr[index + 1]) {
      return [0, 0];
    }
  }
};

/**
 * 大分类class
 * @param param0
 */
const tableRowClassName = ({ row }: any) =>
  row.customTitle ? "custom-title" : "";

/**
 * 权限
 */

// 成本 | 供应商名称 | 城市 | 接单须知 | 电话
const authorityArr: Array<string> = ["oprice", "gys", "city", "xuzhi", "tel"];
const userInfo: IUserInfo = inject("userInfo", {} as IUserInfo);
const allShowColumn = ProColumn.filter(({ prop }) => {
  return userInfo.userRank !== "0" || !authorityArr.includes(prop);
});

/**
 * 栏目
 */
const checkedList: Ref<Array<string>> = ref(
  allShowColumn.map(({ label }) => label)
);
const finalColumns: ComputedRef<Array<any>> = computed(() =>
  allShowColumn.filter(({ label }) => checkedList.value.includes(label))
);

/**
 * 响应式
 */
const paginationLayout: Ref<string> = inject(
  "paginationLayout",
  ref<string>("total, sizes, prev, pager, next, jumper")
);

/**
 * 搜索相关
 */
const { searchParam, handleSearch } = useSearch(userInfo);
onMounted(async () => {
  // await handleSearch();
  store.commit("productNewStore/setProductNew", { list: [], count: "0" });
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
