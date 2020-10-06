'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResponseClap = sequelize.define('ResponseClap', {
    responseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  ResponseClap.associate = function(models) {
    // associations can be defined here
    ResponseClap.belongsTo(models.Response, { foreignKey: 'responseId'});
    ResponseClap.belongsTo(models.User, { foreignKey: 'userId'});
  };
  return ResponseClap;
};
