<template>
  <div id="app">
    <!-- keep-alive 被keep-alive包裹的组件都会被缓存下来，不会销毁 -->
    <keep-alive include="index">
    <router-view />
    </keep-alive>
  </div>
</template>

<script></script>

<style lang="less">
</style>
