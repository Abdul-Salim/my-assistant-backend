const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.post('/ask', async(req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.question,
        temperature: 0.1,
        max_tokens: 4000,
      });
      console.log(response.data);
      return res.json({text: response.data.choices[0]})
})
app.listen(4000, () => {
  console.log('Express server listening on port 3000');
});