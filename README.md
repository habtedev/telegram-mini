# Telegram Mini App: Educational PDF Viewer

A modern, mobile-first Telegram Mini App for viewing educational notes (PDF) inside Telegram's in-app browser. Built with React, Vite, and PDF.js, featuring a beautiful UI, dark mode, and robust mobile experience.

## Features

- 📱 **Mobile-first:** Only accessible on mobile devices inside Telegram
- 📄 **PDF.js integration:** In-app, read-only PDF viewing (no download)
- 🌙 **Dark mode:** User toggle for light/dark themes
- ⚡ **Animated loader:** Modern progress bar while PDF loads
- 🖼️ **Modern UI:** Gradients, rounded corners, touch-friendly controls
- 🚫 **Desktop restriction:** Shows a message if opened on desktop/tablet
- 🛡️ **No download:** PDF is rendered, not downloadable
- 🕑 **Resume where you left off:** Remembers your last-read page for each PDF, so you always continue reading from the same spot—even after closing or days later

## Demo

![Mobile Screenshot](./public/demo-mobile.png)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/telegram-mini-pdf-app.git
cd telegram-mini-pdf-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your PDF

Place your PDF file (e.g. `emerging.pdf`) in the `public/` folder.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) on your mobile device or with mobile emulation.

### 5. Deploy

Deploy to [Vercel](https://vercel.com/) for instant hosting. The app is optimized for static hosting.

## Telegram Mini App Integration

1. Deploy your app and get the public URL (e.g. `https://your-app.vercel.app`).
2. In [BotFather](https://t.me/BotFather), set your bot's mini app URL to your deployed site.
3. Users can open the mini app via your Telegram bot.

## Important: How to Open as a Telegram Mini App

> **To open this app as a true Telegram Mini App popup, users must launch it via your Telegram bot (using the "Open Mini App" button or a deep link from the bot).**
>
> - If you post the link in a channel or group, it will open in the browser, not as a Mini App popup.
> - To guide users: tell them to click your bot's username, tap "Start," and then tap "Open Mini App" for the best experience.

## Project Structure

```
telegram-mini/
├── public/
│   └── emerging.pdf           # Your educational PDF
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── emerging/
│       ├── emerging.jsx       # Main component (device detection, dark mode)
│       ├── PDFViewer.jsx      # PDF.js viewer with loader, dark mode
│       ├── emerging.scss      # Modern, responsive styles
│       └── PDFViewer.scss     # PDF viewer styles
├── package.json
├── vite.config.js
└── README.md
```

## Customization

- **Change the PDF:** Replace `public/emerging.pdf` with your own file.
- **Branding:** Edit colors, gradients, and text in `emerging.scss` and `PDFViewer.scss`.
- **Content:** Update headings and info badges in `emerging.jsx`.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Sass](https://sass-lang.com/)

## License

MIT

---

**Built for the future of education on Telegram.**
