module.exports = function (sequelize,DataTypes) {
  return sequelize.define("notices",
    {
      noticeTitle: {  // 公告标题
        type: DataTypes.STRING(127),
        allowNull: false,
      },
      noticeTheme: {  // 公告主题
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      noticeContent: {  // 公告发布时间
        type: DataTypes.STRING(127),
        allowNull: true,
      },
    })
};