<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$base + item.head_img" alt="">
        </div>
        <div class="conter">
          <p>{{item.nickname}}</p>
          <p>{{item.create_data | time}}</p>
        </div>
        <div class="right">
          <van-button type="primary" round size="small">取消关注</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    const res = await this.$axios.get('/user_follows')
    console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  height: 100px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .conter {
    flex: 1;
    padding-left: 10px;
    font-size: 16px;
  }
}

</style>
