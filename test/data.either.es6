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

const { property, forall} = require('jsverify');
const _ = require('../').data.either;

describe('Data.Either', function() {

  describe('Setoid', function () {
    property('Left#equals', 'integer', 'integer', function(a, b) {
      return (a === b) === (_.Left(a).equals(_.Left(b)))
    });
    property('Right#equals', 'integer', 'integer', function(a, b) {
      return (a === b) === (_.Right(a).equals(_.Right(b)))
    });
    property('Left#equals and Right#equals', 'integer', function(a) {
      return !(_.Left(a).equals(_.Right(a)))
    });
  });

  describe('Functor', function () {
    property('map', 'integer', 'integer -> integer', function(a, f) {
      return _.of(f(a)).equals(_.of(a).map(f))
    });
    
    property('Left#map', 'integer', function(a) {
      const f = (a) => a + 1
      return _.Left(a).map(f).equals(_.Left(a))
    });
  });

  describe('Applicative', function () {
    property('of', 'integer', 'integer', function(a, b) {
      return (a === b) === (_.of(a).equals(_.of(b)))
    });

    property('ap', 'integer', 'integer -> integer', function(a, f) {
      return _.of(f).ap(_.of(a)).equals(_.of(f(a)))
    });
  });

  describe('Chain', function () {
    const lift = (f) => a => _.of(f(a))
    property('chain', 'integer', 'integer -> integer', function(a, f) {
      return  _.of(a).chain(lift(f)).equals(lift(f)(a))
    });

    property('chain#Left', 'integer', 'integer -> integer', function(a, f) {
      return _.Left(a).chain(lift(f)).equals(_.Left(a))
    });

  });
});
