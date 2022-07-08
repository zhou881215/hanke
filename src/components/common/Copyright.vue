<!--
 * @Author: Cram
 * @Date: 2022-06-17 23:04:11
-->
<template>
  <footer class="web-footer">
    Copyright © 2022 瀚科检测 All rights reserved.
    <a href="https://beian.miit.gov.cn/">苏ICP备20036233号-4</a>
  </footer>
</template>

<style scoped lang="less">
.web-footer {
  position: absolute;
  bottom: 1em;
  left: 50%;
  width: 100%;
  text-align: center;
  line-height: 1.8em;
  transform: translateX(-50%);
}
@media (max-width: 768px) {
  .web-footer {
    display: flex;
    flex-direction: column;
  }
}
</style>
