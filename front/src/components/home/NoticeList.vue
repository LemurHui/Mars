<template>
  <div>
    <div class="card">
      <div class="title">公告栏 <span style="color: #1b6d85;">更多》</span></div>
      <div class="bottom">
        <ul>
        <li>主唱大人五月行程</li>
        <li>上海滴水湖音乐节预热</li>
        <li>成都音乐节</li>
        <li>歌迷须知</li>
        <li>你一直红，我们一直红</li>
      </ul>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NoticeList"
  }
</script>

<style scoped>

  .card{
    width: 230px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }
  .title{
    padding: 10px;
    font-weight: bold;
    font-size: 14px;
    background: #eee;

    border-bottom:1px solid #ccc ;
  }

  ul li {
    cursor: default;
    padding: 10px;

    border-bottom:1px solid #ccc ;
  }

  ul li:hover {
    background-color: #eee;
  }
</style>