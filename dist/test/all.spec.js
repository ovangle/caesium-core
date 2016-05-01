/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../typings/es6-shim/es6-shim.d.ts"/>
"use strict";
require('reflect-metadata');
var lang_spec_1 = require('./lang.spec');
var try_spec_1 = require('./try.spec');
var codec_spec_1 = require('./codec.spec');
var converter_spec_1 = require('./converter.spec');
var decorator_spec_1 = require('./decorator.spec');
lang_spec_1.langTests();
try_spec_1.tryTests();
converter_spec_1.converterTests();
codec_spec_1.codecTests();
decorator_spec_1.decoratorTests();
