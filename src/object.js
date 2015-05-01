function makeObj(Immutable) {

	/**
	* Returns an Imm object
	* **Example**
	*
	* ```js
	* var data = {id: 1, label: 'Sam'};
	* var record = imm.obj(data);
	* ```
	*
	* @param {Object} data A JS object
	* @return {Imm.obj} Imm object
	* @api public
	*/
	function obj(data) {

		return {
			isImmObject:    true
		}
	}

	return obj;
}

module.exports = makeObj;