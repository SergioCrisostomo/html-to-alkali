
'use strict';

const tests = require('./assets.json');
const alkali = require('alkali');
const convert = require('../builds/bundle.js').convert;
const Div = alkali.Div;
const Span = alkali.Span;

const toJSON = (function (attrs) { // make a JSON from a Alkali instance
	return function (obj){
		const tree = attrs.reduce((json, attr) => {
			if (attr == 'children') json.children = Array.from(obj.children).map(ch => toJSON(ch));
			else if (attr == 'textContent' && json.children.length) return json;
			else json[attr] = obj[attr];
			return json;
		}, {});
		return tree;
	}
})(['id', 'className', 'children', 'textContent']);

describe('HTML to Alkali tests', () => {
	it('should convert a valid HTML string', () => {
		tests.parse.forEach(test => {
			expect(convert(test.html)).toEqual(test.js);
		});
	});

	it('should produce valid Alkali API code', () => {
		window.foo = function(){}; // to prevent throw
		tests.parse.forEach(test => {
			const jsString = convert(test.html);
			const Alkali = new (eval(jsString));
			const tree = toJSON(Alkali);
			expect(tree).toMatchSnapshot();
		});
		delete window.foo;
	});
});
