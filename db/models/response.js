"use strict";
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define(
    "Response",
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      storyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {}
  );
  Response.associate = function (models) {
    Response.belongsTo(models.User, { foreignKey: "userId" });
    Response.belongsTo(models.Story, { foreignKey: "storyId" });

    Response.hasMany(models.ResponseClap, { 
      foreignKey: 'responseId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return Response;
};
