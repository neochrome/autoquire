exports = module.exports = function () {
	console.log('factory for: d');
	return function () {
		console.log('d');
	};
};
