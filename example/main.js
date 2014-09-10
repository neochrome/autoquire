var autoquire = require('../');
var kernel = autoquire.create()
	.on('resolve', function (id, filename) { console.log('resolving: %s -> %s', id, filename); })
	.on('create', function (id) { console.log('creating : %s', id); })
	.on('get', function (id) { console.log('getting : %s', id); });

kernel.get('a')();
kernel.get('sub/e')();
