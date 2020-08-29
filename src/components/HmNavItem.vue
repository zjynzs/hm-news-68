<template>
  <div class="nav-item" @click="clickfn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickfn() {
      // console.log('123')
      // console.log(this.to)
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang="less" scoped>
.nav-item {
  display: flex;
  border-bottom: 1px solid #ddd;
  height: 50px;
  align-items: center;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  .content {
    flex: 1;
    text-align: right;
    color: #666;
  }
  .arrow {
    padding-left: 10px;
  }
}
</style>
