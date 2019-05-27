<template>
    <div v-if="reses.id != null" class="thumbnail res-card" @click="gotoMove(reses.id)">
      <img v-if="reses.resFaceImg != null" class="res-card-img" :src="reImg(reses.resFaceImg)">
      <div class="caption">
        <p class="res-title">{{ reses.resTitle }}</p>
        <p class="res-des">{{ reses.resDescription }}</p>
      </div>
    </div>

</template>

<script>
  export default {
    name: "HomeStartTag",
    props: ['reses'],
    methods: {
      gotoMove(id) {
        this.$router.push({
          path: `/play/${id}`
        })
      },
      reImg(img) {
        return this.$store.state.url.partyImg + img
      }
    }

  }
</script>

<style scoped>
  .res-title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;

  }

  .res-des {
    font-size: 12px;
    height: 20px;
    overflow: hidden; /*显示height=56px的内容，超出部分不显示*/
    text-overflow: ellipsis; /*文本超出，最后显示省略号*/
  }


  .res-card {
    padding: 10px; /*内边距*/
    margin: 10px; /*外边距*/
    display: inline-block; /*将块状元素变成行内块状元素，不占满一行，一行里就可以放多个卡片了*/
    border-radius: 5px; /*边框圆角*/
    cursor: pointer; /*鼠标变成小手*/
    width: 230px;
    height: auto;
    border: 1px solid #e6ecfa; /*边框线，1px粗的实线 颜色“light sky blue”*/
    transition: all .4s;
  }

  .res-card-img {
    transition: all .4s;
    width: 200px;
    height: 200px;
  }

  /*鼠标悬停，伪类选择器*/

  .res-card:hover {
    box-shadow: 3px 3px 8px #CCCCCC; /*鼠标悬停时，出现阴影，上左3px，下右8px，颜色是后面那个*/
    transition-duration: 600ms; /*阴影效果出现持续时间，将改变过程可见，变换时间为600ms。如果想慢一点就加长duration*/
    transition-timing-function: linear; /*变换的速度是线形增加的，越来越快。这个函数还有好多，可以自己看*/
  }

  /*鼠标悬停，伪类选择器*/

  .res-card:hover .res-card-img {
    box-shadow: -3px -3px 8px #CCCCCC;
    border-top-left-radius: 5px;
  }
</style>