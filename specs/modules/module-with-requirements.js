exports = module.exports = function (m1, m2) {
	return {
		module: m1,
		sub   : {
			module: m2
		}
	};
};
exports.$require = ['module', 'sub/module'];
