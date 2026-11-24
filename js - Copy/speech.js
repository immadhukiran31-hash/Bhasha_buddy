/**
 * BhashaBuddy Speech Services (speech.js)
 * Wraps browser Web Speech API: SpeechSynthesis (TTS) & SpeechRecognition (STT)
 * Robust async voice selection, en-IN preference, rate controls, and error mapping.
 */

class SpeechService {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.isSpeaking = false;

    // Speech Recognition setup
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    this.hasRecognition = !!SpeechRec;
    this.recognition = null;
    this.isListening = false;

    if (this.hasRecognition) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;
        this.recognition.lang = "en-IN"; // Target Indian English accent
      } catch (e) {
        console.warn("SpeechRecognition initialization failed:", e);
        this.hasRecognition = false;
      }
    }

    this.initVoices();
  }

  // ==========================================
  // TEXT-TO-SPEECH (TTS)
  // ==========================================
  initVoices() {
    if (!this.synth) return;

    const loadVoices = () => {
      this.voices = this.synth.getVoices();
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Speak English or Regional text
   * @param {string} text - text to speak
   * @param {object} options - { rate: 1.0, lang: 'en-IN', onStart, onEnd, onError }
   */
  speak(text, options = {}) {
    if (!this.synth) {
      console.warn("SpeechSynthesis not supported in this browser.");
      if (options.onEnd) options.onEnd();
      return;
    }

    // Cancel any previous utterance to avoid queuing delays
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = options.lang || "en-IN";
    utterance.lang = targetLang;
    utterance.rate = options.rate !== undefined ? options.rate : 1.0;
    utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;

    // Pick best matching voice
    const voice = this.pickBestVoice(targetLang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      console.warn("SpeechSynthesis error:", e);
      if (options.onError) options.onError(e);
      if (options.onEnd) options.onEnd();
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  pickBestVoice(langPrefix) {
    if (!this.voices || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    // 1. Exact match e.g. 'en-IN'
    let matched = this.voices.find(v => v.lang === langPrefix || v.lang.replace("_", "-") === langPrefix);
    if (matched) return matched;

    // 2. Starts with e.g. 'en-'
    const primaryCode = langPrefix.split("-")[0];
    matched = this.voices.find(v => v.lang.startsWith(primaryCode));
    if (matched) return matched;

    // 3. Fallback to default
    return this.voices.find(v => v.default) || this.voices[0] || null;
  }

  // ==========================================
  // SPEECH-TO-TEXT (STT / Speech Recognition)
  // ==========================================
  isSpeechRecognitionSupported() {
    return this.hasRecognition && !!this.recognition;
  }

  /**
   * Listen to user speech with callbacks
   * @param {object} callbacks - { onStart, onInterim, onResult, onError, onEnd }
   */
  startListening(callbacks = {}) {
    if (!this.isSpeechRecognitionSupported()) {
      if (callbacks.onError) {
        callbacks.onError("speech-unsupported", "Speech recognition is not supported in this browser.");
      }
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (callbacks.onStart) callbacks.onStart();
    };

    this.recognition.onresult = (event) => {
      let interim = "";
      const alternatives = [];

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          for (let k = 0; k < res.length; k++) {
            alternatives.push(res[k].transcript.trim());
          }
        } else {
          interim += res[0].transcript;
        }
      }

      if (interim && callbacks.onInterim) {
        callbacks.onInterim(interim);
      }

      if (alternatives.length > 0 && callbacks.onResult) {
        callbacks.onResult(alternatives);
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      const errorType = event.error || "unknown";
      if (callbacks.onError) {
        callbacks.onError(errorType, this.mapErrorToMessageKey(errorType));
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (callbacks.onEnd) callbacks.onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (err) {
      console.error("Error starting speech recognition:", err);
      if (callbacks.onError) {
        callbacks.onError("start-failed", "err_audio_capture");
      }
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn("Error stopping recognition:", e);
      }
      this.isListening = false;
    }
  }

  mapErrorToMessageKey(errorType) {
    switch (errorType) {
      case "no-speech":
        return "err_no_speech";
      case "audio-capture":
        return "err_audio_capture";
      case "not-allowed":
      case "service-not-allowed":
        return "err_not_allowed";
      case "network":
        return "err_network";
      default:
        return "err_speech_unsupported";
    }
  }
}

// Global speech singleton
const speech = new SpeechService();
