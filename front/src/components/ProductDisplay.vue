<template>
  <div class="display">
    <Tabs type="card" @on-click="HandleTabs">
      <TabPane label="官方" name="1">
        <div class="thumbnail res-card" onclick="window.location.href= 'https://detail.damai.cn/item.htm?spm=a2oeg.search_category.0.0.4d494d15XUH5Ho&id=591258789479';return false">
          <img class="res-card-img" src="@/assets/img/pro_img/piao_01.jpg" alt="">
          <div class="caption">
            <p class="res-title">BBF比特节拍音乐节</p>
          </div>
        </div>
        <div class="thumbnail res-card" onclick="window.location.href= 'https://piao.damai.cn/176004.html?spm=a2oeg.search_category.0.0.4d494d15XUH5Ho';return false">
          <img class="res-card-img" src="@/assets/img/pro_img/piao_02.jpg" alt="">
          <div class="caption">
            <p class="res-title">上海滴水湖音乐节</p>

          </div>
        </div>
        <div class="thumbnail res-card" onclick="window.location.href= 'https://piao.damai.cn/146402.html?spm=a2oeg.orderdetail.list.ditempic';return false">
          <img class="res-card-img" src="@/assets/img/pro_img/piao_03.jpg" alt="">
          <div class="caption">
            <p class="res-title">火星演唱会</p>
          </div>
        </div>
      </TabPane>

      <TabPane label="票务" name="2">

      </TabPane>
      <TabPane label="周边" name="3">

      </TabPane>
      <TabPane label="专辑" name="4">

      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  export default {
    name: "ProductDisplay",
    methods:{
      HandleTabs(name){

      }
    }
  }
</script>

<style scoped>

  .display {
    z-index: -10;
  }

  .res-title {
    text-align: left;
    font-size: 14px;
  }

  .res-des {
    text-align: left;
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
    width: 200px;
    height: auto;
    border: 1px solid #e6ecfa; /*边框线，1px粗的实线 颜色“light sky blue”*/
  }

  .res-card-img {
    width: 180px;
    height: 200px;
  }

  .res-card:hover {
    box-shadow: 3px 3px 8px cornflowerblue; /*鼠标悬停时，出现阴影，上左3px，下右8px，颜色是后面那个*/
    transition-duration: 600ms; /*阴影效果出现持续时间，将改变过程可见，变换时间为600ms。如果想慢一点就加长duration*/
    transition-timing-function: linear; /*变换的速度是线形增加的，越来越快。这个函数还有好多，可以自己看*/
  }

  /*鼠标悬停，伪类选择器*/

  .res-card:hover {
    box-shadow: 3px 3px 8px #CCCCCC; /*鼠标悬停时，出现阴影，上左3px，下右8px，颜色是后面那个*/
    transition-duration: 600ms; /*阴影效果出现持续时间，将改变过程可见，变换时间为600ms。如果想慢一点就加长duration*/
    transition-timing-function: linear; /*变换的速度是线形增加的，越来越快。这个函数还有好多，可以自己看*/
  }

  /*鼠标悬停，伪类选择器*/

  .res-card-img:hover {
    box-shadow: 1px 1px 3px 3px #CCCCCC;
  }


</style>