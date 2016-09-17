
## HTML to Alkali API converter

This code converts HTML into JavaScript with [Alkali sintax](https://github.com/kriszyp/alkali).

For example:

	<div id='wrapper' class='full red'>
	    <div id='inner' onclick='foo(1, this.id);'>Click me</div>
	</div>

is converted to:

	Div('#wrapper.full.red', [Div('#inner', 'Click me', {
	    "onclick": foo.bind(window, 1, this.id)
	})])

### How to use:

You can use it online [here](https://sergiocrisostomo.github.io/html-to-alkali/).

### Testing:

	$ npm install
	$ npm test
