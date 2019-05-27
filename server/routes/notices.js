var express = require('express');
var router = express.Router();
const models = require('../models');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// 添加公告
router.post('/register', function (req, res, next) {
  if (req.body.userName.trim() == null || req.body.pwd.trim() == null) {
    res.json({code: 101, msg: "缺少参数！"});
  }
  let userName= req.body.userName
  delete req.body.userName
  models.User.findOrCreate({
    where: {userName},
    defaults: req.body
  }).spread((user, created) => {
    if (created) {
      res.json({code: 0, msg: "注册成功",data:user})
    } else {
      res.json({code: 102, msg: "此昵称已注册"})
    }
  })
});





// 查询所有公告
router.get('/userList', function (req, res, next) {
  let userName = req.query.userName  // get
  console.log(userName)
  if(userName){
    models.User.findAll({
      where:{userName:userName},
      attributes: [['id',"userId"],'userName',['createdAt','regTime'],'ifSilent','role']
    }).then(userList => {
      res.json({code: 0, userList:userList})
    })
  }else {
    models.User.findAll({
      attributes: [['id',"userId"],'userName',['createdAt','regTime'],'ifSilent','role']
    }).then(userList => {
      res.json({code: 0, userList:userList})
    })
  }
});



// 删除公告
router.delete('/deleteUser/:userId', function (req, res, next) {
  userId = req.params.userId;
  models.User.destroy({
    where:{
      id:userId
    }
  }).then(ret => {
    res.json({code:0,msg:"删除成功"})
  }).catch(ret => {
    res.json({code:100,msg:"删除失败"})
  })

});


// 更新公告信息
router.put('/listUpdate', function (req, res, next) {
  models.User.update(req.body.update, {where: {id: req.body.id}}).then(result => {
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
