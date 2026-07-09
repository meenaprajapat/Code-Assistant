# 🎤 CodeBuddy — Interview Demo Guide

A short, safe script for demoing CodeBuddy live on your laptop.

## ⏱️ Before the interview (5 min prep)

1. Open `chrome://extensions` → enable **Developer mode**.
2. Confirm **CodeBuddy** is loaded (Load unpacked → the `Code-Assistant` folder).
3. Click the CodeBuddy icon → paste your Gemini key → **Save Key** (status should turn green).
4. Open a **simple** problem you know, e.g. [Two Sum](https://leetcode.com/problems/two-sum/).
5. Do one full dry run so the API is warm and you know it works.

> Tip: keep a backup tab already on a problem page in case Wi-Fi is slow.

## 🎬 The demo (2–3 min)

1. **Open the problem page.** Point out the **"Analyze Problem"** button the extension injected into LeetCode's own toolbar.
2. Click it — the learning panel slides in from the right.
3. Reveal sections **one at a time**: Hints → Approach → Pseudo-code → Solution → Complexity.
   - Narrate the value: *"It's a tutor, not an answer key — each step is on-demand so you actually learn."*
4. Close the panel with the ✕.

## 🗣️ What to say about the architecture (the impressive part)

- *"It's a Manifest V3 extension with three parts: a **content script** that injects UI and scrapes the problem, a **service worker** that calls the Gemini API, and a **popup** for the key."*
- *"They talk over Chrome's **message-passing** API. I split it that way because the content script can read the page but can't safely hold the API key, and the worker can call the API but can't see the page."*
- *"The key is stored in `chrome.storage.sync`, **never hardcoded** — so the repo is safe to publish."*
- *"I made UI injection resilient: it tries several selectors and falls back to a floating button, and re-injects when you navigate between problems since LeetCode is a SPA."*
- *"API calls **retry on 503** and surface clear errors with a Retry button."*

## ❓ Likely questions & good answers

- **"Why not put the key in the code?"** → Security; anyone could read it in the shipped extension. Users bring their own key.
- **"What if LeetCode changes its HTML?"** → Multiple fallback selectors + floating-button fallback; scraping uses a list of known selectors.
- **"How would you scale/productionize?"** → Proxy the API through a backend so users don't need their own key, add caching, publish to the Chrome Web Store.
- **"Mobile?"** → Chrome extensions don't run on mobile browsers (platform limitation); a web-app version would be the path there.

## 🧯 If something breaks live

- Button missing → refresh the page once.
- Panel shows an error → it's handled gracefully; click **Retry**. Say *"good — you can see the error handling working."*
- API slow → talk through the architecture while it loads.
