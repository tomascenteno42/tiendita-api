const knex = require("knex");
const { Model } = require("objection");

// My DataBase
const db = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "toor",
        database: "tiendita"
    }
});
const bootstrap = (callback) => {
    Model.knex(db);    
    callback();
};

module.exports = bootstrap;

