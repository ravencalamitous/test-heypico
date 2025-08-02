const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Set up default metrics collection
client.collectDefaultMetrics();

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Root endpoint
const greeting = process.env.GREETING || 'Hello, World!';
app.get('/', (req, res) => {
  res.send(greeting);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
