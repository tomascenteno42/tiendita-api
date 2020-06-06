const BaseModel = require("./BaseModel");

const User = require("./User");

class Product extends BaseModel {
    static get tableName() {
        return "products";
    }

    static get relationMappings() {

        const User = require("./User");

        return {
            users: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "product.id",
                    through: {
                        from: "user_product.product_id",
                        to: "user_product.user_id",
                        extra: ["quantity"]
                    },
                    to: "user.id"
                }
            }
        }
    }
}

//exportamos Product
module.exports = Product;