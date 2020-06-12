const { Model } = require("objection");

class BaseModel extends Model{

  $beforeInsert() {
		this.created_at = this.formatDate();
	}

	$beforeUpdate() {
		this.updated_at = this.formatDate();
	}

	formatDate(date = new Date()) {
		if (!date) {
			return date;
		}

		return date
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");
	}
}

module.exports = BaseModel;