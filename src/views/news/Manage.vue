<template>
  <div class="manage">
  <hm-header>栏目管理</hm-header>
 <div class="content">
    <div class="actine">
    <h3>点击删除以下频道(必须保留4项以上)</h3>
    <div class="list">
      <div class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)">{{item.name}}</div>
    </div>
  </div>
  <div class="deactive">
    <h3>点击添加以下频道</h3>
    <div class="list">
      <div class="item" v-for="item in deactiveLst" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
    </div>
  </div>
 </div>
  </div>
</template>

<script>
/*
  思路
    1.发送ajax请求，获取到所有的栏目，存放activeList
    2.渲染这些栏目
    3.点击激活的栏目，删除改栏目，并且添加到未激活的数组中
    4.点击未激活的栏目，删除该栏目，添加到激活的栏目中
    5.监听数据的变化，保存到localStorage中
*/
export default {
  data() {
    return {
      // 存放激活的栏目
      activeList: [],
      // 存放未激活的栏目
      deactiveLst: []
    }
  },
  async created() {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveLst = JSON.parse(localStorage.getItem('deactiveLst'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveLst = deactiveLst
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delTab(id) {
      if (this.activeList.length <= 4) return
      const index = this.activeList.findIndex(item => item.id === id)
      // 往未激活的栏目中添加
      this.deactiveLst.push(this.activeList[index])
      // 删除激活中的这个栏目
      this.activeList.splice(index, 1)
    },
    addTab(id) {
      const index = this.deactiveLst.findIndex(item => item.id === id)
      // 往未激活的栏目中添加
      this.activeList.push(this.deactiveLst[index])
      // 删除激活中的这个栏目
      this.deactiveLst.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveLst', JSON.stringify(this.deactiveLst))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .actine,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #fff;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 0 5px;
      }
    }
  }
}
</style>
