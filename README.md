# CodeBuddy 🧠💻 — LeetCode Learning Assistant

A Chrome browser extension that enhances your **LeetCode** experience by adding an AI-powered
learning panel directly inside the problem page. Instead of jumping straight to the answer,
CodeBuddy guides you step by step — **hints → approach → pseudo-code → solution → complexity** —
so you actually learn how to solve problems.

Powered by Google's **Gemini API**.

---

## 🎥 Demo

> **See it in action below.** Open any LeetCode problem, click **Analyze Problem**,
> and reveal each step — hints, approach, pseudo-code, solution, complexity — powered by live AI.
> Setup takes ~30 seconds with a **free** Gemini key (instructions below).

<!-- 📌 TODO: add a short demo GIF/video and screenshots here. See "Add your own demo" below. -->

<!--
![CodeBuddy demo](docs/demo.gif)
![Hints panel](docs/screenshot-hints.png)
![Solution panel](docs/screenshot-solution.png)
-->

<details>
<summary><b>How to add your own demo GIF (2 min, free)</b></summary>

1. Record your screen using it (Windows: **Xbox Game Bar** — press `Win + G`; or [ScreenToGif](https://www.screentogif.com/), free).
2. Save the file as `docs/demo.gif` in this repo.
3. Uncomment the `![CodeBuddy demo](docs/demo.gif)` line above.
4. Commit & push — GitHub renders it automatically at the top of the README.

</details>

---

## ✨ Features

- **💡 Initial Hints** — nudges you in the right direction without spoiling the solution.
- **🧠 Algorithmic Approach** — explains the optimal strategy in a few clear points.
- **📝 Pseudo-code** — the logical flow before you write real code.
- **💻 Code Solution** — a clean, commented Java solution.
- **📊 Complexity Analysis** — time & space complexity with short reasoning.
- **🔄 Reveal / Retry** — each section is hidden by default so you can challenge yourself first.

Each section loads on demand — you choose how much help you want.

---

## 🛠️ Tech Stack

- **JavaScript** (vanilla, no framework)
- **Chrome Extension APIs** — Manifest V3 (`background service worker`, `content scripts`, `storage`)
- **Google Gemini API** (`gemini-2.5-flash`) for AI generation
- **HTML / CSS** for the injected panel and popup UI

---

## 🚀 Installation & Setup

This is a browser extension, so it runs **inside Chrome** (no server needed). Setup takes ~2 minutes.

### 1. Get the code

```bash
git clone https://github.com/meenaprajapat/Code-Assistant.git
```

### 2. Get a free Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in and click **Create API key**.
3. Copy the key (you'll paste it in step 4).

> The free tier is enough to try the extension.

### 3. Load the extension into Chrome

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode** (toggle in the top-right).
3. Click **Load unpacked**.
4. Select the cloned `Code-Assistant` folder.

The **CodeBuddy** icon will appear in your Chrome toolbar.

### 4. Add your API key

1. Click the **CodeBuddy** icon in the toolbar.
2. Paste your Gemini API key and click **Save Key**.

### 5. Use it

1. Open any problem on [leetcode.com](https://leetcode.com/problemset/) — e.g. a `/problems/...` page.
2. Click the **Analyze Problem** button that appears near the top of the page.
3. In the panel that slides in, reveal hints, approach, pseudo-code, solution, and complexity — one step at a time.

---

## 📂 Project Structure

```
Code-Assistant/
├── manifest.json              # Extension config (Manifest V3) — must stay at root
├── README.md
├── DEMO.md                    # Interview demo guide
│
├── src/                       # Source code, grouped by role
│   ├── background/
│   │   └── background.js      # Service worker — calls the Gemini API
│   ├── content/
│   │   └── content_script.js  # Injected into LeetCode pages — builds the UI
│   └── popup/
│       ├── popup.html         # Toolbar popup for the API key
│       └── popup.js           # Popup logic (save / load / remove key)
│
├── ui/                        # Injected UI + styles
│   ├── panel.html             # The slide-in learning panel
│   └── styles.css             # Styling for the panel & button
│
└── assets/
    └── icons/
        └── logo5.png          # Extension icon
```

## 🔐 How it works

- Your Gemini API key is stored **locally** in Chrome's `storage.sync` — it never leaves your browser except to call Google's Gemini API directly.
- When you click a section, the content script reads the problem title & description from the page and sends it to the background worker, which asks Gemini for that specific step.
- If no key is set, the panel shows a clear prompt to add one (no confusing placeholder answers) — once you save a key, every problem is analyzed live.

---

## 🏗️ Architecture

The extension is built on the three standard Manifest V3 pieces, which communicate by message passing:

```
 LeetCode page                    Extension (isolated)
┌────────────────────┐          ┌──────────────────────────┐
│  content_script.js │          │      background.js        │
│  • injects button  │  message │   (service worker)        │
│  • builds panel UI ├─────────►│  • reads API key from     │
│  • scrapes title & │          │    chrome.storage.sync    │
│    description     │◄─────────┤  • calls Gemini API       │
│  • renders result  │  message │  • retries on 503         │
└────────────────────┘          └──────────────────────────┘
        ▲
        │ saves key
┌───────┴────────────┐
│  popup.html/.js    │  ← toolbar popup to store the Gemini key
└────────────────────┘
```

**Why this split?** Content scripts can touch the page's DOM but are blocked from making cross-origin API calls with the key; the service worker can call the API but can't see the page. Message passing (`chrome.runtime.sendMessage` / `chrome.tabs.sendMessage`) bridges the two. This is the standard, secure MV3 pattern.

**Robustness built in:**
- Button injection tries several toolbar selectors and falls back to a floating button, so a LeetCode layout change won't hide it.
- Re-injects itself when you navigate between problems (LeetCode is a single-page app).
- Retries the API on transient `503`s; shows clear, actionable messages (with a **Retry** button) for missing keys, bad keys, and rate limits.

---

## 🩹 Troubleshooting

| Symptom | Fix |
|---|---|
| "Analyze Problem" button missing | Refresh the problem page; check the extension is enabled at `chrome://extensions`. |
| "API Key not set" in the panel | Click the CodeBuddy icon and save your Gemini key. |
| "request was rejected (400)" | Your key is likely invalid — re-copy it from Google AI Studio. |
| Rate-limit message | Wait a minute and click **Retry** (free tier has limits). |

After editing any file, go to `chrome://extensions` and click the **reload** ↻ icon on the CodeBuddy card.

---

## 👩‍💻 Author

Made by **Meena** ❤️✌️
