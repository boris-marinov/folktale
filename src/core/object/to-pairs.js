//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Copyright (C) 2015-2016 Quildreen Motta.
// Licensed under the MIT licence.
//
// See LICENCE for licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const toPairs = (object) => Object.keys(object).map(k => [k, object[k]]);


module.exports = toPairs;


// -- Annotations ------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  module.exports[Symbol.for('@@meta:magical')] = {
    name: 'toPairs',
    signature: 'toPairs(object)',
    type: '({ String | Symbol -> Any }) -> [#[String | Symbol, Any]]',
    category: 'Converting',
    stability: 'stable',
    platforms: ['ECMAScript 5'],
    authors: ['Quildreen Motta'],
    module: 'folktale/core/object/toPairs',
    licence: 'MIT',
    complexity: 'O(n), n is the number of own enumerable properties',
    documentation: `
Returns pairs of (key, value) for all own enumerable properties in an object.

Objects in JavaScript are commonly used as dictionaries, but natively
there are no operations to work with them in that way. This function
allows one to extract the (key, value) pairs from an object:

    const pair = { x: 10, y: 20 };
    toPairs(pair);
    // => [['x', 10], ['y', 20]]  or  [['y', 20], ['x', 10]]

Inherited properties, and those that are not marked as enumerable, are
not returned in the resulting array:

    const p1 = { z: 2 };
    const pair = Object.create(p1);
    pair.x = 10; pair.y = 20;

    toPairs(pair);
    // => [['x', 10], ['y', 20]]  or  [['y', 20], ['x', 10]]

    // non-enumerable property x
    Object.defineProperty(p1, 'x', { value: 1 });

    toPairs(p1);
    // => [['z', 2]]


> **NOTE**  
> While ECMAScript 2015 specifies that objects are ordered using
> insertion order, you're not guaranteed to get that behaviour in
> any non-ES2015 engine, so for all effects it's better to treat
> the result of this operation as an unordered collection.
    `
  };
}
