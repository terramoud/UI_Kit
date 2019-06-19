const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');


const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    /*host: 'localhost'*/
    host: '192.168.0.100', //for externally use
    port: 5000,
    /*open: true,*/
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, '192.168.0.100', () => {
    console.log('dev server listening on port 5000');
});