exports = module.exports = function (f) {
	console.log('factory for: e');
	return function () {
		console.log('e');
		f();
	};
};
exports.$require = ['sub/f'];
