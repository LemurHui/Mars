<template>
  <div class="management">
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="header">
      <LogoutManage/>
    </div>
    <div class="body-left">
      <Menu theme="dark" @on-select="selectMenu">
        <MenuItem name="manageUser">用户管理</MenuItem>
        <MenuItem name="manageNotice">公告管理</MenuItem>
        <MenuItem name="manageRes">资源管理</MenuItem>
      </Menu>
    </div>
  </div>

</template>

<script>
  import LogoutManage from '@/components/management/LogoutManage.vue'

  export default {
    name: "Management",
    components: {
      LogoutManage
    },
    methods: {
      selectMenu(name) {
        this.$router.push({
          name: name
        })
      }
    }
  }
</script>

<style scoped>
  .management {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }

  .body-left {
    position: fixed;
    top: 60px;
    height: calc(100% - 60px);
    background-color: #515a6e;
  }

  .body {
    padding: 60px 0 0 200px;
  }
</style>