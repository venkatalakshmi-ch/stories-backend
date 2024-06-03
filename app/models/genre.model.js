
module.exports = (sequelize, Sequelize) => {
  const genre = sequelize.define("genre", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    }
  });

  return genre;
};
