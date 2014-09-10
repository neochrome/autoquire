var Kernel = require('../src/kernel');

var loadPath = function (p) {
	var path = require('path');
	return path.resolve(path.dirname(module.filename), p || '');
};

describe('Kernel', function () {

	it('emits "error" event when module not found', function () {
		var onError = sinon.spy();
		var kernel = new Kernel(loadPath('./a/missing/path'));
		kernel.on('error', onError);

		kernel.get('missing-module');

		expect(onError).was.called();
	});

	it('resolves requirements relative to module', function () {
		var	kernel = new Kernel();

		var instance = kernel.get(loadPath('./modules/module-with-requirement'));

		expect(instance).not.to.be(undefined);
		expect(instance.module).not.to.be(undefined);
	});

	describe('with path to known modules', function () {
		var kernel;
		beforeEach(function () { kernel = new Kernel(loadPath('./modules')); });

		it('emits "resolve" events', function () {
			var onResolve = sinon.spy();
			kernel.on('resolve', onResolve);

			kernel.get('module');

			expect(onResolve).was.called();
			expect(onResolve.lastCall.args[0]).to.be('module');
			expect(onResolve.lastCall.args[1]).to.contain('/modules/module');
		});

		it('yields instance from module factory', function () {
			var instance = kernel.get('module');

			expect(instance).not.to.be(undefined);
		});

		it('yields same instance when requested multiple times', function () {
			var first  = kernel.get('module');
			var second = kernel.get('module');

			expect(second).to.be(first);
		});

		it('emits "create" event first time an instance is requested', function () {
			var onCreate = sinon.spy();
			kernel.on('create', onCreate);

			kernel.get('module');
			kernel.get('module');

			expect(onCreate).was.calledOnce();
		});

		it('emits "get" events every time an instance is requested', function () {
			var onGet = sinon.spy();
			kernel.on('get', onGet);

			kernel.get('module');
			kernel.get('module');
			kernel.get('module');

			expect(onGet).was.calledThrice();
		});

		it('yields instance with requirement satisfied', function () {
			var module   = kernel.get('module');
			var instance = kernel.get('module-with-requirement');

			expect(instance.module).to.be(module);
		});

		it('yields instance with multiple requirements satisfied', function () {
			var module    = kernel.get('module');
			var submodule = kernel.get('sub/module');
			var instance  = kernel.get('module-with-requirements');

			expect(instance.module).to.be(module);
			expect(instance.sub.module).to.be(submodule);
		});

	});

});
