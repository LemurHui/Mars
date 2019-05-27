<template>
  <div class="manage-notice">
    <div class="top">
      <Form ref="formInline" :model="formInline" inline :label-width="80">
        <FormItem label="标题：">
          <Input placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="主题：">
          <Input placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="是否置顶：">
          <CheckboxGroup>
            <Checkbox label="false"></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <Input style="width: 750px;margin-left: 25px" type="textarea" placeholder="请输入公告内容..."
             :autosize="{minRows: 6,maxRows: 8}"/>
      <div style="text-align: center;margin-top: 20px">
        <Button type="primary" style="margin: 0 100px;width: 80px">提交</Button>
        <Button type="warning" style="margin: 0 100px;width: 80px">清空</Button>
      </div>
    </div>

    <div style="margin-top: 40px">
      <!-- Default panel contents -->
      <div class="panel-heading" style="text-align: left;font-size: 25px">公告列表</div>

      <Table :columns="columns" :data="userList" :stripe="true">
        <!--          <template slot-scope="{ row, index }" slot="userId">-->
        <!--            <span>{{ row.userId }}</span>-->
        <!--          </template>-->
      </Table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ManageNotice",
    data() {
      return {
        isTop: false,
        formInline: {
          user: ''
        },
        ruleInline: {
          user: ''
        },
        columns: [
          {
            title: '序号',
            slot: 'userId',
            align: "center",
          },
          {
            title: '发布人',
            slot: 'pub',
            align: "center",
          },
          {
            title: '发布时间',
            slot: 'time',
            align: "center",
          },
          {
            title: '标题',
            slot: 'time',
            align: "center",
          },
          {
            title: '内容',
            slot: 'time',
            align: "center",
          },
          {
            title: '状态',
            slot: 'time',
            align: "center",
          },
          {
            title: '操作',
            slot: 'time',
            align: "center",
          },
        ],
        userList: []
      }
    }
  }
</script>

<style scoped>
  .manage-notice {
    padding-top: 40px;
    margin: 0 auto;
    width: 800px;
  }

  .top {
    padding: 20px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

</style>
