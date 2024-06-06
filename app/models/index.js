const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.story = require("./story.model.js")(sequelize, Sequelize);
db.chat = require("./chat.model.js")(sequelize, Sequelize);
db.language = require("./language.model.js")(sequelize, Sequelize);
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.country = require("./countries.model.js")(sequelize, Sequelize);
db.favoriteStory = require("./favorite.model.js")(sequelize, Sequelize);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



// foreign key for user stories

db.user.hasMany(
  db.story,
  { as: "story" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.story.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for chat

db.story.hasMany(
  db.chat,
  { as: "chat" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.chat.belongsTo(
  db.story,
  { as: "story" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for user and stories as favorite stories


// foreign key for user and stories as favorite stories
db.user.belongsToMany(db.story, {
  through: db.favoriteStory,
  as: "favoriteStories",
  foreignKey: "userId",
  otherKey: "storyId",
  onDelete: "CASCADE",
});
db.story.belongsToMany(db.user, {
  through: db.favoriteStory,
  as: "fans",
  foreignKey: "storyId",
  otherKey: "userId",
  onDelete: "CASCADE",
});


module.exports = db;
