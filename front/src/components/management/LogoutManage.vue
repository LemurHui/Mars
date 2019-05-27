<template>
  <div class="login-header">
      <div class="login-header-left">
        <span class="mark">Mars 火星管理系统</span>
      </div>
      <div class="login-header-right">
        <span class="title" @click="backHome">退出管理系统</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "LogoutManage",
    methods:{
      backHome() {
        this.$router.push({
          path: '/'
        })
      },
    }
  }
</script>

<style scoped>
.login-header {
    cursor: pointer;
    width: 100%;
    height: 60px;
    background: #2c3e50;
    color: #ccc;
    display: flex;
    line-height: 60px;
  }

  .login-header-left {
    margin-left: 15px;
    font-size: 22px;
  }

  .login-header-right {
    flex: 1;
    font-size: 16px;
    text-align: right;
    margin-right: 15px;
  }

  .title:hover {
    color: #fff;
  }
</style>