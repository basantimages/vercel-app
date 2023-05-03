import cors from 'cors';
import express from 'express';
import axios from 'axios';
const app = express();

// Section 1 =====================================================================
const headers = {
  'User-Agent':
    'Instagram 105.0.0.18.119 (iPhone11,8; iOS 14_3; en_US; en-US; scale=2.00; 828x1792; 219842854)',
  'x-ig-app-id': '1217981644879628',
};

// Add middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Set CORS headers for all API endpoints
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.post('/brs/data', async (req, res) => {
  try {
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${req.body.input}`;

    axios
      .get(url, { headers })
      .then((response) => {
        // console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/brs/data', async (req, res) => {
  try {
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=hello`;

    axios
      .get(url, { headers })
      .then((response) => {
        console.log(response);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
