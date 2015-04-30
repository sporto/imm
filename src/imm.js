//! Imm
//! Immutable collections
//! (c) 2015 Sebastian Porto
//! MIT license.
//! https://github.com/sporto/imm

var Immutable = require('seamless-immutable');

if (Immutable == null) throw new Error('Immutable is null');

module.exports = {
	list: require('./list')(Immutable)
};