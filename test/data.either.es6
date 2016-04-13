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
    property('equals', 'integer', function(a) {
        return _.Left(a).equals(_.Left(a))
    });
    property('equals', 'integer', function(a) {
        return !_.Left(a).equals(_.Right(a))
    });
    debugger
  });

});
