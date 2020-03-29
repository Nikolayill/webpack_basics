const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    static: path.join(__dirname, 'static'),
    build: path.join(__dirname, 'build'),

};

/**
 * Задержка выполнения треда на опред. число миллисекунд
 * см. https://medium.com/@frontman/node-js-sleep-usleep-msleep-bba767557c20
 * @param milliSeconds
 * @returns {"ok" | "not-equal" | "timed-out"}
 */
const msleep = milliSeconds =>
    Atomics.wait(
        new Int32Array(new SharedArrayBuffer(4)),
        0, 0, milliSeconds
    )
;

const json_server_url = 'http://localhost:'+(process.env.JSON_SERVER_PORT || 3000)+'/';
console.log("Proxying api to", json_server_url);

module.exports = {
    entry: PATHS.source + '/index.js',
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    devServer: { //https://github.com/webpack/webpack-dev-server/tree/master/examples/general
        proxy: {
            '/api': {
                target: json_server_url,    //перенаправление запросов начинающихся со /api на json-server
                // changeOrigin: true,         //
                pathRewrite: {
                    '^/api': '',            //удаление префикса из исходного url
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack app',
            template: path.join(PATHS.static, 'index.html')
        })
    ]
};
