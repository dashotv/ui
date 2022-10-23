const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/tower',
    createProxyMiddleware({
      target: 'http://localhost:9000/',
      pathRewrite: { '^/api/tower': '' },
      changeOrigin: true,
    }),
  );
  app.use(
    '/api/scry',
    createProxyMiddleware({
      target: 'http://10.0.4.61:10080/',
      pathRewrite: { '^/api/scry': '' },
      changeOrigin: true,
    }),
  );
  app.use(
    '/media-images',
    createProxyMiddleware({
      target: 'http://seer.dasho.net/',
      // pathRewrite: { '^/api/scry': '' },
      changeOrigin: true,
    }),
  );
};
