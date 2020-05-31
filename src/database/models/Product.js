const { Model } = require('objection');

class Product extends Model {
    static get tableName() {
        return "products";
    }
}

//exportamos Product
module.exports = Product;