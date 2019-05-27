import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/reg',
      name: 'reg',

      component: () => import(/* webpackChunkName: "login" */ './views/Reg.vue')
    },
    {
      path: '/iviewCard',
      name: 'iviewCard',
      component: () => import(/* webpackChunkName: "iviewCard" */ './views/IviewCard.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import(/* webpackChunkName: "forum" */ './views/Forum.vue')
    }, {
      path: '/addPost',
      name: 'addPost',
      component: () => import(/* webpackChunkName: "addPost" */ './views/AddPost.vue')
    },
    {
      path: '/post_info/:postInfo_id',  // 帖子详情
      name: 'post_info',
      component: () => import(/* webpackChunkName: "post_info" */ './views/PostInfo.vue')
    },
    {
      path: '/tradeCenter',
      name: 'tradeCenter',
      component: () => import(/* webpackChunkName: "tradeCenter" */ './views/TradeCenter.vue')
    },
    {
      path: '/play/:play_id',  // 播放视频
      name: 'play_info',
      component:  () => import(/* webpackChunkName: "play_info" */ './views/QuiB.vue')
    },
    {
      path: '/management',
      name: 'management',
      component: () => import(/* webpackChunkName: "management" */ './views/Management.vue'),
      children: [
        {
          path: '/management/manageUser',
          name: 'manageUser',
          component: () => import(/* webpackChunkName: "manageUser" */ '@/components/management/ManageUser.vue')
        },
        {
          path: '/management/manageRes',
          name: 'manageRes',
          component: () => import(/* webpackChunkName: "manageRes" */ '@/components/management/ManageRes.vue')
        },
        {
          path: '/management/manageNotice',
          name: 'manageNotice',
          component: () => import(/* webpackChunkName: "manageNotice" */ '@/components/management/ManageNotice.vue')
        },
      ]
    },
  ]
})
