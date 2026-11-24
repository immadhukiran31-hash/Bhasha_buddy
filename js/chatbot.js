/**
 * BhashaBuddy Contextual AI Tutor (chatbot.js)
 * Simulated bilingual conversational assistant with intent matching in
 * English, Telugu, Hindi & Tamil, TTS audio per message, typing indicator, and quick chips.
 */

class ChatbotBuddy {
  constructor() {
    this.messages = [];
    this.isTyping = false;

    // Knowledge Base with Intent Matching
    this.intents = [
      {
        patterns: ["algorithm", "అల్గారిథం", "एल्गोरिदम", "அல்காரிதம்", "steps to solve", "step by step"],
        reply: {
          en: "An algorithm is a finite, step-by-step sequence of instructions designed to solve a specific problem or perform a computation.",
          te: "అల్గారిథం అనేది ఒక నిర్దిష్ట సమస్యను పరిష్కరించడానికి లేదా పనిని పూర్తి చేయడానికి రాసే దశలవారీ సూచనల క్రమం.",
          hi: "एल्गोरिदम किसी विशेष समस्या को हल करने या गणना करने के लिए चरण-दर-चरण निर्देशों का एक क्रम है।",
          ta: "நெறிமுறை (அல்காரிதம்) என்பது ஒரு குறிப்பிட்ட சிக்கலைத் தீர்ப்பதற்கான படிப்படியான வழிமுறைகளின் தொகுப்பாகும்."
        }
      },
      {
        patterns: ["interview", "introduce", "self introduction", "పరిచయం", "ఇంటర్వ్యూ", "परिचय", "इंटरव्यू", "நேர்காணல்", "அறிமுகம்"],
        reply: {
          en: "In an interview, start with: 'Good morning/afternoon, sir/madam. My name is [Name], and I am pursuing my B.Tech in [Branch] from [College]. My core technical interests are [Skills], and I have developed a project called [Project Name].'",
          te: "ఇంటర్వ్యూలో ఇలా చెప్పండి: 'శుభోదయం సర్/మేడమ్. నా పేరు [పేరు]. నేను [కాలేజ్] నుండి [బ్రాంచ్] లో ఇంజనీరింగ్ చదువుతున్నాను. నాకు [నైపుణ్యాలు] లో ప్రావీణ్యం ఉంది మరియు నేను [ప్రాజెక్ట్ పేరు] పై పనిచేశాను.'",
          hi: "साक्षात्कार में इस तरह शुरुआत करें: 'शुभ प्रभात सर/मैडम। मेरा नाम [नाम] है और मैं [कॉलेज] से [शाखा] में बी.टेक कर रहा हूँ। मेरी मुख्य तकनीकी रुचि [कौशल] में है और मैंने [प्रोजेक्ट] बनाया है।'",
          ta: "நேர்காணலில் இவ்வாறு தொடங்கவும்: 'வணக்கம் ஐயா/அம்மா. என் பெயர் [பெயர்]. நான் [கல்லூரி]யில் [துறை] படிக்கிறேன். எனது முக்கிய தொழில்நுட்ப திறன்கள் [திறன்] மற்றும் நான் [திட்டம்] செய்துள்ளேன்.'"
        }
      },
      {
        patterns: ["compiler", "interpreter", "కంపైలర్", "कंपाइलर", "தொகுப்பி", "translate code"],
        reply: {
          en: "A compiler translates the entire source code into machine code all at once before execution (like C/C++), whereas an interpreter translates line-by-line (like Python).",
          te: "కంపైలర్ మొత్తం సోర్స్ కోడ్‌ను ఒకేసారి మెషిన్ కోడ్‌గా మారుస్తుంది (C/C++ వలె). ఇంటర్‌ప్రిటర్ లైన్-బై-లైన్ అనువదిస్తుంది (పైథాన్ వలె).",
          hi: "कंपाइलर पूरे सोर्स कोड को एक साथ मशीन कोड में अनुवादित करता है (जैसे C/C++), जबकि इंटरप्रेटर लाइन-दर-लाइन निष्पादित करता है (जैसे Python)।",
          ta: "தொகுப்பி (Compiler) முழு மூலக் குறியீட்டையும் ஒரே நேரத்தில் இயந்திரக் குறியீடாக மாற்றுகிறது, ஆனால் வரிமொழிபெயர்ப்பி வரியாக இயக்குகிறது."
        }
      },
      {
        patterns: ["variable", "వేరియబుల్", "वेरिएबल", "மாறி", "storage box", "declare variable"],
        reply: {
          en: "A variable is a named memory location that stores a value which can be changed during program execution (e.g., int count = 10;).",
          te: "వేరియబుల్ అనేది కంప్యూటర్ మెమరీలో విలువను నిల్వ చేసే ఒక పేరుగల ప్రాంతం. దీని విలువ ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు మారవచ్చు.",
          hi: "वेरिएबल मेमोरी का एक नामित स्थान है जो एक मान संग्रहीत करता है जिसे प्रोग्राम निष्पादन के दौरान बदला जा सकता है।",
          ta: "மாறி (Variable) என்பது நிரல் இயங்கும் போது மதிப்பை சேமித்து மாற்றக்கூடிய ஒரு நினைவகப் பகுதியாகும்."
        }
      },
      {
        patterns: ["database", "డేటాబేస్", "डेटाबेस", "தரவுத்தளம்", "sql", "store data"],
        reply: {
          en: "A database is an organized collection of structured data, typically stored and accessed electronically from a computer system (e.g., PostgreSQL, MySQL).",
          te: "డేటాబేస్ అనేది డేటాను సురక్షితంగా మరియు క్రమపద్ధతిలో భద్రపరిచే ఎలక్ట్రానిక్ నిల్వ వ్యవస్థ. దీని ద్వారా సమాచారాన్ని వేగంగా శోధించవచ్చు.",
          hi: "डेटाबेस संरचित डेटा का एक व्यवस्थित संग्रह है जिसे कंप्यूटर सिस्टम से इलेक्ट्रॉनिक रूप से संग्रहीत और एक्सेस किया जाता है।",
          ta: "தரவுத்தளம் என்பது தகவல்களை பாதுகாப்பாகவும் ஒழுங்கமைக்கப்பட்ட முறையிலும் சேமித்து அணுகும் ஒரு மின்னணு அமைப்பாகும்."
        }
      },
      {
        patterns: ["tips", "fluent", "improve english", "ఆంగ్లం", "మాట్లాడటం", "अंग्रेजी कैसे", "ஆங்கிலம் பேச"],
        reply: {
          en: "3 golden rules for rural engineering students: 1. Read aloud technical terms daily. 2. Practice with BhashaBuddy's voice tool. 3. Form a peer study group and speak in English for 15 minutes everyday.",
          te: "ఇంజనీరింగ్ విద్యార్థులకు 3 బంగారు సూత్రాలు: 1. సాంకేతిక పదాలను ప్రతిరోజూ గట్టిగా చదవండి. 2. భాషాబడ్డీ వాయిస్ టూల్ తో ప్రాక్టీస్ చేయండి. 3. స్నేహితులతో రోజుకు 15 నిమిషాలు ఇంగ్లీషులో మాత్రమే మాట్లాడండి.",
          hi: "इंजीनियरिंग छात्रों के लिए 3 सुनहरे नियम: 1. तकनीकी शब्दों को जोर से पढ़ें। 2. भाषाबडी वॉयस टूल से अभ्यास करें। 3. दोस्तों के साथ प्रतिदिन 15 मिनट अंग्रेजी में बात करें।",
          ta: "பொறியியல் மாணவர்களுக்கான 3 முக்கிய குறிப்புகள்: 1. தொழில்நுட்ப சொற்களை உரக்கப் படியுங்கள். 2. பாஷாபடி குரல் கருவியில் பயிற்சி செய்யுங்கள். 3. நண்பர்களுடன் தினமும் 15 நிமிடங்கள் ஆங்கிலத்தில் உரையாடுங்கள்."
        }
      }
    ];
  }

  init() {
    this.renderWelcome();
  }

  renderWelcome() {
    const chatContainer = document.getElementById("chat-messages-container");
    if (!chatContainer) return;

    chatContainer.innerHTML = "";
    this.appendBotMessage(t("chat_welcome"));
  }

  appendUserMessage(text) {
    const chatContainer = document.getElementById("chat-messages-container");
    if (!chatContainer) return;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble-user";
    bubble.textContent = text;
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  appendBotMessage(text, audioText = null) {
    const chatContainer = document.getElementById("chat-messages-container");
    if (!chatContainer) return;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble-bot";

    const speechText = audioText || text;
    bubble.innerHTML = `
      <div class="regional-text" style="margin-bottom: 6px; white-space: pre-line;">${text}</div>
      <div class="flex items-center justify-between" style="border-top: 1px solid var(--color-border); padding-top: 6px; margin-top: 6px;">
        <span class="text-xs text-muted">BhashaBuddy AI</span>
        <button class="btn btn-sm btn-listen" style="padding: 2px 8px; font-size: 0.75rem;" onclick="chatbot.speakReply(this, '${this.escapeText(speechText)}')">
          Listen 🔊
        </button>
      </div>
    `;

    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  escapeText(str) {
    if (!str) return "";
    return str.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, " ");
  }

  showTypingIndicator() {
    const chatContainer = document.getElementById("chat-messages-container");
    if (!chatContainer) return;

    const ind = document.createElement("div");
    ind.id = "chat-typing-indicator-node";
    ind.className = "chat-bubble chat-bubble-bot";
    ind.innerHTML = `
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatContainer.appendChild(ind);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const node = document.getElementById("chat-typing-indicator-node");
    if (node) node.remove();
  }

  sendMessage(customText = null) {
    const inputEl = document.getElementById("chat-input-text");
    const text = customText || (inputEl ? inputEl.value.trim() : "");
    if (!text) return;

    if (inputEl) inputEl.value = "";

    this.appendUserMessage(text);
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      this.processQuery(text);
    }, 600);
  }

  processQuery(rawText) {
    const query = rawText.toLowerCase();
    const locale = i18n.getLocale();

    let matchedIntent = null;

    for (const intent of this.intents) {
      if (intent.patterns.some(p => query.includes(p.toLowerCase()))) {
        matchedIntent = intent;
        break;
      }
    }

    if (matchedIntent) {
      const regText = matchedIntent.reply[locale] || matchedIntent.reply.en;
      const enText = matchedIntent.reply.en;
      const combined = `${regText}\n\n📘 English: "${enText}"`;
      this.appendBotMessage(combined, enText);
    } else {
      this.appendBotMessage(t("chat_fallback"));
    }
  }

  sendQuickChip(chipType) {
    let query = "";
    if (chipType === "algo") query = t("chip_algo");
    else if (chipType === "interview") query = t("chip_interview");
    else if (chipType === "compiler") query = t("chip_compiler");
    else if (chipType === "tips") query = t("chip_tips");

    this.sendMessage(query);
  }

  speakReply(buttonEl, text) {
    if (buttonEl) buttonEl.classList.add("speaking");
    speech.speak(text, {
      rate: 0.9,
      lang: "en-IN",
      onEnd: () => {
        if (buttonEl) buttonEl.classList.remove("speaking");
      },
      onError: () => {
        if (buttonEl) buttonEl.classList.remove("speaking");
      }
    });
  }
}

// Global chatbot singleton
const chatbot = new ChatbotBuddy();
