import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import ProxyAgent from 'proxy-agent';
import { getProxies } from 'proxy-chain';

const app = express();
app.use(express.json());
app.use(cors());

// Function to get a random proxy from the list of proxies
const getRandomProxy = async () => {
  const proxies = await getProxies('http://proxy-chain-db.herokuapp.com/getProxies');
  const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
  return randomProxy;
};

app.post('/', async (req, res) => {
  try {
    const proxy = await getRandomProxy();
    const agent = new ProxyAgent(proxy);
    const response = await fetch(`https://www.instagram.com/${req.body.input}/?__a=1&__d=dis`, {
      agent,
    });
    const resp = await response.json();
    console.log(resp);
    res.json(resp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/', async (req, res) => {
  try {
    const proxy = await getRandomProxy();
    const agent = new ProxyAgent(proxy);
    const response = await fetch(`https://www.instagram.com/hello/?__a=1&__d=dis`, {
      agent,
    });
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
