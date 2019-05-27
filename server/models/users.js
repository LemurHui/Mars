module.exports = function (sequelize,DataTypes) {
  return sequelize.define("users",
    {
      userName: {  // 用户名
        type: DataTypes.STRING(32),
        allowNull: false,
        unique:true
      },
      pwd: {  // 密码
        type: DataTypes.STRING(125),
        allowNull: false
      },
      role: {  // 角色
        type: DataTypes.ENUM("村长", "歌迷", "歌迷会"),
        defaultValue:"歌迷",
        allowNull: true
      },
      faceImg: {  // 头像路径
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      selfIntro: {  // 个人简介
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {  // 手机号
        type: DataTypes.BIGINT(11),
        allowNull: true,
      },
      rank: {  // 等级
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      point: {  // 积分
        type: DataTypes.BIGINT(20),
        allowNull: true,
      },
      ifSilent: {  // 是否禁言
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      silentStart: {  // 开始禁言时间
        type: DataTypes.DATE,
        allowNull: true,
      },
      silentEnd: {  // 禁言结束时间
        type: DataTypes.DATE,
        allowNull: true,
      }
    })
};