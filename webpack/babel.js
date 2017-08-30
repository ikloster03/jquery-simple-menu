module.exports = function(  ) {
    return {
        module: {
            rules: [
                {
                    loader: "babel-loader",
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    query: {
                        plugins: ['transform-runtime'],
                        presets: ['es2015','vue'],
                    }
                },
            ]
        }
    };
};