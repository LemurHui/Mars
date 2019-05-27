import Vue from 'vue'
import Vuex from 'vuex'
const HOST = 'http://127.0.0.1:3000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:localStorage.getItem('isLogin'),
    url:{
      reg:HOST + "/api/register",
      login:HOST + "/api/login",
      userList:HOST + "/api/userList",
      deleteUser:HOST + "/api/deleteUser",
      listUpdate:HOST + "/api/listUpdate",
      uploadImg:HOST + "/api/uploadImg",
      getPostInfo:HOST + "/api/getPostInfo",
      postInfo:HOST + "/api/postInfo",
      addCommentInfo:HOST + "/api/addCommentInfo",
      getCommentInfo:HOST + "/api/getCommentInfo",
      getResInfos:HOST + "/api/getResInfos",  // 加载资源
      getVideo:HOST + "/api/getVideo",  // 加载视频
      imgUrl:HOST + "/uploadImg/",
      partyImg:HOST + "/partyImg/",
      videoInfo:HOST + "/partyMove/",
    },
    userName:localStorage.getItem('userName'),
    pwd:localStorage.getItem('pwd'),
    userId:localStorage.getItem('userId'),
    role:localStorage.getItem('role'),
  },
  mutations: {
    login(state,userInfo){
      state.userName = userInfo.userName
      state.pwd = userInfo.pwd
      state.userId = userInfo.id
      state.role = userInfo.role
      state.isLogin = true
      localStorage.setItem('userName',userInfo.userName)
      localStorage.setItem('pwd',userInfo.pwd)
      localStorage.setItem('userId',userInfo.id)
      localStorage.setItem('role',userInfo.role)
      localStorage.setItem('isLogin',true)
    },
    logout(state,logout){
      state.userName = null
      state.pwd = null
      state.userId = null
      state.role = null
      state.isLogin = false
      localStorage.clear()
    },
    isLogin(state,islogin){
      state.isLogin = islogin
    }
  },
  actions: {

  }
})
