<template>
  <div class="my-comment">
    <hm-header>我的评论</hm-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了拉 "
          :immediate-check="false"
          offset="10"
          @load="onLoad"
        >
          <div class="item" v-for="item in commentList" :key="item.id">
            <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
            <div class="comment" v-if="item.parent">
              <div class="name">{{item.parent.user.nickname}}</div>
              <div class="comment_content">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="origin">
              <span class="one-txt-cut" @click="$router.push(`/post-detail/${item.post.id}`)">原文: {{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 6,
      // 代表加载状态，如果loading为true， 代表list组件正在加载数据， onLoad就不再触发
      // 当滚动到底部，触发onLoad的时候， 自动会把loading改为true
      loading: false,
      // 代表是否结束，  false代表还有数据 finished:true 代表没有更多数据
      // finished默认一个为false 但是如果后台没有更多数据了， 应该把finished改为true
      finished: false,
      // 代表是否正在下拉刷新
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.commentList = this.commentList.concat(data)
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)

        // 把loading改成false，加载完成了
        this.loading = false

        // 判断如果没有更多数据了，需要把finished改成tuer
        if (data.length < this.pageSize) {
          this.finished = true
        }
        // 结束下拉刷新
        this.refreshing = false
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh() {
      console.log('下拉刷新')
      setTimeout(() => {
        // 重新加载第一页数据
        this.pageIndex = 1
        // 防止之前已经没有数据了
        this.loading = true
        this.finished = false
        // 下拉刷新需要清除原来的数据
        this.commentList = []
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #666;
    padding: 10px 0;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
    }
    .comment_content {
      color: #999;
      line-height: 30px;
      margin-top: 10px;
    }
  }
  .content {
    margin: 10px 0;
  }
  .origin {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}

</style>
