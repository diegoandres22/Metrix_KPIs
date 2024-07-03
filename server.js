const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuración del proxy
app.use('/api', createProxyMiddleware({
  target: 'http://26.96.128.174:9090',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Elimina el prefijo '/api' al reenviar la solicitud
  },
}));

// Inicia el servidor
app.listen(3001, () => {
  console.log('Proxy server running on http://localhost:3001');
});
