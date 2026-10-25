const express = require('express');
const app = express();

app.get('/api/health/db', (req, res) => {
  res.json({
    success: true,
    message: 'Test route works'
  });
});

app.listen(3001, () => {
  console.log('Test server running on port 3001');
});
