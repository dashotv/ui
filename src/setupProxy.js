const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/tower',
        createProxyMiddleware({
            target: 'http://localhost:9000/',
            pathRewrite: {'^/api/tower': ''},
            changeOrigin: true,
        })
    );
};
