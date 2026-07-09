# CodeBuddy 🧠💻 — LeetCode Learning Assistant

A Chrome browser extension that enhances your **LeetCode** experience by adding an AI-powered
learning panel directly inside the problem page. Instead of jumping straight to the answer,
CodeBuddy guides you step by step — **hints → approach → pseudo-code → solution → complexity** —
so you actually learn how to solve problems.

Powered by Google's **Gemini API**.

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
├── manifest.json        # Extension config (Manifest V3)
├── background.js        # Service worker — calls the Gemini API
├── content_script.js   # Injected into LeetCode pages — builds the UI
├── panel.html          # The slide-in learning panel
├── popup.html          # Toolbar popup for saving the API key
├── popup.js            # Popup logic (save/load key)
├── styles.css          # Styling for the panel & button
└── icons/              # Extension icon
```

## 🔐 How it works

- Your Gemini API key is stored **locally** in Chrome's `storage.sync` — it never leaves your browser except to call Google's Gemini API directly.
- When you click a section, the content script reads the problem title & description from the page and sends it to the background worker, which asks Gemini for that specific step.

---

## 👩‍💻 Author

Made by **Meena Prajapat** ❤️✌️
