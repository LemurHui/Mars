module.exports = function (sequelize,DataTypes) {
  return sequelize.define("posts",
    {
      postTitle: {  // 帖子标题
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      postContent: {  // 帖子内容
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      postImg1: {  // 帖子内容
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:''
      },

      postImg2: {  // 帖子内容
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:''
      },

      postImg3: {  // 帖子内容
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:''
      }
    })
};