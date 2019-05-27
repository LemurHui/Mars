<template>
  <div class="home">
    <HomeHeader @logout="logout"></HomeHeader>
    <Imax @content="handleContent"/>
    <div class="home-main">
      <div class="notice-list">
        <NoticeList v-show="isLogin"/>
      </div>
      <div class="home-display">
        <Display :content="content" :isLogin="isLogin"/>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeHeader from '@/components/home/HomeHeader.vue'
  import Imax from '@/components/home/Imax.vue'
  import NoticeList from '@/components/home/NoticeList.vue'
  import Display from '@/components/home/Display.vue'


  export default {
    name: 'home',
    components: {
      HomeHeader,
      Imax,
      NoticeList,
      Display
    },
    data() {
      return {
        content: '',
        isLogin: this.$store.state.isLogin
      }
    },
    methods: {
      handleContent(content) {
        this.content = content
      },
      logout(){
        this.isLogin = false
      }

    }
  }
</script>

<style scoped>
  .home-main {
    position: relative;
  }

  .notice-list {
    position: absolute;
    top:50px;
    left: 50px;
    height: 600px;
    width: 230px;
  }

  .home-display {
    height: auto;
    width: 800px;
    margin-top: 50px;
    margin-left: 340px;
    display: inline-block;
    z-index: -1;
  }
</style>
