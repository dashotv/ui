const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/scry/*',
        createProxyMiddleware({
            target: 'http://localhost:10080',
            changeOrigin: true,
            pathRewrite: {
                '^/api/scry': '/',
            },
        })
    );
};
