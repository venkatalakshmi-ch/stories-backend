
module.exports = (sequelize, Sequelize) => {
  const Story = sequelize.define("story", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    story: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });

  return Story;
};
