const BaseModel = require("./BaseModel");


class User extends BaseModel {
    static get tableName() {
        return "users";
    }
    
    static get relationMappings() {

        const Product = require("./Product");

        return{
            products: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Product,

                join: {
                    from: "users.id",
                    through: {
                        from: "user_product.user_id",
                        to: "user_product.product_id",
                        extra: ["quantity"]
                    },
                    to: "products.id"
                }
            }
        }
    }
}

//exportamos User
module.exports = User;