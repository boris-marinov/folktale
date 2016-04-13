const data = require('folktale/core/adt');
const fl   = require('fantasy-land');

const Either = data({
  Left:  ['value'],
  Right: ['value']
});

const _Left  = Either.Left;
const _Right = Either.Right;

 //TODO place in a separate file for other modules to use.
const assertType = (type) => (method, value) => {
  if (process.env.NODE_ENV !== 'production' && !(type.isPrototypeOf(value))) {
    console.warn(`
${method} expects a value of the same type, but was given ${value}.

This could mean that you've provided the wrong value to the method, in
which case this is a bug in your program, and you should try to track
down why the wrong value is getting here.

But this could also mean that you have more than one Maybe library
instantiated in your program. This is not **necessarily** a bug, it
could happen for several reasons:

 1) You're loading the library in Node, and Node's cache didn't give
    you back the same instance you had previously requested.

 2) You have more than one Code Realm in your program, and objects
    created from the same library, in different realms, are interacting.

 3) You have a version conflict of folktale libraries, and objects
    created from different versions of the library are interacting.

If your situation fits the cases (1) or (2), you are okay, as long as
the objects originate from the same version of the library. Folktale
does not rely on reference checking, only structural checking. However
you'll want to watch out if you're modifying the Maybe's prototype,
because you'll have more than one of them, and you'll want to make
sure you do the same change in all of them — ideally you shouldn't
be modifying the object, though.

If your situation fits the case (3), you are *probably* okay if the
version difference isn't a major one. However, at this point the
behaviour of your program using Maybe is undefined, and you should
try looking into why the version conflict is happening.

Parametric modules can help ensuring your program only has a single
instance of the folktale library. Check out the Folktale Architecture
documentation for more information.
    `);
  }
};

const assertFunction = (method, transformation) => {
  if (typeof transformation !== 'function') {
    throw new TypeError(`${method} expects a function, but was given ${transformation}.`);
  }
}

const assertEither = assertType(Either)

// -- Constructors -----------------------------------------------------
const Left  = (value) => new Either.Left.constructor({ value });
const Right = (value) => new Either.Right.constructor({ value });


// -- Setoid -----------------------------------------------------------
_Left.prototype[fl.equals] = function(anEither) {
  assertEither('Either.Left#equals', anEither);
  return anEither.isLeft === true && anEither.value === this.value;
};

_Right.prototype[fl.equals] = function(anEither) {
  assertEither('Either.Right#equals', anEither);
  return anEither.isRight === true && anEither.value === this.value;
};


// -- Functor ----------------------------------------------------------
_Left.prototype[fl.map] = function(transformation) {
  assertFunction('Either.Left#map', transformation)
  return this
};

_Right.prototype[fl.map] = function(transformation) {
  assertFunction('Either.Right#map', transformation)
  return Right(transformation(this.value))
};

// -- Apply ------------------------------------------------------------
_Left.prototype[fl.ap] = function(anEither) {
  assertEither('Either.Left#ap', anEither);
  return this;
};

_Right.prototype[fl.ap] = function(anEither) {
  assertEither('Either.Right#ap', anEither);
  return anEither.map(this.value);
};


// -- Applicative ------------------------------------------------------
Either[fl.of] = Right;


// -- Chain ------------------------------------------------------------
_Left.prototype[fl.chain] = function(transformation) {
  assertFunction('Either.Left#chain', transformation)
  return this;
};

_Right.prototype[fl.chain] = function(transformation) {
  assertFunction('Either.Right#chain', transformation)
  return transformation(this.value);
};


// -- Show -------------------------------------------------------------

// (for Object.prototype.toString)
Either[Symbol.toStringTag]    = '(folktale) Either';
_Left.prototype[Symbol.toStringTag]  = '(folktale) Either.Left';
_Right.prototype[Symbol.toStringTag] = '(folktale) Either.Right';

// (regular JavaScript representations)
Either.toString = () => '(folktale) Either';
_Left.prototype.toString = function() {
  return `(folktale) Either.Left(${this.value})`;
};

_Right.prototype.toString = function() {
  return `(folktale) Either.Right(${this.value})`;
};

// (Node REPL representations)
Either.inspect = Either.toString;
_Left.prototype.inspect  = _Left.prototype.toString
_Right.prototype.inspect = _Right.prototype.toString


// -- Extracting values and recovering ---------------------------------
//TODO

// -- JSON conversions -------------------------------------------------
_Left.prototype.toJSON = function() {
  return {
    '#type': 'folktale:Either.Left',
    value:   this.value
  };
};

_Right.prototype.toJSON = function() {
  return {
    '#type': 'folktale:Either.Right',
    value:   this.value
  };
};


module.exports = {
  Left,
  Right,
  type:Either
}
