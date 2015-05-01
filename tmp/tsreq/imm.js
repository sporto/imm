//! Imm
//! Immutable collections
//! (c) 2015 Sebastian Porto
//! MIT license.
//! https://github.com/sporto/imm
var Immutable = require('seamless-immutable');
if (Immutable == null)
    throw new Error('Immutable is null');
function imm() {
    console.warn('Using imm directly is deprecated, use imm.list instead');
}
imm.list = require('./list.ts')(Immutable);
imm.obj = require('./object.ts')(Immutable);
module.exports = imm;
