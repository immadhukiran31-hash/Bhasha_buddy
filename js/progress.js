/**
 * BhashaBuddy Progress & Goal Tracker (progress.js)
 * Manages animated SVG progress ring, 7-day streak calendar strip,
 * unit mastery metrics, pure SVG/Canvas weekly bar chart, badges, and settings.
 */

class ProgressTracker {
  constructor() {
    this.badgeDefinitions = [
      {
        id: "first_word",
        titleKey: "badge_first_word",
        descKey: "badge_first_word_desc",
        icon: "🌱",
        isUnlocked: () => storage.getMasteredWordsCount() >= 1
      },
      {
        id: "streak_3",
        titleKey: "badge_streak_3",
        descKey: "badge_streak_3_desc",
        icon: "🔥",
        isUnlocked: () => storage.getStreak().current >= 3 || storage.getStreak().longest >= 3
      },
      {
        id: "pron_pro",
        titleKey: "badge_pron_pro",
        descKey: "badge_pron_pro_desc",
        icon: "🎙️",
        isUnlocked: () => storage.getPronScores().some(s => s.score >= 90)
      },
      {
        id: "quiz_ace",
        titleKey: "badge_quiz_ace",
        descKey: "badge_quiz_ace_desc",
        icon: "🏆",
        isUnlocked: () => storage.getProgressLogs().some(l => l.quizScore && l.quizScore.pct === 100)
      },
      {
        id: "unit_1",
        titleKey: "badge_unit_1",
        descKey: "badge_unit_1_desc",
        icon: "🎓",
        isUnlocked: () => storage.getMasteredWordsInUnit(1, VOCAB) >= 10
      },
      {
        id: "polyglot",
        titleKey: "badge_polyglot",
        descKey: "badge_polyglot_desc",
        icon: "🚀",
        isUnlocked: () => storage.getMasteredWordsCount() >= 25
      }
    ];
  }

  render() {
    this.renderDailyGoalRing();
    this.renderGoalButtons();
    this.renderStreakCalendarStrip();
    this.renderUnitProgressBars();
    this.renderAveragePronScore();
    this.renderWeeklyActivityChart();
    this.renderBadges();
    this.syncLockToggleState();
  }

  renderDailyGoalRing() {
    const profile = storage.getProfile();
    const todayDone = storage.getTodayWordsDoneCount();
    const goal = profile.dailyGoal || 5;
    const pct = Math.min(100, Math.round((todayDone / goal) * 100));

    // Circumference for r=40 is 2 * PI * 40 = 251.327
    const circumference = 251.327;
    const offset = circumference - (pct / 100) * circumference;

    const ringCircle = document.getElementById("progress-page-ring-circle");
    const countEl = document.getElementById("progress-page-ring-count");
    const labelEl = document.getElementById("progress-page-ring-label");

    if (ringCircle) {
      ringCircle.style.strokeDasharray = `${circumference}`;
      ringCircle.style.strokeDashoffset = `${offset}`;
    }
    if (countEl) {
      countEl.textContent = `${todayDone} / ${goal}`;
    }
    if (labelEl) {
      labelEl.textContent = `${pct}% ${t("daily_goal_label")}`;
    }
  }

  renderGoalButtons() {
    const profile = storage.getProfile();
    const container = document.getElementById("goal-selection-chips");
    if (!container) return;

    const goals = [3, 5, 10, 15];
    let html = "";
    goals.forEach(g => {
      const isSelected = (profile.dailyGoal || 5) === g;
      html += `
        <button class="btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}" onclick="progressTracker.changeDailyGoal(${g})">
          ${t("goal_words_per_day", { count: g })}
        </button>
      `;
    });
    container.innerHTML = html;
  }

  changeDailyGoal(newGoal) {
    storage.saveProfile({ dailyGoal: newGoal });
    this.renderDailyGoalRing();
    this.renderGoalButtons();
    if (typeof showToast === "function") {
      showToast(t("toast_settings_saved"), "success");
    }
    if (typeof app !== "undefined" && app.updateDashboardStats) {
      app.updateDashboardStats();
    }
  }

  renderStreakCalendarStrip() {
    const container = document.getElementById("streak-calendar-strip");
    if (!container) return;

    const streak = storage.getStreak();
    const history = streak.history || [];

    // Build last 7 days ending today
    const days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      const isCompleted = history.includes(iso);
      const isToday = i === 0;

      days.push({ iso, dayName, dayNum, isCompleted, isToday });
    }

    let html = `<div class="flex items-center justify-between gap-sm" style="overflow-x: auto; padding: 4px 0;">`;
    days.forEach(day => {
      html += `
        <div class="flex flex-col items-center justify-center" style="
          flex: 1;
          min-width: 44px;
          padding: 8px 4px;
          border-radius: var(--radius-md);
          background-color: ${day.isCompleted ? 'var(--color-primary-light)' : 'var(--color-surface-muted)'};
          border: ${day.isToday ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'};
        ">
          <span class="text-xs text-muted font-semibold">${day.dayName}</span>
          <span style="font-size: 1.1rem; font-weight: 700; margin: 4px 0; color: ${day.isCompleted ? 'var(--color-primary)' : 'var(--color-ink)'};">
            ${day.dayNum}
          </span>
          <span style="font-size: 0.9rem;">
            ${day.isCompleted ? '🔥' : '○'}
          </span>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  renderUnitProgressBars() {
    const container = document.getElementById("unit-progress-list");
    if (!container) return;

    let html = "";
    UNITS.forEach(unit => {
      const mastered = storage.getMasteredWordsInUnit(unit.id, VOCAB);
      const pct = mastered * 10;
      html += `
        <div style="margin-bottom: 14px;">
          <div class="flex items-center justify-between text-sm" style="margin-bottom: 4px;">
            <span class="font-semibold">${t(unit.titleKey)}</span>
            <span class="font-mono text-muted">${mastered} / 10 (${pct}%)</span>
          </div>
          <div class="score-bar-bg" style="height: 10px;">
            <div class="score-bar-fill score-excellent" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  renderAveragePronScore() {
    const avg = storage.getAveragePronScore();
    const scoreVal = document.getElementById("progress-avg-pron-val");
    const scoreBar = document.getElementById("progress-avg-pron-bar");

    if (scoreVal) scoreVal.textContent = `${avg}%`;
    if (scoreBar) {
      scoreBar.style.width = `${avg}%`;
      scoreBar.className = "score-bar-fill " + (avg >= 85 ? "score-excellent" : (avg >= 70 ? "score-good" : "score-retry"));
    }
  }

  // Pure SVG/Canvas Weekly Activity Chart (No chart libraries!)
  renderWeeklyActivityChart() {
    const container = document.getElementById("weekly-activity-chart-box");
    if (!container) return;

    const logs = storage.getProgressLogs();
    const last7Days = [];
    const now = new Date();

    let maxWords = 5;

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "narrow" });
      const foundLog = logs.find(l => l.date === iso);
      const wordsCount = foundLog && foundLog.wordsDone ? foundLog.wordsDone.length : 0;
      if (wordsCount > maxWords) maxWords = wordsCount;

      last7Days.push({ iso, dayLabel, wordsCount });
    }

    // Draw using pure SVG
    const svgWidth = 320;
    const svgHeight = 160;
    const chartHeight = 110;
    const barWidth = 24;
    const spacing = (svgWidth - 40) / 7;

    let barsSvg = "";
    last7Days.forEach((day, index) => {
      const x = 20 + index * spacing + (spacing - barWidth) / 2;
      const barH = maxWords > 0 ? Math.round((day.wordsCount / maxWords) * chartHeight) : 0;
      const y = chartHeight - barH + 20;

      barsSvg += `
        <!-- Bar -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="6" fill="${day.wordsCount > 0 ? 'var(--color-primary)' : 'var(--color-border)'}" opacity="${day.wordsCount > 0 ? '1' : '0.5'}" />
        <!-- Count label on top of bar -->
        ${day.wordsCount > 0 ? `<text x="${x + barWidth / 2}" y="${y - 4}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--color-ink)">${day.wordsCount}</text>` : ''}
        <!-- Day narrow label -->
        <text x="${x + barWidth / 2}" y="${chartHeight + 36}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--color-text-muted)">${day.dayLabel}</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; max-width: 440px; height: auto; display: block; margin: 0 auto;">
        <!-- Base line -->
        <line x1="10" y1="${chartHeight + 20}" x2="${svgWidth - 10}" y2="${chartHeight + 20}" stroke="var(--color-border)" stroke-width="2" />
        ${barsSvg}
      </svg>
    `;
  }

  renderBadges() {
    const container = document.getElementById("badges-grid");
    if (!container) return;

    let html = "";
    this.badgeDefinitions.forEach(badge => {
      const unlocked = badge.isUnlocked();
      html += `
        <div class="card" style="padding: 14px; text-align: center; opacity: ${unlocked ? '1' : '0.45'}; border: 1px solid ${unlocked ? 'var(--color-accent)' : 'var(--color-border)'};">
          <div style="font-size: 2.2rem; margin-bottom: 6px;">${badge.icon}</div>
          <div class="font-bold text-sm" style="margin-bottom: 4px; color: var(--color-ink);">${t(badge.titleKey)}</div>
          <div class="text-xs text-muted" style="min-height: 32px;">${t(badge.descKey)}</div>
          <div style="margin-top: 8px;">
            <span class="badge ${unlocked ? 'badge-success' : 'badge-secondary'}" style="font-size: 0.72rem;">
              ${unlocked ? '✓ Unlocked' : '🔒 Locked'}
            </span>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  toggleSkipLocks() {
    const profile = storage.getProfile();
    const updated = storage.saveProfile({ skipLocks: !profile.skipLocks });
    this.syncLockToggleState();
    if (typeof showToast === "function") {
      showToast(updated.skipLocks ? t("locks_disabled") : t("locks_active"), "accent");
    }
  }

  syncLockToggleState() {
    const profile = storage.getProfile();
    const btn = document.getElementById("skip-locks-toggle-btn");
    if (btn) {
      btn.textContent = profile.skipLocks ? t("locks_disabled") : t("locks_active");
      btn.className = `btn btn-sm ${profile.skipLocks ? 'btn-accent' : 'btn-secondary'}`;
    }
  }

  confirmResetProgress() {
    const modal = document.getElementById("reset-confirm-modal");
    if (modal) modal.classList.add("open");
  }

  closeResetModal() {
    const modal = document.getElementById("reset-confirm-modal");
    if (modal) modal.classList.remove("open");
  }

  executeReset() {
    storage.resetAllData();
    this.closeResetModal();
    if (typeof showToast === "function") {
      showToast("All progress has been reset.", "error");
    }
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
}

// Global progress singleton
const progressTracker = new ProgressTracker();
