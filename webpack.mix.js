const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        //
    ])
    .sass("resources/sass/app.scss", "public/css", {
        sassOptions: {
            additionalData: `@import "./resources/sass/abstracts/_variables.scss";`
        }
    })

    .options({
        extractVueStyles: true,
        processCssUrls: false
    });
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }
        ]
    }
});
