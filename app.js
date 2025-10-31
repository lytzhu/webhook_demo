// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
// 导入Express.js
const express = require('express');
// 创建一个Express应用
const app = express();
// 用于解析JSON请求体的中间件
app.use(express.json());
// 设置端口和验证令牌
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
// GET请求的路由
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK已验证');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});
// POST请求的路由
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook在${timestamp}收到\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});
// 启动服务器
app.listen(port, () => {
  console.log(`\n正在端口${port}上监听\n`);
});
