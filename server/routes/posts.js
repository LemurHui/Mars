var express = require('express');
var router = express.Router();
const sequelize = require('sequelize')
const models = require('../models');
var path = require('path')
var fs = require("fs")


/* 提交发帖 */
router.post('/uploadImg', function (req, res, next) {

  models.Post.create(req.body.addPostForm).then(ret => {
    for (let item of req.body.imgList) {
      var imgData = item.data  //过滤data:URL
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFileSync(path.join(path.normalize(__dirname + '/..'), 'public', 'uploadImg', item.name), dataBuffer)
    }
    res.json({code: 0, msg: "发帖成功"})
  }).catch(err => {
    res.json({code: 100, msg: "发帖失败"})
  })
});


// /* 查询帖子 */
// // router.get('/getPostInfo', function (req, res, next) {
// //   models.DB.query("select p.postTitle,p.postContent,p.postImg1," +
// //     "p.postImg2,p.postImg3,u.userName from posts as p left join users as u on p.userId = u.id", {type: sequelize.QueryTypes.SELECT}).then((results) => {
// //     // 结果将是一个空数组，元数据将包含受影响的行数。
// //     res.json({code:0,postInfos: results})
// //   })
// // });


/* 查询帖子 */
router.get('/getPostInfo', function (req, res, next) {
  let content = req.query.content
  let queryContent = ''
  if (content == '') {
    queryContent = `SELECT id,postTitle,postContent,createdAt as postTime FROM posts`
  } else {
    queryContent = `SELECT id,postTitle,postContent,createdAt as postTime FROM posts WHERE postTitle LIKE '%${content}%' or postContent like '%${content}%'`
  }
  models.DB.query(
    queryContent, {
      type: sequelize.QueryTypes.SELECT
    }
  ).then(ret => {
    res.json({code: 0, postInfos: ret})
  }).catch(err => {
    res.json({code: 100, msg: '发生了错误'})
  })
});

/* 查询帖子 */
router.get('/postInfo', function (req, res, next) {
  let postId = req.params.postId
  console.log(postId)
  models.Post.findOne({
    attributes: ['postImg1', 'postImg2', 'postImg3', 'postContent', 'postTitle'],
  }).then(ret => {
    res.json({code: 0, postInfo: ret})
  }).catch(err => {
    res.json({code: 100, msg: '发生了错误'})
  })
});

/* 帖子评论 */
router.post('/addCommentInfo', function (req, res, next) {
  models.Comment.create(
    req.body
  ).then(ret => {
    res.json({code: 0, msg: "发帖成功"})
  }).catch(err => {
    res.json({code: 100, msg: '发帖失败'})
  })
});


/* 获取帖子的评论信息 */
router.get('/getCommentInfo', function (req, res, next) {
  let postId = req.query.postId
  models.DB.query(`SELECT c.commentContent, u.userName,c.createdAt as commentTime  FROM \`comments\` AS c LEFT JOIN users as u on c.userId = u.id WHERE c.postId = ${postId} order by c.createdAt desc`, {type: sequelize.QueryTypes.SELECT}).then(ret => {
    res.json({
      code: 0,
      comments: ret
    })
  }).catch(err => {
    res.json({
      code: 100,
      msg: "服务器错误"
    })
  })
});


module.exports = router;
