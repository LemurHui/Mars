<template>
  <div class="quib">
    <div>
      <span>标题：{{videoInfo.resTitle}}</span>
      <p>{{videoInfo.resDescription}}</p>
    </div>
    <div class="video">
      <video width="800" height="600" controls="controls" style="outline: none">
      <source v-if="videoInfo.resPath != ''" :src="reVideoPath(videoInfo.resPath)" type="video/mp4">
      你的浏览器不支持视频播放
    </video>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuiB",
    data() {
      return {
        videoInfo: {
          resPath: ''
        }
      }
    },
    mounted() {
      this.getVideo()
    },

    methods: {
      reVideoPath(path) {
        return `/partyMove/${path}`
      },
      getVideo() {
        this.$axios.request({
          url: this.$store.state.url.getVideo + `?id=${this.$route.params.play_id}`,
        }).then(ret => {
          if (ret.data.code == 0) {
            this.videoInfo = ret.data.videoInfo
          }
        })
      }
    }
  }
</script>

<style scoped>
  .video {
    text-align: center;
  }
</style>