<template>
  <div id="login">


    <BackHomeHead style="z-index: 100"></BackHomeHead>
    <div class="log-reg">
      <div class="top">

      </div>
      <div>
        <Row>
          <Col span="12" class="ivu-l" :class="{'ivu-active':isLogin}">
            <div @click.stop="toLogin">登录</div>
          </Col>
          <Col span="12" class="ivu-r" :class="{'ivu-active':!isLogin}">
            <div @click.stop="toReg">注册</div>
          </Col>
        </Row>
        <div class="post-form">
          <Form :model="formItem" :label-width="80" v-if="isLogin == true">
            <FormItem label="用户名" class="tishi">
              <Input v-model="formItem.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" class="tishi">
              <Input type="password" v-model="formItem.pwd" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="角色" class="tishi">
              <RadioGroup v-model="formItem.role">
                <Radio label="村长">村长</Radio>
                <Radio label="歌迷会">歌迷会</Radio>
                <Radio label="歌迷">歌迷</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="">
              <Button type="primary" long @click="login">登录</Button>
            </FormItem>
          </Form>

          <Form :model="regForm" :label-width="80" v-else>
            <FormItem label="用户名" class="tishi">
              <Input v-model="regForm.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" class="tishi">
              <Input type="password" v-model="regForm.pwd" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码" class="tishi">
              <Input type="password" v-model="regForm.repwd" placeholder="再次输入密码"></Input>
            </FormItem>
            <FormItem label="">
              <Button type="primary" long @click="reg">注册</Button>
            </FormItem>
          </Form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import BackHomeHead from '@/components/login/BackHomeHead.vue'
  export default {
    name: "Login",
    components:{
      BackHomeHead
    },
    data() {
      return {
        isLogin: this.$store.state.isLogin,
        formItem: {
          userName: '',
          role: '歌迷',
          pwd: ''
        },
        regForm: {
          userName: '',
          pwd: '',
          repwd: '',
          role: '歌迷'
        }
      }
    },
    methods: {
      toLogin() {
        this.isLogin = true
      },
      toReg() {
        this.isLogin = false
      },
      login() {
        if (this.formItem.userName == '' || this.formItem.pwd == '') {
          this.$Message.warning("用户名或密码不能为空")
          return
        }
        this.$axios.request({
          url: this.$store.state.url.login,
          method: 'post',
          data: this.formItem
        }).then(ret => {
          if (ret.data.code == 0) {
            if (ret.data.userInfo.role == this.formItem.role) {
              this.$store.commit('login', ret.data.userInfo)
              this.$router.push({path: '/'})
            } else {
              this.$Message.warning('披错马甲！是想偷偷抱走小可爱吗？！')
            }
          } else {
            this.$Message.warning('用户名或密码错误，这样是抢不到回家的票哒！')
          }
        })

      },
      reg() {
        if (this.regForm.userName == '') {
          this.$Message.error("用户名不能忘为空")
          return
        }
        if (this.regForm.pwd === this.regForm.repwd && this.regForm.userName != '') {
          this.$axios.request({
            url: this.$store.state.url.reg,
            method: 'post',
            data: {userName: this.regForm.userName, pwd: this.regForm.pwd}
          }).then((ret) => {
            if (ret.data.code == 0) {
              this.$Message.success('您已成功落户火星村！赶快登录回家吧！')
              this.isLogin = true
            } else {
              this.$Message.warning(ret.data.msg)
            }
          })
        } else {
          this.$Message.warning('请检查密码是否输入一致')
        }
      }
    }
  }
</script>

<style scoped>
    #login {
      margin-top: -100px;
      background-image:url('../../public/static/img/bg_img/bg_05.jpg');
      background-repeat:no-repeat;
      background-position: center 0;
      background-size: cover;
      min-height: 150vh;
  }


    .tishi{
      color: white;
    }

  .ivu-col {
    border-bottom: 1px solid #ccc;
    cursor: default;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 22px;
  }

  .ivu-l {

  }

  .ivu-r {

  }

  .ivu-active {
    background-color: #bfdffa;
    color: #ffffff;
  }

  .ivu-l:hover,
  .ivu-r:hover {
    background-color: #bfdffa;
    color: #fff;
  }

  .post-form {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    color: #eafaf6;
  }

  .log-reg {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 2px 0 8px #aaa;
    position: absolute;
    width: 300px;
    /*border: 1px solid #000;*/
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -200px;
  }
</style>