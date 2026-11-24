/**
 * BhashaBuddy Pronunciation Evaluator (pronunciation.js)
 * Core interactive module: Listen / Speak / Levenshtein evaluation /
 * Fallback typing mode / Demo safety simulation.
 */

class PronunciationEvaluator {
  constructor() {
    this.currentWordId = 11; // Default to 'Algorithm' for demo
    this.currentAudioRate = 1.0;
    this.attempts = 0;
    this.maxAttempts = 3;
    this.isRecording = false;
  }

  init() {
    this.setupWordSelector();
    this.loadWord(this.currentWordId);
  }

  setupWordSelector() {
    const selectEl = document.getElementById("practice-word-select");
    if (!selectEl) return;

    let html = "";
    VOCAB.forEach(word => {
      html += `<option value="${word.id}" ${word.id === this.currentWordId ? 'selected' : ''}>${word.id}. ${word.english} (${word.difficulty})</option>`;
    });
    selectEl.innerHTML = html;

    selectEl.addEventListener("change", (e) => {
      this.loadWord(parseInt(e.target.value, 10));
    });
  }

  loadWord(wordId) {
    const word = getWordById(wordId);
    if (!word) return;

    this.currentWordId = word.id;
    this.attempts = 0;

    // Sync select dropdown
    const selectEl = document.getElementById("practice-word-select");
    if (selectEl && parseInt(selectEl.value, 10) !== word.id) {
      selectEl.value = word.id;
    }

    const locale = i18n.getLocale();
    const meaning = (word.meaning && word.meaning[locale]) || word.meaning.en || "";
    const translit = (word.transliteration && word.transliteration[locale]) || "";
    const translation = (word.translation && word.translation[locale]) || "";

    // Update UI elements
    const targetWordEl = document.getElementById("practice-target-word");
    const phoneticEl = document.getElementById("practice-phonetic");
    const regionalMeaningEl = document.getElementById("practice-regional-meaning");
    const translitEl = document.getElementById("practice-transliteration");

    if (targetWordEl) targetWordEl.textContent = word.english;
    if (phoneticEl) phoneticEl.textContent = word.phonetic;
    if (regionalMeaningEl) regionalMeaningEl.textContent = meaning;
    if (translitEl) translitEl.textContent = translit ? `(${translit})` : "";

    // Reset results & state
    this.resetResultsUI();

    // Check speech recognition capability
    if (!speech.isSpeechRecognitionSupported()) {
      this.showFallbackMode(t("err_speech_unsupported"));
    } else {
      this.hideFallbackMode();
    }

    // Sync demo button visibility
    this.syncDemoButton();
  }

  resetResultsUI() {
    const resultBox = document.getElementById("practice-result-box");
    const liveTranscript = document.getElementById("practice-live-transcript");
    const micBtn = document.getElementById("practice-mic-btn");
    const micStatus = document.getElementById("practice-mic-status");

    if (resultBox) resultBox.style.display = "none";
    if (liveTranscript) liveTranscript.textContent = "";
    if (micBtn) {
      micBtn.classList.remove("recording");
      micBtn.setAttribute("aria-label", t("mic_idle"));
    }
    if (micStatus) micStatus.textContent = t("mic_idle");

    const attemptsEl = document.getElementById("practice-attempts-text");
    if (attemptsEl) attemptsEl.textContent = t("attempts_remaining", { count: this.attempts });

    const hearAgainBtn = document.getElementById("practice-hear-again-btn");
    if (hearAgainBtn) hearAgainBtn.style.display = "none";
  }

  setAudioRate(rate) {
    this.currentAudioRate = rate;
    const chips = document.querySelectorAll(".speed-chip");
    chips.forEach(chip => {
      chip.classList.toggle("active", parseFloat(chip.dataset.rate) === rate);
    });
  }

  playTargetAudio(rateOverride = null) {
    const word = getWordById(this.currentWordId);
    if (!word) return;

    const rate = rateOverride !== null ? rateOverride : this.currentAudioRate;
    const listenBtn = document.getElementById("practice-listen-btn");
    if (listenBtn) listenBtn.classList.add("speaking");

    speech.speak(word.english, {
      rate: rate,
      lang: "en-IN",
      onEnd: () => {
        if (listenBtn) listenBtn.classList.remove("speaking");
      },
      onError: () => {
        if (listenBtn) listenBtn.classList.remove("speaking");
      }
    });
  }

  toggleSpeechRecognition() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    if (!speech.isSpeechRecognitionSupported()) {
      this.showFallbackMode(t("err_speech_unsupported"));
      return;
    }

    const micBtn = document.getElementById("practice-mic-btn");
    const micStatus = document.getElementById("practice-mic-status");
    const liveTranscript = document.getElementById("practice-live-transcript");
    const resultBox = document.getElementById("practice-result-box");

    if (resultBox) resultBox.style.display = "none";
    if (liveTranscript) liveTranscript.textContent = t("mic_listening");

    this.isRecording = true;
    if (micBtn) micBtn.classList.add("recording");
    if (micStatus) micStatus.textContent = t("mic_listening");

    speech.startListening({
      onStart: () => {
        this.isRecording = true;
        if (micBtn) micBtn.classList.add("recording");
        if (micStatus) micStatus.textContent = t("mic_listening");
      },
      onInterim: (text) => {
        if (liveTranscript) {
          liveTranscript.textContent = `"${text}"`;
        }
      },
      onResult: (alternatives) => {
        this.stopRecording();
        this.handleEvaluation(alternatives);
      },
      onError: (errType, msgKey) => {
        this.stopRecording();
        const msg = t(msgKey) || errType;
        if (typeof showToast === "function") {
          showToast(msg, "error");
        }
        if (liveTranscript) liveTranscript.textContent = msg;

        // If mic permission blocked, offer fallback text input
        if (errType === "not-allowed" || errType === "audio-capture") {
          this.showFallbackMode(msg);
        }
      },
      onEnd: () => {
        this.stopRecording();
      }
    });
  }

  stopRecording() {
    this.isRecording = false;
    speech.stopListening();
    const micBtn = document.getElementById("practice-mic-btn");
    const micStatus = document.getElementById("practice-mic-status");

    if (micBtn) micBtn.classList.remove("recording");
    if (micStatus) micStatus.textContent = t("mic_idle");
  }

  handleEvaluation(heardAlternatives) {
    const word = getWordById(this.currentWordId);
    if (!word) return;

    this.attempts++;

    // Grade using Levenshtein + accent tolerance engine
    const evaluation = gradePronunciation(heardAlternatives, word.english);

    // Render result
    this.displayResult(evaluation, word);

    // Save score history
    storage.logPronunciationScore(word.id, evaluation.score, this.attempts);

    // Update attempts text
    const attemptsEl = document.getElementById("practice-attempts-text");
    if (attemptsEl) {
      attemptsEl.textContent = t("attempts_remaining", { count: Math.min(this.attempts, this.maxAttempts) });
    }

    // Show "Hear it again" hint if failed or after 3 attempts
    const hearAgainBtn = document.getElementById("practice-hear-again-btn");
    if (hearAgainBtn) {
      if (!evaluation.passed || this.attempts >= this.maxAttempts) {
        hearAgainBtn.style.display = "inline-flex";
      } else {
        hearAgainBtn.style.display = "none";
      }
    }

    // Celebratory feedback if passed
    if (evaluation.score >= 85) {
      if (typeof triggerConfetti === "function") {
        triggerConfetti();
      }
      if (typeof showToast === "function") {
        showToast(t("feedback_excellent"), "success");
      }
    } else if (evaluation.passed) {
      if (typeof showToast === "function") {
        showToast(t("feedback_good"), "accent");
      }
    }

    // Refresh dashboard stats
    if (typeof app !== "undefined" && app.updateDashboardStats) {
      app.updateDashboardStats();
    }
  }

  displayResult(evalResult, word) {
    const resultBox = document.getElementById("practice-result-box");
    if (!resultBox) return;

    resultBox.style.display = "block";

    const scorePct = evalResult.score;
    const scoreValEl = document.getElementById("result-score-val");
    const scoreBarEl = document.getElementById("result-score-bar");
    const heardEl = document.getElementById("result-heard-text");
    const feedbackEl = document.getElementById("result-feedback-text");

    if (scoreValEl) scoreValEl.textContent = `${scorePct}%`;
    if (scoreBarEl) {
      scoreBarEl.style.width = `${scorePct}%`;
      scoreBarEl.className = "score-bar-fill " + (scorePct >= 85 ? "score-excellent" : (scorePct >= 70 ? "score-good" : "score-retry"));
    }

    if (heardEl) {
      heardEl.textContent = evalResult.bestHeard ? `"${evalResult.bestHeard}"` : "(none)";
    }

    if (feedbackEl) {
      feedbackEl.textContent = t(evalResult.feedbackKey);
      feedbackEl.style.color = scorePct >= 85 ? "var(--color-success)" : (scorePct >= 70 ? "var(--color-accent-hover)" : "var(--color-error)");
    }
  }

  // Graceful Fallback Mode (Text Input)
  showFallbackMode(reason) {
    const fallbackBox = document.getElementById("practice-fallback-box");
    const fallbackReason = document.getElementById("practice-fallback-reason");
    if (fallbackBox) fallbackBox.style.display = "block";
    if (fallbackReason && reason) fallbackReason.textContent = reason;
  }

  hideFallbackMode() {
    const fallbackBox = document.getElementById("practice-fallback-box");
    if (fallbackBox) fallbackBox.style.display = "none";
  }

  evaluateTypedText() {
    const inputEl = document.getElementById("practice-typed-input");
    if (!inputEl) return;

    const typedText = inputEl.value.trim();
    if (!typedText) return;

    this.handleEvaluation([typedText]);
    inputEl.value = "";
  }

  // Demo Safety Net: Simulate 95% Match
  simulateDemoMatch() {
    const word = getWordById(this.currentWordId);
    if (!word) return;

    const liveTranscript = document.getElementById("practice-live-transcript");
    if (liveTranscript) {
      liveTranscript.textContent = `"${word.english}" (Demo Audio Simulation)`;
    }

    // Simulate 95% match
    const demoEval = {
      score: 95,
      passed: true,
      bestHeard: word.english,
      distance: 0,
      feedbackKey: "feedback_excellent"
    };

    this.attempts++;
    this.displayResult(demoEval, word);
    storage.logPronunciationScore(word.id, 95, this.attempts);

    if (typeof triggerConfetti === "function") {
      triggerConfetti();
    }
    if (typeof showToast === "function") {
      showToast("⚡ Demo Simulation: 95% Match Achieved!", "success");
    }

    if (typeof app !== "undefined" && app.updateDashboardStats) {
      app.updateDashboardStats();
    }
  }

  syncDemoButton() {
    const profile = storage.getProfile();
    const demoBtn = document.getElementById("practice-demo-simulate-btn");
    if (demoBtn) {
      demoBtn.style.display = profile.demoMode ? "inline-flex" : "none";
    }
  }
}

// Global pronunciation singleton
const pronunciation = new PronunciationEvaluator();
