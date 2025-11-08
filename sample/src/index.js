import express from 'express';
const app = express();
const port = 3000;
 
// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.get('/api/get', (req, res) => {
  res.json({ message: 'Hey listening' });
});
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});