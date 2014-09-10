describe('Use cases', function () {

	it('resolves module instance with requirements from specified load path', function () {
		var jin = require('../src');
		var kernel = jin.create('./modules');

		var instance = kernel.get('module-with-requirements');

		expect(instance).not.to.be(undefined);
	});

	it('resolves module instance with requirements from qualified module path', function () {
		var jin = require('../src');
		var kernel = jin.create();

		var instance = kernel.get('./modules/module-with-requirements');

		expect(instance).not.to.be(undefined);
	});

});
