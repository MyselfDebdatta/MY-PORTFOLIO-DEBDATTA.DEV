# Architecture Overview

This document provides a high-level overview of the architectural decisions, design patterns, and state management strategies used in the **Debdatta Panda Interactive Portfolio**.

## 1. Core Stack
*   **Frontend**: React 18 with TypeScript.
*   **Build Tool**: Vite (chosen for rapid HMR and optimized production bundling).
*   **Styling**: Tailwind CSS combined with standard CSS variables.
*   **Animations**: Framer Motion for complex orchestrations, CSS for simpler micro-interactions.
*   **Primitives**: Radix UI for accessible headless components (modals, tooltips).

## 2. Directory Structure Deep Dive

```text
src/
├── assets/         # Static assets imported via JS (images, SVGs).
├── components/
│   ├── ui/         # Reusable, stateless UI primitives (Button, Input, Card).
│   └── ...         # Stateful, section-level components (HeroSection, ProjectsSection).
├── hooks/          # Custom hooks encapsulating logic (e.g., use-mobile.ts).
├── lib/            # Utility functions and shared helpers (e.g., cn() for tailwind merge).
├── App.tsx         # The main application shell and router provider.
├── main.tsx        # React entry point, context wrappers.
└── index.css       # Global stylesheet housing the CSS variable theming system.
```

## 3. State Management

The application avoids heavy state management libraries like Redux or Zustand, opting instead for React's native capabilities to keep the bundle size small:

*   **Local State (`useState`, `useReducer`)**: Used extensively within isolated components (e.g., the current slide index in the timeline carousel, or the active node in the tech stack radar).
*   **Context API (`createContext`)**: Used for global, app-wide state that changes infrequently:
    *   `ThemeProvider`: Manages the toggle between Dark Mode and Light Mode.
    *   `AudioProvider`: Manages the playback state of the ambient background music across the entire app.
*   **Refs (`useRef`)**: Used for directly accessing DOM nodes for Framer Motion scroll tracking (`useInView`, `useScroll`) and managing audio element playback without triggering re-renders.

## 4. Theming Architecture

The theming system is built upon **CSS Variables** integrated directly into **Tailwind CSS**. 

*   **`index.css`**: Defines a massive suite of variables attached to `:root` (for light mode) and `.dark` (for dark mode).
*   **Tailwind Config (`tailwind.config.ts`)**: Maps these variables to semantic utility classes (e.g., `bg-background`, `text-primary`, `border-border`).
*   **The Switch**: The `ThemeProvider` injects or removes the `.dark` class from the `<html>` element based on user preference, instantly swapping all colors globally without requiring React component re-renders.

## 5. Animation Strategy

We use a layered approach to motion:

1.  **CSS Transitions**: Used for simple hover states (buttons, links) to ensure immediate, zero-JS response.
2.  **Framer Motion (Layout Animations)**: Used when elements physically change size or position in the DOM (e.g., filtering project cards). `layoutId` is used to seamlessly animate an element from a thumbnail into a full-screen modal.
3.  **Framer Motion (Scroll & Mount)**: Used extensively in the sections. Components use `initial`, `whileInView`, and `viewport={{ once: true }}` to trigger entry animations as the user scrolls down the page.

## 6. Performance Optimizations

*   **Code Splitting**: Routes and heavy components (like 3D effects if added) can be lazy-loaded using `React.lazy`.
*   **Asset Optimization**: Images are compressed, and where applicable, SVG is preferred for infinite scaling and small file size.
*   **Hardware Acceleration**: Intensive animations (like the Tech Stack radar) use `transform` (`translate`, `scale`) and `opacity` properties to ensure they run on the GPU, avoiding expensive layout thrashing.
