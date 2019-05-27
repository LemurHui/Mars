<template>
  <div class="add-post">
    <Form ref="addPostForm" :model="addPostForm" :rules="addPostRule" :label-width="80">

      <FormItem label="标题" prop="postTitle">
        <Input v-model="addPostForm.postTitle" placeholder="请输入帖子标题"></Input>
      </FormItem>

      <FormItem label="内容" prop="postContent">
        <Input v-model="addPostForm.postContent" type="textarea" :autosize="{minRows: 10,maxRows: 15}"
               placeholder="请输入帖子内容"></Input>
      </FormItem>

      <FormItem label="图片">
        <div class="demo-upload-list" v-for="(item,index) in imgList" :key="index">
          <img :src="item.data">
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
          </div>
        </div>

        <Upload
          ref="upload"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:130px;">
          <div style="width: 130px;height:130px;line-height: 130px;">
            <Icon type="md-add" size="75"></Icon>
          </div>

        </Upload>
      </FormItem>

      <FormItem>
        <Button type="primary" long @click="handleSubmit('addPostForm')">提交</Button>
        <!--        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
      </FormItem>
    </Form>
  </div>
</template>

<script>

  export default {
    name: "AddPost",
    data() {
      return {
        imgList: [],
        addPostForm: {
          userId:localStorage.getItem('userId'),
          postTitle: '',
          postContent: '',
          postImg1: '',
          postImg2: '',
          postImg3: '',
        },
        addPostRule: {
          postTitle: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          postContent: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            for (let [index, item] of this.imgList.entries()) {
              if (index == 0) {
                this.addPostForm.postImg1 = item.name
              }

              if (index == 1) {
                this.addPostForm.postImg2 = item.name
              }

              if (index == 2) {
                this.addPostForm.postImg3 = item.name
              }
            }
            this.$axios.request({
              url: this.$store.state.url.uploadImg,
              method: "post",
              data: {
                addPostForm: this.addPostForm,
                imgList: this.imgList
              }
            }).then(ret => {
              if (ret.data.code == 0) {
                this.$Message.success(ret.data.msg);
                this.$router.push({path:'/forum'})
              } else {
                this.$Message.error(ret.data.msg);
              }
            }).catch(ret => {
              this.$Message.warning('发生了错误!');
            })
          } else {
            this.$Message.error('请完善信息！');
          }
        })
      },
      handleBeforeUpload(file) {
        const check = this.imgList.length < 3;
        if (!check) {
          this.$Notice.warning({
            title: '附加贴图不能超过 3 张'
          });
        } else {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (event) => {
            this.imgList.push({
              name: file.name,
              data: event.srcElement.result
            })
          }
        }
        return false
      },
      handleRemove(index) {
        this.imgList.splice(index, 1);
      },
    }
  }
</script>

<style scoped>
  .add-post {
    width: 700px;
    margin: 100px auto 0px;
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

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

</style>