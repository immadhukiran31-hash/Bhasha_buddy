/**
 * BhashaBuddy Daily Engineering Quiz (quiz.js)
 * Generates 5 mixed interactive questions (bilingual MCQ, sentence fill-in,
 * listen & choose), instant visual feedback, regional explanations,
 * retry wrong answers, and streak updates.
 */

class QuizEngine {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.totalQuestions = 5;
    this.selectedOption = null;
    this.isAnswerChecked = false;
    this.wrongQuestions = [];
    this.isRetryMode = false;
  }

  init() {
    this.startNewQuiz();
  }

  startNewQuiz(retryList = null) {
    this.isRetryMode = !!retryList;
    this.score = 0;
    this.currentIndex = 0;
    this.selectedOption = null;
    this.isAnswerChecked = false;

    if (retryList && retryList.length > 0) {
      this.questions = [...retryList];
      this.totalQuestions = this.questions.length;
    } else {
      this.wrongQuestions = [];
      this.questions = this.generateQuestions(5);
      this.totalQuestions = this.questions.length;
    }

    document.getElementById("quiz-start-view").style.display = "none";
    document.getElementById("quiz-results-view").style.display = "none";
    document.getElementById("quiz-active-view").style.display = "block";

    this.renderCurrentQuestion();
  }

  generateQuestions(count = 5) {
    const locale = i18n.getLocale();
    const vocabState = storage.getVocabState();

    // Prefer words the user has seen or mastered; fallback to Unit 1
    let pool = VOCAB.filter(w => vocabState[w.id] && vocabState[w.id].seenCount > 0);
    if (pool.length < 5) {
      pool = VOCAB.filter(w => w.unit === 1 || w.unit === 2);
    }

    // Shuffle pool
    const shuffledWords = [...pool].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledWords.slice(0, count);

    const questionTypes = [
      "reg_to_en",    // Regional meaning -> English word
      "en_to_reg",    // English word -> Regional meaning
      "sentence_fill",// Contextual sentence with blank -> English word
      "listen_choose" // Audio playback -> English spelling
    ];

    const questions = [];

    selectedWords.forEach((targetWord, idx) => {
      // Pick question type
      const type = questionTypes[idx % questionTypes.length];
      const distractorWords = VOCAB.filter(w => w.id !== targetWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
      const optionsPool = [targetWord, ...distractorWords].sort(() => 0.5 - Math.random());

      let promptText = "";
      let options = [];
      let correctAnswerIndex = 0;
      let hasAudioPrompt = false;

      const targetMeaning = (targetWord.meaning && targetWord.meaning[locale]) || targetWord.meaning.en;

      if (type === "reg_to_en") {
        promptText = `${t("quiz_type_mcq_reg_to_en")}\n"${targetMeaning}"`;
        options = optionsPool.map(w => w.english);
        correctAnswerIndex = options.indexOf(targetWord.english);
      } else if (type === "en_to_reg") {
        promptText = `${t("quiz_type_mcq_en_to_reg")}\n"${targetWord.english}" (${targetWord.phonetic})`;
        options = optionsPool.map(w => (w.meaning && w.meaning[locale]) || w.meaning.en);
        correctAnswerIndex = options.indexOf(targetMeaning);
      } else if (type === "sentence_fill") {
        promptText = `${t("quiz_type_sentence")}\n"${targetWord.example.replace(new RegExp(targetWord.english, "gi"), "_______")}"`;
        options = optionsPool.map(w => w.english);
        correctAnswerIndex = options.indexOf(targetWord.english);
      } else {
        // listen_choose
        promptText = t("quiz_type_listen");
        hasAudioPrompt = true;
        options = optionsPool.map(w => w.english);
        correctAnswerIndex = options.indexOf(targetWord.english);
      }

      questions.push({
        id: idx + 1,
        type,
        targetWord,
        promptText,
        options,
        correctAnswerIndex,
        hasAudioPrompt,
        explanation: `${targetWord.english} (${targetWord.phonetic}): ${targetMeaning}`
      });
    });

    return questions;
  }

  renderCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.finishQuiz();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.selectedOption = null;
    this.isAnswerChecked = false;

    // Progress
    const progText = document.getElementById("quiz-step-indicator");
    const progBar = document.getElementById("quiz-progress-bar");
    if (progText) {
      progText.textContent = t("quiz_progress", { current: this.currentIndex + 1, total: this.totalQuestions });
    }
    if (progBar) {
      progBar.style.width = `${((this.currentIndex) / this.totalQuestions) * 100}%`;
    }

    // Audio button for listen_choose
    const audioContainer = document.getElementById("quiz-audio-prompt-container");
    if (audioContainer) {
      if (q.hasAudioPrompt) {
        audioContainer.style.display = "block";
        audioContainer.innerHTML = `
          <div class="flex items-center justify-center" style="margin: 16px 0;">
            <button class="btn btn-listen btn-lg" onclick="quiz.playAudio('${q.targetWord.english}')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
              <span>${t("btn_listen")} (Audio Prompt)</span>
            </button>
          </div>
        `;
        // Auto-play once
        setTimeout(() => this.playAudio(q.targetWord.english), 250);
      } else {
        audioContainer.style.display = "none";
        audioContainer.innerHTML = "";
      }
    }

    // Prompt
    const promptEl = document.getElementById("quiz-question-prompt");
    if (promptEl) {
      promptEl.innerHTML = `<span class="regional-text" style="font-size: 1.15rem; font-weight: 600; white-space: pre-line;">${q.promptText}</span>`;
    }

    // Options
    const optionsContainer = document.getElementById("quiz-options-container");
    if (optionsContainer) {
      let html = "";
      q.options.forEach((optText, optIdx) => {
        html += `
          <button class="quiz-option-btn" id="quiz-opt-${optIdx}" onclick="quiz.selectOption(${optIdx})">
            <span>${optText}</span>
            <span class="opt-indicator" style="font-size: 1.25rem;">○</span>
          </button>
        `;
      });
      optionsContainer.innerHTML = html;
    }

    // Feedback & controls
    const feedbackBox = document.getElementById("quiz-feedback-box");
    if (feedbackBox) feedbackBox.style.display = "none";

    const submitBtn = document.getElementById("quiz-submit-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    if (submitBtn) {
      submitBtn.style.display = "inline-flex";
      submitBtn.disabled = true;
    }
    if (nextBtn) nextBtn.style.display = "none";
  }

  selectOption(optIdx) {
    if (this.isAnswerChecked) return;

    this.selectedOption = optIdx;

    // Update UI highlights
    const q = this.questions[this.currentIndex];
    q.options.forEach((_, idx) => {
      const btn = document.getElementById(`quiz-opt-${idx}`);
      if (btn) {
        btn.classList.toggle("selected", idx === optIdx);
        const indicator = btn.querySelector(".opt-indicator");
        if (indicator) indicator.textContent = idx === optIdx ? "●" : "○";
      }
    });

    const submitBtn = document.getElementById("quiz-submit-btn");
    if (submitBtn) submitBtn.disabled = false;
  }

  checkAnswer() {
    if (this.selectedOption === null || this.isAnswerChecked) return;

    this.isAnswerChecked = true;
    const q = this.questions[this.currentIndex];
    const isCorrect = this.selectedOption === q.correctAnswerIndex;

    if (isCorrect) {
      this.score++;
    } else {
      this.wrongQuestions.push(q);
    }

    // Highlight options
    q.options.forEach((_, idx) => {
      const btn = document.getElementById(`quiz-opt-${idx}`);
      if (btn) {
        btn.disabled = true;
        if (idx === q.correctAnswerIndex) {
          btn.classList.add("correct");
          const ind = btn.querySelector(".opt-indicator");
          if (ind) ind.textContent = "✓";
        } else if (idx === this.selectedOption && !isCorrect) {
          btn.classList.add("wrong");
          const ind = btn.querySelector(".opt-indicator");
          if (ind) ind.textContent = "✗";
        }
      }
    });

    // Show feedback box
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const feedbackStatus = document.getElementById("quiz-feedback-status");
    const explanationText = document.getElementById("quiz-explanation-text");

    if (feedbackBox) feedbackBox.style.display = "block";
    if (feedbackStatus) {
      feedbackStatus.textContent = isCorrect ? t("quiz_correct") : t("quiz_incorrect");
      feedbackStatus.style.color = isCorrect ? "var(--color-success)" : "var(--color-error)";
    }
    if (explanationText) {
      explanationText.textContent = q.explanation;
    }

    // Toggle action buttons
    const submitBtn = document.getElementById("quiz-submit-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    if (submitBtn) submitBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "inline-flex";
  }

  nextQuestion() {
    this.currentIndex++;
    this.renderCurrentQuestion();
  }

  finishQuiz() {
    document.getElementById("quiz-active-view").style.display = "none";
    document.getElementById("quiz-results-view").style.display = "block";

    const pct = Math.round((this.score / this.totalQuestions) * 100);

    // Save to storage
    if (!this.isRetryMode) {
      storage.saveQuizScoreToday(this.score, this.totalQuestions);
    }

    // Update Result UI
    const scoreValEl = document.getElementById("quiz-result-score");
    const scoreMsgEl = document.getElementById("quiz-result-msg");
    const streakMsgEl = document.getElementById("quiz-streak-msg");
    const retryBtn = document.getElementById("quiz-retry-btn");

    if (scoreValEl) scoreValEl.textContent = `${this.score} / ${this.totalQuestions}`;
    if (scoreMsgEl) {
      scoreMsgEl.textContent = t("quiz_score_msg", {
        score: this.score,
        total: this.totalQuestions,
        pct: pct
      });
    }

    if (streakMsgEl) {
      streakMsgEl.textContent = !this.isRetryMode ? t("quiz_streak_boost") : "";
    }

    if (retryBtn) {
      retryBtn.style.display = this.wrongQuestions.length > 0 ? "inline-flex" : "none";
    }

    // Confetti on high score
    if (pct >= 80) {
      if (typeof triggerConfetti === "function") {
        triggerConfetti();
      }
    }

    // Update stats
    if (typeof app !== "undefined" && app.updateDashboardStats) {
      app.updateDashboardStats();
    }
  }

  retryWrongAnswers() {
    if (this.wrongQuestions.length === 0) return;
    this.startNewQuiz(this.wrongQuestions);
  }

  playAudio(text) {
    speech.speak(text, {
      rate: 0.9,
      lang: "en-IN"
    });
  }
}

// Global quiz singleton
const quiz = new QuizEngine();
