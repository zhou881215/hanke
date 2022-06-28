<!--
 * @Author: Cram
 * @Date: 2022-06-17 15:37:00
-->
<template>
  <div class="user-main">
    <div class="user-tool">
      <el-button
        type="primary"
        :icon="viewPass ? Hide : View"
        @click="handleViewPass"
      >
        {{ viewPass ? "隐藏密码" : "查看密码" }}
      </el-button>
    </div>
    <el-table
      v-loading="userLoading"
      element-loading-text="Loading..."
      :data="userData"
      border
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#E6E8EB', color: '#303133' }"
      :table-layout="'auto'"
    >
      <template #empty>
        <el-empty description="哎呀，暂时没有数据！" />
      </template>
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="userPass" label="密码">
        <template #default="{ row: { userPass } }">
          {{ viewPass ? userPass : Array(userPass.length).fill("*").join("") }}
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号码" />
      <el-table-column prop="regdate" label="注册时间" />
      <el-table-column prop="isAudit" label="是否审核">
        <template #default="{ row: { isAudit } }">
          <el-button v-if="isAudit" type="success" size="small">是</el-button>
          <el-button v-else type="danger" size="small">否</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            size="small"
            type="primary"
            @click="handleOpenDetail(true, false, row)"
          />
          <el-tooltip content="删除" effect="light" placement="bottom">
            <el-popconfirm title="确定要删除吗?" @confirm="handleDelete">
              <template #reference>
                <el-button :icon="Delete" size="small" type="primary" />
              </template>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:currentPage="fetchParam.pageNo"
        v-model:page-size="fetchParam.pageSize"
        :background="true"
        :page-sizes="[10, 20, 40, 80]"
        :layout="paginationLayout"
        :total="24"
        @size-change="handleFetch"
        @current-change="handleFetch"
      />
    </div>
  </div>
  <Detail
    :userDialog="userDialog"
    :openUserId="openUserId"
    @handleOpenDetail="handleOpenDetail"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, inject } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { View, Hide, Edit, Delete } from "@element-plus/icons-vue";
import useFetch from "./useFetch";
import useViewPass from "./useViewPass";
import type { IUser } from "../../api/userApi";
import Detail from "./Detail/index.vue";

const store = useStore();
const userLoading: ComputedRef<boolean> = computed(
  () => store.state.userStore.userLoading
);
const userData: ComputedRef<Array<IUser>> = computed(
  () => store.state.userStore.userData
);

/**
 * 响应式
 */
const paginationLayout: Ref<string> = inject(
  "paginationLayout",
  ref<string>("total, sizes, prev, pager, next, jumper")
);

/**
 * 列表相关
 */
const { fetchParam, handleFetch, handleDelete } = useFetch();

/**
 * 查看密码
 */
const { viewPass, handleViewPass } = useViewPass();

/**
 * 详情
 *
 */
const userDialog = ref(false);
const openUserId = ref("");
const handleOpenDetail = (
  openFlag: boolean,
  fetchFlag?: boolean, // 是否重新查询
  row?: IUser
) => {
  userDialog.value = openFlag;
  openUserId.value = row ? row.id : "";
  if (fetchFlag) {
    handleFetch();
  }
};

onMounted(() => {
  handleFetch();
});
</script>

<style scoped lang="less" src="./index.less"></style>
<style scoped lang="less" src="./phone.less"></style>
