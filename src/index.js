var path   = require('path');
var Kernel = require('./kernel');

exports.create = function (loadPath) {
	loadPath = path.resolve(path.dirname(module.parent.filename), loadPath || '');
	return new Kernel(loadPath);
};
exports.Kernel = Kernel;
