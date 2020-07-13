import knex from "knex";
import { Model } from "objection";

const db = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "toor",
        database: "tiendita"
    }
});

export const bootstrap = (callback) => {
    Model.knex(db);    
    callback();
};


