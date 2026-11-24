/**
 * BhashaBuddy Flashcards Engine (flashcards.js)
 * Manages unit locking, 3D card flipping, engineering example audio,
 * touch gestures, and keyboard navigation.
 */

class FlashcardDeck {
  constructor() {
    this.currentUnitId = 1;
    this.currentIndex = 0;
    this.unitWords = [];
    this.isFlipped = false;
    this.isSlowAudio = false;

    // Touch gesture tracking
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  init() {
    this.bindGlobalKeyboard();
  }

  // Load either the unit selection grid or a specific unit's deck
  renderUnitsGrid(containerEl) {
    if (!containerEl) return;
    const profile = storage.getProfile();
    const skipLocks = profile.skipLocks || profile.demoMode;
    const locale = i18n.getLocale();

    let html = `<div class="unit-grid">`;

    UNITS.forEach((unit, index) => {
      const masteredCount = storage.getMasteredWordsInUnit(unit.id, VOCAB);
      const isFirstUnit = unit.id === 1;

      // Lock condition: unit N+1 unlocks after >= 70% (7 words) of unit N is mastered
      let isUnlocked = isFirstUnit || skipLocks;
      if (!isUnlocked && index > 0) {
        const prevUnitId = UNITS[index - 1].id;
        const prevMastered = storage.getMasteredWordsInUnit(prevUnitId, VOCAB);
        isUnlocked = prevMastered >= 7; // 70% of 10 words
      }

      const lockBadge = isUnlocked
        ? `<span class="badge badge-success">✓ Unlocked</span>`
        : `<span class="badge badge-medium">🔒 Locked</span>`;

      html += `
        <div class="card card-interactive ${isUnlocked ? '' : 'opacity-70'}" style="border-top: 4px solid ${unit.color};" onclick="flashcards.openUnit(${unit.id}, ${isUnlocked})">
          <div class="flex items-center justify-between" style="margin-bottom: 12px;">
            <span class="badge badge-primary">Unit ${unit.id}</span>
            ${lockBadge}
          </div>
          <h3 style="margin-bottom: 6px;">${t(unit.titleKey)}</h3>
          <p class="text-sm text-muted" style="margin-bottom: 16px; min-height: 40px;">${t(unit.descKey)}</p>
          
          <div class="flex items-center justify-between text-sm font-semibold" style="margin-bottom: 6px;">
            <span>${t("unit_progress", { count: masteredCount })}</span>
            <span>${masteredCount * 10}%</span>
          </div>
          <div class="score-bar-bg" style="height: 8px;">
            <div class="score-bar-fill score-excellent" style="width: ${masteredCount * 10}%;"></div>
          </div>
          
          <div style="margin-top: 16px;">
            <button class="btn ${isUnlocked ? 'btn-primary' : 'btn-secondary'} btn-sm" style="width: 100%;">
              ${isUnlocked ? t("btn_start_unit") : t("unit_locked_msg")}
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    containerEl.innerHTML = html;
  }

  openUnit(unitId, isUnlocked) {
    if (!isUnlocked) {
      if (typeof showToast === "function") {
        showToast(t("unit_locked_msg"), "error");
      }
      return;
    }

    this.currentUnitId = unitId;
    this.unitWords = getWordsByUnit(unitId);
    this.currentIndex = 0;
    this.isFlipped = false;

    // Switch view in learn section
    document.getElementById("learn-units-view").style.display = "none";
    document.getElementById("learn-deck-view").style.display = "block";

    this.renderCurrentCard();
  }

  backToUnits() {
    this.stopAudio();
    document.getElementById("learn-deck-view").style.display = "none";
    document.getElementById("learn-units-view").style.display = "block";
    this.renderUnitsGrid(document.getElementById("units-container"));
  }

  renderCurrentCard() {
    const cardContainer = document.getElementById("active-card-container");
    if (!cardContainer || !this.unitWords.length) return;

    const word = this.unitWords[this.currentIndex];
    const locale = i18n.getLocale();
    const wordState = storage.getWordState(word.id);
    const masteredCount = storage.getMasteredWordsInUnit(this.currentUnitId, VOCAB);

    // Update progress indicator
    const progText = document.getElementById("deck-progress-text");
    const progBar = document.getElementById("deck-progress-bar");
    if (progText) progText.textContent = `${this.currentIndex + 1} / ${this.unitWords.length}`;
    if (progBar) progBar.style.width = `${((this.currentIndex + 1) / this.unitWords.length) * 100}%`;

    // Reset flipped state
    this.isFlipped = false;

    // Regional content
    const regionalMeaning = (word.meaning && word.meaning[locale]) || word.meaning.en || "";
    const regionalTranslit = (word.transliteration && word.transliteration[locale]) || "";
    const regionalTranslation = (word.translation && word.translation[locale]) || "";
    const regionalExample = (word.exampleMeaning && word.exampleMeaning[locale]) || "";

    const difficultyBadgeClass = word.difficulty === "Easy" ? "badge-easy" : (word.difficulty === "Medium" ? "badge-medium" : "badge-hard");

    cardContainer.innerHTML = `
      <div class="flashcard-wrapper" id="flashcard-element" onclick="flashcards.flipCard()">
        <div class="flashcard ${this.isFlipped ? 'flipped' : ''}">
          <!-- FRONT FACE -->
          <div class="flashcard-front">
            <div class="flex items-center justify-between">
              <span class="badge ${difficultyBadgeClass}">${word.difficulty}</span>
              <span class="text-xs text-muted">ID #${word.id}</span>
            </div>

            <div class="text-center" style="margin: auto 0;">
              <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">
                ${word.english}
              </h1>
              <div class="font-mono text-muted" style="font-size: 1.15rem; margin-bottom: 16px;">
                ${word.phonetic}
              </div>
              
              <div style="margin-bottom: 20px;">
                <button class="btn-listen" onclick="event.stopPropagation(); flashcards.playAudio('${word.english}', 1.0)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                  <span>${t("btn_listen")}</span>
                </button>
              </div>

              ${wordState.status === 'mastered' ? '<span class="badge badge-success">✓ Mastered</span>' : ''}
              ${wordState.inReviewList ? '<span class="badge badge-accent">⚑ In Review List</span>' : ''}
            </div>

            <div class="flashcard-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
              <span>${t("card_tap_hint")}</span>
            </div>
          </div>

          <!-- BACK FACE -->
          <div class="flashcard-back">
            <div class="flex items-center justify-between" style="border-bottom: 1px solid var(--color-border); padding-bottom: 10px;">
              <div class="font-semibold" style="color: var(--color-primary); font-size: 1.25rem;">
                ${word.english}
              </div>
              <span class="badge badge-primary">${regionalTranslit}</span>
            </div>

            <div style="margin: 12px 0; overflow-y: auto;">
              <!-- Meaning in regional script -->
              <div style="margin-bottom: 14px;">
                <div class="text-xs font-semibold text-muted" style="text-transform: uppercase; margin-bottom: 4px;">
                  ${t("target_meaning")}
                </div>
                <div class="regional-text" style="color: var(--color-ink);">
                  ${regionalMeaning}
                </div>
                ${regionalTranslation ? `<div class="text-sm font-semibold text-primary" style="margin-top: 4px;">(${regionalTranslation})</div>` : ''}
              </div>

              <!-- Engineering Example -->
              <div style="background-color: var(--color-surface-muted); padding: 12px; border-radius: var(--radius-md); border-left: 4px solid var(--color-accent);">
                <div class="flex items-center justify-between" style="margin-bottom: 6px;">
                  <span class="text-xs font-semibold text-muted" style="text-transform: uppercase;">
                    ${t("example_title")}
                  </span>
                  <div class="flex items-center gap-xs">
                    <button class="btn btn-sm btn-secondary" style="padding: 2px 8px; font-size: 0.75rem;" onclick="event.stopPropagation(); flashcards.playAudio('${this.escapeQuotes(word.example)}', 0.8)">
                      Slow 0.8x 🔊
                    </button>
                    <button class="btn btn-sm btn-primary" style="padding: 2px 8px; font-size: 0.75rem;" onclick="event.stopPropagation(); flashcards.playAudio('${this.escapeQuotes(word.example)}', 1.0)">
                      Play 🔊
                    </button>
                  </div>
                </div>
                <p style="font-size: 0.95rem; font-style: italic; color: var(--color-ink); margin-bottom: 6px;">
                  "${word.example}"
                </p>
                <p class="regional-text text-sm" style="color: var(--color-text-muted);">
                  ${regionalExample}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-between" style="border-top: 1px solid var(--color-border); padding-top: 8px;">
              <span class="text-xs text-muted">${t("card_tap_hint")}</span>
              <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); flashcards.jumpToPractice(${word.id})">
                ${t("btn_jump_practice")}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindTouchGestures(document.getElementById("flashcard-element"));
  }

  escapeQuotes(str) {
    if (!str) return "";
    return str.replace(/'/g, "\\'");
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    const cardEl = document.querySelector("#flashcard-element .flashcard");
    if (cardEl) {
      cardEl.classList.toggle("flipped", this.isFlipped);
    }
  }

  nextCard() {
    this.stopAudio();
    if (this.currentIndex < this.unitWords.length - 1) {
      this.currentIndex++;
      this.renderCurrentCard();
    } else {
      if (typeof showToast === "function") {
        showToast("You've reached the end of this unit deck!", "accent");
      }
    }
  }

  prevCard() {
    this.stopAudio();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrentCard();
    }
  }

  markAsKnown() {
    if (!this.unitWords.length) return;
    const word = this.unitWords[this.currentIndex];

    // Mark as mastered in storage
    storage.setWordStatus(word.id, "mastered");

    // Increment today's count
    const countDone = storage.markWordDoneToday(word.id);
    const profile = storage.getProfile();

    if (typeof showToast === "function") {
      showToast(t("toast_word_mastered", { word: word.english }), "success");
      if (countDone >= profile.dailyGoal) {
        showToast(t("toast_goal_complete"), "accent");
        if (typeof triggerConfetti === "function") {
          triggerConfetti();
        }
      }
    }

    // Refresh UI & progress
    if (typeof app !== "undefined" && app.updateDashboardStats) {
      app.updateDashboardStats();
    }

    // Auto-advance
    this.nextCard();
  }

  markForReview() {
    if (!this.unitWords.length) return;
    const word = this.unitWords[this.currentIndex];
    const inReview = storage.toggleReviewList(word.id);

    if (typeof showToast === "function") {
      showToast(t("toast_review_added", { word: word.english }), "accent");
    }

    this.renderCurrentCard();
  }

  jumpToPractice(wordId) {
    this.stopAudio();
    window.location.hash = `#practice?id=${wordId}`;
  }

  playAudio(text, rate = 1.0) {
    speech.speak(text, {
      rate: rate,
      lang: "en-IN"
    });
  }

  stopAudio() {
    speech.stopSpeaking();
  }

  bindTouchGestures(element) {
    if (!element) return;

    element.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    element.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchEndX - this.touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff < 0) {
        // Swiped left -> Next
        this.nextCard();
      } else {
        // Swiped right -> Previous
        this.prevCard();
      }
    }
  }

  bindGlobalKeyboard() {
    window.addEventListener("keydown", (e) => {
      const learnSec = document.getElementById("learn");
      if (!learnSec || !learnSec.classList.contains("active")) return;

      const deckView = document.getElementById("learn-deck-view");
      if (!deckView || deckView.style.display === "none") return;

      if (e.code === "Space") {
        e.preventDefault();
        this.flipCard();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        this.nextCard();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        this.prevCard();
      }
    });
  }
}

// Global flashcards singleton
const flashcards = new FlashcardDeck();
