module.exports = function (sequelize,DataTypes) {
  return sequelize.define("comments",
    {
      commentContent: {  // 帖子内容
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    })
};