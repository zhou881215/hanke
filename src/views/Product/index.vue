<!--
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
-->
<template>
  <el-form :inline="true" :model="searchParam" class="search-area">
    <el-form-item v-if="userInfo.userRank !== '0'" label="产品类别">
      <el-select :disabled="productLoading" v-model="searchParam.lb" clearable>
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
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.jcxm"
        placeholder="检测项目"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="检测标准">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.jcbz"
        placeholder="检测标准"
        @change="() => handleSearch()"
      />
    </el-form-item>
    <el-form-item label="城市">
      <el-input
        :disabled="productLoading"
        v-model="searchParam.jcbz"
        placeholder="城市"
        @change="() => handleSearch()"
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
        v-if="userInfo.userRank !== '0'"
        @click="() => handleSearch(true)"
        :loading="productLoading"
        :icon="Refresh"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <div class="product-main">
    <div class="product-inset" v-if="userInfo.userRank === '1'">
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
      :height="500"
      border
      stripe
      style="width: 100%"
      scrollbar-always-on
      :header-cell-style="{ background: '#E6E8EB', color: '#303133' }"
    >
      <template #empty>
        <el-empty description="哎呀，暂时没有数据！请查询" />
      </template>
      <el-table-column prop="xh" label="序号" width="100" />
      <el-table-column
        v-for="item in showColumn"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.prop"
      />
      <el-table-column
        v-if="userInfo.userRank === '1'"
        fixed="right"
        align="center"
        label="操作"
        width="120"
      >
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            size="small"
            type="primary"
            @click="handleOpenForm(true, { xh: row.xh })"
          />
          <el-button
            :icon="CopyDocument"
            size="small"
            type="primary"
            @click="handleOpenForm(true, { copy: true, xh: row.xh })"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:currentPage="searchParam.p"
        v-model:page-size="searchParam.pageSize"
        :background="true"
        :page-sizes="[20, 50, 100]"
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
    :copyFlag="copyFlag"
    @handleOpenForm="handleOpenForm"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, inject } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import {
  Search,
  Refresh,
  CirclePlus,
  Edit,
  CopyDocument,
} from "@element-plus/icons-vue";
import useSearch from "./useSearch";
import type { ICategoryOptions, IProductData } from "../../api/productApi";
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
  return userInfo.userRank !== "0" || (prop !== "cb" && prop !== "gys");
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
const { searchParam, handleSearch } = useSearch(userInfo);

/**
 * 新增编辑
 */
const dialogVisible: Ref<boolean> = ref<boolean>(false);
const activeId: Ref<string> = ref<string>("");
const copyFlag: Ref<boolean> = ref<boolean>(false);
const handleOpenForm = (
  openFlag: boolean, // 是否打开
  { fetch = false, copy = false, xh = "" }: any = {} // 关闭时是否查询列表、是否是复制、当前行序号
) => {
  dialogVisible.value = openFlag;
  activeId.value = xh;
  copyFlag.value = copy;
  fetch && handleSearch();
};

// const tableHeight = () => {
//   const fixedHeight = userInfo.userRank === "1" ? 424 : 372;
//   return document.body.offsetHeight - fixedHeight;
// };

onMounted(async () => {
  await store.dispatch("productStore/fetchProductCategory", {
    ssid: userInfo.ssid,
  });
  // await handleSearch();
  store.commit("productStore/setProduct", { list: [], count: "0" });
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
