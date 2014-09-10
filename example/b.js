exports = module.exports = function (d) {
	console.log('factory for: b');
	return function () {
		console.log('b');
		d();
	};
};
exports.$require = 'd';
