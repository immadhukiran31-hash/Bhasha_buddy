/**
 * BhashaBuddy Pronunciation Scoring Engine (levenshtein.js)
 * Implements Levenshtein dynamic programming distance, Indian-English phonetic
 * normalizations (v/w, th/t/d, z/j, double consonants), and accent-tolerant grading.
 */

/**
 * Standard dynamic programming Levenshtein distance O(n * m)
 */
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a || a.length === 0) return b ? b.length : 0;
  if (!b || b.length === 0) return a ? a.length : 0;

  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Normalize raw input string (lowercase, strip non-alphanumeric, single space)
 */
function normalizeString(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lightweight Indian-English phonetic normalizer:
 * Collapses common vernacular phonetic substitutions:
 * - 'w' -> 'v' (common in Telugu/Hindi/Tamil speakers e.g. 'variable' vs 'wariable')
 * - 'th' -> 't' (e.g. 'algorithm' pronounced as 'algoritam')
 * - 'z' -> 'j' (e.g. 'zero' vs 'jero')
 * - 'ph' -> 'f' (e.g. 'phototype' vs 'prototype' or 'phase')
 * - Collapse double consecutive characters (e.g. 'll' -> 'l', 'pp' -> 'p')
 */
function phoneticApproximation(str) {
  let s = normalizeString(str);
  if (!s) return "";

  s = s.replace(/ph/g, "f");
  s = s.replace(/th/g, "t");
  s = s.replace(/w/g, "v");
  s = s.replace(/z/g, "j");
  s = s.replace(/sh/g, "s");

  // Collapse consecutive duplicated characters
  s = s.replace(/(.)\1+/g, "$1");

  return s;
}

/**
 * Compute similarity percentage between 0 and 100
 */
function similarity(a, b) {
  const normA = normalizeString(a);
  const normB = normalizeString(b);

  if (normA === normB) return 100;
  if (!normA.length || !normB.length) return 0;

  const dist = levenshtein(normA, normB);
  const maxLen = Math.max(normA.length, normB.length);
  const pct = Math.round((1 - dist / maxLen) * 100);

  return Math.max(0, Math.min(100, pct));
}

/**
 * Grade pronunciation from SpeechRecognition alternatives against target word
 * @param {string[]|string} heardAlternatives - List of transcripts returned by Web Speech
 * @param {string} targetWord - The reference technical English term
 * @returns {object} { score, passed, bestHeard, distance, feedbackKey }
 */
function gradePronunciation(heardAlternatives, targetWord) {
  const alts = Array.isArray(heardAlternatives) ? heardAlternatives : [heardAlternatives];
  const targetClean = normalizeString(targetWord);
  const targetPhonetic = phoneticApproximation(targetWord);

  let bestScore = 0;
  let minDistance = 999;
  let bestHeardText = alts[0] || "";

  for (const alt of alts) {
    if (!alt) continue;
    const heardClean = normalizeString(alt);
    const heardPhonetic = phoneticApproximation(alt);

    // 1. Direct standard distance
    const distRaw = levenshtein(heardClean, targetClean);
    const maxLenRaw = Math.max(heardClean.length, targetClean.length) || 1;
    let scoreRaw = Math.round((1 - distRaw / maxLenRaw) * 100);

    // 2. Phonetic normalized distance (Indian-English accent tolerant)
    const distPhonetic = levenshtein(heardPhonetic, targetPhonetic);
    const maxLenPhonetic = Math.max(heardPhonetic.length, targetPhonetic.length) || 1;
    let scorePhonetic = Math.round((1 - distPhonetic / maxLenPhonetic) * 100);

    // Pick best between raw and phonetic
    const effectiveDist = Math.min(distRaw, distPhonetic);
    let effectiveScore = Math.max(scoreRaw, scorePhonetic);

    // Pass rule from prompt:
    // "Treat distance <= 2 as a pass (tolerates heavy regional accents)
    // and boost the displayed score to at least 70% in that case; exact match = 100%."
    if (heardClean === targetClean || heardPhonetic === targetPhonetic) {
      effectiveScore = 100;
    } else if (effectiveDist <= 2 && effectiveScore < 70) {
      effectiveScore = 70 + (2 - effectiveDist) * 5; // e.g. dist 1 -> 75%, dist 2 -> 70%
    }

    if (effectiveScore > bestScore || (effectiveScore === bestScore && effectiveDist < minDistance)) {
      bestScore = effectiveScore;
      minDistance = effectiveDist;
      bestHeardText = alt;
    }
  }

  // Ensure bounds
  bestScore = Math.max(0, Math.min(100, bestScore));

  const passed = bestScore >= 70;
  let feedbackKey = "feedback_retry";
  if (bestScore >= 85) {
    feedbackKey = "feedback_excellent";
  } else if (bestScore >= 70) {
    feedbackKey = "feedback_good";
  }

  return {
    score: bestScore,
    passed,
    bestHeard: bestHeardText,
    distance: minDistance,
    feedbackKey
  };
}
