// openai-test.js

import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY in .env file");
  process.exit(1);
}

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // you can switch to gpt-4o or gpt-3.5-turbo
      messages: [
        { role: "system", content: "You are a helpful coding assistant." },
        { role: "user", content: "Write a Hello World app in React." },
      ],
    });

    console.log("\n✅ OpenAI Response:\n");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("\n❌ Error while calling OpenAI API:\n");
    console.error(error);
  }
}

main();

