module.exports.log = function () {
	console.info(new Date().toISOString(), ...arguments);
};
