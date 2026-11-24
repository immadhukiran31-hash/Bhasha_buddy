/**
 * BhashaBuddy Internationalization (i18n.js)
 * Full translation support for English (en), Telugu (te), Hindi (hi), Tamil (ta)
 */

const TRANSLATIONS = {
  en: {
    // Brand & General
    app_title: "BhashaBuddy",
    app_tagline: "Technical English in Your Mother Tongue",
    streak_count: "{count} days",
    demo_badge: "DEMO MODE",
    offline_badge: "Offline Ready",

    // Nav
    nav_home: "Home",
    nav_learn: "Learn",
    nav_practice: "Practice",
    nav_quiz: "Quiz",
    nav_progress: "Progress",
    nav_chat: "AI Buddy",
    nav_dictionary: "Dictionary",
    nav_peer: "Peer Voice",
    nav_more: "More",

    // Greetings & Dashboard
    greeting: "Hello, {name}!",
    daily_goal_label: "Daily Goal",
    streak_label: "Current Streak",
    mastered_label: "Mastered Words",
    word_of_day_badge: "Word of the Day",
    btn_listen: "Listen",
    btn_speak: "Practice",
    cta_continue_learning: "Continue Learning",
    cta_take_quiz: "Take Daily Quiz",
    cta_practice_pron: "Practice Pronunciation",
    micro_lesson_title: "2-Minute Micro Lesson",
    micro_lesson_desc: "Quickly review 5 core concepts from your current active unit.",
    btn_start_lesson: "Start 2-Min Lesson",

    // Units
    unit_1_title: "Unit 1: Classroom & Basics",
    unit_1_desc: "Essential academic words, labs, assignments, and exam vocabulary.",
    unit_2_title: "Unit 2: Programming Fundamentals",
    unit_2_desc: "Core coding concepts: algorithms, variables, loops, arrays & compilers.",
    unit_3_title: "Unit 3: Systems & Networks",
    unit_3_desc: "Hardware, processors, servers, protocols, operating systems & bandwidth.",
    unit_4_title: "Unit 4: Engineering Core",
    unit_4_desc: "Circuits, signals, efficiency, analysis, mathematics & structural concepts.",
    unit_5_title: "Unit 5: Placement & Professional",
    unit_5_desc: "Interview preparation, resumes, teamwork, deadlines & leadership.",
    unit_locked_msg: "Complete 70% of previous unit to unlock",
    btn_start_unit: "Open Unit",
    unit_progress: "{count} / 10 Mastered",

    // Flashcards
    card_tap_hint: "Tap card or press Space to flip",
    card_front_label: "Term & Pronunciation",
    card_back_label: "Meaning & Engineering Example",
    btn_prev: "Previous",
    btn_next: "Next",
    btn_know_this: "I Know This ✓",
    btn_review_later: "Review Later ⚑",
    btn_jump_practice: "Practice Pronunciation 🎙️",
    speed_normal: "1.0x",
    speed_slow: "0.8x",
    speed_turtle: "0.6x",
    example_title: "Engineering Example",
    unit_deck_back: "← Back to Units",

    // Practice (Speech Recognition)
    practice_title: "Voice Pronunciation Evaluator",
    practice_subtitle: "Listen closely to native technical cadence, then speak into your mic.",
    practice_select_word: "Choose target word:",
    target_phonetic: "Phonetic Guide",
    target_meaning: "Meaning in your language",
    mic_idle: "Press the microphone and speak clearly",
    mic_listening: "Listening... speak now!",
    mic_processing: "Analyzing pronunciation acoustic match...",
    result_match: "Pronunciation Match",
    what_heard: "What I heard:",
    attempts_remaining: "Attempts: {count} of 3",
    btn_hear_again: "Hear it again at 0.8x 🔊",
    btn_try_again: "Try Again 🎙️",
    feedback_excellent: "Excellent! Crystal clear engineering pronunciation! 🎉",
    feedback_good: "Good effort! Very close to standard cadence. Try once more!",
    feedback_retry: "Keep going! Listen to the syllables and try again slowly.",
    fallback_title: "Microphone Not Available or Denied",
    fallback_desc: "No problem! You can type what you heard or phonetic spelling below to test your accuracy:",
    fallback_placeholder: "Type the word here...",
    btn_check_text: "Evaluate Spelling",
    btn_simulate_demo: "⚡ Simulate 95% Match (Demo Safety Net)",

    // Errors
    err_no_speech: "No voice detected. Please speak closer to your microphone.",
    err_audio_capture: "Microphone hardware was not detected on this device.",
    err_not_allowed: "Microphone permission is blocked. Please allow mic in browser settings.",
    err_network: "Network connection required for online speech recognition.",
    err_speech_unsupported: "Speech recognition is not supported in this browser. Please use Chrome/Edge or text mode.",

    // Quiz
    quiz_title: "Daily Engineering Quiz",
    quiz_progress: "Question {current} of {total}",
    quiz_type_mcq_reg_to_en: "Select the correct English technical word:",
    quiz_type_mcq_en_to_reg: "Select the correct regional meaning:",
    quiz_type_sentence: "Fill in the blank with the appropriate engineering term:",
    quiz_type_listen: "Listen to the word and choose the accurate spelling:",
    btn_submit_answer: "Check Answer",
    btn_next_question: "Next Question →",
    quiz_correct: "Correct! Well done.",
    quiz_incorrect: "Not quite right. The correct answer is highlighted.",
    quiz_explanation_label: "Explanation:",
    quiz_complete_title: "Quiz Completed!",
    quiz_score_msg: "You scored {score} out of {total} ({pct}%)",
    quiz_streak_boost: "+1 Day added to your learning streak! 🔥",
    btn_retry_wrong: "Review & Retry Mistakes",
    btn_quiz_again: "Take Another Practice Quiz",

    // Progress Tracker
    progress_title: "Learning Journey & Stats",
    streak_calendar_title: "7-Day Activity Strip",
    chart_title: "Weekly Activity Overview",
    chart_sub: "Words practiced & quizzes taken over the last 7 days",
    badges_title: "Earned Badges & Milestones",
    setting_goal_title: "Adjust Daily Goal",
    goal_words_per_day: "{count} words / day",
    btn_reset_data: "Reset All Progress",
    btn_toggle_locks: "Skip Unit Locks (Demo Mode)",
    locks_active: "Locks Active (Normal)",
    locks_disabled: "Locks Bypassed (Demo)",

    // Badges
    badge_first_word: "First Step",
    badge_first_word_desc: "Mastered your very first engineering term",
    badge_streak_3: "Consistency Champion",
    badge_streak_3_desc: "Maintained a 3-day active learning streak",
    badge_pron_pro: "Pronunciation Pro",
    badge_pron_pro_desc: "Achieved ≥90% speech match on a technical term",
    badge_quiz_ace: "Quiz Ace",
    badge_quiz_ace_desc: "Scored 100% on a daily engineering quiz",
    badge_unit_1: "Freshman Engineer",
    badge_unit_1_desc: "Completed 100% of Unit 1 vocabulary",
    badge_polyglot: "Bilingual Tech Lead",
    badge_polyglot_desc: "Mastered 25 or more technical terms",

    // Chatbot
    chat_title: "BhashaBuddy AI Assistant",
    chat_subtitle: "Ask technical concepts or interview questions in your language!",
    chat_welcome: "Hello! I am your engineering language tutor. Ask me about algorithms, coding terms, or interview questions in Telugu, Hindi, Tamil or English!",
    chat_placeholder: "Ask a question (e.g., 'What is an algorithm?', 'ఇంటర్వ్యూ చిట్కాలు')...",
    chat_btn_send: "Send",
    chat_fallback: "I couldn't find a direct match, but here are some popular topics you can ask me: 'What is algorithm?', 'Explain Compiler', 'How to introduce myself in an interview?', or 'What is a variable?'.",
    chip_algo: "What is an algorithm?",
    chip_interview: "How to introduce myself in interview?",
    chip_compiler: "Explain Compiler vs Interpreter",
    chip_tips: "Tips to speak English fluently",

    // Dictionary
    dict_title: "Visual Pictorial Dictionary",
    dict_subtitle: "Explore all 50 engineering terms with schematic diagrams and audio.",
    dict_search_placeholder: "Search in English, Telugu, Hindi, Tamil...",
    dict_filter_all: "All Units (50)",
    dict_filter_unit: "Unit {unit}",
    dict_modal_title: "Term Inspection",

    // Peer Voice Challenge
    peer_title: "Peer Pronunciation Challenge",
    peer_subtitle: "Listen to peer recordings from fellow engineering colleges and vote!",
    peer_word_of_day: "Today's Peer Challenge Word:",
    peer_your_voice: "Your Pronunciation Submission",
    btn_record_voice: "Record Your Voice (5s)",
    btn_stop_record: "Stop Recording",
    btn_recording_active: "Recording...",
    peer_playback_label: "Your Recording:",
    peer_classmates_title: "Classmate Submissions from Engineering Colleges",
    btn_upvote: "Upvote 👍",
    voted_label: "Upvoted ✓",

    // Onboarding Modal
    onboarding_title: "Welcome to BhashaBuddy!",
    onboarding_subtitle: "Bridge the gap between your mother tongue and engineering English.",
    label_your_name: "What is your name?",
    placeholder_name: "e.g., Ravi Kumar",
    label_choose_lang: "Preferred Regional Language:",
    label_daily_goal: "Select Your Daily Goal:",
    goal_easy: "3 Words (Easy - 5 mins)",
    goal_medium: "5 Words (Recommended - 10 mins)",
    goal_hard: "10 Words (Intensive - 20 mins)",
    btn_get_started: "Start My Learning Journey 🚀",
    btn_quick_demo: "⚡ Quick Demo Mode (Preloaded for Judges)",

    // Reset Modal
    modal_reset_title: "Reset All Progress?",
    modal_reset_body: "This will wipe all your mastered words, streaks, and quiz logs. Are you sure you want to start fresh?",
    btn_confirm_reset: "Yes, Reset Everything",
    btn_cancel: "Cancel",

    // Toasts
    toast_goal_complete: "🎉 Daily Goal Achieved! Great job, engineer!",
    toast_word_mastered: "✓ Marked '{word}' as mastered!",
    toast_review_added: "⚑ Added '{word}' to your review list.",
    toast_settings_saved: "Settings updated successfully.",
    toast_demo_enabled: "Demo Mode Enabled! Preloaded Ravi with 2/5 words and unlocked units.",
    toast_demo_disabled: "Demo Mode toggled."
  },

  te: {
    // Telugu
    app_title: "భాషాబడ్డీ",
    app_tagline: "మీ మాతృభాషలోనే సాంకేతిక ఆంగ్లం",
    streak_count: "{count} రోజులు",
    demo_badge: "డెమో మోడ్",
    offline_badge: "ఆఫ్‌లైన్ సిద్ధం",

    nav_home: "హోమ్",
    nav_learn: "నేర్చుకోండి",
    nav_practice: "ఉచ్చారణ",
    nav_quiz: "క్విజ్",
    nav_progress: "పురోగతి",
    nav_chat: "AI బడ్డీ",
    nav_dictionary: "డిక్షనరీ",
    nav_peer: "పీర్ వాయిస్",
    nav_more: "మరిన్ని",

    greeting: "నమస్కారం, {name}!",
    daily_goal_label: "నేటి లక్ష్యం",
    streak_label: "నిరంతర సాధన",
    mastered_label: "నేర్చిన పదాలు",
    word_of_day_badge: "నేటి ప్రత్యేక పదం",
    btn_listen: "వినండి",
    btn_speak: "ప్రాక్టీస్",
    cta_continue_learning: "నేర్చుకోవడం కొనసాగించండి",
    cta_take_quiz: "నేటి క్విజ్ రాయండి",
    cta_practice_pron: "ఉచ్చారణ సాధన చేయండి",
    micro_lesson_title: "2-నిమిషాల మైక్రో పాఠం",
    micro_lesson_desc: "మీ ప్రస్తుత యూనిట్ నుండి 5 ప్రాథమిక భావనలను త్వరగా పునశ్చరణ చేయండి.",
    btn_start_lesson: "2-నిమిషాల పాఠం ప్రారంభించండి",

    unit_1_title: "యూనిట్ 1: తరగతి & ప్రాథమిక అంశాలు",
    unit_1_desc: "అకడమిక్ పదాలు, ల్యాబ్‌లు, అసైన్‌మెంట్లు మరియు పరీక్షల పదజాలం.",
    unit_2_title: "యూనిట్ 2: ప్రోగ్రామింగ్ ప్రాథమిక అంశాలు",
    unit_2_desc: "కోడింగ్ భావనలు: అల్గారిథమ్స్, వేరియబుల్స్, లూప్స్, అర్రేస్ & కంపైలర్లు.",
    unit_3_title: "యూనిట్ 3: కంప్యూటర్ వ్యవస్థలు & నెట్‌వర్క్స్",
    unit_3_desc: "హార్డ్‌వేర్, ప్రాసెసర్లు, సర్వర్లు, ప్రోటోకాల్స్, ఆపరేటింగ్ సిస్టమ్స్.",
    unit_4_title: "యూనిట్ 4: ఇంజనీరింగ్ కోర్ & మ్యాథమెటిక్స్",
    unit_4_desc: "సర్క్యూట్లు, సిగ్నల్స్, సామర్థ్యం, విశ్లేషణ మరియు ఇంజనీరింగ్ సిద్ధాంతాలు.",
    unit_5_title: "యూనిట్ 5: ప్లేస్‌మెంట్స్ & ప్రొఫెషనల్ ఇంగ్లీష్",
    unit_5_desc: "ఇంటర్వ్యూ తయారీ, రెజ్యూమ్, టీమ్‌వర్క్, డెడ్‌లైన్స్ & నాయకత్వ నైపుణ్యాలు.",
    unit_locked_msg: "తదుపరి యూనిట్ అన్‌లాక్ కావడానికి మునుపటి యూనిట్ 70% పూర్తి చేయండి",
    btn_start_unit: "యూనిట్ తెరవండి",
    unit_progress: "{count} / 10 నేర్చుకున్నారు",

    card_tap_hint: "కార్డును తిప్పడానికి ట్యాప్ చేయండి లేదా స్పేస్ నొక్కండి",
    card_front_label: "ఆంగ్ల పదం & ఉచ్చారణ",
    card_back_label: "తెలుగు అర్థం & ఇంజనీరింగ్ ఉదాహరణ",
    btn_prev: "మునుపటిది",
    btn_next: "తదుపరిది",
    btn_know_this: "నాకు తెలుసు ✓",
    btn_review_later: "తర్వాత సమీక్షించండి ⚑",
    btn_jump_practice: "ఉచ్చారణ సాధన 🎙️",
    speed_normal: "1.0x",
    speed_slow: "0.8x",
    speed_turtle: "0.6x",
    example_title: "ఇంజనీరింగ్ ఉదాహరణ",
    unit_deck_back: "← యూనిట్లకు తిరిగి వెళ్ళండి",

    practice_title: "వాయిస్ ఉచ్చారణ మూల్యాంకనం",
    practice_subtitle: "స్పష్టమైన సాంకేతిక ఉచ్చారణను విని, మైక్రోఫోన్‌లో మాట్లాడండి.",
    practice_select_word: "లక్ష్య పదాన్ని ఎంచుకోండి:",
    target_phonetic: "ధ్వని సూచిక (Phonetic)",
    target_meaning: "తెలుగు అర్థం",
    mic_idle: "మైక్రోఫోన్ నొక్కి స్పష్టంగా మాట్లాడండి",
    mic_listening: "వింటున్నాను... ఇప్పుడు మాట్లాడండి!",
    mic_processing: "ఉచ్చారణ నాణ్యతను విశ్లేషిస్తున్నాము...",
    result_match: "ఉచ్చారణ సరిపోలిక",
    what_heard: "వినిపించినది:",
    attempts_remaining: "ప్రయత్నాలు: 3 లో {count}",
    btn_hear_again: "0.8x వేగంతో మళ్ళీ వినండి 🔊",
    btn_try_again: "మళ్ళీ ప్రయత్నించండి 🎙️",
    feedback_excellent: "అద్భుతం! స్పష్టమైన ఇంజనీరింగ్ ఉచ్చారణ! 🎉",
    feedback_good: "చాలా బాగుంది! దాదాపు సరైన ఉచ్చారణ వచ్చింది. ఇంకోసారి ప్రయత్నించండి!",
    feedback_retry: "పర్వాలేదు! పదాల అక్షర శబ్దాలను విని నిదానంగా చెప్పండి.",
    fallback_title: "మైక్రోఫోన్ అందుబాటులో లేదు",
    fallback_desc: "చింతించకండి! మీరు విన్న పదాన్ని లేదా స్పెల్లింగ్‌ను క్రింద టైప్ చేసి సరిచూసుకోవచ్చు:",
    fallback_placeholder: "పదాన్ని ఇక్కడ టైప్ చేయండి...",
    btn_check_text: "స్పెల్లింగ్ సరిచూడండి",
    btn_simulate_demo: "⚡ 95% మ్యాచ్‌ను సిమ్యులేట్ చేయండి (డెమో సేఫ్టీ)",

    err_no_speech: "ఎలాంటి స్వరం వినిపించలేదు. మైక్రోఫోన్ దగ్గరగా మాట్లాడండి.",
    err_audio_capture: "మైక్రోఫోన్ హార్డ్‌వేర్ గుర్తించబడలేదు.",
    err_not_allowed: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.",
    err_network: "వాయిస్ గుర్తింపు కోసం ఇంటర్నెట్ కనెక్షన్ అవసరం.",
    err_speech_unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి Chrome/Edge లేదా టైపింగ్ మోడ్ వాడండి.",

    quiz_title: "రోజువారీ ఇంజనీరింగ్ క్విజ్",
    quiz_progress: "ప్రశ్న {total} లో {current}",
    quiz_type_mcq_reg_to_en: "సరైన ఆంగ్ల సాంకేతిక పదాన్ని ఎంచుకోండి:",
    quiz_type_mcq_en_to_reg: "సరైన తెలుగు అర్థాన్ని ఎంచుకోండి:",
    quiz_type_sentence: "ఖాళీలో సరిపోయే సాంకేతిక పదాన్ని ఎంచుకోండి:",
    quiz_type_listen: "పదాన్ని శ్రద్ధగా విని సరైన స్పెల్లింగ్‌ను ఎంచుకోండి:",
    btn_submit_answer: "సమాధానం సరిచూడండి",
    btn_next_question: "తదుపరి ప్రశ్న →",
    quiz_correct: "సరైన సమాధానం! చాలా బాగుంది.",
    quiz_incorrect: "తప్పు సమాధానం. సరైన సమాధానం హైలైట్ చేయబడింది.",
    quiz_explanation_label: "వివరణ:",
    quiz_complete_title: "క్విజ్ పూర్తయింది!",
    quiz_score_msg: "మీరు {total} కి {score} సాధించారు ({pct}%)",
    quiz_streak_boost: "+1 రోజు మీ సాధన స్ట్రీక్‌కు జోడించబడింది! 🔥",
    btn_retry_wrong: "తప్పులను మళ్లీ సాధన చేయండి",
    btn_quiz_again: "మరొక క్విజ్ రాయండి",

    progress_title: "అభ్యసన పురోగతి & గణాంకాలు",
    streak_calendar_title: "7 రోజుల సాధన పట్టీ",
    chart_title: "వారపు కార్యాచరణ సమాచారం",
    chart_sub: "గత 7 రోజుల్లో నేర్చుకున్న పదాలు & క్విజ్‌లు",
    badges_title: "సాధించిన బ్యాడ్జీలు & మైలురాళ్ళు",
    setting_goal_title: "రోజువారీ లక్ష్యాన్ని మార్చండి",
    goal_words_per_day: "రోజుకు {count} పదాలు",
    btn_reset_data: "పురోగతిని రీసెట్ చేయండి",
    btn_toggle_locks: "యూనిట్ లాక్‌లను దాటవేయండి (డెమో)",
    locks_active: "లాక్‌లు అమలులో ఉన్నాయి",
    locks_disabled: "లాక్‌లు బైపాస్ చేయబడ్డాయి (డెమో)",

    badge_first_word: "మొదటి అడుగు",
    badge_first_word_desc: "మీ మొదటి ఇంజనీరింగ్ పదాన్ని నేర్చుకున్నారు",
    badge_streak_3: "నిరంతర సాధకుడు",
    badge_streak_3_desc: "వరుసగా 3 రోజుల అభ్యసన కొనసాగించారు",
    badge_pron_pro: "ఉచ్చారణ నిపుణుడు",
    badge_pron_pro_desc: "సాంకేతిక పదంపై ≥90% ఉచ్చారణ స్కోరు సాధించారు",
    badge_quiz_ace: "క్విజ్ విజేత",
    badge_quiz_ace_desc: "రోజువారీ క్విజ్‌లో 100% మార్కులు సాధించారు",
    badge_unit_1: "ప్రథమ ఇంజనీర్",
    badge_unit_1_desc: "యూనిట్ 1 పదజాలం 100% పూర్తి చేశారు",
    badge_polyglot: "సాంకేతిక భాషా ప్రావీణ్యుడు",
    badge_polyglot_desc: "25 లేదా అంతకంటే ఎక్కువ పదాలపై పట్టు సాధించారు",

    chat_title: "భాషాబడ్డీ AI సహాయకుడు",
    chat_subtitle: "మీ భాషలోనే సాంకేతిక సందేహాలు లేదా ఇంటర్వ్యూ చిట్కాలు అడగండి!",
    chat_welcome: "నమస్కారం! నేను మీ ఇంజనీరింగ్ లాంగ్వేజ్ ట్యూటర్. అల్గారిథమ్స్, కోడింగ్ లేదా ఇంటర్వ్యూల గురించి తెలుగు లేదా ఇంగ్లీషులో నన్ను అడగండి!",
    chat_placeholder: "ప్రశ్న అడగండి (ఉదా: 'అల్గారిథం అంటే ఏమిటి?', 'ఇంటర్వ్యూ టిప్స్')...",
    chat_btn_send: "పంపు",
    chat_fallback: "నేరుగా సమాధానం లభించలేదు. మీరు వీటి గురించి అడగవచ్చు: 'అల్గారిథం అంటే ఏమిటి?', 'కంపైలర్ గురించి వివరించు', లేదా 'ఇంటర్వ్యూలో నన్ను నేను ఎలా పరిచయం చేసుకోవాలి?'.",
    chip_algo: "అల్గారిథం అంటే ఏమిటి?",
    chip_interview: "ఇంటర్వ్యూ లో నన్ను నేను ఎలా పరిచయం చేసుకోవాలి?",
    chip_compiler: "కంపైలర్ మరియు ఇంటర్‌ప్రిటర్ తేడా ఏమిటి?",
    chip_tips: "ఆంగ్లంలో అనర్గళంగా మాట్లాడటానికి చిట్కాలు",

    dict_title: "చిత్రరూప సాంకేతిక నిఘంటువు",
    dict_subtitle: "50 ఇంజనీరింగ్ పదాలను బొమ్మలతో మరియు ఆడియోతో అన్వేషించండి.",
    dict_search_placeholder: "ఇంగ్లీష్ లేదా తెలుగులో వెతకండి...",
    dict_filter_all: "అన్ని యూనిట్లు (50)",
    dict_filter_unit: "యూనిట్ {unit}",
    dict_modal_title: "పదం సమగ్ర సమాచారం",

    peer_title: "పీర్ ఉచ్చారణ సవాలు",
    peer_subtitle: "తోటి ఇంజనీరింగ్ విద్యార్థుల వాయిస్ రికార్డింగ్‌లను విని ఓటు వేయండి!",
    peer_word_of_day: "నేటి సవాలు పదం:",
    peer_your_voice: "మీ వాయిస్ సమర్పణ",
    btn_record_voice: "మీ స్వరాన్ని రికార్డ్ చేయండి (5సె)",
    btn_stop_record: "రికార్డింగ్ ఆపండి",
    btn_recording_active: "రికార్డ్ అవుతోంది...",
    peer_playback_label: "మీ రికార్డింగ్:",
    peer_classmates_title: "వివిధ కళాశాలల విద్యార్థుల రికార్డింగ్‌లు",
    btn_upvote: "ఓటు వేయండి 👍",
    voted_label: "ఓటు వేసారు ✓",

    onboarding_title: "భాషాబడ్డీకి స్వాగతం!",
    onboarding_subtitle: "మీ మాతృభాష నుండి సాంకేతిక ఆంగ్లంలోకి సులభమైన వారధి.",
    label_your_name: "మీ పేరు ఏమిటి?",
    placeholder_name: "ఉదా: రవి కుమార్",
    label_choose_lang: "మీకు ఇష్టమైన ప్రాంతీయ భాష:",
    label_daily_goal: "మీ రోజువారీ లక్ష్యాన్ని ఎంచుకోండి:",
    goal_easy: "3 పదాలు (సులభం - 5 నిమిషాలు)",
    goal_medium: "5 పదాలు (సిఫార్సు చేయబడింది - 10 నిమిషాలు)",
    goal_hard: "10 పదాలు (తీవ్రమైన సాధన - 20 నిమిషాలు)",
    btn_get_started: "నా ప్రయాణం ప్రారంభించండి 🚀",
    btn_quick_demo: "⚡ త్వరిత డెమో మోడ్ (న్యాయనిర్ణేతల కోసం)",

    modal_reset_title: "అన్ని పురోగతిని రీసెట్ చేయాలా?",
    modal_reset_body: "ఇది మీరు నేర్చుకున్న పదాలు, స్ట్రీక్‌లు మరియు క్విజ్ డేటాను పూర్తిగా తొలగిస్తుంది. నిజంగా రీసెట్ చేయాలనుకుంటున్నారా?",
    btn_confirm_reset: "అవును, పూర్తిగా రీసెట్ చేయండి",
    btn_cancel: "రద్దు చేయండి",

    toast_goal_complete: "🎉 నేటి లక్ష్యం పూర్తయింది! శభాష్ ఇంజనీర్!",
    toast_word_mastered: "✓ '{word}' పదం నేర్చుకున్న జాబితాలో చేర్చబడింది!",
    toast_review_added: "⚑ '{word}' పునశ్చరణ జాబితాలో చేర్చబడింది.",
    toast_settings_saved: "సెట్టింగులు సేవ్ చేయబడ్డాయి.",
    toast_demo_enabled: "డెమో మోడ్ ఆన్ చేయబడింది! రవి ప్రొఫైల్ మరియు 2/5 పదాలు లోడ్ అయ్యాయి.",
    toast_demo_disabled: "డెమో మోడ్ స్థితి మార్చబడింది."
  },

  hi: {
    // Hindi
    app_title: "भाषाबडी",
    app_tagline: "आपकी मातृभाषा में तकनीकी अंग्रेजी",
    streak_count: "{count} दिन",
    demo_badge: "डेमो मोड",
    offline_badge: "ऑफलाइन तैयार",

    nav_home: "होम",
    nav_learn: "सीखें",
    nav_practice: "उच्चारण",
    nav_quiz: "प्रश्नोत्तरी",
    nav_progress: "प्रगति",
    nav_chat: "AI बडी",
    nav_dictionary: "शब्दकोश",
    nav_peer: "सहपाठी स्वर",
    nav_more: "अधिक",

    greeting: "नमस्ते, {name}!",
    daily_goal_label: "दैनिक लक्ष्य",
    streak_label: "लगातार अभ्यास",
    mastered_label: "सीखे गए शब्द",
    word_of_day_badge: "आज का विशेष शब्द",
    btn_listen: "सुनें",
    btn_speak: "अभ्यास",
    cta_continue_learning: "सीखना जारी रखें",
    cta_take_quiz: "दैनिक प्रश्नोत्तरी दें",
    cta_practice_pron: "उच्चारण अभ्यास करें",
    micro_lesson_title: "2-मिनट का माइक्रो पाठ",
    micro_lesson_desc: "अपनी वर्तमान इकाई से 5 मुख्य अवधारणाओं की त्वरित समीक्षा करें।",
    btn_start_lesson: "2-मिनट पाठ शुरू करें",

    unit_1_title: "इकाई 1: कक्षा और बुनियादी बातें",
    unit_1_desc: "आवश्यक शैक्षणिक शब्द, प्रयोगशाला, असाइनमेंट और परीक्षा शब्दावली।",
    unit_2_title: "इकाई 2: प्रोग्रामिंग के मूल सिद्धांत",
    unit_2_desc: "कोडिंग अवधारणाएं: एल्गोरिदम, वेरिएबल्स, लूप्स, एरे और कंपाइलर।",
    unit_3_title: "इकाई 3: कंप्यूटर सिस्टम और नेटवर्क",
    unit_3_desc: "हार्डवेयर, प्रोसेसर, सर्वर, प्रोटोकॉल, ऑपरेटिंग सिस्टम और बैंडविड्थ।",
    unit_4_title: "इकाई 4: इंजीनियरिंग कोर और गणित",
    unit_4_desc: "सर्किट, सिग्नल, दक्षता, संरचना, गति, विश्लेषण और विनिर्देश।",
    unit_5_title: "इकाई 5: प्लेसमेंट और व्यावसायिक अंग्रेजी",
    unit_5_desc: "साक्षात्कार की तैयारी, बायोडाटा, टीमवर्क, समय सीमा और नेतृत्व।",
    unit_locked_msg: "अनलॉक करने के लिए पिछली इकाई का 70% पूरा करें",
    btn_start_unit: "इकाई खोलें",
    unit_progress: "{count} / 10 सीखे गए",

    card_tap_hint: "कार्ड पलटने के लिए टैप करें या स्पेस दबाएं",
    card_front_label: "शब्द और उच्चारण",
    card_back_label: "हिंदी अर्थ और इंजीनियरिंग उदाहरण",
    btn_prev: "पिछला",
    btn_next: "अगला",
    btn_know_this: "मुझे यह आता है ✓",
    btn_review_later: "बाद में दोहराएं ⚑",
    btn_jump_practice: "उच्चारण का अभ्यास करें 🎙️",
    speed_normal: "1.0x",
    speed_slow: "0.8x",
    speed_turtle: "0.6x",
    example_title: "इंजीनियरिंग उदाहरण",
    unit_deck_back: "← इकाइयों पर वापस जाएं",

    practice_title: "आवाज उच्चारण मूल्यांकन",
    practice_subtitle: "मानक तकनीकी उच्चारण को ध्यान से सुनें और माइक में बोलें।",
    practice_select_word: "लक्ष्य शब्द चुनें:",
    target_phonetic: "ध्वन्यात्मक गाइड (Phonetic)",
    target_meaning: "हिंदी में अर्थ",
    mic_idle: "माइक दबाएं और स्पष्ट रूप से बोलें",
    mic_listening: "सुन रहा हूँ... अब बोलिए!",
    mic_processing: "उच्चारण सटीकता का विश्लेषण किया जा रहा है...",
    result_match: "उच्चारण समानता",
    what_heard: "सुनाई दिया:",
    attempts_remaining: "प्रयास: 3 में से {count}",
    btn_hear_again: "0.8x गति से फिर से सुनें 🔊",
    btn_try_again: "पुनः प्रयास करें 🎙️",
    feedback_excellent: "उत्कृष्ट! स्पष्ट एवं सटीक इंजीनियरिंग उच्चारण! 🎉",
    feedback_good: "बहुत अच्छा प्रयास! मानक उच्चारण के काफी करीब। एक बार और प्रयास करें!",
    feedback_retry: "कोई बात नहीं! अक्षरों की ध्वनि को ध्यान से सुनें और धीरे-धीरे बोलें।",
    fallback_title: "माइक्रोफ़ोन उपलब्ध नहीं या अनुमति अस्वीकृत",
    fallback_desc: "कोई समस्या नहीं! आप नीचे सुनकर शब्द या उसकी वर्तनी टाइप कर सकते हैं:",
    fallback_placeholder: "यहाँ शब्द टाइप करें...",
    btn_check_text: "वर्तनी जांचें",
    btn_simulate_demo: "⚡ 95% मैच सिम्युलेट करें (डेमो सुरक्षा)",

    err_no_speech: "कोई आवाज नहीं सुनाई दी। कृपया माइक के पास बोलें।",
    err_audio_capture: "इस डिवाइस पर माइक्रोफ़ोन नहीं मिला।",
    err_not_allowed: "माइक की अनुमति अवरुद्ध है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।",
    err_network: "ध्वनि पहचान के लिए इंटरनेट कनेक्शन आवश्यक है।",
    err_speech_unsupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है। कृपया Chrome/Edge या टाइपिंग मोड का उपयोग करें।",

    quiz_title: "दैनिक इंजीनियरिंग प्रश्नोत्तरी",
    quiz_progress: "प्रश्न {total} में से {current}",
    quiz_type_mcq_reg_to_en: "सही अंग्रेजी तकनीकी शब्द चुनें:",
    quiz_type_mcq_en_to_reg: "सही हिंदी अर्थ चुनें:",
    quiz_type_sentence: "उचित तकनीकी शब्द से रिक्त स्थान भरें:",
    quiz_type_listen: "शब्द को ध्यान से सुनें और सही वर्तनी चुनें:",
    btn_submit_answer: "उत्तर जांचें",
    btn_next_question: "अगला प्रश्न →",
    quiz_correct: "सही उत्तर! बहुत बढ़िया।",
    quiz_incorrect: "गलत उत्तर। सही उत्तर को हाइलाइट किया गया है।",
    quiz_explanation_label: "स्पष्टीकरण:",
    quiz_complete_title: "प्रश्नोत्तरी पूरी हुई!",
    quiz_score_msg: "आपने {total} में से {score} अंक प्राप्त किए ({pct}%)",
    quiz_streak_boost: "+1 दिन आपकी दैनिक स्ट्रीक में जोड़ा गया! 🔥",
    btn_retry_wrong: "गलतियों को दोबारा हल करें",
    btn_quiz_again: "एक और प्रश्नोत्तरी दें",

    progress_title: "सीखने की प्रगति और आंकड़े",
    streak_calendar_title: "7-दिवसीय अभ्यास पट्टी",
    chart_title: "साप्ताहिक गतिविधि सारांश",
    chart_sub: "पिछले 7 दिनों में सीखे गए शब्द और प्रश्नोत्तरी",
    badges_title: "अर्जित बैज और उपलब्धियां",
    setting_goal_title: "दैनिक लक्ष्य समायोजित करें",
    goal_words_per_day: "{count} शब्द / दिन",
    btn_reset_data: "सारी प्रगति रीसेट करें",
    btn_toggle_locks: "इकाई लॉक छोड़ें (डेमो)",
    locks_active: "लॉक सक्रिय हैं",
    locks_disabled: "लॉक बायपास किए गए (डेमो)",

    badge_first_word: "पहला कदम",
    badge_first_word_desc: "अपना पहला इंजीनियरिंग शब्द सीखा",
    badge_streak_3: "निरंतरता के धनी",
    badge_streak_3_desc: "लगातार 3 दिनों तक अभ्यास जारी रखा",
    badge_pron_pro: "उच्चारण विशेषज्ञ",
    badge_pron_pro_desc: "तकनीकी शब्द पर ≥90% उच्चारण स्कोर हासिल किया",
    badge_quiz_ace: "क्विज़ चैंपियन",
    badge_quiz_ace_desc: "दैनिक प्रश्नोत्तरी में 100% अंक प्राप्त किए",
    badge_unit_1: "इंजीनियरिंग आरंभ",
    badge_unit_1_desc: "इकाई 1 की पूरी शब्दावली सीखी",
    badge_polyglot: "द्विभाषी तकनीकज्ञ",
    badge_polyglot_desc: "25 या अधिक शब्दों में महारत हासिल की",

    chat_title: "भाषाबडी AI सहायक",
    chat_subtitle: "अपनी भाषा में तकनीकी प्रश्न या साक्षात्कार टिप्स पूछें!",
    chat_welcome: "नमस्ते! मैं आपका इंजीनियरिंग भाषा शिक्षक हूँ। मुझसे एल्गोरिदम, कोडिंग या इंटरव्यू के बारे में हिंदी या अंग्रेजी में पूछें!",
    chat_placeholder: "प्रश्न पूछें (उदा: 'एल्गोरिदम क्या है?', 'इंटरव्यू टिप्स')...",
    chat_btn_send: "भेजें",
    chat_fallback: "मुझे सीधा उत्तर नहीं मिला। आप पूछ सकते हैं: 'एल्गोरिदम क्या है?', 'कंपाइलर समझाइए', या 'साक्षात्कार में अपना परिचय कैसे दें?'.",
    chip_algo: "एल्गोरिदम क्या है?",
    chip_interview: "इंटरव्यू में अपना परिचय कैसे दें?",
    chip_compiler: "कंपाइलर और इंटरप्रेटर में क्या अंतर है?",
    chip_tips: "अंग्रेजी धाराप्रवाह बोलने के टिप्स",

    dict_title: "चित्रमय तकनीकी शब्दकोश",
    dict_subtitle: "रेखाचित्रों और ऑडियो के साथ सभी 50 इंजीनियरिंग शब्दों को समझें।",
    dict_search_placeholder: "अंग्रेजी या हिंदी में खोजें...",
    dict_filter_all: "सभी इकाइयां (50)",
    dict_filter_unit: "इकाई {unit}",
    dict_modal_title: "शब्द का विस्तृत विवरण",

    peer_title: "सहपाठी उच्चारण चुनौती",
    peer_subtitle: "साथी इंजीनियरिंग छात्रों की रिकॉर्डिंग सुनें और वोट दें!",
    peer_word_of_day: "आज का चुनौती शब्द:",
    peer_your_voice: "आपकी आवाज प्रस्तुति",
    btn_record_voice: "अपनी आवाज रिकॉर्ड करें (5 सेकंड)",
    btn_stop_record: "रिकॉर्डिंग रोकें",
    btn_recording_active: "रिकॉर्डिंग जारी है...",
    peer_playback_label: "आपकी रिकॉर्डिंग:",
    peer_classmates_title: "विभिन्न कॉलेजों के छात्रों की प्रस्तुतियां",
    btn_upvote: "वोट दें 👍",
    voted_label: "वोट दिया ✓",

    onboarding_title: "भाषाबडी में आपका स्वागत है!",
    onboarding_subtitle: "आपकी मातृभाषा और इंजीनियरिंग अंग्रेजी के बीच एक सहज सेतु।",
    label_your_name: "आपका नाम क्या है?",
    placeholder_name: "जैसे: रवि कुमार",
    label_choose_lang: "पसंदीदा क्षेत्रीय भाषा:",
    label_daily_goal: "अपना दैनिक लक्ष्य चुनें:",
    goal_easy: "3 शब्द (सरल - 5 मिनट)",
    goal_medium: "5 शब्द (अनुशंसित - 10 मिनट)",
    goal_hard: "10 शब्द (गहन अभ्यास - 20 मिनट)",
    btn_get_started: "सीखना शुरू करें 🚀",
    btn_quick_demo: "⚡ त्वरित डेमो मोड (जजों के लिए)",

    modal_reset_title: "सारी प्रगति रीसेट करें?",
    modal_reset_body: "यह आपके सभी सीखे गए शब्दों, स्ट्रीक और प्रश्नोत्तरी परिणामों को हटा देगा। क्या आप वाकई पुनः आरंभ करना चाहते हैं?",
    btn_confirm_reset: "हाँ, सब रीसेट करें",
    btn_cancel: "रद्द करें",

    toast_goal_complete: "🎉 दैनिक लक्ष्य पूरा हुआ! बहुत खूब, इंजीनियर!",
    toast_word_mastered: "✓ '{word}' सीखे गए शब्दों में जोड़ा गया!",
    toast_review_added: "⚑ '{word}' दोहराने की सूची में जोड़ा गया।",
    toast_settings_saved: "सेटिंग्स सफलतापूर्वक सहेजी गईं।",
    toast_demo_enabled: "डेमो मोड सक्रिय! रवि प्रोफाइल और 2/5 शब्द लोड किए गए।",
    toast_demo_disabled: "डेमो मोड बदल दिया गया।"
  },

  ta: {
    // Tamil
    app_title: "பாஷாபடி",
    app_tagline: "உங்கள் தாய்மொழியில் தொழில்நுட்ப ஆங்கிலம்",
    streak_count: "{count} நாட்கள்",
    demo_badge: "டெமோ முறை",
    offline_badge: "ஆஃப்லைன் தயார்",

    nav_home: "முகப்பு",
    nav_learn: "கற்க",
    nav_practice: "உச்சரிப்பு",
    nav_quiz: "வினாடி வினா",
    nav_progress: "முன்னேற்றம்",
    nav_chat: "AI நண்பன்",
    nav_dictionary: "அகராதி",
    nav_peer: "தோழர் குரல்",
    nav_more: "மேலும்",

    greeting: "வணக்கம், {name}!",
    daily_goal_label: "இன்றைய இலக்கு",
    streak_label: "தொடர் பயிற்சி",
    mastered_label: "கற்ற சொற்கள்",
    word_of_day_badge: "இன்றைய சிறப்புச் சொல்",
    btn_listen: "கேளுங்கள்",
    btn_speak: "பயிற்சி",
    cta_continue_learning: "கற்றலைத் தொடரவும்",
    cta_take_quiz: "இன்றைய வினாடி வினா",
    cta_practice_pron: "உச்சரிப்பு பயிற்சி செய்க",
    micro_lesson_title: "2-நிமிட மைக்ரோ பாடம்",
    micro_lesson_desc: "உங்கள் தற்போதைய பிரிவில் உள்ள 5 முக்கிய கருத்துக்களை விரைவாக மீட்டெடுக்கவும்.",
    btn_start_lesson: "2-நிமிட பாடம் தொடங்கு",

    unit_1_title: "பிரிவு 1: வகுப்பறை & அடிப்படைகள்",
    unit_1_desc: "அத்தியாவசிய கல்வி சொற்கள், ஆய்வகம், ஒப்படைப்புகள் மற்றும் தேர்வு சொல்லகராதி.",
    unit_2_title: "பிரிவு 2: நிரலாக்க அடிப்படைகள்",
    unit_2_desc: "குறியீட்டு கருத்துக்கள்: நெறிமுறைகள், மாறிகள், மடக்கிகள், அணிகள் மற்றும் தொகுப்பி.",
    unit_3_title: "பிரிவு 3: கணினி அமைப்புகள் & வலைப்பின்னல்",
    unit_3_desc: "வன்பொருள், செயலிகள், சேவையகம், நெறிமுறைகள், இயங்குதளம் & அலைவரிசை.",
    unit_4_title: "பிரிவு 4: பொறியியல் முதன்மை & கணிதம்",
    unit_4_desc: "மின்சுற்றுகள், சைகைகள், செயல்திறன், கட்டமைப்பு, வேகம், பகுப்பாய்வு & அளவீடுகள்.",
    unit_5_title: "பிரிவு 5: வேலைவாய்ப்பு & தொழில்முறை ஆங்கிலம்",
    unit_5_desc: "நேர்காணல் தயாரிப்பு, சுயவிவரம், குழுப்பணி, காலக்கெடு மற்றும் தலைமைத்துவம்.",
    unit_locked_msg: "அடுத்த பகுதியைத் திறக்க முந்தைய பகுதியில் 70% முடிக்கவும்",
    btn_start_unit: "பகுதியைத் திறக்கவும்",
    unit_progress: "{count} / 10 கற்றவை",

    card_tap_hint: "அட்டையைத் திருப்ப தட்டவும் அல்லது ஸ்பேஸ் அழுத்தவும்",
    card_front_label: "ஆங்கில சொல் & உச்சரிப்பு",
    card_back_label: "தமிழ் விளக்கம் & பொறியியல் உதாரணம்",
    btn_prev: "முந்தையது",
    btn_next: "அடுத்தது",
    btn_know_this: "எனக்குத் தெரியும் ✓",
    btn_review_later: "பிறகு பார்க்க ⚑",
    btn_jump_practice: "உச்சரிப்பு பயிற்சி 🎙️",
    speed_normal: "1.0x",
    speed_slow: "0.8x",
    speed_turtle: "0.6x",
    example_title: "பொறியியல் உதாரணம்",
    unit_deck_back: "← பிரிவுகளுக்குத் திரும்பு",

    practice_title: "குரல் உச்சரிப்பு மதிப்பீடு",
    practice_subtitle: "சரியான தொழில்நுட்ப உச்சரிப்பைக் கேட்டு மைக்ரோஃபோனில் பேசவும்.",
    practice_select_word: "இலக்கு சொல்லைத் தேர்வுசெய்க:",
    target_phonetic: "ஒலியியல் வழிகாட்டி (Phonetic)",
    target_meaning: "தமிழ் விளக்கம்",
    mic_idle: "மைக்கை அழுத்தி தெளிவாகப் பேசவும்",
    mic_listening: "கேட்கிறது... இப்போது பேசுங்கள்!",
    mic_processing: "உச்சரிப்பு துல்லியம் ஆராயப்படுகிறது...",
    result_match: "உச்சரிப்பு பொருத்தம்",
    what_heard: "கேட்கப்பட்ட சொல்:",
    attempts_remaining: "முயற்சிகள்: 3 இல் {count}",
    btn_hear_again: "0.8x வேகத்தில் மீண்டும் கேட்கவும் 🔊",
    btn_try_again: "மீண்டும் முயற்சி செய்க 🎙️",
    feedback_excellent: "அருமை! மிகத் துல்லியமான பொறியியல் உச்சரிப்பு! 🎉",
    feedback_good: "சிறந்த முயற்சி! சரியான உச்சரிப்புக்கு மிக அருகில். மீண்டும் ஒருமுறை முயலுங்கள்!",
    feedback_retry: "கவலைப்படாதீர்கள்! ஒலி வடிவங்களைக் கூர்ந்து கவனித்து மெதுவாகப் பேசுங்கள்.",
    fallback_title: "மைக்ரோஃபோன் கிடைக்கவில்லை அல்லது மறுக்கப்பட்டது",
    fallback_desc: "பரவாயில்லை! நீங்கள் கேட்ட சொல்லை அல்லது எழுத்துப்பிழையை கீழே தட்டச்சு செய்து சரிபார்க்கலாம்:",
    fallback_placeholder: "இங்கே சொல்லைத் தட்டச்சு செய்க...",
    btn_check_text: "எழுத்துப் பிழையைச் சரிபார்க்கவும்",
    btn_simulate_demo: "⚡ 95% பொருத்தத்தை உருவகப்படுத்து (டெமோ)",

    err_no_speech: "குரல் எதுவும் கேட்கவில்லை. மைக்ரோஃபோனுக்கு அருகில் பேசவும்.",
    err_audio_capture: "இந்த சாதனத்தில் மைக்ரோஃபோன் கிடைக்கவில்லை.",
    err_not_allowed: "மைக்ரோஃபோன் அனுமதி தடுக்கப்பட்டுள்ளது. உலாவி அமைப்புகளில் அனுமதிக்கவும்.",
    err_network: "குரல் அறிதலுக்கு இணைய இணைப்பு தேவை.",
    err_speech_unsupported: "இந்த உலாவியில் பேச்சு அறிதல் வசதி இல்லை. Chrome/Edge அல்லது தட்டச்சு முறையைப் பயன்படுத்தவும்.",

    quiz_title: "தினசரி பொறியியல் வினாடி வினா",
    quiz_progress: "கேள்வி {total} இல் {current}",
    quiz_type_mcq_reg_to_en: "சரியான ஆங்கில தொழில்நுட்ப சொல்லைத் தேர்வுசெய்க:",
    quiz_type_mcq_en_to_reg: "சரியான தமிழ் விளக்கத்தைத் தேர்வுசெய்க:",
    quiz_type_sentence: "சரியான பொறியியல் சொல்லால் கோடிட்ட இடத்தை நிரப்பவும்:",
    quiz_type_listen: "ஒலியை உற்றுக் கேட்டு சரியான எழுத்துக்கூட்டலைத் தேர்வுசெய்க:",
    btn_submit_answer: "பதிலைச் சரிபார்",
    btn_next_question: "அடுத்த கேள்வி →",
    quiz_correct: "சரியான விடை! அருமை.",
    quiz_incorrect: "தவறான விடை. சரியான பதில் முன்னிலைப்படுத்தப்பட்டுள்ளது.",
    quiz_explanation_label: "விளக்கம்:",
    quiz_complete_title: "வினாடி வினா முடிந்தது!",
    quiz_score_msg: "நீங்கள் {total} க்கு {score} மதிப்பெண் பெற்றுள்ளீர்கள் ({pct}%)",
    quiz_streak_boost: "+1 நாள் உங்கள் தொடர் பயிற்சியில் சேர்க்கப்பட்டது! 🔥",
    btn_retry_wrong: "தவறுகளை மீண்டும் பயிற்சி செய்க",
    btn_quiz_again: "மற்றொரு வினாடி வினா எடுக்கவும்",

    progress_title: "கற்றல் முன்னேற்றம் & புள்ளிவிவரங்கள்",
    streak_calendar_title: "7-நாள் பயிற்சிப் பட்டை",
    chart_title: "வாராந்திர செயல்பாட்டு சுருக்கம்",
    chart_sub: "கடந்த 7 நாட்களில் கற்ற சொற்கள் மற்றும் தேர்வுகள்",
    badges_title: "பெற்ற பேட்ஜ்கள் & சாதனைகள்",
    setting_goal_title: "தினசரி இலக்கை மாற்று",
    goal_words_per_day: "நாளைக்கு {count} சொற்கள்",
    btn_reset_data: "அனைத்து முன்னேற்றத்தையும் மீட்டமைக்க",
    btn_toggle_locks: "பிரிவு பூட்டுகளைத் தவிர் (டெமோ)",
    locks_active: "பூட்டுகள் செயலில் உள்ளன",
    locks_disabled: "பூட்டுகள் முடக்கப்பட்டுள்ளன (டெமோ)",

    badge_first_word: "முதல் படி",
    badge_first_word_desc: "உங்கள் முதல் பொறியியல் சொல்லைக் கற்றுக்கொண்டீர்கள்",
    badge_streak_3: "தொடர் வெற்றியாளர்",
    badge_streak_3_desc: "தொடர்ந்து 3 நாட்கள் கற்றலை மேற்கொண்டீர்கள்",
    badge_pron_pro: "உச்சரிப்பு வல்லுநர்",
    badge_pron_pro_desc: "தொழில்நுட்ப சொல்லில் ≥90% உச்சரிப்பு மதிப்பெண் பெற்றீர்கள்",
    badge_quiz_ace: "வினாடி வினா சாம்பியன்",
    badge_quiz_ace_desc: "தினசரி வினாடி வினாவில் 100% மதிப்பெண் பெற்றீர்கள்",
    badge_unit_1: "தொடக்கப் பொறியாளர்",
    badge_unit_1_desc: "பிரிவு 1 இன் அனைத்து சொற்களையும் கற்றீர்கள்",
    badge_polyglot: "இருமொழி தொழில்நுட்ப மேதை",
    badge_polyglot_desc: "25 க்கும் மேற்பட்ட சொற்களில் தேர்ச்சி பெற்றீர்கள்",

    chat_title: "பாஷாபடி AI வழிகாட்டி",
    chat_subtitle: "உங்கள் தாய்மொழியிலேயே தொழில்நுட்ப சந்தேகங்கள் அல்லது நேர்காணல் குறிப்புகளைக் கேளுங்கள்!",
    chat_welcome: "வணக்கம்! நான் உங்கள் பொறியியல் மொழி ஆசிரியர். அல்காரிதம், குறியீட்டு முறை அல்லது நேர்காணல் பற்றி தமிழில் அல்லது ஆங்கிலத்தில் என்னிடம் கேட்கலாம்!",
    chat_placeholder: "கேள்வி கேளுங்கள் (எ.கா: 'அல்காரிதம் என்றால் என்ன?', 'நேர்காணல் குறிப்புகள்')...",
    chat_btn_send: "அனுப்பு",
    chat_fallback: "நேரடி பதில் கிடைக்கவில்லை. நீங்கள் இவற்றைக் கேட்கலாம்: 'அல்காரிதம் என்றால் என்ன?', 'தொகுப்பி பற்றி விளக்கு', அல்லது 'நேர்காணலில் என்னை எவ்வாறு அறிமுகப்படுத்துவது?'.",
    chip_algo: "அல்காரிதம் என்றால் என்ன?",
    chip_interview: "நேர்காணலில் என்னை எவ்வாறு அறிமுகப்படுத்துவது?",
    chip_compiler: "தொகுப்பி மற்றும் வரிமொழிபெயர்ப்பி வேறுபாடு என்ன?",
    chip_tips: "ஆங்கிலத்தில் சரளமாகப் பேசுவதற்கான குறிப்புகள்",

    dict_title: "காட்சிப்பட தொழில்நுட்ப அகராதி",
    dict_subtitle: "50 பொறியியல் சொற்களையும் வரைபடங்கள் மற்றும் ஆடியோவுடன் அறியுங்கள்.",
    dict_search_placeholder: "ஆங்கிலம் அல்லது தமிழில் தேடுங்கள்...",
    dict_filter_all: "அனைத்து பிரிவுகளும் (50)",
    dict_filter_unit: "பிரிவு {unit}",
    dict_modal_title: "சொல்லின் முழு விவரம்",

    peer_title: "தோழர் உச்சரிப்பு சவால்",
    peer_subtitle: "பொறியியல் கல்லூரி மாணவர்களின் குரல் பதிவுகளைக் கேட்டு வாக்களியுங்கள்!",
    peer_word_of_day: "இன்றைய சவால் சொல்:",
    peer_your_voice: "உங்கள் குரல் பதிவு",
    btn_record_voice: "உங்கள் குரலைப் பதிவு செய்யுங்கள் (5 வினாடி)",
    btn_stop_record: "பதிவை நிறுத்து",
    btn_recording_active: "பதிவாகிறது...",
    peer_playback_label: "உங்கள் பதிவு:",
    peer_classmates_title: "பல்வேறு கல்லூரி மாணவர்களின் பதிவுகள்",
    btn_upvote: "வாக்களி 👍",
    voted_label: "வாக்களிக்கப்பட்டது ✓",

    onboarding_title: "பாஷாபடிக்கு நல்வரவு!",
    onboarding_subtitle: "உங்கள் தாய்மொழிக்கும் பொறியியல் ஆங்கிலத்திற்கும் இடையிலான எளிய பாலம்.",
    label_your_name: "உங்கள் பெயர் என்ன?",
    placeholder_name: "எ.கா: ரவி குமார்",
    label_choose_lang: "விருப்பமான பிராந்திய மொழி:",
    label_daily_goal: "தினசரி இலக்கைத் தேர்ந்தெடுக்கவும்:",
    goal_easy: "3 சொற்கள் (எளிது - 5 நிமிடங்கள்)",
    goal_medium: "5 சொற்கள் (பரிந்துரைக்கப்படுகிறது - 10 நிமிடங்கள்)",
    goal_hard: "10 சொற்கள் (தீவிர பயிற்சி - 20 நிமிடங்கள்)",
    btn_get_started: "கற்றலைத் தொடங்குங்கள் 🚀",
    btn_quick_demo: "⚡ விரைவு டெமோ முறை (நடுவர்களுக்கானது)",

    modal_reset_title: "அனைத்து முன்னேற்றத்தையும் மீட்டமைக்கவா?",
    modal_reset_body: "இது நீங்கள் கற்ற சொற்கள், தொடர் நாட்கள் மற்றும் தேர்வுத் தகவல்களை முழுமையாக நீக்கிவிடும். உறுதி செய்ய விரும்புகிறீர்களா?",
    btn_confirm_reset: "ஆம், அனைத்தையும் மீட்டமைக்க",
    btn_cancel: "ரத்து செய்",

    toast_goal_complete: "🎉 இன்றைய இலக்கு நிறைவடைந்தது! வாழ்த்துக்கள் பொறியாளரே!",
    toast_word_mastered: "✓ '{word}' கற்றவை பட்டியலில் சேர்க்கப்பட்டது!",
    toast_review_added: "⚑ '{word}' மீள்பார்வை பட்டியலில் சேர்க்கப்பட்டது.",
    toast_settings_saved: "அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன.",
    toast_demo_enabled: "டெமோ முறை இயக்கப்பட்டது! ரவி சுயவிவரம் மற்றும் 2/5 சொற்கள் ஏற்றப்பட்டன.",
    toast_demo_disabled: "டெமோ முறை மாற்றப்பட்டது."
  }
};

class I18nManager {
  constructor() {
    this.currentLocale = "te"; // Default to Telugu as per target user demographic
    this.fallbackLocale = "en";
  }

  init(initialLocale) {
    if (initialLocale && TRANSLATIONS[initialLocale]) {
      this.currentLocale = initialLocale;
    }
    this.applyToDOM();
  }

  getLocale() {
    return this.currentLocale;
  }

  setLocale(locale) {
    if (!TRANSLATIONS[locale]) {
      console.warn(`Locale "${locale}" not supported. Falling back to "${this.fallbackLocale}"`);
      locale = this.fallbackLocale;
    }
    this.currentLocale = locale;
    document.documentElement.lang = locale;

    // Apply font family and styling hints to document
    document.documentElement.setAttribute("data-lang", locale);

    this.applyToDOM();

    // Dispatch global event for views that need custom re-render
    window.dispatchEvent(new CustomEvent("bb:localechanged", { detail: { locale } }));
  }

  t(key, params = {}) {
    const localeDict = TRANSLATIONS[this.currentLocale] || TRANSLATIONS[this.fallbackLocale];
    let translation = localeDict[key];

    if (!translation) {
      // Fallback to English
      translation = TRANSLATIONS[this.fallbackLocale][key] || key;
    }

    // Interpolate {param} tokens
    for (const [k, v] of Object.entries(params)) {
      translation = translation.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    }

    return translation;
  }

  applyToDOM(root = document) {
    // 1. data-i18n for textContent
    const textNodes = root.querySelectorAll("[data-i18n]");
    textNodes.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (key) {
        el.textContent = this.t(key);
      }
    });

    // 2. data-i18n-placeholder for input/textarea placeholders
    const placeholderNodes = root.querySelectorAll("[data-i18n-placeholder]");
    placeholderNodes.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) {
        el.setAttribute("placeholder", this.t(key));
      }
    });

    // 3. data-i18n-aria for aria-label
    const ariaNodes = root.querySelectorAll("[data-i18n-aria]");
    ariaNodes.forEach(el => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) {
        el.setAttribute("aria-label", this.t(key));
      }
    });

    // 4. data-i18n-title for title attribute
    const titleNodes = root.querySelectorAll("[data-i18n-title]");
    titleNodes.forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      if (key) {
        el.setAttribute("title", this.t(key));
      }
    });
  }
}

// Global singleton instance
const i18n = new I18nManager();
function t(key, params) {
  return i18n.t(key, params);
}
