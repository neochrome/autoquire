exports = module.exports = function () {
	console.log('factory for: f');
	return function () {
		console.log('f');
	};
};
