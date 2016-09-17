
const beautify = require('js-beautify').js_beautify;
const tags = require('./tags');

function convert(str){
	const proxy = document.createElement('div');
	proxy.innerHTML = str;
	const alkaliDOM = toAlkali(proxy.children[0]);
	return beautify(alkaliDOM);
}

function bindArguments(js){ // TODO: use jscodeshift for this
	if (!js.match(/\w+\(.*\)/)) return js;
	const name = js.match(/(\w+)\s?\(/)[1];
	const args =  js.match(/\((.*)\)/)[1].split(',').map(s => s.trim());
	const bindArgs = ['window'].concat(args).filter(Boolean).join(', ');
	return `${name}.bind(${bindArgs})`;
}

function mountJSON(obj){
	const body = Object.keys(obj).reduce((arr, key) => {
		let val = `"${obj[key]}"`; // quoted string, default
		if (key == 'attributes') val = `${mountJSON(obj[key])}`; // nested object
		else if (key.indexOf('on') == 0) val = val.slice(1, -1); // unquoted strin
		return arr.concat(`"${key}": ${val}`);
	}, []);
	return `{${body.join(', ')}}`;
}

function toAlkali(el) {
    const tag = tags[el.tagName];
    const id = el.id ? `#${el.id}` : '';
    const classes = [...el.classList].map(clss => `.${clss}`).join('');

    const attributes = [...el.attributes].reduce((obj, attr) => {
		if (['id', 'class', 'children'].indexOf(attr.name) != -1) return obj;
		if (attr.name.indexOf('on') == 0) obj[attr.name] = bindArguments(attr.value);
		else if (typeof el[attr.name] == 'undefined'){
			if (!obj.attributes) obj.attributes = {};
			obj.attributes[attr.name] = attr.value;
		}
		else obj[attr.name] = attr.value;
		return obj;
    }, {});

    const children = [...el.children].map(toAlkali);
    const selector = id + classes;
	const textContent = el.children.length == 0 && el.textContent;
	const args = textContent ? [`'${selector}'`, `'${textContent}'`] :
		selector ? [`'${selector}'`] : [];

	if (Object.keys(attributes).length > 0) args.push(mountJSON(attributes));
	if (children.length > 0) args.push('[' + children + ']');
    return `${tag}(${args.join(', ')})`;
}

module.exports = convert;
