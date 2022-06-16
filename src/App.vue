<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <span v-if="loading">loading...</span>
    <template v-else-if="user">
      <span>{{ user.name }}</span>
      <a class="ml-5" href="" @click.prevent="handleLoginOut">退出</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { useStore, mapState } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
const store = useStore();
const router = useRouter();
async function handleLoginOut() {
  await store.dispatch("loginUser/loginOut");
  router.push("/login");
}
const loading = computed(() => store.state.loginUser.loading);
const user = computed(() => store.state.loginUser.user);
</script>

<style lang="less">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .ml-5 {
    margin-left: 5px;
  }
}
</style>
