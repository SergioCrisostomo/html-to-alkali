
module.exports = {
    entry:  './src/demo.js',
    output: {
        path: 'builds',
        filename: 'bundle.js',
		library: 'convert',
		libraryTarget: 'this'
    },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
    devtool: 'cheap-source-map'
};
