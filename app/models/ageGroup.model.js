
module.exports = (sequelize, Sequelize) => {
  const ageGroup = sequelize.define("ageGroup", {
   from : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    to : {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
  }});

  return ageGroup;
};
