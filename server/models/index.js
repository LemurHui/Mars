const sequelize = require('../config/db.config').sequelize;  // 导入数据库链接

const db = { DB:sequelize};

db.User = sequelize.import("./users");
db.Post = sequelize.import("./posts");
db.Comment = sequelize.import("./comments");
db.Reses = sequelize.import("./reses");
db.User.hasMany(db.Post)  // 在Post中创建  userId 一对多关联User


// 一个人发过个评论
db.User.hasMany(db.Comment,{as:'UserId'})
// 一个帖子多个评论
db.Post.hasMany(db.Comment,{as:'PostId'})
// sequelize.sync({force: true});
// sequelize.sync();

module.exports = db  // 导出