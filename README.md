# BhashaBuddy (భాషాబడ్డీ / भाषाबडी / பாஷாபடி)
> **Technical English in Your Mother Tongue** – VoiceBridge Jam Hackathon Project

BhashaBuddy is a production-quality, responsive, demo-ready, **frontend-only** web application built with **pure HTML5, CSS3, and vanilla JavaScript (ES6+)**. It is specifically designed for first-year engineering students and placement aspirants from rural and vernacular-medium backgrounds who transition into English-medium engineering colleges.

---

## 🎯 Problem Statement & Target Audience

Students from rural schools frequently understand deep mathematics and engineering intuition, but struggle when confronted with dense English-medium textbooks, technical jargon, and campus placement interviews. Existing language learning applications assume general English literacy and focus on casual tourist conversational phrases ("Where is the train station?"), rather than technical engineering vocabulary.

**BhashaBuddy solves this by teaching foundational technical English using the student's mother tongue (Telugu, Hindi, Tamil) as the medium of instruction.** It leverages browser-native speech synthesis and speech recognition to evaluate pronunciation, builds daily vocabulary habits, and boosts confidence without needing high-end hardware, expensive subscriptions, or complex build tools.

---

## 🚀 How to Run the App

Because BhashaBuddy is **100% frontend-only with zero dependencies and no build steps**, running it is instant:

### Option A: Direct Browser Launch
1. Navigate to the project directory:
   `C:\Users\Krishnaveni\.gemini\antigravity\scratch\bhashabuddy\`
2. Double-click `index.html` or drag and drop it into **Google Chrome** or **Microsoft Edge**.

### Option B: Local Static Server (Recommended for PWA & Mic Permissions)
1. Using **VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.
2. Using Python (if installed):
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in Chrome or Edge.
3. Using Node.js `npx serve`:
   ```bash
   npx serve .
   ```

---

## ✨ Features Mapped to Hackathon Brief

| Category | Feature | Description | Implementation Details |
|---|---|---|---|
| **Core** | **Multilingual UI (i18n)** | Seamless real-time switching between English, Telugu, Hindi, and Tamil | `js/i18n.js` with 100% localized string dictionary, interpolation, and zero page reloads |
| **Core** | **50-Word Technical Dataset** | 5 progressive engineering units (10 words each) covering Basics, Coding, Systems, Math, and Placements | `js/data.js` with IPA phonetics, scripts, contextual engineering examples, and difficulty tags |
| **Core** | **Interactive 3D Flashcards** | Front shows phonetic guide + audio; Back reveals regional script meaning + engineering example sentence | `js/flashcards.js`, CSS 3D `preserve-3d`, touch swipe gestures, and keyboard navigation |
| **Core** | **Pronunciation Evaluator** | Web Speech API speech recognition in `en-IN`, live animated mic pulse, real-time interim transcript | `js/pronunciation.js` & `js/speech.js` |
| **Core** | **Levenshtein Scoring Engine** | Accent-tolerant distance calculation with Indian-English phonetic normalizations | `js/levenshtein.js` (tolerance for v/w, th/t/d, z/j, doubled consonants, pass boost for distance ≤ 2) |
| **Core** | **Daily Engineering Quiz** | 5 mixed questions per day: regional-to-English, English-to-regional, sentence completion, listen & choose | `js/quiz.js`, instant green/red visual states, regional explanations, retry mistakes mode |
| **Core** | **Progress & Streak Tracker** | Animated SVG goal ring, 7-day activity calendar strip, cumulative mastery, pure SVG weekly chart | `js/progress.js` & `js/storage.js` with automatic day-rollover logic |
| **Stretch** | **AI Contextual Buddy** | Simulated conversational tutor with intent matching in EN, TE, HI, TA and TTS listen buttons | `js/chatbot.js` |
| **Stretch** | **Pictorial Dictionary** | Visual grid of all 50 words with custom inline SVG technical schematic diagrams | `js/dictionary.js` with multilingual search and filter pills |
| **Stretch** | **Peer Voice Challenge** | Simulated peer recording platform with MediaRecorder, classmate submissions, and persistent upvoting | `js/peer.js` |
| **Stretch** | **PWA & Offline Ready** | Installable PWA with Service Worker caching shell assets and offline badge | `manifest.json`, `sw.js` |

---

## 🔬 How the Pronunciation Scoring Works

The pronunciation evaluator is engineered specifically for vernacular-medium Indian students:

```
[Student Voice Input via Web Speech API (en-IN)]
                   │
                   ▼
     [Extract Top 3 Alternatives]
                   │
                   ▼
  [Normalize Strings: Lowercase & Trim]
                   │
                   ▼
   [Indian-English Phonetic Approximation]
  • v / w equivalence  (e.g., 'variable' vs 'wariable')
  • th / t equivalence (e.g., 'algorithm' vs 'algoritam')
  • z / j equivalence  (e.g., 'zero' vs 'jero')
  • ph / f equivalence
  • Deduplicate repeated consonants
                   │
                   ▼
    [Dynamic Programming Levenshtein Matrix]
        O(n × m) edit distance calculation
                   │
                   ▼
       [Similarity Percentage Formula]
     similarity = round((1 - dist / maxLen) * 100)
                   │
                   ▼
       [Accent-Tolerant Pass Rule]
  • If edit distance ≤ 2: Automatically passed!
  • Score boosted to minimum 70% (Exact match = 100%)
  • Score ≥ 85%: Triggers celebration confetti burst!
```

### Graceful Degradation & Fallbacks
- If the browser does not support `SpeechRecognition` (e.g. Firefox) or the student denies microphone permissions, the app automatically transitions to **Text Evaluation Fallback Mode**, allowing the student to type what they heard and receive the exact same Levenshtein score.
- If network connection drops, synthetic TTS (`SpeechSynthesis`) continues functioning fully offline.

---

## 🎬 Presentation Demo Script (Step-by-Step for Judges)

1. **Step 1: Open the Application**
   - Open `index.html` in Chrome or Edge.
   - On the onboarding modal, click **"⚡ Quick Demo Mode (Preloaded for Judges)"** (or press `Ctrl+Shift+D`).
   - The app instantly loads student profile "Ravi", sets language to Telugu, sets daily goal to 5 words, and marks 2/5 words completed with an active 3-day streak!

2. **Step 2: Instant Language Switching**
   - Click the top navbar language dropdown.
   - Switch between **తెలుగు**, **हिन्दी**, **தமிழ்**, and **English**.
   - Notice that every label, button, greeting, and explanation re-renders instantaneously with zero page refresh.

3. **Step 3: Technical Flashcards in Action**
   - Navigate to `#learn` and click **"Unit 2: Programming Fundamentals"**.
   - Inspect the card for **"Algorithm"**:
     - Front shows English term, IPA phonetic guide `/ˈæl.ɡə.rɪ.ðəm/`, and Listen (🔊) button.
     - Click the card or press `Space` to trigger the **3D card flip**.
     - Back reveals the Telugu script explanation, transliteration, and engineering contextual example sentence.
     - Click **"Slow 0.8x"** to hear clear audio cadence.

4. **Step 4: Voice Pronunciation Evaluation**
   - Click **"Practice Pronunciation 🎙️"** on the card (or go to `#practice`).
   - Click the big **Listen Audio** button (plays native English pronunciation).
   - Click the big teal **Microphone** button and say *"Algorithm"*.
   - Watch the live interim transcript and the score meter shoot up to **95% Match**, accompanied by a cheerful green toast and a **confetti burst**!
   - *(Judge Safety Net: If microphone hardware is blocked on the test laptop, click the red "⚡ Simulate 95% Match" button).*

5. **Step 5: Verify Goal Meter & Dashboard**
   - Navigate to `#home`.
   - The Daily Goal ring has now animated forward to **3/5 words done**!

6. **Step 6: Explore Stretch Features**
   - **Quiz (`#quiz`)**: Take a 5-question bilingual quiz, observe instant green/red option highlights and regional explanations.
   - **Progress (`#progress`)**: Inspect the 7-day streak strip and the custom SVG weekly bar chart.
   - **Visual Dictionary (`#dictionary`)**: View schematic inline SVG illustrations for Database, Network, Compiler, etc.
   - **AI Buddy (`#chat`)**: Click the quick-reply chip *"What is an algorithm?"* or type in Telugu to receive a bilingual explanation with audio.
   - **Peer Voice (`#peer`)**: Listen to simulated classmate recordings from engineering colleges and upvote them.

---

## 🌐 Browser Support & Accessibility

- **Google Chrome & Microsoft Edge**: Recommended for full Web Speech API (SpeechRecognition + SpeechSynthesis) support.
- **Mozilla Firefox & Safari**: Fully functional with automatic fallback to text-based phonetic evaluation.
- **Accessibility**: Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`), visible `:focus-visible` rings, minimum 44px touch targets, `aria-live` status regions, and full compliance with `prefers-reduced-motion`.
- **System Fonts**: Fallbacks specified for Noto Sans Telugu, Gautami, Noto Sans Devanagari, Mangal, and Noto Sans Tamil.

---

## 📁 File Structure

```
bhashabuddy/
├── index.html            (single page shell with all views as <section>s)
├── manifest.json         (PWA manifest for mobile installability)
├── sw.js                 (Service worker with versioned cache-first shell caching)
├── README.md             (documentation, architecture, demo script)
├── css/
│   ├── variables.css     (design tokens: colors, spacing, radius, fonts)
│   ├── base.css          (reset, typography, utilities, regional font scaling)
│   ├── components.css    (buttons, cards, 3D flashcard flip, modal, toast, progress ring)
│   └── layout.css        (navbar, fixed bottom nav, responsive grids, media queries)
├── js/
│   ├── data.js           (50-word vocabulary dataset across 5 progressive units)
│   ├── i18n.js           (UI translations for EN / TE / HI / TA + DOM localization manager)
│   ├── storage.js        (safe localStorage wrapper: profile, progress, scores, day rollover)
│   ├── speech.js         (Web Speech TTS + STT wrappers, en-IN voice preference, error handlers)
│   ├── levenshtein.js    (Levenshtein DP distance + Indian-English phonetic normalizer)
│   ├── flashcards.js     (unit locking, 3D card flip, touch swipe gestures, keyboard shortcuts)
│   ├── pronunciation.js  (Listen / Speak / Levenshtein scoring UI + demo safety net)
│   ├── quiz.js           (daily 5-question mixed quiz, instant feedback, retry wrong)
│   ├── progress.js       (daily goal ring, 7-day strip, SVG weekly chart, badge system)
│   ├── chatbot.js        (stretch: simulated bilingual conversational buddy)
│   ├── dictionary.js     (stretch: visual pictorial dictionary with schematic SVG diagrams)
│   ├── peer.js           (stretch: peer pronunciation challenge with upvoting)
│   └── app.js            (router, dashboard stats, confetti burst, toasts, initialization)
└── assets/
    └── icons/
        ├── icon-192.svg  (PWA application icon 192x192)
        └── icon-512.svg  (PWA application icon 512x512)
```

---

## 🏆 Viva / Evaluation Highlights
- **Zero Dependencies**: No React, no Vite, no Tailwind CLI, no external CDN dependencies.
- **Accurate Indian Scripts**: Handcrafted Telugu, Hindi, and Tamil Unicode translations with larger line-heights for maximum readability on mobile screens.
- **Demonstration Ready**: Built-in `Ctrl+Shift+D` shortcut and demo preload button ensure zero presentation failure risk.
