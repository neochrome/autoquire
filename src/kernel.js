var path   = require('path');
var util   = require('util');
var events = require('events');

var Kernel = function (loadPath) {
	events.EventEmitter.call(this);
	this.modules = {};
	this.loadPath = loadPath || '';
};
util.inherits(Kernel, events.EventEmitter);

Kernel.prototype.resolve = function (id) {
	var self = this;
	if (typeof self.modules[id] !== 'undefined') { return; }

	var absolutePathToModule = path.resolve(self.loadPath, id);
	var relativePathToModuleDirectory = path.relative(self.loadPath, path.dirname(absolutePathToModule));

	self.emit('resolve', id, absolutePathToModule);

	var instance;
	var factory = require(absolutePathToModule);
	var requirements = factory.$require || [];
	if (typeof requirements === 'string') { requirements = [requirements]; }
	requirements = requirements.map(function (id) { return path.join(relativePathToModuleDirectory, id); });
	
	self.modules[id] = function () {
		if(typeof instance === 'undefined') {
			self.emit('create', id);
			instance = factory.apply(undefined, requirements.map(function (id) { return self.get(id); }));
		}
		return instance;
	};
	requirements.forEach(function (id) { self.resolve(id); });
};

Kernel.prototype.get = function (id) {
	this.emit('get', id);
	try {
		this.resolve(id);
		return this.modules[id]();
	} catch (e) {
		this.emit('error', e);
		return;
	}
};

exports = module.exports = Kernel;
