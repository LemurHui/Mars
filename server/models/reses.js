module.exports = function (sequelize,DataTypes) {
  return sequelize.define("reses",
    {
      resTitle: {  // 资源标题
        type: DataTypes.STRING(127),
        allowNull: false,
      },
      resClass: {  // 资源分类
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      resDescription: {  // 资源描述
        type: DataTypes.STRING(127),
        allowNull: true,
      },
      resPath: {  // 资源路径
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resFaceImg: {  // 封面
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue:'fanzhi_01.jpg'
      },
      ifAudit: {  // 是否通过审核
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
    })
};