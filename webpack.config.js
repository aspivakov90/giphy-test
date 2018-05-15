'use strict'

// ES6 syntax doesn't support at this moment, before webpack applies babel loader
const Path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins: [
        new WriteFilePlugin() // force webpack-dev-server to make a bundle before start
    ],
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    {
                      loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                      loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                      loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.jsx?$/, // both .js and .jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {}
                }
            }
        ]
    }
}