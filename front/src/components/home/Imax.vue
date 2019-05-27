<template>
  <div class="jumbotron img-max">
    <h1 style="text-align: center;font-size: 63px;font-weight: normal">Welcome to Mars!</h1>
    <div class="navbar-form ">
      <div class="navbar-right">
        <Input type="text" v-model="content" style="width: 220px" placeholder="热搜:演唱会" />
        <Button type="primary" @click="handleSearch">搜索</Button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Imax",
    data() {
      return {
        content: ''
      }
    },
    methods: {
      handleSearch() {
        this.$emit("content", this.content)
      }
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
  .navbar-right{
    width: 300px;
    position: absolute;
    right: 0;
  }

</style>