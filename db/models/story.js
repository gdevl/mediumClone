"use strict";
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      subtitle: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      imageUrl: DataTypes.STRING,
    },
    {}
  );
  Story.associate = function (models) {
    // associations can be defined here
  };
  return Story;
};
