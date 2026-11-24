/**
 * BhashaBuddy Peer Pronunciation Challenge (peer.js)
 * Simulated collaborative voice challenge: record own audio clip with MediaRecorder,
 * listen to 5 simulated classmate recordings with varying synthetic TTS pitch/rates,
 * upvote classmates, and persist votes in localStorage.
 */

class PeerChallenge {
  constructor() {
    this.challengeWord = "Algorithm";
    this.challengeWordId = 11;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedAudioUrl = null;
    this.isRecording = false;

    // Simulated peer submissions
    this.classmates = [
      {
        id: "clip_4",
        name: "Anonymous Classmate #4",
        college: "Anna Univ Affiliated (Madurai, TN)",
        rate: 0.95,
        pitch: 1.1,
        initialVotes: 51
      },
      {
        id: "clip_1",
        name: "Anonymous Classmate #1",
        college: "JNTU Affiliated (Rural Telangana)",
        rate: 1.0,
        pitch: 0.9,
        initialVotes: 42
      },
      {
        id: "clip_2",
        name: "Anonymous Classmate #2",
        college: "Andhra University (Guntur, AP)",
        rate: 0.9,
        pitch: 1.05,
        initialVotes: 38
      },
      {
        id: "clip_5",
        name: "Anonymous Classmate #5",
        college: "Kakatiya University (Warangal, TS)",
        rate: 1.05,
        pitch: 1.0,
        initialVotes: 34
      },
      {
        id: "clip_3",
        name: "Anonymous Classmate #3",
        college: "AKTU Affiliated (Varanasi, UP)",
        rate: 0.85,
        pitch: 0.95,
        initialVotes: 29
      }
    ];
  }

  init() {
    this.render();
  }

  render() {
    const wordTargetEl = document.getElementById("peer-target-word-display");
    if (wordTargetEl) {
      wordTargetEl.textContent = this.challengeWord;
    }

    this.renderClassmatesList();
  }

  renderClassmatesList() {
    const container = document.getElementById("peer-classmates-container");
    if (!container) return;

    const votesMap = storage.getPeerVotes();
    const sorted = [...this.classmates].sort((a, b) => {
      const vA = votesMap[a.id] !== undefined ? votesMap[a.id] : a.initialVotes;
      const vB = votesMap[b.id] !== undefined ? votesMap[b.id] : b.initialVotes;
      return vB - vA;
    });

    let html = "";
    sorted.forEach((peer, idx) => {
      const votes = votesMap[peer.id] !== undefined ? votesMap[peer.id] : peer.initialVotes;
      html += `
        <div class="card" style="padding: 16px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="flex: 1;">
            <div class="flex items-center gap-xs" style="margin-bottom: 4px;">
              <span class="font-bold text-sm" style="color: var(--color-ink);">${peer.name}</span>
              ${idx === 0 ? '<span class="badge badge-accent text-xs">👑 #1 Top Rated</span>' : ''}
            </div>
            <div class="text-xs text-muted">${peer.college}</div>
          </div>

          <div class="flex items-center gap-sm">
            <button class="btn btn-sm btn-listen" onclick="peerChallenge.playClassmateAudio('${peer.id}', ${peer.rate}, ${peer.pitch})">
              Play 🔊
            </button>
            <button class="btn btn-sm btn-secondary" onclick="peerChallenge.vote('${peer.id}')">
              👍 <span id="vote-count-${peer.id}">${votes}</span>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  playClassmateAudio(peerId, rate, pitch) {
    speech.speak(this.challengeWord, {
      rate: rate,
      pitch: pitch,
      lang: "en-IN"
    });
  }

  vote(peerId) {
    const newCount = storage.upvotePeer(peerId);
    const countEl = document.getElementById(`vote-count-${peerId}`);
    if (countEl) {
      countEl.textContent = newCount;
    }
    if (typeof showToast === "function") {
      showToast(t("voted_label"), "success");
    }
    this.renderClassmatesList();
  }

  // Student Recording with MediaRecorder
  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (typeof showToast === "function") {
        showToast("Audio recording is not supported in this browser environment.", "error");
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        this.recordedAudioUrl = URL.createObjectURL(audioBlob);
        this.displayRecordedAudio();

        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      const recBtn = document.getElementById("peer-record-btn");
      if (recBtn) {
        recBtn.classList.add("btn-danger");
        recBtn.textContent = t("btn_stop_record");
      }

      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (this.isRecording) {
          this.stopRecording();
        }
      }, 5000);
    } catch (err) {
      console.warn("Microphone access failed for peer challenge:", err);
      if (typeof showToast === "function") {
        showToast("Microphone access was denied or not found.", "error");
      }
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;

      const recBtn = document.getElementById("peer-record-btn");
      if (recBtn) {
        recBtn.classList.remove("btn-danger");
        recBtn.textContent = t("btn_record_voice");
      }
    }
  }

  displayRecordedAudio() {
    const container = document.getElementById("peer-my-recording-box");
    if (!container || !this.recordedAudioUrl) return;

    container.style.display = "block";
    container.innerHTML = `
      <div class="card" style="padding: 16px; background-color: var(--color-primary-light); border-color: var(--color-primary);">
        <div class="flex items-center justify-between" style="margin-bottom: 8px;">
          <span class="font-bold text-sm text-primary">Your Challenge Recording: "${this.challengeWord}"</span>
          <span class="badge badge-success">Recorded ✓</span>
        </div>
        <audio controls src="${this.recordedAudioUrl}" style="width: 100%; height: 40px; margin-top: 8px;"></audio>
      </div>
    `;

    if (typeof showToast === "function") {
      showToast("Voice recorded! Your submission is ready.", "success");
    }
  }
}

// Global peer singleton
const peerChallenge = new PeerChallenge();
