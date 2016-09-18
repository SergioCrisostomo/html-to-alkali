
## HTML to Alkali API converter tool

This tool converts HTML into JavaScript with [Alkali API sintax](https://github.com/kriszyp/alkali).

For example:

```html
<div>
    <span>Hello</span>
    <div>
        <span class='inner-span'>World</span>
    </div>
</div>
```

is converted to:

```javascript
Div([
    Span('', 'Hello'),
    Div([
        Span('.inner-span', 'World')
    ])
])
```

### How to use:

You can [use it online here](https://sergiocrisostomo.github.io/html-to-alkali/).

### Testing:

	$ npm install
	$ npm test
