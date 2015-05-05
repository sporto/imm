/* @flow */

//! Imm
//! Immutable collections
//! (c) 2015 Sebastian Porto
//! MIT license.
//! https://github.com/sporto/imm

var Immutable = require('seamless-immutable');

if (Immutable == null) throw new Error('Immutable is null');

function Imm() {
	throw new Error('Using imm directly is deprecated, use imm.list instead');
}

Imm.List   = require('./list.js')(Immutable);
Imm.Obj    = require('./obj.js')(Immutable);

module.exports = Imm;
