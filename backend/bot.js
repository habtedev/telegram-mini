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

// Handle /start command and send subject-specific buttons (private chat only)
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  const chatType = msg.chat.type
  console.log(`Received /start from chatId: ${chatId}, chatType: ${chatType}`)
  if (chatType === 'private') {
    // Private chat: send web_app button for each subject
    for (const s of subjects) {
      try {
        await bot.sendMessage(chatId, s.desc, {
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
        console.log(
          `Sent web_app button for subject ${s.subject} to private chat ${chatId}`,
        )
      } catch (err) {
        console.error(
          `Error sending web_app button to private chat ${chatId} for subject ${s.subject}:`,
          err.message,
        )
      }
    }
  } else if (chatType === 'group' || chatType === 'supergroup') {
    // Group chat: send one message with url buttons
    const buttons = subjects.map((s) => ({
      text: s.text,
      url: `${miniAppUrl}?subject=${s.subject}&pdf=${encodeURIComponent(
        s.pdf,
      )}`,
    }))
    try {
      await bot.sendMessage(chatId, 'Select a subject to view its PDF:', {
        reply_markup: {
          inline_keyboard: [buttons],
        },
      })
      console.log(`Sent url buttons to group chat ${chatId}`)
    } catch (err) {
      console.error(
        `Error sending url buttons to group chat ${chatId}:`,
        err.message,
      )
    }
  } else {
    // Fallback: use url buttons for unknown chat types
    const buttons = subjects.map((s) => ({
      text: s.text,
      url: `${miniAppUrl}?subject=${s.subject}&pdf=${encodeURIComponent(
        s.pdf,
      )}`,
    }))
    try {
      await bot.sendMessage(chatId, 'Select a subject to view its PDF:', {
        reply_markup: {
          inline_keyboard: [buttons],
        },
      })
      console.log(
        `Sent fallback url buttons to chat ${chatId} (type: ${chatType})`,
      )
    } catch (err) {
      console.error(
        `Error sending fallback url buttons to chat ${chatId} (type: ${chatType}):`,
        err.message,
      )
    }
  }
})

// You can add more handlers here for other commands or features
