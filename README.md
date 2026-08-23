# LeetCode Buddy 🧠💻

A handy browser panel that enhances your LeetCode experience by providing step-by-step guidance for each problem. Get hints, algorithmic approaches, pseudo-code, code solutions, and complexity analysis right inside the LeetCode page.

---

## 🚀 Features

- **💡 Initial Hints** — nudges you in the right direction without spoiling the solution.
- **🧠 Algorithmic Approach** — explains the optimal strategy in a few clear points.
- **📝 Pseudo-code** — the logical flow before you write real code.
- **💻 Code Solution** — a clean, commented Java solution.
- **📊 Complexity Analysis** — time & space complexity with short reasoning.
- **🔄 Reveal / Retry** — each section is hidden by default so you can challenge yourself first.

Each section loads on demand — you choose how much help you want.

---

## 🎯 Why Use This?

LeetCode Learning Assistant helps you:

- **Save time** by summarizing problem-solving steps.
- **Learn new approaches** effectively.
- **Reduce frustration** by guiding you when stuck.
- **Keep your learning fun** with interactive hints.

---

## 🛠️ Tech Stack

- **JavaScript** (vanilla, no framework)
- **Chrome Extension APIs** — Manifest V3 (`background service worker`, `content scripts`, `storage`)
- **Google Gemini API** (`gemini-2.5-flash`) for AI generation
- **HTML / CSS** for the injected panel and popup UI

---

## 🚀 Installation

This is a browser extension, so it runs **inside Chrome** (no server needed).

### 1. Clone the repository

```bash
git clone https://github.com/meenaprajapat/Code-Assistant.git
cd Code-Assistant
