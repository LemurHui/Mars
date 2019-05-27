<template>
  <div class="my-body">
    <BackHomeHead/>
    <div class="jumbotron img-max">
      <h1 style="text-align: center;font-size: 63px;font-weight: normal">火星论坛</h1>
      <div class="navbar-form ">
        <div class="navbar-right">
          <Button type="info" @click="toAddPost" ghost>Post</Button>
          <Input type="text" v-model="content" style="width: 220px" placeholder="搜一搜"/>
          <Button type="primary" @click="getPostInfo(content)">搜索</Button>
        </div>
      </div>
    </div>


    <div class="home-main">
      <div class="content-container">
        <ul v-if="!isShow" class="wrapper" ref="main">
          <li v-for="(item, index) in postLists"
              :class="['item',{'active': index === current}]"
              class="post-list"
              @click="choose(index)"
              :key="index">
            <div class="post-title">{{item.postTitle}}</div>
            <div class="post-content">{{item.postContent}}</div>
            <div class="post-time">{{resetTime(item.postTime)}}</div>
            <div class="post-detail" @click="showInfo(item.id)">查看详情>></div>
          </li>
          <li v-show="postLists.length === 0" :style="{'text-align': 'center'}">这里空空如也~~</li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
  import BackHomeHead from '@/components/login/BackHomeHead.vue'
  import {formatDateTime} from "@/views/utils/timer.js"
  import Imax from '@/components/forum/Imax.vue'
  // import PostInfo from '@/components/forum/PostInfo.vue'


  export default {
    name: "Forum",
    components: {
      BackHomeHead,
      Imax,
      // PostInfo
    },
    data() {
      return {
        isShow: false,
        current: '',
        chooseOne: '',
        postLists: [],
        content: ''
      }
    },
    mounted() {
      this.getPostInfo()
      this.$refs.main.style.maxHeight = window.innerHeight - 60 + 'px'
    },
    computed: {},
    methods: {
      toAddPost() {
        this.$router.push({
          path: '/addPost'
        })
      },
      choose(index) {
        this.current = index
      },
      showInfo(id) {
        this.$router.push({path: `/post_info/${id}`})
      },
      getPostInfo(content = '') {
        this.$axios.request({
          url: this.$store.state.url.getPostInfo + `?content=${content}`
        }).then(ret => {
          if (ret.data.code == 0) {
            this.postLists = ret.data.postInfos
          }
        }).catch(err => {
          console.log("发生了错误！")
        })
      },
      resetTime(time) {
        return formatDateTime(time)
      },
    }
  }
</script>

<style scoped>

  .jumbotron {
    background-color: #eeeeee;
  }

  .img-max {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .navbar-form {
    position: relative;
  }

  .navbar-right {
    width: 355px;
    position: absolute;
    right: 0;
  }

  .content-container {
    height: auto;
    width: 800px;
    margin: 50px auto 50px auto;
    display: block;
    z-index: -2;
  }

  .wrapper {
    list-style: none;
    padding: 10px;
  }

  .item {
    position: relative;
    padding: 5px;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    line-height: 18px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }

  /*.active {*/
  /*  border: 1px solid #7b93b9;*/
  /*  background: #bfdffa;*/
  /*  color: #fff;*/
  /*}*/

  .post-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 36px;
    text-align: left;
    border-bottom: 1px solid #dcdcdc;
  }

  .post-content {
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    word-break: normal;
    max-lines: 3;
    overflow: hidden; /*显示height=30px的内容，超出部分不显示*/
    text-overflow: ellipsis; /*文本超出，最后显示省略号*/
    text-indent: 2em;
    padding: 10px 0 30px 0;
  }

  .post-time {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  .post-detail {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 10px;
    bottom: 10px;
    text-align: right;
    /*color: #42b983;*/
    text-decoration: underline;
  }

  li:hover .post-detail {
    display: block;
  }


</style>