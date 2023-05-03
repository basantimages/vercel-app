import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/brs/data', async (req, res) => {
  try {
    const response = await fetch(`https://www.instagram.com/${req.body.input}/?__a=1&__d=dis`);
    const resp = await response.json();
    console.log(resp);
    res.json(resp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/brs/data', async (req, res) => {
  try {
    const response = await fetch(`https://www.instagram.com/${req.body.input}/?__a=1&__d=dis`);
    const resp = await response.json();
    console.log(resp);
    res.json(resp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
