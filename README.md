# Expense Tracker

Modern personal expense tracker with flexible options between keeping local records or taking **Google Sheets** as your private backend.

**React 19** · **Vite** · **TypeScript** · **Tailwind CSS** · **Zustand** · **TanStack Query** · **Google OAuth** + **Google Sheets API**

Track daily expenses, categorize spending, view summaries — all synced to your own Google Sheet.

## Features

- ➕ Add / edit / delete expenses
- 🏷️ Categories (Food, Transport, Bills, Entertainment, …)
- 📅 Daily / monthly / yearly view with summaries
- 💻 **Local mode** — store all records in browser localStorage
  - No login required
  - Provide function to import / export expense records to / from Google Sheet

- 🔄 **Synchronize Mode** — keep all records with your personal Google Sheet
  - 🔐 Sign in with Google (via `@react-oauth/google`)
  - Sync with Google Sheet on every expense record update

- 🎨 Clean responsive UI with Tailwind CSS
- 💾 Optimized state management via Zustand + TanStack Query

## Tech Stack

| Purpose            | Library / Tool                     | Why / Notes                                                                         |
| ------------------ | ---------------------------------- | ----------------------------------------------------------------------------------- |
| Framework          | React 19                           |                                                                                     |
| Build & Dev Server | Vite                               | Fast HMR & builds                                                                   |
| Language           | TypeScript                         | Type safety, highe readability                                                      |
| Styling            | Tailwind CSS                       | Utility-first, productive, high flexibility                                         |
| Client state       | Zustand                            | Lightweight global/UI state                                                         |
| Server state & API | @tanstack/react-query              | Caching, loading states, error states, retries, query invalidation, auto-refetching |
| Google Auth        | @react-oauth/google                | Modern Google Identity Services                                                     |
| Google Sheets      | Google Sheets v4 API               | Import / export / sync with Google Sheet (append/update/delete/read)                |
| Date handling      | moment                             | Intuitive and comprehensive API with extensive localization support                 |
| HTTP Client        | axios or fetch + auth interceptors | Popular and simple promise-based HTTP client library                                |

## Quick Start

```bash
# 1. Clone & enter project
git clone https://github.com/CKHRyan/expense-tracker
cd expense-tracker

# 2. Copy env template
cp .env.example .env

# 3. Install dependencies
yarn install
# or npm install / pnpm install

# 4. Start dev server → http://localhost:5173
yarn dev

# 5. Build project
yarn build
```

## Google Sheet Integration Setup

1. In Google Cloud Console:
   - Create **API Key**
   - Enable **Google Sheets API**
   - Create **OAuth 2.0 Client ID** (Web application)
     - Authorized JavaScript origins: `http://localhost:5173`, `https://your-domain.com`
     - Authorized redirect URIs: `http://localhost:5173`, `https://your-domain.com`
   - Copy **API Key** and **OAuth 2.0 Client ID** and paste into `.env`
     - Paste **API Key** as `VITE_GOOGLE_API_KEY`
     - Paste **OAuth 2.0 Client ID** as `VITE_GOOGLE_OAUTH_CLIENT_ID`
2. Create a new Google Sheet with format according to the [template](https://github.com/CKHRyan/expense-tracker/blob/main/public/expense-tracker-sheet-template.xlsx)
3. Login to the Google account with allowed Google Sheet access
4. Created Google Sheet shall be found in the Google Sheet Sync config
