const express = require('express');
const router = express.Router();
const axios = require('axios');
const md5 = require('md5');
const uid2 = require('uid2');

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
// console.log('publickey => ', publicKey, 'privatekey => ', privateKey);

router.get('/comics', async (req, res) => {
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
