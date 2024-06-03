
module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("language", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    }
  });

  return Chat;
};
