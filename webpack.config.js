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

module.exports = {
    entry: PATHS.source + '/index.js',
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    devServer: { //https://github.com/webpack/webpack-dev-server/tree/master/examples/general
        proxy: {
            '/api/bypass-example': {
                bypass: (req, res) => {
                    console.log("proxy sleeping...");
                    msleep(2000);
                    console.log("proxy send response");
                    return res.send({
                    mssg: 'proxy server - Message came from bypass property in webpack'
                })},
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
