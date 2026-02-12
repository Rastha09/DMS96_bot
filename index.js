const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

// GANTI DENGAN ID TELEGRAM KAMU
const adminId = 123456789;

let downloadLink = "Belum ada link.";
let donasiText = "Belum ada info donasi.";
let linkText = "Belum ada link.";

// ===== USER =====

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot aktif!\n\nGunakan:\n/download\n/donasi\n/link");
});

bot.onText(/\/download/, (msg) => {
  bot.sendMessage(msg.chat.id, `📥 Link Download:\n${downloadLink}`);
});

bot.onText(/\/donasi/, (msg) => {
  bot.sendMessage(msg.chat.id, `💰 Donasi:\n${donasiText}`);
});

bot.onText(/\/link/, (msg) => {
  bot.sendMessage(msg.chat.id, `🔗 Link:\n${linkText}`);
});

// ===== ADMIN ONLY =====

bot.onText(/\/setdownload (.+)/, (msg, match) => {
  if (msg.from.id !== adminId) return;
  downloadLink = match[1];
  bot.sendMessage(msg.chat.id, "✅ Link download diperbarui!");
});

bot.onText(/\/setdonasi (.+)/, (msg, match) => {
  if (msg.from.id !== adminId) return;
  donasiText = match[1];
  bot.sendMessage(msg.chat.id, "✅ Info donasi diperbarui!");
});

bot.onText(/\/setlink (.+)/, (msg, match) => {
  if (msg.from.id !== adminId) return;
  linkText = match[1];
  bot.sendMessage(msg.chat.id, "✅ Link diperbarui!");
});

console.log("Bot is running...");
