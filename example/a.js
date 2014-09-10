exports = module.exports = function (b, c) {
	console.log('factory for: a');
	return function () {
		console.log('a');
		b(); c();
	};
};
exports.$require = ['b', 'c'];
