<template>
  <div class="res-display">

    <div>

      <Input search enter-button="搜索" v-model="resTitle" placeholder="通过标题进行搜索..." @on-search="searchRes"/>

      <div class="panel panel-default" style="margin-top: 40px">
        <!-- Default panel contents -->
        <div class="panel-heading" style="text-align: left;font-size: 25px">资源列表</div>

        <div class="panel-body"></div>


        <!-- Table -->

        <Table :columns="columns" :data="resList" :stripe="true" :loading="isLoading">
          <template slot-scope="{ row, index }" slot="resId">
            <span>{{ row.resId }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="resTitle">
            <span>{{ row.resTitle }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="resClass">
            <span>{{ resetTime(row.resClass) }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="ifAudit">
            <!--            <Input type="text" v-model="editContacts" v-if="editIndex === index"/>-->
            <!--            -->

            <i-switch v-if="editIndex === index" v-model="editerifAudit" :loading="zct_loading" size="large"
                      @on-change="zctChange">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <span v-else>{{ resetIfAudit(row.ifAudit) }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="resClass">
            <Select v-model="editerClass" @on-change="ClassChange" placeholder="选择类别" v-if="editIndex === index">
              <Option v-for="(resClass, index) in resClasses" :value="role" :key="index">{{resClass}}</Option>
            </Select>
            <span v-else>{{ row.resClass }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
              <Button type="primary" @click="editIndex = -1">返回</Button>
            </div>
            <div v-else>
              <Button type="success" @click="handleEdit(row, index)">编辑</Button>
              <Button type="warning" @click="deleteList(row.resId,index)">删除</Button>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDateTime} from "@/views/utils/timer.js"

  export default {
    name: "ManageRes",
    data() {
      return {
        modal_loading: false,
        resInfo: {
          resTitle: '',
          resClass: '',
          resDescription: '',
          ifAudit: false
        },
        resClasses: ["演唱会", "音乐节", "综艺", "采访", "饭制"],
        editIndex: -1,
        isLoading: false,
        zct_loading: false,
        editerUser: null,
        resTitle: '',
        resList: [{
          resId: '1',
          resTitle: "王牌对王牌",
          resClass: "综艺",
          resDescription: '王牌花',
        }],
        columns: [
          {
            title: '序号',
            slot: 'resId',
            align: "center",
            width: '60'
          }, {
            title: '标题',
            slot: 'resTitle',
            align: "center",
          },
          {
            title: '分类',
            slot: 'resClass',
            align: "center",
          },
          {
            title: '描述',
            slot: 'resDescription',
            align: "center",
            width: '150'
          },
          {
            title: '通过审核',
            slot: 'ifAudit',
            align: "center",
            width: '80'
          },
          {
            title: '更新时间',
            slot: 'resUpTime',
            align: "center",
            width: '150'
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
      resetIfAudit(ifAudit) {
        if (ifAudit) {
          return '是'
        }
        return "否"
      },
      selectRole(val) {
        this.userInfo.role = val
      },
      // 查询资源
      searchRes() {
        this.getData(this.resTitle)
      },
      handleEdit(row, index) {
        this.editIndex = index;
        this.editerClass = row.resClass;
        this.editerIfSilent = row.ifSilent;
        this.editerRes = row;
      },

      // 查询列表数据
      getData(resTitle = null) {
        this.$axios.request({
          url: this.$store.state.url.resList,
          params: {
            resTitle: resTitle
          }
        }).then(ret => {
          if (ret.data.code == 0) {
            this.resList = ret.data.resList
          }
        })
      },
      // 删除列表数据
      deleteList(resId, index) {
        this.$axios.request({
          url: this.$store.state.url.deleteRes + `/${resId}`,
          method: 'delete'
        }).then(ret => {
          if (ret.data.code == 0) {
            this.resList.splice(index, 1)
          }
          alert(ret.data.msg)
        })
      },


    }
  }
</script>

<style scoped>
  .res-display {
    width: 900px;
    min-height: 400px;
    padding: 20px 40px;
    margin-top: 20px;
    margin-left: 60px;
    display: block;
  }

  .ivu-table-wrapper {
    padding-bottom: 200px;
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