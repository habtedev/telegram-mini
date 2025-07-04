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
    text: 'Global Trade',
    subject: 'global',
    pdf: 'global.pdf',
    desc: '🎉 <b>Welcome!</b> 🎉\n✨ <b>Global Trade</b>\nAll Chapters In Amharic & English',
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
            url: `${miniAppUrl}?subject=${
              subjects[j].subject
            }&pdf=${encodeURIComponent(subjects[j].pdf)}`,
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
    // Group chat: send one message per subject, each with its own url button and improved formatting
    for (const s of subjects) {
      // Convert HTML to MarkdownV2 for group messages
      let groupMsg = s.desc
        .replace(/<b>(.*?)<\/b>/g, '*$1*') // bold
        .replace(/([_\-!#\.\(\)\[\]{}=+~`>\|])/g, '\\$1') // escape special chars
        .replace(/([\*])/g, '\\$1') // escape asterisks
        .replace(/\n/g, '\n\n') // double newline for MarkdownV2
        .replace(/([\[\]])/g, '\\$1') // escape brackets
        .replace(/([!])/g, '\\$1') // escape exclamation
        .replace(/([.])/g, '\\$1') // escape dot
        .replace(/([#])/g, '\\$1') // escape hash
        .replace(/([\(\)])/g, '\\$1') // escape parenthesis
        .replace(/([\-])/g, '\\$1') // escape dash
        .replace(/([`])/g, '\\$1') // escape backtick
        .replace(/([>])/g, '\\$1') // escape greater than
        .replace(/([=])/g, '\\$1') // escape equal
        .replace(/([|])/g, '\\$1') // escape pipe
        .replace(/([~])/g, '\\$1') // escape tilde
        .replace(/([{}])/g, '\\$1') // escape curly braces
        .replace(/([\\])/g, '\\$1') // escape backslash
        .replace(/([\$])/g, '\\$1') // escape dollar
        .replace(/([\^])/g, '\\$1') // escape caret
        .replace(/([:])/g, '\\$1') // escape colon
        .replace(/([;])/g, '\\$1') // escape semicolon
        .replace(/([,])/g, '\\$1') // escape comma
        .replace(/([?])/g, '\\$1') // escape question
        .replace(/([/])/g, '\\$1') // escape slash
        .replace(/([&])/g, '\\$1') // escape ampersand
        .replace(/([%])/g, '\\$1') // escape percent
        .replace(/([@])/g, '\\$1') // escape at
        .replace(/(['])/g, '\\$1') // escape single quote
        .replace(/(["])/g, '\\$1') // escape double quote
        .replace(/([<])/g, '\\$1') // escape less than
        .replace(/([0-9])/g, '$1') // numbers do not need escaping
      const button = [
        [
          {
            text: 'Open Note',
            url: `${miniAppUrl}?subject=${s.subject}&pdf=${encodeURIComponent(
              s.pdf,
            )}`,
          },
        ],
      ]
      const sendOptions = {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: button,
        },
        disable_web_page_preview: true,
      }
      if (threadId) {
        sendOptions.message_thread_id = threadId
      }
      try {
        await bot.sendMessage(chatId, groupMsg, sendOptions)
        console.log(
          `Sent url button for subject ${s.subject} to group chat ${chatId}`,
        )
      } catch (err) {
        console.error(
          `Error sending url button to group chat ${chatId} for subject ${s.subject}:`,
          err.message,
        )
      }
    }
  } else {
    // Fallback: use url buttons for unknown chat types (one per row)
    const buttons = subjects.map((s) => [
      {
        text: s.text,
        url: `${miniAppUrl}?subject=${s.subject}&pdf=${encodeURIComponent(
          s.pdf,
        )}`,
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
