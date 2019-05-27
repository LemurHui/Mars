var express = require('express');
var router = express.Router();
const sequelize = require('sequelize')
const models = require('../models');
var path = require('path')
var fs = require("fs")
//
// /* 查询所有资源 */
// router.get('/getResInfos', function (req, res, next) {
//   models.Reses.findAll({
//     attributes:['id','resTitle','resClass','resDescription','resFaceImg'],
//     order:[['createdAt', 'DESC']]
//   }).then(ret => {
//     res.json({code:0,resInfos:ret})
//   }).catch(err => {
//     res.json({code:100,msg:'发生了错误'})
//   })
// });




/* 查询特定id的资源 */
router.get('/getVideo', function (req, res, next) {
  models.Reses.findOne({
    where:{
      id: req.query.id
    },
    attributes:['id','resTitle','resClass','resDescription','resFaceImg','resPath']
  }).then(ret => {
    res.json({code:0,videoInfo:ret})
  }).catch(err => {
    res.json({code:100,msg:'发生了错误'})
  })
});

/* 根据标题、内容模糊查询的资源 所有资源*/
router.get('/getResInfos', function (req, res, next) {
  console.log(req.query.content)
  let queryContent = ''
    if(req.query.content == null || req.query.content == undefined){
      queryContent = `SELECT id,resTitle,resClass,resDescription,resFaceImg,resPath FROM reses`
    }else {
      queryContent = `SELECT id,resTitle,resClass,resDescription,resFaceImg,resPath FROM reses where resTitle like '%${req.query.content}%' OR resDescription like '%${req.query.content}%'`
    }
  console.log(queryContent)
  models.DB.query(queryContent,{type: sequelize.QueryTypes.SELECT}
  ).then(ret => {
    res.json({code:0,resInfos:ret})
  }).catch(err => {
    res.json({code:100,msg:'发生了错误'})
  })
});


// 删除资源
router.delete('/deleteRes/:resId', function (req, res, next) {
  resId = req.params.resId;
  models.Reses.destroy({
    where:{
      id:resId
    }
  }).then(ret => {
    res.json({code:0,msg:"删除成功"})
  }).catch(ret => {
    res.json({code:100,msg:"删除失败"})
  })

});



// 更新资源信息
router.put('/resUpdate', function (req, res, next) {
  models.Reses.update(req.body.update, {where: {id: req.body.id}}).then(result => {
    if(result[0] == 1){
      res.json({code:0,msg:"修改成功"})
    }else {
      res.json({code:100,msg:"修改失败"})
    }
  }).catch(err => {
    res.json({code:100,msg:"修改失败"})
  })
});


module.exports = router;
