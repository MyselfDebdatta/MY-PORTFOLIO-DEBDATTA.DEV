<div align="center">

# 🚀 Debdatta Panda - Interactive Portfolio

**A highly interactive, cinematic, and fully responsive personal portfolio.**

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p align="center">
  <a href="https://debdatta-panda.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/MyselfDebdatta/MY-PORTFOLIO-DEBDATTA.DEV"><img src="https://img.shields.io/badge/Deploy_with_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy with Vercel" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" /></a>
</p>

<p align="center">
  <a href="https://debdatta-panda.vercel.app/"><b>Live Demo</b></a> · 
  <a href="https://github.com/MyselfDebdatta/MY-PORTFOLIO-DEBDATTA.DEV/issues"><b>Report Bug</b></a> · 
  <a href="https://github.com/MyselfDebdatta/MY-PORTFOLIO-DEBDATTA.DEV/issues"><b>Request Feature</b></a>
</p>

</div>

---

## 📖 Overview

This portfolio is not just a static webpage; it is an immersive experience designed to showcase my technical skills, educational journey, and professional projects. It features a unique cinematic "OS Boot" sequence, dual themes (Neon Dark Mode & Clean SaaS Light Mode), interactive HUD components, global search navigation, and a built-in ambient audio visualizer. 

---

## 🌟 Key Features

*   **Cinematic Boot Sequence**: A simulated terminal startup sequence that welcomes the user, featuring data streams, code rain, and a skip functionality.
*   **Intelligent Theming**: 
    *   **Dark Mode**: A cyberpunk-inspired, cinematic theme with neon borders, glassmorphism, and deep contrasts.
    *   **Light Mode**: A clean, professional "SaaS-style" day mode with solid backgrounds, sharp drop shadows, and high legibility.
*   **Global Command Palette (`Ctrl/Cmd + K`)**: A Spotlight-style search bar that allows instant navigation to any section of the portfolio without scrolling.
*   **Ambient Music Player**: A built-in audio visualizer in the navigation bar that plays ambient background music, controllable by the user.
*   **Interactive Modals & Carousels**: Beautifully animated project detail modals and draggable photo carousels for the educational journey timeline.
*   **Fully Responsive**: Meticulously crafted to look stunning on ultrawide monitors, laptops, tablets, and mobile devices.

---

## 🏗️ Portfolio Sections

### 1. Intro Sequence & Hero Section
*   **Intro**: Terminal-based system boot simulation with glowing data streams.
*   **Hero**: Dynamic, typing text highlighting my roles (Full Stack Developer, AI Enthusiast), a glowing profile avatar, and immediate Call-to-Action buttons for hiring and resume download.

### 2. About Me
*   Designed like a command-line interface (CLI) terminal.
*   Contains a detailed biography, professional philosophy, and quick status metrics.

### 3. Educational Journey
*   An interactive vertical timeline mapping out Matriculation, Intermediate, and College phases.
*   Each phase features an interactive photo gallery carousel highlighting memories and milestones.

### 4. Tech Stack (Skills Radar)
*   An advanced, HUD-style interactive readout of technical skills.
*   Features a responsive hex-grid of technologies. Clicking a node brings up detailed analytics, mastery levels, and years of experience for that specific technology in the main viewer.

### 5. Projects Gallery
*   A grid of personal, academic, and professional projects.
*   Each card features hover animations. Clicking a project opens a detailed modal with a comprehensive description, the tech stack used, and direct links to the GitHub repository and live demo.

### 6. Achievements & Awards
*   A dedicated gallery showcasing certificates from hackathons, workshops, and job simulations (e.g., Deloitte, Accenture, IBM).

### 7. Connect & Contact
*   A highly stylized "Let's Collaborate" card.
*   Includes a functional contact form to send direct messages, along with direct links to GitHub, LinkedIn, and email.

---

## 💻 Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, PostCSS |
| **Animation & Motion** | Framer Motion |
| **UI Components** | Radix UI (Headless primitives), Lucide React (Icons) |
| **Routing** | React Router DOM |
| **State Management** | React Hooks (useState, useEffect, useRef) |

---

## 📐 Architecture & Data Flow

The application follows a modular component-based architecture:
*   **Global State**: Managed via Context Providers (e.g., Theme toggling, Audio state).
*   **Section Components**: Each major section (`HeroSection.tsx`, `ProjectsSection.tsx`, etc.) is isolated and imports its own specific data.
*   **Animation Layer**: Framer Motion handles all mounting/unmounting transitions (`initial`, `animate`, `whileInView`). Scroll animations trigger when components enter the viewport.
*   **Styling Layer**: Tailwind CSS handles utility classes, while `index.css` acts as the master controller for highly specific theme overrides (especially for forcing solid colors in Light Mode).

---

## 📂 Repository Structure

```text
MY-PORTFOLIO/
├── public/                 # Static assets (images, pdfs, audio)
│   ├── certificates/       # PDF and Image certificates
│   ├── journey/            # Timeline photos
│   └── ambient.mp3         # Background audio
├── src/
│   ├── assets/             # Component specific images
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Generic UI elements (buttons, inputs)
│   │   └── ...             # Section components (Hero, About, TechStack)
│   ├── hooks/              # Custom React hooks (e.g., use-mobile)
│   ├── lib/                # Utility functions
│   ├── pages/              # Main page layouts (Index.tsx, NotFound.tsx)
│   ├── App.tsx             # Root component & Routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global CSS and Theme variables
├── tailwind.config.ts      # Tailwind configuration
├── vercel.json             # Vercel deployment routing rules
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Local Setup

Follow these steps to run the portfolio on your local machine.

### 1. Install Dependencies
Ensure you have Node.js installed. Clone the repository and install the required packages:
```bash
git clone https://github.com/MyselfDebdatta/MY-PORTFOLIO-DEBDATTA.DEV.git
cd MY-PORTFOLIO-DEBDATTA.DEV
npm install
```

### 2. Configure Environment Variables
If your contact form uses a third-party service (like EmailJS or Formspree), create a `.env` file in the root directory:
```env
VITE_CONTACT_SERVICE_ID=your_service_id
VITE_CONTACT_TEMPLATE_ID=your_template_id
VITE_CONTACT_PUBLIC_KEY=your_public_key
```
*(Note: If the form is currently simulated, you can skip this step).*

### 3. Run in Development
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
This will generate a `dist/` folder containing the minified and optimized static files.

---

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev` - Starts the development server.
*   `npm run build` - Builds the app for production to the `dist` folder.
*   `npm run lint` - Runs ESLint to catch potential errors.
*   `npm run preview` - Boots up a local server to serve the production `dist` folder for testing.

---

## 🌍 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your code to your GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import this repository.
4. Vercel will automatically detect the **Vite** preset.
5. Click **Deploy**.

*A `vercel.json` file is already included in the root directory to handle React Router client-side routing, preventing 404 errors on page reloads.*

---

<div align="center">
  <p>Designed and Built with 💻 by <b>Debdatta Panda</b></p>
</div>
