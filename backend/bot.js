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

// Add global error handlers at the top for better debugging
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
})

// Define all subjects and their PDF files/messages in one place
const subjects = [
  {
    text: 'Emerging Technology',
    subject: 'emerging',
    pdf: 'emerging.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Emerging Technology</b>\nAll Chapters In Amharic & English',
  },
  {
    text: 'Antropology',
    subject: 'antropology',
    pdf: 'antro.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Antropology</b>\nAll Chapters In Amharic & English',
  },
  {
    text: 'Civics',
    subject: 'civics',
    pdf: 'civic.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Civics</b>\nAll Chapters In Amharic & English',
  },
  {
    text: 'Global',
    subject: 'global',
    pdf: 'global.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Global</b>\nAll Chapters In Amharic & English',
  },
  {
    text: 'Logic and Critical Thinking',
    subject: 'logic',
    pdf: 'Logic and Critical Thinking.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Logic and Critical Thinking</b>\nAll Chapters In Amharic & English',
  },
]

// Handle /start command and send subject-specific buttons (private chat only)
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  const chatType = msg.chat.type
  const threadId = msg.message_thread_id
  console.log(
    `Received /start from chatId: ${chatId}, chatType: ${chatType}, threadId: ${threadId}`,
  )
  if (chatType === 'private') {
    // Private chat: send one message with all subjects as buttons (2 per row)
    const welcomeMsg =
      '🎉 <b>Welcome to the Educational PDF Bot!</b> 🎉\nSelect a subject below to open its PDF. All chapters are available in Amharic & English.'
    // 2 buttons per row
    const buttons = []
    for (let i = 0; i < subjects.length; i += 2) {
      const row = []
      for (let j = i; j < i + 2 && j < subjects.length; j++) {
        row.push({
          text: subjects[j].text,
          web_app: {
            url: `${miniAppUrl}/${subjects[j].subject}`,
          },
        })
      }
      buttons.push(row)
    }
    try {
      await bot.sendMessage(chatId, welcomeMsg, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: buttons,
        },
        disable_web_page_preview: true,
      })
      console.log(`Sent modern web_app buttons to private chat ${chatId}`)
    } catch (err) {
      console.error(
        `Error sending modern web_app buttons to private chat ${chatId}:`,
        err.message,
      )
    }
  } else if (chatType === 'group' || chatType === 'supergroup') {
    // Group chat: send a single message with all subjects and buttons
    let groupMsg = ''
    const buttons = []
    for (const s of subjects) {
      groupMsg += `🎉 <b>Welcome!</b> 🎉<br>✨ <b>A to Z Tutorial!</b><br><b>${s.text}</b><br>All Chapters In Amharic & English<br><br>`
      buttons.push([
        {
          text: `Open ${s.text} Note`,
          url: `${miniAppUrl}/${s.subject}`,
        },
      ])
    }
    try {
      await bot.sendMessage(chatId, groupMsg, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: buttons,
        },
        disable_web_page_preview: true,
        ...(threadId && { message_thread_id: threadId }),
        reply_to_message_id: msg.message_id,
      })
      console.log(`Sent all subjects in one message to group chat ${chatId}`)
    } catch (err) {
      console.error(
        `Error sending all subjects in one message to group chat ${chatId}:`,
        err.message,
      )
    }
  } else {
    // Fallback: use url buttons for unknown chat types (one per row)
    const buttons = subjects.map((s) => [
      {
        text: s.text,
        url: `${miniAppUrl}/${s.subject}`,
      },
    ])
    try {
      await bot.sendMessage(chatId, 'Select a subject to view its PDF:', {
        reply_markup: {
          inline_keyboard: buttons,
        },
        disable_web_page_preview: true,
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

// Helper function to capitalize first letter
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// You can add more handlers here for other commands or features
