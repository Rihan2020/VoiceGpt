import OpenAI from "openai";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const messages = [];

import {config} from "dotenv"
config()

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

async function main(input) {
  messages.push({ role: 'user', content: input })
    const chatCompletion = await openai.chat.completions.create({
      // messages: [{ role: 'user', content: 'tell me a joke' }],
      messages: messages,  
      model: 'gpt-3.5-turbo',
    });
  
    console.log(chatCompletion.choices[0]?.message?.content);
  }
  
  // main();

rl.on('line', (input) => {
  console.log(`Received: ${input}`);
  main(input)
  if(input === "q"){
    rl.close();
  }
});

