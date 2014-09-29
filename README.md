[![Build Status](https://travis-ci.org/neochrome/autoquire.png?branch=master)](https://travis-ci.org/neochrome/autoquire)

# Autoquire
No frills dependent module requiring for nodejs

## Requirements
Autoquire is tested with versions 0.10.x and 0.11.x of [Nodejs](http://nodejs.org).

## Installation

```
$ npm install --save neochrome/autoquire
```

## Usage
Autoquire works by having modules export a factory function as their entry point.
Said factory method takes the dependencies of the module as it's arguments:

```javascript
// module.js
exports = module.exports = function factory(dependencyA, dependencyB) {
	// module specific setup etc
	return { /* something useful */ };
};
```

Dependencies are not required using the regular `require()` function, but are
instead specified as a special property (`$require`) on the factory method.
The property lists the module dependencies in the same order as the factory
function arguments. If only a single dependency, the property may be set to a
string instead of an array of strings.

```javascript
exports.$require = ['dependencyA', 'dependencyB'];
```

In order to have a module loaded and all of it's dependencies resolved and
loaded in turn, just require `autoquire`, create a `kernel` and make a call
to `get`:

```javascript
// main.js
var autoquire = require('autoquire');
var kernel = autoquire.create();

var module = kernel.get('./module');
```

Dependency resolving works by looking for matching module/filenames relative to
the file where `kernel.get` is executed (default), but may be customized when
the kernel is created, by supplying a relative path. Dependencies are in turn
specified relative to the module.

```
./
├── folder1
│   └── moduleA.js - $require = ['../folder2/moduleB']
├── folder2
│   └── moduleB.js
└── main.js
```

The kernel exposes the following events to enable tracing of the loading/resolving
procedure:

#### Event 'resolve'

- id `string` The name of the module being resolved.
- filename `string` The filename with path of the module being resolved.

This event fires when a module `id` gets resolved to a `filename`:

```javascript
kernel.on('resolve', function (id, filename) {
	console.log('resolving: %s -> %s', id, filename);
});
``` 

#### Event 'create'

- id `string` The name of the module created.

This event fires when a factory is called upon to create/initialize a module:

```javascript
kernel.on('create', function (id) {
	console.log('creating: %s', id);
});
```

#### Event 'get'

- id `string` The name of the module to get.

This event fires when a module is requested from the kernel.
