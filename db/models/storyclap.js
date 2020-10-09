"use strict";
module.exports = (sequelize, DataTypes) => {
  const StoryClap = sequelize.define(
    "StoryClap",
    {
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
  StoryClap.associate = function (models) {
    StoryClap.belongsTo(models.Story, { foreignKey: "storyId" });
    StoryClap.belongsTo(models.User, { foreignKey: "userId" });
  };
  return StoryClap;
};

