const Sequelize = require('sequelize');

// 声明数据库链接并且到处它
exports.sequelize = new Sequelize('express', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
