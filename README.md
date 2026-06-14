# OmniSolve AI - Real-Time Diagnostics Chatbot

OmniSolve AI is a premium, client-side interactive chatbot application designed to solve real-world coding, network connectivity, and DIY hardware issues in real-time.

Instead of simple static text replies, it returns interactive step-by-step diagnostic checklists, copy-on-click console commands, structural code diffs, and warning boxes.

## 🚀 How to Run the Project

You can run this project locally in two ways:

### Option 1: Direct File Launch
Simply double-click the `index.html` file in your file explorer to open it in any modern web browser.

### Option 2: Local HTTP Server (Recommended)
Running through an HTTP server ensures correct origin routing and full support for web features:

1. Open a terminal in this directory.
2. Run the following command:
   ```bash
   npm start
   ```
   *This will automatically launch a local server at [http://localhost:3000](http://localhost:3000) and open your default web browser.*

---

## 💻 Tech Stack
* **Markup**: Semantic HTML5.
* **Styles**: Vanilla CSS3 using custom CSS custom properties (variables), backdrop-filters for glassmorphism, flexbox/grid for layouts, and fluid viewport scaling.
* **Logic**: Vanilla ES6+ JavaScript. Completely modular and lightweight with zero external runtime dependencies.
* **Design Theme**: Futuristic deep space dark-theme containing glowing neon borders and transition animations.

---

## 🛠️ Features Breakdown
* **Diagnostics Checklist**: Allows you to check off individual troubleshooting steps. Toggling steps updates the progress indicator bar at the top of the card.
* **Interactive Copy Blocks**: Integrated "Copy" buttons in the terminal and code snippets provide immediate feedback ("Copied!") and transfer scripts straight to your clipboard.
* **Context Switching**: Easily select problem domains (Coding, Networking, DIY) using the sidebar tabs. The agent dynamically switches persona and adapts its auto-suggestions.
* **Intelligent Auto-Router**: If you type an issue belonging to a different domain (e.g. typing "DNS error" while in the Code Debugger), the bot automatically detects it, changes the context tab, and displays the matching network diagnostic guide.
* **Fallback Generator**: Typing custom issues dynamically creates custom diagnostic checklists using a keyword parsing heuristic.
