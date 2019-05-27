<template>
  <div class="post-container">
    <Divider orientation="left">{{ postInfo.postTitle }}</Divider>
    <p class="post-content">{{ postInfo.postContent }}</p>
    <div class="psot-img">
      <div class="demo-upload-list" v-for="(item,index) in postImgs" :key="index">
        <img :src="item">
      </div>
    </div>
    <div class="pub-comment">
      <Form ref="formValidate" :model="commentForm" :rules="commentRule" :label-width="80">
        <FormItem label="评论" prop="commentContent">
          <Input v-model="commentForm.commentContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="说点什么吧~~~~"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="pubComment('formValidate')">发表评论</Button>
        </FormItem>
      </Form>
    </div>
    <div class="comment-list">
      <div class="comment" v-for="item in comments" :key="item">
        <span>发布人：{{ item.userName }}</span>
        <p style="padding-left: 4em">{{ item.commentContent}}</p>
        <span>{{ resetTime(item.commentTime)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDateTime} from "@/views/utils/timer.js"

  export default {

    name: "PostInfo",
    data() {
      return {
        postInfo: {
          id: this.$route.params.postInfo_id,
          postTitle: '',
          postContent: ''
        },
        postImgs: [],
        commentForm: {
          userId: localStorage.getItem('userId'),
          postId: null,
          commentContent: ''
        },
        commentRule: {
          commentContent: [
            {required: true, message: '内容不能为空！', trigger: 'blur'}
          ]
        },
        comments: []
      }
    },
    mounted() {
      this.getPostInfo()
      this.seachComments()
    },
    methods: {

      resetTime(time) {
        return formatDateTime(time)
      },
      // 获取帖子配图
      getPostInfo() {
        this.$axios.request({
          url: this.$store.state.url.postInfo,
          params: {
            postId: this.postInfo.id
          }
        }).then(ret => {
          let reg=/^postImg[1-3]$/;
          let obj = ret.data.postInfo
          this.postInfo.postTitle = obj.postTitle
          this.postInfo.postContent = obj.postContent
          for (let img in obj) {
            if (reg.test(img)) {
              if (obj[img] != '') {
                this.postImgs.push(this.$store.state.url.imgUrl + obj[img])
              }
            }

          }
          this.commentForm.userId = localStorage.getItem('userId')
          this.commentForm.postId = this.postInfo.id
        })
      },
      seachComments(){
        this.$axios.request({
          url:this.$store.state.url.getCommentInfo,
          params:{
            postId:this.postInfo.id
          }
        }).then(ret => {
          if(ret.data.code == 0){
            this.comments = ret.data.comments
          }else {
            console.log(ret.data.msg)
          }

        }).catch(err => {
          console.log("发生了错误！")
        })
      },
      // 发帖
      pubComment() {
        if (this.commentForm.userId == null) {
          this.$Message.warning("你还没有登录！");
          return;
        }
        if (this.commentForm.postId == null) {
          this.$Message.warning("请重试！");
          return;
        }
        if (this.commentForm.commentContent.trim() == '') {
          this.$Message.warning("评论内容不能为空！");
          return;
        }

        this.$axios.request({
          url: this.$store.state.url.addCommentInfo,
          method: 'post',
          data: this.commentForm
        }).then(ret => {
          if (ret.data.code == 0) {
            this.comments.unshift({
              userName: localStorage.getItem('name'),
              commentContent: this.commentForm.commentContent,
              commentTime: formatDateTime(new Date())
            })
            this.commentForm.commentContent = ''
            this.$Message.success(ret.data.msg);
          } else {
            this.$Message.error(ret.data.msg);
          }
        }).catch(err => {
          this.$Message.warning("发生了错误！");
        })
      }
    }
  }
</script>

<style scoped>
  .post-container {
    width: 800px;
    margin: 0 auto;
  }

  .post-content {
    font-size: 18px;
  }

  .post-content,
  .psot-img,
  .comment-list,
  .pub-comment {
    border: 1px solid #ccc;
    margin: 20px 0;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .demo-upload-list {
    display: inline-block;
    width: 130px;
    height: 130px;
    text-align: center;
    line-height: 130px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .comment {
    margin: 15px 0 0 0;
    border-left: 3px solid #fe898f;
    transition: all 0.8s;
    padding: 0 5px;
  }

  .comment:hover {
    border-bottom: none;
    box-shadow: 0 0 5px #fe898f;
  }

</style>