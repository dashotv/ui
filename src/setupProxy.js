const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/scry/*',
        createProxyMiddleware({
            target: 'http://192.168.42.46:10080',
            changeOrigin: true,
            pathRewrite: {
                '^/api/scry': '/',
            },
        })
    );
};
