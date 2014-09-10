exports = module.exports = function () {
	console.log('factory for: c');
	return function () {
		console.log('c');
	};
};
