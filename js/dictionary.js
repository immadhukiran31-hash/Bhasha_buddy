/**
 * BhashaBuddy Visual Pictorial Dictionary (dictionary.js)
 * Grid view of all 50 engineering terms with schematic SVG illustrations,
 * multilingual text search, unit filter pills, and detail modal.
 */

class VisualDictionary {
  constructor() {
    this.currentFilterUnit = "all";
    this.searchQuery = "";
  }

  init() {
    this.render();
    this.bindSearch();
  }

  // Pure SVG generator for technical engineering concepts
  getIllustrationSvg(illustrationKey) {
    switch (illustrationKey) {
      case "algorithm":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="25" y="10" width="30" height="16" rx="4" fill="var(--color-primary-light)" />
            <line x1="40" y1="26" x2="40" y2="34" />
            <polygon points="40,34 56,44 40,54 24,44" fill="var(--color-accent-light)" stroke="var(--color-accent)" />
            <line x1="40" y1="54" x2="40" y2="62" />
            <rect x="25" y="62" width="30" height="12" rx="4" fill="var(--color-primary-light)" />
          </svg>
        `;
      case "database":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <ellipse cx="40" cy="20" rx="26" ry="10" fill="var(--color-primary-light)" />
            <path d="M14 20v18c0 5.5 11.6 10 26 10s26-4.5 26-10V20" />
            <path d="M14 38v18c0 5.5 11.6 10 26 10s26-4.5 26-10V38" />
          </svg>
        `;
      case "network":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <circle cx="40" cy="22" r="10" fill="var(--color-primary-light)" />
            <circle cx="20" cy="58" r="8" fill="var(--color-accent-light)" stroke="var(--color-accent)" />
            <circle cx="60" cy="58" r="8" fill="var(--color-accent-light)" stroke="var(--color-accent)" />
            <line x1="33" y1="30" x2="24" y2="50" />
            <line x1="47" y1="30" x2="56" y2="50" />
            <line x1="28" y1="58" x2="52" y2="58" stroke-dasharray="3 3" />
          </svg>
        `;
      case "compiler":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <rect x="12" y="24" width="22" height="32" rx="3" fill="var(--color-surface-muted)" />
            <path d="M18 34h10M18 42h6" />
            <path d="M38 40h12m-4-6 6 6-6 6" stroke="var(--color-accent)" stroke-width="3" />
            <circle cx="62" cy="40" r="12" fill="var(--color-primary-light)" />
            <text x="56" y="44" font-size="10" font-family="monospace" fill="var(--color-primary)" font-weight="bold">01</text>
          </svg>
        `;
      case "processor":
      case "cpu":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <rect x="22" y="22" width="36" height="36" rx="6" fill="var(--color-primary-light)" />
            <rect x="30" y="30" width="20" height="20" rx="3" fill="var(--color-accent)" opacity="0.3" stroke="var(--color-accent)" />
            <!-- Pins -->
            <line x1="30" y1="12" x2="30" y2="22" /><line x1="40" y1="12" x2="40" y2="22" /><line x1="50" y1="12" x2="50" y2="22" />
            <line x1="30" y1="58" x2="30" y2="68" /><line x1="40" y1="58" x2="40" y2="68" /><line x1="50" y1="58" x2="50" y2="68" />
            <line x1="12" y1="30" x2="22" y2="30" /><line x1="12" y1="40" x2="22" y2="40" /><line x1="12" y1="50" x2="22" y2="50" />
            <line x1="58" y1="30" x2="68" y2="30" /><line x1="58" y1="40" x2="68" y2="40" /><line x1="58" y1="50" x2="68" y2="50" />
          </svg>
        `;
      case "circuit":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <rect x="18" y="18" width="44" height="44" rx="4" />
            <!-- Battery symbol on left -->
            <line x1="18" y1="36" x2="10" y2="36" stroke="none" />
            <line x1="14" y1="35" x2="22" y2="35" stroke-width="3" />
            <line x1="16" y1="45" x2="20" y2="45" stroke-width="3" />
            <!-- Resistor zig-zag on top -->
            <path d="M30 18l3-6 6 12 6-12 6 12 3-6" stroke="var(--color-accent)" stroke-width="2" />
          </svg>
        `;
      case "variable":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <rect x="18" y="26" width="44" height="36" rx="4" fill="var(--color-surface-muted)" />
            <path d="M18 26l22-12 22 12" />
            <text x="32" y="50" font-family="monospace" font-size="16" font-weight="bold" fill="var(--color-primary)">[x]</text>
          </svg>
        `;
      case "loop":
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-accent)" stroke-width="3">
            <path d="M40 18a22 22 0 1 1-18 9.5" />
            <polyline points="16 18 22 28 32 24" />
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 80 80" fill="none" stroke="var(--color-primary)" stroke-width="2.5">
            <circle cx="40" cy="40" r="26" fill="var(--color-primary-light)" />
            <polygon points="36 30 50 40 36 50" fill="var(--color-primary)" />
          </svg>
        `;
    }
  }

  render() {
    const gridEl = document.getElementById("dict-grid-container");
    if (!gridEl) return;

    const locale = i18n.getLocale();
    const query = this.searchQuery.toLowerCase();

    const filtered = VOCAB.filter(word => {
      // Unit filter
      if (this.currentFilterUnit !== "all" && word.unit !== parseInt(this.currentFilterUnit, 10)) {
        return false;
      }

      // Multilingual Search filter
      if (query) {
        const enMatch = word.english.toLowerCase().includes(query);
        const phoneticMatch = word.phonetic.toLowerCase().includes(query);
        const regMeaning = ((word.meaning && word.meaning[locale]) || "").toLowerCase();
        const regTranslit = ((word.transliteration && word.transliteration[locale]) || "").toLowerCase();
        const regTranslation = ((word.translation && word.translation[locale]) || "").toLowerCase();

        return enMatch || phoneticMatch || regMeaning.includes(query) || regTranslit.includes(query) || regTranslation.includes(query);
      }

      return true;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <p class="text-muted" style="font-size: 1.1rem;">No technical terms matched your search.</p>
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(word => {
      const translit = (word.transliteration && word.transliteration[locale]) || "";
      const meaning = (word.meaning && word.meaning[locale]) || word.meaning.en;

      html += `
        <div class="dict-card" onclick="dictionary.openModal(${word.id})">
          <div class="dict-illustration">
            ${this.getIllustrationSvg(word.illustration)}
          </div>
          <div class="flex items-center justify-between" style="margin-top: 4px;">
            <h4 style="color: var(--color-primary); font-size: 1.2rem;">${word.english}</h4>
            <span class="badge badge-primary text-xs">Unit ${word.unit}</span>
          </div>
          <div class="font-mono text-xs text-muted">${word.phonetic} • <span class="font-semibold text-accent">${translit}</span></div>
          <p class="regional-text text-sm" style="color: var(--color-text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${meaning}
          </p>
          <div class="flex items-center justify-between" style="margin-top: auto; padding-top: 8px; border-top: 1px solid var(--color-border);">
            <span class="text-xs text-muted">Details & Audio →</span>
            <button class="btn-icon" onclick="event.stopPropagation(); dictionary.playAudio('${word.english}')" title="Listen">
              🔊
            </button>
          </div>
        </div>
      `;
    });

    gridEl.innerHTML = html;
  }

  setUnitFilter(unitId) {
    this.currentFilterUnit = unitId;
    const filterButtons = document.querySelectorAll(".dict-filter-chip");
    filterButtons.forEach(btn => {
      btn.classList.toggle("btn-primary", btn.dataset.unit === unitId.toString());
      btn.classList.toggle("btn-secondary", btn.dataset.unit !== unitId.toString());
    });
    this.render();
  }

  bindSearch() {
    const searchInput = document.getElementById("dict-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim();
      this.render();
    });
  }

  openModal(wordId) {
    const word = getWordById(wordId);
    if (!word) return;

    const modal = document.getElementById("dict-detail-modal");
    const locale = i18n.getLocale();
    const meaning = (word.meaning && word.meaning[locale]) || word.meaning.en;
    const translit = (word.transliteration && word.transliteration[locale]) || "";
    const exampleMeaning = (word.exampleMeaning && word.exampleMeaning[locale]) || "";

    const titleEl = document.getElementById("dict-modal-title");
    const bodyEl = document.getElementById("dict-modal-body");

    if (titleEl) {
      titleEl.innerHTML = `${word.english} <span class="text-muted font-mono" style="font-size: 1rem;">(${word.phonetic})</span>`;
    }

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="flex flex-col items-center" style="margin-bottom: 20px;">
          <div class="dict-illustration" style="height: 140px; width: 100%; max-width: 260px; margin-bottom: 12px;">
            ${this.getIllustrationSvg(word.illustration)}
          </div>
          <div class="badge badge-accent" style="font-size: 0.95rem; margin-bottom: 12px;">
            ${translit}
          </div>
          <div class="flex items-center gap-sm">
            <button class="btn btn-listen" onclick="dictionary.playAudio('${word.english}', 1.0)">
              Normal 1.0x 🔊
            </button>
            <button class="btn btn-secondary btn-sm" onclick="dictionary.playAudio('${word.english}', 0.8)">
              Slow 0.8x 🔊
            </button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <h5 class="text-xs font-semibold text-muted" style="text-transform: uppercase; margin-bottom: 4px;">
            ${t("target_meaning")}
          </h5>
          <p class="regional-text" style="color: var(--color-ink); font-size: 1.05rem;">
            ${meaning}
          </p>
        </div>

        <div style="background-color: var(--color-surface-muted); padding: 14px; border-radius: var(--radius-md); border-left: 4px solid var(--color-primary);">
          <div class="flex items-center justify-between" style="margin-bottom: 4px;">
            <h5 class="text-xs font-semibold text-muted" style="text-transform: uppercase;">
              ${t("example_title")}
            </h5>
            <button class="btn btn-sm btn-secondary" onclick="dictionary.playAudio('${word.example.replace(/'/g, "\\'")}', 0.9)">
              Listen 🔊
            </button>
          </div>
          <p style="font-style: italic; color: var(--color-ink); margin-bottom: 6px;">
            "${word.example}"
          </p>
          <p class="regional-text text-sm" style="color: var(--color-text-muted);">
            ${exampleMeaning}
          </p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <button class="btn btn-primary" onclick="dictionary.jumpToPractice(${word.id})">
            ${t("btn_jump_practice")}
          </button>
        </div>
      `;
    }

    if (modal) modal.classList.add("open");
  }

  closeModal() {
    const modal = document.getElementById("dict-detail-modal");
    if (modal) modal.classList.remove("open");
  }

  jumpToPractice(wordId) {
    this.closeModal();
    window.location.hash = `#practice?id=${wordId}`;
  }

  playAudio(text, rate = 1.0) {
    speech.speak(text, {
      rate: rate,
      lang: "en-IN"
    });
  }
}

// Global dictionary singleton
const dictionary = new VisualDictionary();
