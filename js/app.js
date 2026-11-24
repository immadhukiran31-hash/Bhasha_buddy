/**
 * BhashaBuddy Application Orchestrator (app.js)
 * Router, Initialization, Event Wiring, Confetti, Toast System,
 * Onboarding, Dark Mode, Demo Mode & Offline Support.
 */

class App {
  constructor() {
    this.currentRoute = "home";
  }

  init() {
    // 1. Initialize Storage & Profile
    storage.checkStreakRollover();
    const profile = storage.getProfile();

    // 2. Theme setup
    this.applyTheme(profile.theme || "light");

    // 3. i18n setup
    i18n.init(profile.locale || "te");
    const langSelect = document.getElementById("nav-lang-select");
    if (langSelect) langSelect.value = profile.locale || "te";

    // 4. Setup Router
    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();

    // 5. Global Event Listeners
    this.bindGlobalEvents();

    // 6. Network Listeners (PWA Offline readiness)
    this.setupNetworkStatus();

    // 7. Register Service Worker
    this.registerServiceWorker();

    // 8. Check Onboarding
    this.checkOnboarding();

    // 9. Update Dashboard stats
    this.updateDashboardStats();

    // 10. Sync Demo state
    if (profile.demoMode) {
      document.body.classList.add("demo-mode-active");
    }
  }

  // ==========================================
  // ROUTING ENGINE (Hash-based)
  // ==========================================
  handleRouting() {
    const rawHash = window.location.hash.slice(1) || "home";
    const [route, queryString] = rawHash.split("?");
    const params = new URLSearchParams(queryString || "");

    this.currentRoute = route;

    // Hide all sections, show active section
    const sections = document.querySelectorAll(".view-section");
    sections.forEach(sec => sec.classList.remove("active"));

    const activeSec = document.getElementById(route) || document.getElementById("home");
    if (activeSec) {
      activeSec.classList.add("active");
    }

    // Sync Bottom Nav
    const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
    bottomNavItems.forEach(item => {
      const targetHash = item.getAttribute("href") ? item.getAttribute("href").replace("#", "") : "";
      item.classList.toggle("active", targetHash === route);
    });

    // Sync Desktop Nav
    const desktopNavLinks = document.querySelectorAll(".desktop-nav-link");
    desktopNavLinks.forEach(item => {
      const targetHash = item.getAttribute("href") ? item.getAttribute("href").replace("#", "") : "";
      item.classList.toggle("active", targetHash === route);
    });

    // Handle view-specific initializations
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (route === "home") {
      this.updateDashboardStats();
    } else if (route === "learn") {
      const unitParam = params.get("unit");
      if (unitParam) {
        flashcards.openUnit(parseInt(unitParam, 10), true);
      } else {
        flashcards.backToUnits();
      }
    } else if (route === "practice") {
      const wordIdParam = params.get("id");
      if (wordIdParam) {
        pronunciation.loadWord(parseInt(wordIdParam, 10));
      } else {
        pronunciation.init();
      }
    } else if (route === "quiz") {
      quiz.init();
    } else if (route === "progress") {
      progressTracker.render();
    } else if (route === "chat") {
      chatbot.init();
    } else if (route === "dictionary") {
      dictionary.init();
    } else if (route === "peer") {
      peerChallenge.init();
    }
  }

  // ==========================================
  // DASHBOARD & STATS UPDATE
  // ==========================================
  updateDashboardStats() {
    const profile = storage.getProfile();
    const streak = storage.getStreak();
    const todayDone = storage.getTodayWordsDoneCount();
    const goal = profile.dailyGoal || 5;
    const mastered = storage.getMasteredWordsCount();

    // 1. Greeting
    const greetingEl = document.getElementById("home-greeting");
    if (greetingEl) {
      const name = profile.name ? profile.name : "Engineer";
      greetingEl.textContent = t("greeting", { name });
    }

    // 2. Streak Badge
    const streakBadges = document.querySelectorAll(".streak-badge-count");
    streakBadges.forEach(el => {
      el.textContent = `${streak.current}d`;
    });

    // 3. Mastered Words count
    const masteredEl = document.getElementById("home-mastered-count");
    if (masteredEl) {
      masteredEl.textContent = `${mastered} / 50`;
    }

    // 4. Progress Ring in Dashboard
    const ringCircle = document.getElementById("home-ring-circle");
    const ringCount = document.getElementById("home-ring-count");
    const ringPctText = document.getElementById("home-ring-pct-label");

    const pct = Math.min(100, Math.round((todayDone / goal) * 100));
    const circumference = 251.327; // 2 * PI * 40
    const offset = circumference - (pct / 100) * circumference;

    if (ringCircle) {
      ringCircle.style.strokeDasharray = `${circumference}`;
      ringCircle.style.strokeDashoffset = `${offset}`;
    }
    if (ringCount) {
      ringCount.textContent = `${todayDone}/${goal}`;
    }
    if (ringPctText) {
      ringPctText.textContent = `${pct}% ${t("daily_goal_label")}`;
    }

    // 5. Word of the Day
    this.renderWordOfTheDay();
  }

  renderWordOfTheDay() {
    // Deterministic word based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const wordId = (dayOfYear % VOCAB.length) + 1;

    const word = getWordById(wordId) || VOCAB[10]; // Fallback to Algorithm
    const locale = i18n.getLocale();
    const translit = (word.transliteration && word.transliteration[locale]) || "";
    const meaning = (word.meaning && word.meaning[locale]) || word.meaning.en;

    const wotdEnglish = document.getElementById("wotd-english");
    const wotdPhonetic = document.getElementById("wotd-phonetic");
    const wotdTranslit = document.getElementById("wotd-transliteration");
    const wotdMeaning = document.getElementById("wotd-meaning");
    const wotdListenBtn = document.getElementById("wotd-listen-btn");
    const wotdPracticeBtn = document.getElementById("wotd-practice-btn");

    if (wotdEnglish) wotdEnglish.textContent = word.english;
    if (wotdPhonetic) wotdPhonetic.textContent = word.phonetic;
    if (wotdTranslit) wotdTranslit.textContent = translit ? `(${translit})` : "";
    if (wotdMeaning) wotdMeaning.textContent = meaning;

    if (wotdListenBtn) {
      wotdListenBtn.onclick = () => speech.speak(word.english, { rate: 1.0, lang: "en-IN" });
    }
    if (wotdPracticeBtn) {
      wotdPracticeBtn.onclick = () => {
        window.location.hash = `#practice?id=${word.id}`;
      };
    }
  }

  // ==========================================
  // 2-MINUTE MICRO LESSON
  // ==========================================
  startMicroLesson() {
    // Pick 5 words from Unit 1 or active unit
    const words = VOCAB.slice(0, 5);
    const modal = document.getElementById("micro-lesson-modal");
    const body = document.getElementById("micro-lesson-body");
    const locale = i18n.getLocale();

    if (!modal || !body) return;

    let html = `
      <div style="margin-bottom: 16px;">
        <p class="text-sm text-muted">Review these 5 core engineering words in under 2 minutes:</p>
      </div>
      <div class="flex flex-col gap-sm">
    `;

    words.forEach(w => {
      const meaning = (w.meaning && w.meaning[locale]) || w.meaning.en;
      html += `
        <div class="card" style="padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div>
            <div class="font-bold text-primary">${w.english} <span class="font-mono text-xs text-muted">(${w.phonetic})</span></div>
            <div class="regional-text text-sm" style="color: var(--color-ink);">${meaning}</div>
          </div>
          <button class="btn btn-sm btn-listen" onclick="speech.speak('${w.english}', { rate: 1.0, lang: 'en-IN' })">
            🔊
          </button>
        </div>
      `;
    });

    html += `
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <button class="btn btn-primary" onclick="app.closeMicroLesson(); showToast('Micro lesson completed!', 'success');">
          Complete Lesson ✓
        </button>
      </div>
    `;

    body.innerHTML = html;
    modal.classList.add("open");
  }

  closeMicroLesson() {
    const modal = document.getElementById("micro-lesson-modal");
    if (modal) modal.classList.remove("open");
  }

  // ==========================================
  // ONBOARDING MODAL
  // ==========================================
  checkOnboarding() {
    const profile = storage.getProfile();
    const modal = document.getElementById("onboarding-modal");

    if (!profile.hasOnboarded && modal) {
      modal.classList.add("open");
    }
  }

  submitOnboarding() {
    const nameInput = document.getElementById("onboarding-name-input");
    const langSelect = document.getElementById("onboarding-lang-select");
    const goalSelect = document.getElementById("onboarding-goal-select");

    const name = nameInput ? nameInput.value.trim() : "Student";
    const locale = langSelect ? langSelect.value : "te";
    const dailyGoal = goalSelect ? parseInt(goalSelect.value, 10) : 5;

    storage.saveProfile({
      name: name || "Student",
      locale,
      dailyGoal,
      hasOnboarded: true
    });

    // Set locale
    i18n.setLocale(locale);
    const navLang = document.getElementById("nav-lang-select");
    if (navLang) navLang.value = locale;

    // Close modal
    const modal = document.getElementById("onboarding-modal");
    if (modal) modal.classList.remove("open");

    showToast(`Welcome, ${name}! Your learning journey begins now.`, "success");
    this.updateDashboardStats();
  }

  // Preloads Demo Mode for Instant Testing by Judges
  enableQuickDemoMode() {
    storage.loadDemoData();
    const profile = storage.getProfile();

    i18n.setLocale(profile.locale);
    const navLang = document.getElementById("nav-lang-select");
    if (navLang) navLang.value = profile.locale;

    document.body.classList.add("demo-mode-active");

    const modal = document.getElementById("onboarding-modal");
    if (modal) modal.classList.remove("open");

    showToast(t("toast_demo_enabled"), "accent");
    this.updateDashboardStats();

    // Route to practice with Algorithm
    window.location.hash = "#practice?id=11";
  }

  toggleDemoMode() {
    const profile = storage.getProfile();
    const newDemoState = !profile.demoMode;

    if (newDemoState) {
      storage.loadDemoData();
      document.body.classList.add("demo-mode-active");
      showToast(t("toast_demo_enabled"), "accent");
    } else {
      storage.saveProfile({ demoMode: false, skipLocks: false });
      document.body.classList.remove("demo-mode-active");
      showToast(t("toast_demo_disabled"), "secondary");
    }

    if (typeof pronunciation !== "undefined" && pronunciation.syncDemoButton) {
      pronunciation.syncDemoButton();
    }
    this.updateDashboardStats();
  }

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = current === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme);
    storage.saveProfile({ theme: nextTheme });
  }

  // ==========================================
  // NETWORK & PWA STATUS
  // ==========================================
  setupNetworkStatus() {
    const updateStatus = () => {
      const isOffline = !navigator.onLine;
      document.body.classList.toggle("is-offline", isOffline);
      if (isOffline) {
        showToast("You are offline. BhashaBuddy local audio and practice remain functional!", "accent");
      }
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    updateStatus();
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .then(reg => {
            console.log("BhashaBuddy ServiceWorker registered:", reg.scope);
          })
          .catch(err => {
            console.log("ServiceWorker registration note (normal on file://):", err);
          });
      });
    }
  }

  // ==========================================
  // GLOBAL EVENTS & SHORTCUTS
  // ==========================================
  bindGlobalEvents() {
    // 1. Language switcher dropdown in navbar
    const langSelect = document.getElementById("nav-lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        const newLocale = e.target.value;
        i18n.setLocale(newLocale);
        storage.saveProfile({ locale: newLocale });
        this.updateDashboardStats();

        // Refresh views
        if (this.currentRoute === "learn") {
          flashcards.renderUnitsGrid(document.getElementById("units-container"));
        } else if (this.currentRoute === "practice") {
          pronunciation.loadWord(pronunciation.currentWordId);
        } else if (this.currentRoute === "dictionary") {
          dictionary.render();
        }
      });
    }

    // 2. Demo shortcut: Ctrl + Shift + D
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        this.toggleDemoMode();
      }
    });

    // 3. Theme button
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    // 4. Demo toggle pill in navbar
    const demoBadge = document.getElementById("navbar-demo-pill");
    if (demoBadge) {
      demoBadge.addEventListener("click", () => this.toggleDemoMode());
    }
  }
}

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = "primary", duration = 3200) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "ℹ️";
  if (type === "success") icon = "✓";
  else if (type === "error") icon = "⚠️";
  else if (type === "accent") icon = "🔥";

  toast.innerHTML = `
    <span style="font-weight: 700; font-size: 1.1rem;">${icon}</span>
    <span style="flex: 1;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// ==========================================
// PURE HTML5 CANVAS CONFETTI BURST
// (No external dependencies)
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#0F766E", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      r: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -14 - 4,
      gravity: 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 1.5);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}

// Initialize on DOMContentLoaded
const app = new App();
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
