describe('Use cases', function () {

	it('resolves module instance with requirements from specified load path', function () {
		var autoquire = require('../src');
		var kernel = autoquire.create('./modules');

		var instance = kernel.get('module-with-requirements');

		expect(instance).not.to.be(undefined);
	});

	it('resolves module instance with requirements from qualified module path', function () {
		var autoquire = require('../src');
		var kernel = autoquire.create();

		var instance = kernel.get('./modules/module-with-requirements');

		expect(instance).not.to.be(undefined);
	});

});
