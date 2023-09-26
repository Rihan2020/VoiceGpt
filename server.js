const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const OpenAI = require('openai');
const messages = [];

const openai = new OpenAI({
  apiKey: "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"
});

async function main(input) {
messages.push({ role: 'user', content: input })
  const chatCompletion = await openai.chat.completions.create({
    // messages: [{ role: 'user', content: 'tell me a joke' }],
    messages: messages,  
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0]?.message?.content;
}


app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/api', async function (req, res, next) {
  console.log(req.body)
  const mes = await main(req.body.input)
  res.json({success: true, message: mes})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
