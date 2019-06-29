const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	entry: {
		bundle: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
			},
			{ test: /\.(png|jpe?g|svg|)$/, exclude: /node_modules/, use: 'file-loader' },
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},
	plugins: [ new CopyWebpackPlugin([ { from: 'assets', to: 'assets' } ]) ]
};
