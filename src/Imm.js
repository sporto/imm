/* @flow */

/*!
 * Module dependencies.
 */
var Immutable = require('seamless-immutable');

if (Immutable == null) throw new Error('Immutable is null');

function Imm() {
	throw new Error('Using imm directly is deprecated, use imm.list instead');
}

Imm.List   = require('./List.js')(Immutable);
Imm.Array  = require('./Array.js')(Immutable);
Imm.Obj    = require('./Obj.js')(Immutable);

module.exports = Imm;
