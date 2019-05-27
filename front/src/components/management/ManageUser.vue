<template>
  <div class="user-display">

    <Form :model="userInfo" inline :label-width="90" style="margin: 20px 0; text-align: left">
      <FormItem prop="userName" label="用户名">
        <Input type="text" v-model="userInfo.userName" placeholder="用户名"></Input>
      </FormItem>
      <FormItem prop="role" label="禁言">
        <i-switch v-model="userInfo.ifSilent" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem prop="role" label="权限">
        <Select v-model="userInfo.role" placeholder="选择角色">
          <Option v-for="(role, index) in roles" :value="role" @on-change="selectRole" :key="index">{{role}}</Option>
        </Select>
      </FormItem>
      <FormItem prop="role" label="">
        <Button type="primary" :loading="modal_loading" @click="addUser">添加用户</Button>
      </FormItem>


    </Form>

    <div>
      <Input search enter-button="Search" v-model="userName" placeholder="通过用户名进行搜索..." @on-search="searchUser"/>
    </div>

    <div class="panel panel-default" style="margin-top: 40px">
      <!-- Default panel contents -->
      <div class="panel-heading" style="text-align: left;font-size: 25px">用户列表</div>

      <div class="panel-body"></div>


      <!-- Table -->

      <Table :columns="columns" :data="userList" :stripe="true" :loading="isLoading">
        <template slot-scope="{ row, index }" slot="userId">
          <span>{{ row.userId }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="userName">
          <span>{{ row.userName }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="regTime">
          <span>{{ resetTime(row.regTime) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="ifSilent">
          <!--            <Input type="text" v-model="editContacts" v-if="editIndex === index"/>-->
          <!--            -->

          <i-switch v-if="editIndex === index" v-model="editerIfSilent" :loading="zct_loading" size="large"
                    @on-change="zctChange">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <span v-else>{{ resetIfSilent(row.ifSilent) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="role">
          <Select v-model="editerRole" @on-change="roleChange" placeholder="选择角色" v-if="editIndex === index">
            <Option v-for="(role, index) in roles" :value="role" :key="index">{{role}}</Option>
          </Select>
          <span v-else>{{ row.role }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button type="primary" @click="editIndex = -1">返回</Button>
          </div>
          <div v-else>
            <Button type="success" @click="handleEdit(row, index)">编辑</Button>
            <Button type="warning" @click="deleteList(row.userId,index)">删除</Button>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  import {formatDateTime} from "@/views/utils/timer.js"

  export default {
    name: "ManageUser",
    data() {
      return {
        modal_loading: false,
        userInfo: {
          userName: '',
          role: "歌迷",
          pwd: "00000000",
          ifSilent: false,
        },

        roles: ["村长", "歌迷会", "歌迷"],
        editIndex: -1,
        isLoading: false,
        zct_loading: false,
        editerRole: "歌迷",
        editerIfSilent: null,
        editerUser: null,
        userName: '',
        userList: [{
          userId: '1',
          userName: "lvhaoran",
          regTime: "904-56-14564",
          role: '歌迷',
          // ifVerified:'',
          ifSilent: '是否禁言'
        }],
        columns: [
          {
            title: '序号',
            slot: 'userId',
            align: "center",
            width: '60'
          }, {
            title: '用户名',
            slot: 'userName',
            align: "center",
          },
          {
            title: '注册时间',
            slot: 'regTime',
            align: "center",
            width: '150'
          },
          {
            title: '禁言',
            slot: 'ifSilent',
            align: "center",
            width: '80'
          },
          {
            title: '用户权限',
            slot: 'role',
            align: "center",
          },
          {
            title: '操作',
            slot: 'action',
            align: "center",
            width: '200'
          }
        ]
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      resetTime(time) {
        return formatDateTime(time)
      },
      resetIfSilent(isSilent) {
        if (isSilent) {
          return '是'
        }
        return "否"
      },
      selectRole(val) {
        this.userInfo.role = val
      },
      // 查询用户
      searchUser() {
        this.getData(this.userName)

      },
      handleEdit(row, index) {
        this.editIndex = index;
        this.editerRole = row.role;
        this.editerIfSilent = row.ifSilent;
        this.editerUser = row;
      },
      // 是否禁言
      zctChange(val) {

        console.log(val);
        this.$axios.request({
          url: this.$store.state.url.listUpdate,
          method: 'put',
          data: {
            id: this.editerUser.userId,
            update: {ifSilent: val}
          }
        }).then(ret => {
          if (ret.data.code == 0) {
            this.editerUser.ifSilent = val
            this.$Message.success(ret.data.msg)
          } else {
            this.$Message.error(ret.data.msg)
          }
        }).catch(err => {
          this.$Message.warning('发生了错误')
        });
      },
      // 查询列表数据
      getData(userName = null) {
        this.$axios.request({
          url: this.$store.state.url.userList,
          params: {
            userName: userName
          }
        }).then(ret => {
          if (ret.data.code == 0) {
            this.userList = ret.data.userList
            this.userName = ''
          }
        })

      },
      // 删除列表数据
      deleteList(userId, index) {
        this.$axios.request({
          url: this.$store.state.url.deleteUser + `/${userId}`,
          method: 'delete'
        }).then(ret => {
          if (ret.data.code == 0) {
            this.userList.splice(index, 1)
          }
          this.$Message.success(ret.data.msg)
        })
      },

      // 添加用户
      addUser() {
        this.$axios.request({
          url: this.$store.state.url.reg,
          method: 'post',
          data: this.userInfo
        }).then(ret => {
          if (ret.data.code == 0) {
            this.userList.push(
              {
                userId: ret.data.data.id,
                userName: ret.data.data.userName,
                regTime: formatDateTime(ret.data.data.createdAt),
                role: ret.data.data.role,
                ifSilent: this.resetIfSilent(ret.data.data.ifSilent)
              }
            )
            this.$Message.success(ret.data.msg)
            this.userInfo = {
              userName: '',
              role: "歌迷",
              pwd: "00000000",
              ifSilent: false,
            }
          } else {
            this.$Message.error(ret.data.msg)
          }
        }).catch(err => {

          this.$Message.warning('发生了错误')
        });
      },

      // 修改角色权限
      roleChange(val) {
        this.$axios.request({
          url: this.$store.state.url.listUpdate,
          method: 'put',
          data: {
            id: this.editerUser.userId,
            update: {role: val}
          }
        }).then(ret => {
          if (ret.data.code == 0) {
            this.editerUser.role = val
            this.$Message.success(ret.data.msg)
          } else {
            this.$Message.error(ret.data.msg)
          }
        }).catch(err => {
          this.$Message.success('发生了错误')
        });
      }
    }
  }
</script>

<style scoped>
  .user-display {
    width: 900px;
    min-height: 400px;
    padding: 20px 40px;
    margin-top: 20px;
    margin-left: 60px;
    display: block;
  }

  .ivu-table-wrapper {
    padding-bottom: 100px;
  }

  th {
    text-align: center;
    vertical-align: middle;

  }

  .table > tbody > tr > td {
    vertical-align: middle;
    text-align: center;
  }

  .ivu-btn {
    margin-left: 15px;
  }

  .ope-col {
    width: 150px;
  }
</style>