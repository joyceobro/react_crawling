var Sequelize = require("sequelize");
var sequelize;

sequelize = new Sequelize("news_db", "root", "mysql9p", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "+09:00",
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
        freezeTableName: true
    }
})
var db = {};
db.users = require(__dirname + "/users.js")(sequelize, Sequelize.DataTypes);
db.news_raw = require(__dirname + "/news_raw.js")(sequelize, Sequelize.DataTypes);
db.select_news = require(__dirname + "/select_news.js")(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;