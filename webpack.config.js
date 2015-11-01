module.exports = {
    entry: './js/demos/app.js',

    output: {
        filename: 'bundle.js',
    },

    module: {
        loaders: [{
            test: /\.html$/,
            loader: "ejs-loader?variable=data"
        }],
    }
}
