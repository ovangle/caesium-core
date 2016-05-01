/// <reference path="../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../typings/es6-shim/es6-shim.d.ts"/>

import 'reflect-metadata';

import {langTests} from './lang.spec';
import {tryTests} from './try.spec';
import {codecTests} from './codec.spec';
import {converterTests} from './converter.spec';
import {decoratorTests} from './decorator.spec';

langTests();
tryTests();
converterTests();
codecTests();
decoratorTests();
