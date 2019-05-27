<template>
  <div class="home-header">
    <div class="left">
      <span class="active">Mars 火星村</span>
    </div>
    <div class="right">
      <ul v-if="isLogin">
        <li>
          <Tooltip placement="top">
            欢迎您
            <Icon type="md-arrow-dropdown"/>
            <div slot="content" class="user-center">
              <div @click="midifySelf">修改个人信息</div>
              <div @click="logout">退出</div>
            </div>
          </Tooltip>
        </li>
        <li>
          <Badge dot="" :offset="[17,-3]">
            消息
          </Badge>
        </li>
        <li>
          <Badge :count="3" :offset="[17,-3]">动态
          </Badge>
        </li>
        <li>收藏</li>
        <li>投稿</li>
        <li v-show="this.$store.state.role == '歌迷会'" @click="toManage">管理</li>
      </ul>
      <ul v-else>
        <li @click="toLogin(true)">登录</li>
        <li @click="toLogin(false)">注册</li>
      </ul>
    </div>

    <Modal
        v-model="modal1"
        title="修改个人信息"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="用户名">
          <Input v-model="formItem.userName" placeholder="你的用户名"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formItem.pwd" placeholder="你的密码"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "HomeHeader",
    data() {
      return {
        isLogin: this.$store.state.userName,
        modal1: false,
        formItem:{
          userName:'',
          pwd:''
        }
      }
    },
    methods: {
      ok() {
        this.$Message.success('修改成功');
      },
      cancel() {
        this.$Message.info('点击了取消');
      },
      logout() {
        this.$store.commit('logout', true)
        this.isLogin = false
        this.$emit("logout")
      },
      toLogin(isLogin) {
        this.$store.commit('isLogin', isLogin)
        this.$router.push({path: '/login'})
      },
      toManage() {
        this.$router.push({name: 'manageUser'})
      },
      midifySelf() {
        this.modal1 = true
      }
    }
  }
</script>

<style scoped>
  .home-header {
    cursor: default;
    width: 100%;
    height: 60px;
    background-color: #2c3e50;
    color: #ccc;
    display: flex;
    line-height: 60px;
  }

  .left {
    margin-left: 15px;
    flex: 1;
    font-size: 22px;
  }

  .right {
    font-size: 16px;
  }

  .right ul li {
    float: left;
    margin-right: 15px;
  }

  .right ul li:hover {
    color: #ffffff;
  }

  .active:hover {
    color: #ffffff;
  }

  .user-center {
    text-align: center;

  }

  .user-center div {
    height: 30px;
    padding: 5px;
  }

  .user-center div:hover {
    color: #ffffff;
  }

</style>