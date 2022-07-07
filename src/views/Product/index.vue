<!--
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
-->
<template>
  <el-form :inline="true" :model="searchParam" class="search-area">
    <el-form-item label="产品类别">
      <el-select :disabled="productLoading" v-model="searchParam.lb">
        <el-option
          v-for="item in categoryOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="产品名称">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.cpmc"
        placeholder="产品名称"
      />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.jcxm"
        placeholder="检测项目"
      />
    </el-form-item>
    <el-form-item label="检测标准">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.jcbz"
        placeholder="检测标准"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="() => handleSearch()"
        :loading="productLoading"
        :icon="Search"
      >
        查询
      </el-button>
      <el-button
        @click="() => handleSearch(true)"
        :loading="productLoading"
        :icon="Refresh"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <div class="product-main">
    <div class="product-inset">
      <!-- <el-upload
        class="doc-upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        accept=".xlsx,.xls"
      >
        <el-button type="primary" :icon="Upload">导入</el-button>
      </el-upload> -->
      <el-button
        type="primary"
        :icon="CirclePlus"
        @click="handleOpenForm(true)"
      >
        新增
      </el-button>
    </div>
    <el-table
      v-loading="productLoading"
      element-loading-text="Loading..."
      :data="productData.list"
      border
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#E6E8EB', color: '#303133' }"
      :table-layout="'auto'"
    >
      <template #empty>
        <el-empty description="哎呀，暂时没有数据！" />
      </template>
      <el-table-column prop="xh" label="序号" />
      <el-table-column
        v-for="item in showColumn"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.prop"
      />
      <el-table-column fixed="right" align="center" label="操作" width="70">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            size="small"
            type="primary"
            @click="handleOpenForm(true, false, row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:currentPage="searchParam.p"
        v-model:page-size="searchParam.pageSize"
        :background="true"
        :layout="paginationLayout"
        :total="+productData.count"
        @size-change="() => handleSearch()"
        @current-change="() => handleSearch()"
      />
    </div>
  </div>
  <FormFill
    :showColumn="showColumn"
    :dialogVisible="dialogVisible"
    :activeId="activeId"
    @handleOpenForm="handleOpenForm"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, inject } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { Search, Refresh, CirclePlus, Edit } from "@element-plus/icons-vue";
import useSearch from "./useSearch";
import type {
  ICategoryOptions,
  IProduct,
  IProductData,
} from "../../api/productApi";
import type { IUserInfo } from "../../api/loginApi";
import { ProColumn } from "./constant";
import FormFill from "./FormFill/index.vue";

const store = useStore();
const productLoading: ComputedRef<boolean> = computed(
  () => store.state.productStore.productLoading
);
const categoryOptions: ComputedRef<Array<ICategoryOptions>> = computed(
  () => store.state.productStore.categoryOptions
);
const productData: ComputedRef<IProductData> = computed(
  () => store.state.productStore.productData
);

/**
 * 权限
 */
const userInfo: IUserInfo = inject("userInfo", {} as IUserInfo);
const showColumn = ProColumn.filter(({ prop }) => {
  return userInfo.userRank === "1" || (prop !== "cb" && prop !== "gys");
});

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
const { searchParam, handleSearch } = useSearch();

/**
 * 新增编辑
 */
const dialogVisible: Ref<boolean> = ref<boolean>(false);
const activeId: Ref<string> = ref<string>("");
const handleOpenForm = (
  openFlag: boolean, // 是否打开
  fetchFlag?: boolean, // 是否重新查询
  row?: IProduct
) => {
  activeId.value = row ? (row.xh as string) : "";
  dialogVisible.value = openFlag;
  fetchFlag && handleSearch();
};

onMounted(async () => {
  await store.dispatch("productStore/fetchProductCategory");
  await handleSearch();
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
