// bolt-app.ts
import dotenv from "dotenv";
import path from "path";

// Eerst expliciet je .env.local inladen
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Debug: Print tokens/secrets direct naar de console (NOOIT in productie loggen!)
console.log("SLACK_SIGNING_SECRET:", process.env.SLACK_SIGNING_SECRET ? 'Loaded' : 'NOT FOUND');
console.log("SLACK_BOT_TOKEN:", process.env.SLACK_BOT_TOKEN ? 'Loaded' : 'NOT FOUND');

import { App } from "@slack/bolt";

// Check: Foutmelding als secrets niet gezet zijn
if (!process.env.SLACK_SIGNING_SECRET) {
  throw new Error("SLACK_SIGNING_SECRET ontbreekt. Check je .env.local!");
}
if (!process.env.SLACK_BOT_TOKEN) {
  throw new Error("SLACK_BOT_TOKEN ontbreekt. Check je .env.local!");
}

// Bolt app initialisatie
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Eenvoudige test: reageer op 'ping' in Slack
app.message("ping", async ({ say }) => {
  await say("pong!");
});

// Start de Bolt app
(async () => {
  await app.start(process.env.PORT ? Number(process.env.PORT) : 3000);
  console.log("⚡️ Bolt app is running on port", process.env.PORT || 3000);
})();

