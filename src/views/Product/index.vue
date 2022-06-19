<!--
 * @Author: Cram
 * @Date: 2022-06-17 09:50:11
-->
<template>
  <el-form :inline="true" :model="searchParam" class="search-area">
    <el-form-item label="检测标准">
      <el-input v-model="searchParam.jcbz" placeholder="检测标准" />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-input v-model="searchParam.jcxm" placeholder="检测项目" />
    </el-form-item>
    <el-form-item label="类别">
      <el-input v-model="searchParam.lb" placeholder="类别" />
    </el-form-item>
    <el-form-item label="产品名称">
      <el-input v-model="searchParam.cpmc" placeholder="产品名称" />
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
      <el-upload
        class="doc-upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        accept=".xlsx,.xls"
      >
        <el-button type="primary" :icon="Upload">上传</el-button>
      </el-upload>
      <el-button type="primary" :icon="CirclePlus">新增</el-button>
    </div>
    <el-table
      v-loading="productLoading"
      element-loading-text="Loading..."
      :data="productData"
      border
      stripe
      :empty-text="'暂无数据'"
      style="width: 100%"
    >
      <template #empty>
        <el-empty description="哎呀，暂时没有数据！" />
      </template>
      <el-table-column
        fixed
        type="index"
        align="center"
        label="序号"
        width="60"
      />
      <el-table-column prop="lb" label="类别" width="150" />
      <el-table-column prop="lb" label="产品名称" width="150" />
      <el-table-column prop="lb" label="检测项目" width="150" />
      <el-table-column prop="lb" label="项目别名" width="150" />
      <el-table-column prop="lb" label="检测标准" width="150" />
      <el-table-column prop="lb" label="标准名称" width="150" />
      <el-table-column prop="lb" label="检出限" width="150" />
      <el-table-column prop="lb" label="判定标准" width="150" />
      <el-table-column prop="lb" label="样品需求" width="150" />
      <el-table-column prop="lb" label="最小样品量" width="150" />
      <el-table-column prop="lb" label="测试仪器实验方法" width="150" />
      <el-table-column prop="lb" label="周期类型" width="150" />
      <el-table-column prop="lb" label="检测周期" width="150" />
      <el-table-column prop="lb" label="报价" width="150" />
      <el-table-column
        v-if="userInfo.userRank"
        prop="lb"
        label="成本"
        width="150"
      />
      <el-table-column prop="lb" label="CMA资质" width="150" />
      <el-table-column prop="lb" label="CNAS资质" width="150" />
      <el-table-column prop="lb" label="接单须知" width="150" />
      <el-table-column
        v-if="userInfo.userRank"
        prop="lb"
        label="供应商名称"
        width="150"
      />
      <el-table-column prop="lb" label="是否制样" width="150" />
      <el-table-column prop="lb" label="制样周期" width="150" />
      <el-table-column prop="lb" label="制样费用" width="150" />
      <el-table-column fixed="right" align="center" label="操作" width="70">
        <template #default>
          <el-button :icon="Edit" size="small" @click="handleEdit" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:currentPage="searchParam.pageNo"
        v-model:page-size="searchParam.pageSize"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="() => handleSearch()"
        @current-change="() => handleSearch()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  Search,
  Refresh,
  Upload,
  CirclePlus,
  Edit,
} from "@element-plus/icons-vue";
import useSearch from "./useSearch";
import { UserLocal } from "../../store/loginStore";

const router = useRouter();
const store = useStore();

const productLoading = computed(() => store.state.productStore.productLoading);
const productData = computed(() => store.state.productStore.productData);

/**
 * 用户
 */
const userInfo = computed(() => {
  const localUserInfo: string | null = localStorage.getItem(UserLocal);
  try {
    return JSON.parse(localUserInfo as string);
  } catch (error) {
    return {};
  }
});

/**
 * 搜索相关
 */
const { searchParam, handleSearch } = useSearch();

/**
 * 跳转编辑
 */
const handleEdit = () => {
  console.log("click");
};

/**
 * 分页
 */

onMounted(() => {
  handleSearch();
});
</script>

<style scoped lang="less" src="./index.less"></style>
