const { Model } = require("objection");
const { DBErrors } = require('db-errors');
class BaseModel extends DBErrors(Model){

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = BaseModel;