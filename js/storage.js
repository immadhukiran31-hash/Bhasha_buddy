/**
 * BhashaBuddy Storage Manager (storage.js)
 * Robust, safe localStorage abstraction with day-rollover and streak tracking
 */

const STORAGE_KEYS = {
  PROFILE: "bb_profile",
  VOCAB_STATE: "bb_vocab_state",
  PROGRESS_LOGS: "bb_progress_logs",
  PRON_SCORES: "bb_pron_scores",
  STREAK: "bb_streak",
  PEER_VOTES: "bb_peer_votes",
  USER_RECORDINGS: "bb_user_recordings"
};

class StorageManager {
  constructor() {
    this.todayStr = this.getTodayDateString();
  }

  // Safe wrapper for localStorage getItem
  getItem(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  // Safe wrapper for localStorage setItem
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to localStorage:`, e);
      return false;
    }
  }

  getTodayDateString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  getYesterdayDateString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ==========================================
  // PROFILE MANAGEMENT
  // ==========================================
  getProfile() {
    const defaultProfile = {
      name: "",
      locale: "te",
      dailyGoal: 5,
      theme: "light",
      skipLocks: false,
      demoMode: false,
      hasOnboarded: false,
      createdAt: new Date().toISOString()
    };
    return this.getItem(STORAGE_KEYS.PROFILE, defaultProfile);
  }

  saveProfile(profileData) {
    const current = this.getProfile();
    const updated = { ...current, ...profileData };
    this.setItem(STORAGE_KEYS.PROFILE, updated);
    return updated;
  }

  // ==========================================
  // VOCABULARY STATE
  // ==========================================
  getVocabState() {
    return this.getItem(STORAGE_KEYS.VOCAB_STATE, {});
  }

  getWordState(wordId) {
    const states = this.getVocabState();
    return states[wordId] || {
      status: "new", // 'new' | 'learning' | 'mastered'
      seenCount: 0,
      lastSeen: null,
      inReviewList: false
    };
  }

  setWordStatus(wordId, status, inReviewList = null) {
    const states = this.getVocabState();
    const current = states[wordId] || {
      status: "new",
      seenCount: 0,
      lastSeen: null,
      inReviewList: false
    };

    current.status = status;
    current.seenCount = (current.seenCount || 0) + 1;
    current.lastSeen = new Date().toISOString();
    if (inReviewList !== null) {
      current.inReviewList = inReviewList;
    }

    states[wordId] = current;
    this.setItem(STORAGE_KEYS.VOCAB_STATE, states);
    return current;
  }

  toggleReviewList(wordId) {
    const states = this.getVocabState();
    const current = states[wordId] || {
      status: "new",
      seenCount: 0,
      lastSeen: null,
      inReviewList: false
    };

    current.inReviewList = !current.inReviewList;
    states[wordId] = current;
    this.setItem(STORAGE_KEYS.VOCAB_STATE, states);
    return current.inReviewList;
  }

  getMasteredWordsCount() {
    const states = this.getVocabState();
    return Object.values(states).filter(s => s.status === "mastered").length;
  }

  getMasteredWordsInUnit(unitId, vocabList) {
    const states = this.getVocabState();
    const unitWordIds = vocabList.filter(w => w.unit === unitId).map(w => w.id);
    return unitWordIds.filter(id => states[id] && states[id].status === "mastered").length;
  }

  // ==========================================
  // PROGRESS LOGS & DAILY GOAL
  // ==========================================
  getProgressLogs() {
    return this.getItem(STORAGE_KEYS.PROGRESS_LOGS, []);
  }

  getTodayLog() {
    const logs = this.getProgressLogs();
    const today = this.getTodayDateString();
    let todayLog = logs.find(l => l.date === today);

    if (!todayLog) {
      todayLog = {
        date: today,
        wordsDone: [],
        quizScore: null,
        minutes: 0
      };
      logs.push(todayLog);
      this.setItem(STORAGE_KEYS.PROGRESS_LOGS, logs);
    }
    return todayLog;
  }

  markWordDoneToday(wordId) {
    const today = this.getTodayDateString();
    const logs = this.getProgressLogs();
    let todayLog = logs.find(l => l.date === today);

    if (!todayLog) {
      todayLog = { date: today, wordsDone: [], quizScore: null, minutes: 0 };
      logs.push(todayLog);
    }

    if (!todayLog.wordsDone.includes(wordId)) {
      todayLog.wordsDone.push(wordId);
      this.setItem(STORAGE_KEYS.PROGRESS_LOGS, logs);
    }

    // Trigger streak check on activity
    this.recordActivity();

    return todayLog.wordsDone.length;
  }

  getTodayWordsDoneCount() {
    const todayLog = this.getTodayLog();
    return todayLog.wordsDone ? todayLog.wordsDone.length : 0;
  }

  saveQuizScoreToday(score, total) {
    const today = this.getTodayDateString();
    const logs = this.getProgressLogs();
    let todayLog = logs.find(l => l.date === today);

    if (!todayLog) {
      todayLog = { date: today, wordsDone: [], quizScore: null, minutes: 0 };
      logs.push(todayLog);
    }

    todayLog.quizScore = { score, total, pct: Math.round((score / total) * 100) };
    this.setItem(STORAGE_KEYS.PROGRESS_LOGS, logs);

    // Record activity for streak
    this.recordActivity();
  }

  // ==========================================
  // STREAK MANAGEMENT WITH ROLLOVER
  // ==========================================
  getStreak() {
    const defaultStreak = {
      current: 0,
      longest: 0,
      lastActiveDate: null,
      history: []
    };
    return this.getItem(STORAGE_KEYS.STREAK, defaultStreak);
  }

  recordActivity() {
    const streak = this.getStreak();
    const today = this.getTodayDateString();
    const yesterday = this.getYesterdayDateString();

    if (streak.lastActiveDate === today) {
      // Already active today; ensure history has today
      if (!streak.history.includes(today)) {
        streak.history.push(today);
        this.setItem(STORAGE_KEYS.STREAK, streak);
      }
      return streak;
    }

    if (streak.lastActiveDate === yesterday) {
      // Streak continues!
      streak.current += 1;
    } else {
      // Streak reset or fresh start
      streak.current = 1;
    }

    if (streak.current > streak.longest) {
      streak.longest = streak.current;
    }

    streak.lastActiveDate = today;
    if (!streak.history.includes(today)) {
      streak.history.push(today);
    }

    this.setItem(STORAGE_KEYS.STREAK, streak);
    return streak;
  }

  checkStreakRollover() {
    const streak = this.getStreak();
    if (!streak.lastActiveDate) return streak;

    const today = this.getTodayDateString();
    const yesterday = this.getYesterdayDateString();

    // If last active was before yesterday, streak is broken
    if (streak.lastActiveDate !== today && streak.lastActiveDate !== yesterday) {
      streak.current = 0;
      this.setItem(STORAGE_KEYS.STREAK, streak);
    }
    return streak;
  }

  // ==========================================
  // PRONUNCIATION SCORES
  // ==========================================
  getPronScores() {
    return this.getItem(STORAGE_KEYS.PRON_SCORES, []);
  }

  logPronunciationScore(wordId, score, attempts = 1) {
    const scores = this.getPronScores();
    const entry = {
      wordId,
      score,
      attempts,
      date: new Date().toISOString()
    };
    scores.push(entry);
    this.setItem(STORAGE_KEYS.PRON_SCORES, scores);

    // If passed (score >= 70), mark word as done today and update vocab state
    if (score >= 70) {
      this.markWordDoneToday(wordId);
      this.setWordStatus(wordId, "mastered");
    }

    return entry;
  }

  getAveragePronScore() {
    const scores = this.getPronScores();
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / scores.length);
  }

  // ==========================================
  // PEER CHALLENGE VOTES
  // ==========================================
  getPeerVotes() {
    return this.getItem(STORAGE_KEYS.PEER_VOTES, {
      clip_1: 42,
      clip_2: 38,
      clip_3: 29,
      clip_4: 51,
      clip_5: 34
    });
  }

  upvotePeer(clipId) {
    const votes = this.getPeerVotes();
    votes[clipId] = (votes[clipId] || 0) + 1;
    this.setItem(STORAGE_KEYS.PEER_VOTES, votes);
    return votes[clipId];
  }

  // ==========================================
  // DEMO MODE PRELOAD & SYSTEM RESET
  // ==========================================
  loadDemoData() {
    // 1. Profile: Ravi, Telugu, goal 5, skipLocks true, demoMode true
    const demoProfile = {
      name: "Ravi",
      locale: "te",
      dailyGoal: 5,
      theme: "light",
      skipLocks: true,
      demoMode: true,
      hasOnboarded: true,
      createdAt: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.PROFILE, demoProfile);

    // 2. Vocab state: words 1 and 2 mastered, word 11 (Algorithm) in learning
    const demoVocabState = {
      1: { status: "mastered", seenCount: 3, lastSeen: new Date().toISOString(), inReviewList: false },
      2: { status: "mastered", seenCount: 2, lastSeen: new Date().toISOString(), inReviewList: false },
      11: { status: "learning", seenCount: 1, lastSeen: new Date().toISOString(), inReviewList: false }
    };
    this.setItem(STORAGE_KEYS.VOCAB_STATE, demoVocabState);

    // 3. Progress log: 2/5 words done today
    const today = this.getTodayDateString();
    const demoLogs = [
      {
        date: today,
        wordsDone: [1, 2],
        quizScore: { score: 4, total: 5, pct: 80 },
        minutes: 12
      }
    ];
    this.setItem(STORAGE_KEYS.PROGRESS_LOGS, demoLogs);

    // 4. Streak: 3 days active, longest 5
    const yesterday = this.getYesterdayDateString();
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0];
    const demoStreak = {
      current: 3,
      longest: 5,
      lastActiveDate: today,
      history: [twoDaysAgo, yesterday, today]
    };
    this.setItem(STORAGE_KEYS.STREAK, demoStreak);

    // 5. Pron scores: preseed with realistic scores
    const demoPronScores = [
      { wordId: 1, score: 92, attempts: 1, date: yesterday },
      { wordId: 2, score: 88, attempts: 2, date: today }
    ];
    this.setItem(STORAGE_KEYS.PRON_SCORES, demoPronScores);

    return true;
  }

  resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.VOCAB_STATE);
      localStorage.removeItem(STORAGE_KEYS.PROGRESS_LOGS);
      localStorage.removeItem(STORAGE_KEYS.PRON_SCORES);
      localStorage.removeItem(STORAGE_KEYS.STREAK);
      localStorage.removeItem(STORAGE_KEYS.PEER_VOTES);
      localStorage.removeItem(STORAGE_KEYS.USER_RECORDINGS);
      return true;
    } catch (e) {
      console.error("Error resetting data:", e);
      return false;
    }
  }
}

// Global storage singleton
const storage = new StorageManager();
