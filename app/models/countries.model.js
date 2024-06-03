
module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("countries", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    }
  });

  return Country;
};
