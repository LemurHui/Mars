<template>
  <div class="display">
    <Tabs type="card" @on-click="HandleTabs">
      <TabPane label="全部" name="all">
        <div v-if="allreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in allreses" :key="index"/>

      </TabPane>
      <TabPane label="演唱会">
        <div v-if="ycreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in ycreses" :key="index"/>

      </TabPane>
      <TabPane label="音乐节">
        <div v-if="yyreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in yyreses" :key="index"/>

      </TabPane>
      <TabPane label="综艺">
        <div v-if="zyreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in zyreses" :key="index"/>

      </TabPane>
      <TabPane label="采访">
        <div v-if="cfreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in cfreses" :key="index"/>

      </TabPane>
      <TabPane label="饭制">
        <div v-if="fzreses.length == 0" class="nothing nomal">还没有发布新内容，快去发布你的新作品吧~~~~~~</div>
        <HomeStartTag :reses="reses" v-for="(reses,index) in fzreses" :key="index"/>

      </TabPane>
      <TabPane label="火星论坛" name="forum">
        <div class="nothing big">登陆后会发现更大的世界哦~~~~~~</div>
      </TabPane>
      <TabPane label="交易中心" name="tradeCenter">
        <div class="nothing big">登陆后会发现更大的世界哦~~~~~~</div>
      </TabPane>
    </Tabs>
  </div>

</template>

<script>
  import HomeStartTag from '@/components/home/HomeStartTag.vue'

  export default {
    props: {
      content: {
        type: String,
        require: false,
        default: ''
      },
      isLogin:false,
    },
    watch: {
      content() {
        if (this.content.trim() == '') {
          this.getResInfos()
        } else {
          this.getResInfos(this.content)
        }
      }
    },
    name: "Display",
    components: {
      HomeStartTag
    },
    data() {
      return {
        allreses: [],
        ycreses: [],
        yyreses: [],
        zyreses: [],
        cfreses: [],
        fzreses: [],
      }
    },
    mounted() {
      this.getResInfos()
    },
    methods: {
      HandleTabs(name) {
        if (name == 'forum' || name == 'tradeCenter') {
          if (this.isLogin) {
            this.$router.push({name: name})
          } else {
            this.$Message.warning('权限受限，请先登录！')
          }
        }
      },
      // 加载资源
      getResInfos(content = '') {
        this.$axios.request({
          url: this.$store.state.url.getResInfos + `?content=${content}`,
        }).then(ret => {
          if (ret.data.code == 0) {
            this.allreses = ret.data.resInfos
            this.yyreses = []
            this.ycreses = []
            this.zyreses = []
            this.cfreses = []
            this.fzreses = []
            for (let res of ret.data.resInfos) {
              if (res.resClass == "演唱会") {
                this.ycreses.push(res)
              } else if (res.resClass == "音乐节") {
                this.yyreses.push(res)
              } else if (res.resClass == "综艺") {
                this.zyreses.push(res)
              } else if (res.resClass == "采访") {
                this.cfreses.push(res)
              } else if (res.resClass == "饭制") {
                this.fzreses.push(res)
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }

    }

  }
</script>

<style scoped>

  .display {
    z-index: -10;
  }

  .nothing {
    padding-top: 120px;
    text-align: center;
  }

  .nomal {
    font-size: 18px;
  }

  .big {
    font-size: 28px;
  }

</style>