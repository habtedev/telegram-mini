// backend/bot.js
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

// Use environment variables for security and flexibility
const token = process.env.YOUR_BOT_TOKEN
const miniAppUrl = process.env.MINI_APP_URL

if (!token) {
  console.error('Error: YOUR_BOT_TOKEN is not set in .env')
  process.exit(1)
}
if (!miniAppUrl) {
  console.error('Error: MINI_APP_URL is not set in .env')
  process.exit(1)
}

const bot = new TelegramBot(token, { polling: true })

// Define all subjects and their PDF files/messages in one place
const subjects = [
  {
    text: 'Emerging Technology',
    subject: 'emerging',
    pdf: 'emerging.pdf',
    desc: '🎉  Welcome!  🎉\n\n✨ A to Z Tutorial!\n\nEmerging Technology\n\nAll Chapters In Amharic & English',
  },
  {
    text: 'A to Z Tutorial',
    subject: 'atoz',
    pdf: 'antro.pdf',
    desc: '🎉  Welcome!  🎉\n\n✨ A to Z Tutorial!\n\nAntropology\n\nAll Chapters In Amharic & English',
  },
  {
    text: 'Civics',
    subject: 'civics',
    pdf: 'civic.pdf',
    desc: '🎉  Welcome!  🎉\n\n✨ Civics Special!\n\nCivic\n\nAll Chapters In Amharic & English',
  },
  {
    text: 'Global',
    subject: 'global',
    pdf: 'global.pdf',
    desc: '🎉  Welcome!  🎉\n\n✨ Global Studies!\n\nGlobal Trade\n\nAll Chapters In Amharic & English',
  },
  {
    text: 'Logic and Critical Thinking',
    subject: 'logic',
    pdf: 'Logic and Critical Thinking.pdf',
    desc: '🎉  Welcome!  🎉\n\n✨ Logic and Critical Thinking!\n\nLogic\n\nAll Chapters In Amharic & English',
  },
]

// Handle /start command and send subject-specific buttons
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  subjects.forEach((s) => {
    bot.sendMessage(chatId, s.desc, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open',
              web_app: {
                url: `${miniAppUrl}?subject=${
                  s.subject
                }&pdf=${encodeURIComponent(s.pdf)}`,
              },
            },
          ],
        ],
      },
    })
  })
})

// You can add more handlers here for other commands or features
