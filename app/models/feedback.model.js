
module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define("feedback", {
    message: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    }
  });

  return Feedback;
};
