# 🤝 Contributing to Debdatta Panda's Interactive Portfolio

First off, **thank you** for considering contributing to this repository! 🎉 It's people like you that make the open-source community such an amazing place to learn, inspire, and create. 

This document serves as a set of guidelines for contributing to this project. These are mostly guidelines, not strict rules. Use your best judgment, and feel free to propose changes to this document in a pull request! 🚀

---

## 📑 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [How to Contribute](#-how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Workflow](#-development-workflow)
- [Styleguides](#-styleguides)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior directly to 📧 **pandadebdatta9@gmail.com**.

---

## 🏁 Getting Started

Ready to dive in? Here's how to get the project running locally on your machine:

1. **🍴 Fork the repository**: Click the "Fork" button in the top right corner of this page to create your own copy of the repository.
2. **💻 Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MY-PORTFOLIO-DEBDATTA.DEV.git
   cd MY-PORTFOLIO-DEBDATTA.DEV
   ```
3. **📦 Install dependencies**:
   ```bash
   npm install
   ```
4. **🌿 Create a branch**: Keep your work organized!
   ```bash
   git checkout -b feature/your-awesome-feature
   ```

---

## 🛠️ How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the [Issue Tracker](https://github.com/MyselfDebdatta/MY-PORTFOLIO-DEBDATTA.DEV/issues) to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible to help us squash it:

*   **🏷️ Use a clear and descriptive title** for the issue.
*   **📝 Describe the exact steps to reproduce the problem**.
*   **🔍 Provide specific examples** to demonstrate the steps.
*   **👀 Describe the behavior you observed** after following the steps.
*   **🎯 Explain which behavior you expected to see instead** and why.
*   **📸 Include screenshots and animated GIFs** which show you following the described steps. Visual bugs are much easier to fix with visual evidence!

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Before creating an enhancement suggestion, please check if it's already there. When you are creating an enhancement suggestion, please include:

*   **🏷️ Use a clear and descriptive title**.
*   **📝 Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
*   **🔄 Describe the current behavior** and **explain the behavior you expected to see instead** and why.
*   **🌟 Explain why this enhancement would be useful** to most users. (Does it improve accessibility? Performance? Aesthetics?)

### 🔄 Pull Requests

*   **📖 Follow the [Styleguides](#-styleguides)**.
*   **📸 Include screenshots and animated GIFs** in your pull request whenever possible, especially for UI changes. We love seeing before/after comparisons!
*   **🔚 End files with a newline**.
*   **🚫 Avoid platform-dependent code** (e.g., hardcoded file paths).
*   **💬 Ensure that your code is well-commented** and easy to understand for the next developer.
*   **✅ Make sure all existing tests (if any) pass** and test the app in both Light and Dark modes.

---

## 🧑‍💻 Development Workflow

1. Start your local development server: `npm run dev`. ⚡
2. Make your changes and test them locally in your browser at `http://localhost:5173`. 🌐
3. Commit your changes using descriptive commit messages (we strongly recommend following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification).
   ```bash
   git commit -m "✨ feat: added new interactive modal to projects section"
   ```
4. Push your branch to your fork:
   ```bash
   git push origin feature/your-awesome-feature
   ```
5. Open a **Pull Request** from your fork to the `main` branch of the original repository. 🎉

---

## 💅 Styleguides

### 📝 Git Commit Messages

*   Use the present tense ("Add feature" not "Added feature")
*   Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
*   Limit the first line to 72 characters or less.
*   Reference issues and pull requests liberally after the first line (e.g., "Fixes #12").
*   Consider starting the commit message with an applicable emoji for visual parsing:
    *   🎨 `:art:` when improving the format/structure of the code
    *   🐎 `:racehorse:` when improving performance
    *   🐛 `:bug:` when fixing a bug
    *   ✨ `:sparkles:` when introducing a new feature
    *   💄 `:lipstick:` when updating the UI or CSS

### 🎨 UI / CSS Guidelines
*   This project heavily utilizes **Tailwind CSS**. Prefer utility classes over custom CSS where possible to keep the stylesheet small.
*   For theme-specific styles, use CSS variables defined in `index.css` (e.g., `hsl(var(--primary))`) rather than hardcoding hex values. This ensures Dark/Light mode switching works seamlessly! 🌗
*   Ensure all components are fully responsive across mobile 📱, tablet 📟, and desktop 💻 views. Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).

Thank you for contributing and helping make this portfolio better! 🚀
