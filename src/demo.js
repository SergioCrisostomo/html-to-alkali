
const convert = require('./index.js');

const textarea = document.querySelector('textarea.code');
const target = document.querySelector('pre.code');
const demos = [...document.querySelectorAll('button')];

function eventHandler(){
	if (this.tagName == 'BUTTON') textarea.value = this.value;
	target.innerHTML = convert(this.value);
}
if (demos && textarea){
	textarea.addEventListener('input', eventHandler);
	demos.forEach(
		el => el.addEventListener('click', eventHandler)
	);
}

module.exports = convert;
