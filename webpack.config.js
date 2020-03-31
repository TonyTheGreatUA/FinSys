const { resolve: resolvePath } = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = __dirname
const SRC_DIR = resolvePath(ROOT_DIR, 'src')
const DIST_DIR = resolvePath(ROOT_DIR, 'dist')

module.exports = {
	entry: resolvePath(SRC_DIR, 'index.js'),

	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
	},

	mode: "production",

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						},
					}
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProgressPlugin(),

		new HtmlWebpackPlugin({
			template: resolvePath(SRC_DIR, 'index.html'),
			filename: "index.html"
		})
	],

	devServer: {
		host: 'localhost',
		port: 5001,
		open: true
	},
}