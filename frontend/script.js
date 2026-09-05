// ============================================================
// NAGRIK SATHI AI
// script.js
// ============================================================

// ============================================================
// GLOBAL VARIABLES
// ============================================================

let currentService = "Government Scheme";
let recognition = null;
let currentPage = 1;


// ============================================================
// ALL STATES & UNION TERRITORIES
// ============================================================

const states = [

    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (NCT)",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"

];


// ============================================================
// LANGUAGE PLACEHOLDERS
// ============================================================

const placeholders = {

    "English":
        "Ask your question...",

    "Hindi":
        "अपना प्रश्न पूछें...",

    "Gujarati":
        "તમારો પ્રશ્ન પૂછો...",

    "Marathi":
        "तुमचा प्रश्न विचारा...",

    "Bengali":
        "আপনার প্রশ্ন লিখুন...",

    "Tamil":
        "உங்கள் கேள்வியை கேளுங்கள்...",

    "Telugu":
        "మీ ప్రశ్న అడగండి...",

    "Kannada":
        "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...",

    "Malayalam":
        "നിങ്ങളുടെ ചോദ്യം ചോദിക്കൂ...",

    "Punjabi":
        "ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ...",

    "Urdu":
        "اپنا سوال پوچھیں...",

    "Odia":
        "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...",

    "Assamese":
        "আপোনাৰ প্ৰশ্ন সোধক..."

};


// ============================================================
// LANGUAGE VOICE CODES
// ============================================================

const voiceLanguages = {

    "English": "en-IN",
    "Hindi": "hi-IN",
    "Gujarati": "gu-IN",
    "Marathi": "mr-IN",
    "Bengali": "bn-IN",
    "Tamil": "ta-IN",
    "Telugu": "te-IN",
    "Kannada": "kn-IN",
    "Malayalam": "ml-IN",
    "Punjabi": "pa-IN",
    "Urdu": "ur-IN",
    "Odia": "or-IN",
    "Assamese": "as-IN"

};


// ============================================================
// INITIAL PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    loadStates();

    setupLanguageChange();

    setupQuestionEnter();

    setupMobileSidebar();

    goHome();

});


// ============================================================
// LOAD STATES INTO SELECT
// ============================================================

function loadStates() {

    const stateBox = document.getElementById("state");

    if (!stateBox) {
        return;
    }

    stateBox.innerHTML =
        '<option value="">Choose State / UT</option>';

    states.forEach(function (stateName) {

        const option =
            document.createElement("option");

        option.value = stateName;

        option.textContent = stateName;

        stateBox.appendChild(option);

    });

}


// ============================================================
// SIDEBAR TOGGLE
// ============================================================

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }

    sidebar.classList.toggle("show");

}


// ============================================================
// CLOSE SIDEBAR
// ============================================================

function closeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }

    sidebar.classList.remove("show");

}


// ============================================================
// HOME BUTTON
// ============================================================

function goHome() {

    const homePage =
        document.getElementById("homePage");

    const servicePage =
        document.getElementById("servicePage");

    if (homePage) {

        homePage.style.display = "block";

    }

    if (servicePage) {

        servicePage.style.display = "none";

    }

    currentPage = 1;

    // Remove active state from services

    document
        .querySelectorAll(".service")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    // Activate Home button

    const homeButton =
        document.querySelector(".home-btn");

    if (homeButton) {

        homeButton.classList.add("active");

    }


    // Close mobile sidebar

    if (window.innerWidth < 900) {

        closeSidebar();

    }


    // Scroll to top

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================================
// SERVICE PAGE OPEN
// ============================================================

function openServicePage() {

    const homePage =
        document.getElementById("homePage");

    const servicePage =
        document.getElementById("servicePage");

    if (homePage) {

        homePage.style.display = "none";

    }

    if (servicePage) {

        servicePage.style.display = "block";

    }

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================================
// SELECT SIDEBAR SERVICE
// ============================================================

function selectService(card, name) {

    currentService = name;

    currentPage = 1;


    // Remove active from all services

    document
        .querySelectorAll(".service")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    // Remove active from Home

    const homeButton =
        document.querySelector(".home-btn");

    if (homeButton) {

        homeButton.classList.remove("active");

    }


    // Activate selected service

    if (card) {

        card.classList.add("active");

    }


    // Update service title

    const serviceTitle =
        document.getElementById("serviceTitle");

    if (serviceTitle) {

        serviceTitle.textContent = name;

    }


    // Open service page

    openServicePage();


    // Load information

    loadServiceInfo(name);


    // Mobile sidebar close

    if (window.innerWidth < 900) {

        closeSidebar();

    }

}


// ============================================================
// LOAD SERVICE INFORMATION
// ============================================================

async function loadServiceInfo(service) {

    const content =
        document.getElementById("serviceContent");

    const servicePage =
        document.getElementById("servicePage");

    const languageBox =
        document.getElementById("language");


    if (!content) {

        console.error(
            "serviceContent element not found."
        );

        return;

    }


    const language =
        languageBox
            ? languageBox.value
            : "English";


    // Loading message

    content.innerHTML = `

        <div class="service-loading">

            <div class="loader"></div>

            <p>
                Loading ${escapeHTML(service)} information...
            </p>

        </div>

    `;


    try {

        const response = await fetch(
            "/service-info",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    service: service,

                    language: language,

                    page: 1

                })

            }
        );


        // Check HTTP status

        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status
            );

        }


        const data =
            await response.json();


        if (data.answer) {

            content.innerHTML =
                formatAnswer(data.answer);

        }

        else {

            content.innerHTML = `

                <p class="error-message">

                    No information received.

                </p>

            `;

        }


        // Update service title

        const serviceTitle =
            document.getElementById(
                "serviceTitle"
            );

        if (serviceTitle) {

            serviceTitle.textContent =
                service;

        }


        // Scroll to service content

        setTimeout(function () {

            if (content) {

                content.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }, 200);


    }

    catch (error) {

        console.error(
            "Service information error:",
            error
        );


        content.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to load information
                </h3>

                <p>
                    Please check your Flask server
                    and try again.
                </p>

            </div>

        `;

    }

}


// ============================================================
// MORE INFORMATION
// ============================================================

async function loadMoreInfo() {

    currentPage++;


    const content =
        document.getElementById(
            "serviceContent"
        );

    const languageBox =
        document.getElementById(
            "language"
        );


    // Find More Information button

    const button =
        document.querySelector(
            ".more-btn"
        );


    if (!content) {

        console.error(
            "serviceContent not found."
        );

        return;

    }


    const language =
        languageBox
            ? languageBox.value
            : "English";


    // Disable button

    if (button) {

        button.disabled = true;

        button.innerHTML = `

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading...

        `;

    }


    try {

        const response = await fetch(
            "/service-info",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    service:
                        currentService,

                    language:
                        language,

                    page:
                        currentPage

                })

            }
        );


        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status
            );

        }


        const data =
            await response.json();


        if (data.answer) {

            content.innerHTML += `

                <hr class="info-divider">

                <div class="additional-info">

                    ${formatAnswer(
                        data.answer
                    )}

                </div>

            `;

        }

        else {

            content.innerHTML += `

                <p class="error-message">

                    No additional information
                    available.

                </p>

            `;

        }


        // Restore button

        if (button) {

            button.disabled = false;

            button.innerHTML = `

                More Information

                <i class="fa-solid fa-arrow-right"></i>

            `;

        }


        // Scroll towards newly loaded information

        setTimeout(function () {

            if (button) {

                button.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        }, 300);


    }

    catch (error) {

        console.error(
            "More information error:",
            error
        );


        currentPage--;


        if (button) {

            button.disabled = false;

            button.innerHTML = `

                More Information

                <i class="fa-solid fa-arrow-right"></i>

            `;

        }


        alert(
            "Unable to load more information."
        );

    }

}


// ============================================================
// BACK BUTTON
// ============================================================

function goBack() {

    goHome();

}


// ======================================
// FORMAT AI RESPONSE
// ======================================

function formatAnswer(text){

    if(!text){
        return "";
    }


    return text

        // Bold
        .replace(
            /\*\*(.*?)\*\*/g,
            "<b>$1</b>"
        )

        // Headings
        .replace(
            /^#{1,6}\s*(.*)$/gm,
            "<h3>$1</h3>"
        )

        // Bullet points
        .replace(
            /^\s*[-*•]\s+(.*)$/gm,
            "• $1"
        )

        // New lines
        .replace(
            /\n/g,
            "<br>"
        );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ============================================================
// OFFICIAL LINKS
// ============================================================

function showOfficialLinks(service) {

    const div =
        document.getElementById(
            "officialLinks"
        );


    if (!div) {

        return;

    }


    let html = "";


    switch (service) {

        case "Passport":

            html = `

                <a
                    href="https://www.passportindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer">

                    🌍 Passport Seva Portal

                </a>

            `;

            break;


        case "Aadhaar":

            html = `

                <a
                    href="https://uidai.gov.in"
                    target="_blank"
                    rel="noopener noreferrer">

                    🆔 UIDAI Official Website

                </a>

            `;

            break;


        case "PAN Card":

            html = `

                <a
                    href="https://www.onlineservices.nsdl.com"
                    target="_blank"
                    rel="noopener noreferrer">

                    💳 PAN Card Services

                </a>

            `;

            break;


        case "Driving License":

            html = `

                <a
                    href="https://parivahan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer">

                    🚗 Parivahan Portal

                </a>

            `;

            break;


        case "Government Scheme":

            html = `

                <a
                    href="https://www.mygov.in"
                    target="_blank"
                    rel="noopener noreferrer">

                    🏛 MyGov India

                </a>

            `;

            break;


        default:

            html = "";

    }


    div.innerHTML = html;

}


// ============================================================
// QUICK SEARCH
// ============================================================

function quickAsk(text) {

    const question =
        document.getElementById(
            "question"
        );


    if (!question) {

        return;

    }


    question.value = text;


    // Focus question box

    question.focus();


    // Do not automatically submit.
    // User can edit the question first.

}


// ============================================================
// ASK NAGRIK SATHI AI
// ============================================================

async function askAI() {

    const stateBox =
        document.getElementById(
            "state"
        );

    const questionBox =
        document.getElementById(
            "question"
        );

    const languageBox =
        document.getElementById(
            "language"
        );

    const loading =
        document.getElementById(
            "loading"
        );

    const result =
        document.getElementById(
            "result"
        );


    if (!stateBox ||
        !questionBox ||
        !languageBox ||
        !result) {

        console.error(
            "Required AI elements are missing."
        );

        return;

    }


    const state =
        stateBox.value;


    const question =
        questionBox.value.trim();


    const language =
        languageBox.value;


    // Validate State

    if (state === "") {

        alert(
            "Please select your State / UT."
        );

        stateBox.focus();

        return;

    }


    // Validate Question

    if (question === "") {

        alert(
            "Please enter your question."
        );

        questionBox.focus();

        return;

    }


    // Show Loading

    if (loading) {

        loading.style.display =
            "block";

    }


    result.innerHTML = `

        <div class="ai-loading-message">

            <i class="fa-solid fa-robot fa-bounce"></i>

            <p>
                Searching Government Information...
            </p>

        </div>

    `;


    try {

        const response =
            await fetch(
                "/ask",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        location:
                            state,

                        question:
                            question,

                        service:
                            currentService,

                        language:
                            language

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Server returned HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        if (data.answer) {

            result.innerHTML =
                formatAnswer(
                    data.answer
                );


            showOfficialLinks(
                currentService
            );


            // Scroll to answer

            setTimeout(function () {

                result.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }, 200);

        }

        else {

            result.innerHTML = `

                <div class="error-message">

                    <h3>
                        No response received
                    </h3>

                    <p>
                        Please try asking your
                        question again.
                    </p>

                </div>

            `;

        }

    }

    catch (error) {

        console.error(
            "AI request error:",
            error
        );


        result.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to connect to server
                </h3>

                <p>
                    Please make sure your Flask
                    server is running.
                </p>

                <small>
                    ${escapeHTML(
                        error.message
                    )}
                </small>

            </div>

        `;

    }

    finally {

        if (loading) {

            loading.style.display =
                "none";

        }

    }

}


// ============================================================
// VOICE INPUT
// ============================================================

function voiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech Recognition is not supported in this browser."
        );

        return;

    }


    const languageBox =
        document.getElementById(
            "language"
        );


    const questionBox =
        document.getElementById(
            "question"
        );


    const language =
        languageBox
            ? languageBox.value
            : "English";


    recognition =
        new SpeechRecognition();


    recognition.lang =
        voiceLanguages[language]
        || "en-IN";


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        1;


    recognition.continuous =
        false;


    recognition.onstart =
        function () {

            console.log(
                "Voice recognition started."
            );

        };


    recognition.onresult =
        function (event) {

            if (questionBox) {

                questionBox.value =
                    event
                        .results[0][0]
                        .transcript;

            }

        };


    recognition.onerror =
        function (event) {

            console.error(
                "Voice recognition error:",
                event.error
            );

        };


    recognition.onend =
        function () {

            console.log(
                "Voice recognition stopped."
            );

        };


    try {

        recognition.start();

    }

    catch (error) {

        console.error(
            "Unable to start voice:",
            error
        );

    }

}


// ======================================
// STOP VOICE
// Stops both Speech Recognition
// and Text-to-Speech
// ======================================

function stopVoice(){

    // Stop microphone recognition
    if(recognition){

        try{

            recognition.stop();

        }catch(error){

            console.log(error);

        }

        recognition = null;
    }


    // Stop AI speaking
    if(window.speechSynthesis){

        window.speechSynthesis.cancel();

    }

}

// ============================================================
// TEXT TO SPEECH - INDIAN MULTI LANGUAGE
// ============================================================

// ------------------------------------------------------------
// LANGUAGE CONFIGURATION
// ------------------------------------------------------------

const speechLanguages = {

    English: {
        lang: "en-IN",
        prefixes: ["en-IN", "en"],
        names: ["english", "india", "indian"]
    },

    Hindi: {
        lang: "hi-IN",
        prefixes: ["hi-IN", "hi"],
        names: ["hindi", "india", "indian"]
    },

    Gujarati: {
        lang: "gu-IN",
        prefixes: ["gu-IN", "gu"],
        names: ["gujarati", "india", "indian"]
    },

    Marathi: {
        lang: "mr-IN",
        prefixes: ["mr-IN", "mr"],
        names: ["marathi", "india", "indian"]
    },

    Bengali: {
        lang: "bn-IN",
        prefixes: ["bn-IN", "bn"],
        names: ["bengali", "bangla", "india", "indian"]
    },

    Tamil: {
        lang: "ta-IN",
        prefixes: ["ta-IN", "ta"],
        names: ["tamil", "india", "indian"]
    },

    Telugu: {
        lang: "te-IN",
        prefixes: ["te-IN", "te"],
        names: ["telugu", "india", "indian"]
    },

    Kannada: {
        lang: "kn-IN",
        prefixes: ["kn-IN", "kn"],
        names: ["kannada", "india", "indian"]
    },

    Malayalam: {
        lang: "ml-IN",
        prefixes: ["ml-IN", "ml"],
        names: ["malayalam", "india", "indian"]
    },

    Punjabi: {
        lang: "pa-IN",
        prefixes: ["pa-IN", "pa"],
        names: ["punjabi", "india", "indian"]
    },

    Urdu: {
        lang: "ur-IN",
        prefixes: ["ur-IN", "ur"],
        names: ["urdu", "india", "indian"]
    },

    Odia: {
        lang: "or-IN",
        prefixes: ["or-IN", "or"],
        names: ["odia", "oriya", "india", "indian"]
    },

    Assamese: {
        lang: "as-IN",
        prefixes: ["as-IN", "as"],
        names: ["assamese", "india", "indian"]
    }

};


// ------------------------------------------------------------
// VOICE SETTINGS
// ------------------------------------------------------------

// Change this to:
// "male"
// "female"
// "auto"

const preferredVoiceGender = "auto";


// ------------------------------------------------------------
// GET ALL BROWSER VOICES
// ------------------------------------------------------------

function getAvailableVoices() {

    if (!window.speechSynthesis) {
        return [];
    }

    return window.speechSynthesis.getVoices() || [];
}


// ------------------------------------------------------------
// CHECK INDIAN LANGUAGE VOICE
// ------------------------------------------------------------

function isIndianLanguageVoice(voice, languageCode) {

    if (!voice || !voice.lang) {
        return false;
    }

    const voiceLang = voice.lang.toLowerCase();

    const targetLang = languageCode
        .toLowerCase()
        .split("-")[0];

    // Language must match
    if (!voiceLang.startsWith(targetLang)) {
        return false;
    }

    // Indian region
    if (voiceLang.includes("-in")) {
        return true;
    }

    return false;
}


// ------------------------------------------------------------
// DETECT VOICE GENDER
// ------------------------------------------------------------

function detectVoiceGender(voice) {

    if (!voice || !voice.name) {
        return "unknown";
    }

    const name = voice.name.toLowerCase();

    const femaleWords = [
        "female",
        "woman",
        "girl",
        "heera",
        "priya",
        "neerja",
        "swara",
        "raveena",
        "veena"
    ];

    const maleWords = [
        "male",
        "man",
        "boy",
        "ravi",
        "hemant",
        "madhur",
        "aditya",
        "rahul"
    ];

    for (const word of femaleWords) {

        if (name.includes(word)) {
            return "female";
        }

    }

    for (const word of maleWords) {

        if (name.includes(word)) {
            return "male";
        }

    }

    return "unknown";
}


// ------------------------------------------------------------
// FIND BEST INDIAN VOICE
// ------------------------------------------------------------

function getBestIndianVoice(languageCode) {

    const voices = getAvailableVoices();

    if (!voices.length) {
        return null;
    }

    const target = languageCode.toLowerCase();

    const languagePart = target.split("-")[0];


    // --------------------------------------------------------
    // STEP 1
    // Exact Indian language
    // Example: hi-IN
    // --------------------------------------------------------

    let candidates = voices.filter(function (voice) {

        return (
            voice.lang &&
            voice.lang.toLowerCase() === target
        );

    });


    if (candidates.length > 0) {

        // Gender preference
        if (preferredVoiceGender !== "auto") {

            const genderMatch =
                candidates.find(function (voice) {

                    return (
                        detectVoiceGender(voice) ===
                        preferredVoiceGender
                    );

                });

            if (genderMatch) {
                return genderMatch;
            }

        }

        return candidates[0];
    }


    // --------------------------------------------------------
    // STEP 2
    // Same language + India
    // --------------------------------------------------------

    candidates = voices.filter(function (voice) {

        return isIndianLanguageVoice(
            voice,
            languageCode
        );

    });


    if (candidates.length > 0) {

        if (preferredVoiceGender !== "auto") {

            const genderMatch =
                candidates.find(function (voice) {

                    return (
                        detectVoiceGender(voice) ===
                        preferredVoiceGender
                    );

                });

            if (genderMatch) {
                return genderMatch;
            }

        }

        return candidates[0];
    }


    // --------------------------------------------------------
    // IMPORTANT:
    // DO NOT FALLBACK TO ENGLISH
    // --------------------------------------------------------

    return null;
}


// ------------------------------------------------------------
// CLEAN TEXT BEFORE SPEECH
// ------------------------------------------------------------

function cleanSpeechText(text) {

    if (!text) {
        return "";
    }

    let clean = String(text);


    // --------------------------------------------------------
    // Remove HTML
    // --------------------------------------------------------

    clean = clean.replace(/<[^>]*>/g, " ");


    // --------------------------------------------------------
    // Remove URLs
    // --------------------------------------------------------

    clean = clean.replace(
        /https?:\/\/[^\s]+/gi,
        " "
    );


    // --------------------------------------------------------
    // Remove email
    // --------------------------------------------------------

    clean = clean.replace(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
        " "
    );


    // --------------------------------------------------------
    // Remove markdown headings
    // --------------------------------------------------------

    clean = clean.replace(
        /^#{1,6}\s*/gm,
        ""
    );


    // --------------------------------------------------------
    // Remove bold / italic
    // --------------------------------------------------------

    clean = clean.replace(
        /\*\*(.*?)\*\*/g,
        "$1"
    );

    clean = clean.replace(
        /\*(.*?)\*/g,
        "$1"
    );

    clean = clean.replace(
        /__(.*?)__/g,
        "$1"
    );

    clean = clean.replace(
        /_(.*?)_/g,
        "$1"
    );


    // --------------------------------------------------------
    // Remove bullet points
    // --------------------------------------------------------

    clean = clean.replace(
        /^\s*[-*+•]\s+/gm,
        ""
    );


    // --------------------------------------------------------
    // Remove numbered list markers
    // --------------------------------------------------------

    clean = clean.replace(
        /^\s*\d+[\.\)]\s+/gm,
        ""
    );


    // --------------------------------------------------------
    // Remove code backticks
    // --------------------------------------------------------

    clean = clean.replace(
        /`+/g,
        ""
    );


    // --------------------------------------------------------
    // Remove horizontal lines
    // --------------------------------------------------------

    clean = clean.replace(
        /[-*_]{3,}/g,
        " "
    );


    // --------------------------------------------------------
    // Remove brackets
    // --------------------------------------------------------

    clean = clean.replace(
        /[\[\]{}<>]/g,
        " "
    );


    // --------------------------------------------------------
    // Remove unwanted symbols
    // --------------------------------------------------------

    clean = clean.replace(
        /[|~^]/g,
        " "
    );


    // --------------------------------------------------------
    // Remove emojis
    // --------------------------------------------------------

    clean = clean.replace(
        /[\u{1F300}-\u{1FAFF}]/gu,
        ""
    );

    clean = clean.replace(
        /[\u{2600}-\u{27BF}]/gu,
        ""
    );


    // --------------------------------------------------------
    // Remove repeated dots
    // --------------------------------------------------------

    clean = clean.replace(
        /\.{2,}/g,
        "."
    );


    // --------------------------------------------------------
    // Remove repeated punctuation
    // --------------------------------------------------------

    clean = clean.replace(
        /!{2,}/g,
        "!"
    );

    clean = clean.replace(
        /\?{2,}/g,
        "?"
    );


    // --------------------------------------------------------
    // Convert line breaks to spaces
    // --------------------------------------------------------

    clean = clean.replace(
        /\s+/g,
        " "
    );


    return clean.trim();
}


// ------------------------------------------------------------
// SPLIT LONG TEXT
// ------------------------------------------------------------

function splitSpeechText(text, maxLength = 180) {

    const chunks = [];

    if (!text) {
        return chunks;
    }

    const sentences = text.match(
        /[^.!?।॥]+[.!?।॥]?/g
    ) || [text];

    let current = "";

    sentences.forEach(function (sentence) {

        sentence = sentence.trim();

        if (!sentence) {
            return;
        }

        if (
            (current + " " + sentence).length
            <= maxLength
        ) {

            current +=
                (current ? " " : "") +
                sentence;

        }
        else {

            if (current) {
                chunks.push(current);
            }

            current = sentence;

        }

    });


    if (current) {
        chunks.push(current);
    }


    return chunks;
}


// ------------------------------------------------------------
// WAIT FOR VOICES
// ------------------------------------------------------------

function waitForVoices(timeout = 3000) {

    return new Promise(function (resolve) {

        const existing =
            getAvailableVoices();

        if (existing.length > 0) {
            resolve(existing);
            return;
        }


        let finished = false;

        function finish() {

            if (finished) {
                return;
            }

            finished = true;

            resolve(
                getAvailableVoices()
            );

        }


        if (
            window.speechSynthesis
        ) {

            window.speechSynthesis.onvoiceschanged =
                function () {

                    finish();

                };

        }


        setTimeout(
            finish,
            timeout
        );

    });

}


// ------------------------------------------------------------
// READ AI ANSWER
// ------------------------------------------------------------

async function readAnswer() {

    const result =
        document.getElementById("result");

    const languageBox =
        document.getElementById("language");


    if (!result || !languageBox) {
        return;
    }


    // --------------------------------------------------------
    // Get answer
    // --------------------------------------------------------

    let text =
        result.innerText || "";


    // --------------------------------------------------------
    // Clean answer
    // --------------------------------------------------------

    text =
        cleanSpeechText(text);


    if (!text) {

        alert(
            "There is no answer to read."
        );

        return;

    }


    // --------------------------------------------------------
    // Check browser support
    // --------------------------------------------------------

    if (!window.speechSynthesis) {

        alert(
            "Text-to-Speech is not supported in this browser."
        );

        return;

    }


    // --------------------------------------------------------
    // Selected language
    // --------------------------------------------------------

    const selectedLanguage =
        languageBox.value;


    const languageData =
        speechLanguages[
            selectedLanguage
        ];


    if (!languageData) {

        alert(
            "Voice is not available for this language."
        );

        return;

    }


    // --------------------------------------------------------
    // Stop previous speech
    // --------------------------------------------------------

    window.speechSynthesis.cancel();


    // --------------------------------------------------------
    // Wait for browser voices
    // --------------------------------------------------------

    await waitForVoices();


    // --------------------------------------------------------
    // Find Indian voice
    // --------------------------------------------------------

    const indianVoice =
        getBestIndianVoice(
            languageData.lang
        );


    // --------------------------------------------------------
    // IMPORTANT
    // Never use English voice for Indian language
    // --------------------------------------------------------

    if (!indianVoice) {

        alert(
            "Indian " +
            selectedLanguage +
            " voice is not available in your browser. " +
            "Please install an Indian " +
            selectedLanguage +
            " voice in Windows/browser."
        );

        console.error(
            "No Indian voice found for:",
            selectedLanguage
        );

        console.table(
            getAvailableVoices().map(
                function (voice) {

                    return {
                        name: voice.name,
                        language: voice.lang
                    };

                }
            )
        );

        return;
    }


    console.log(
        "Selected language:",
        selectedLanguage
    );

    console.log(
        "Selected Indian voice:",
        indianVoice.name,
        indianVoice.lang
    );


    // --------------------------------------------------------
    // Split long answer
    // --------------------------------------------------------

    const chunks =
        splitSpeechText(text, 180);


    if (!chunks.length) {
        return;
    }


    // --------------------------------------------------------
    // Speak chunks one by one
    // --------------------------------------------------------

    let index = 0;


    function speakNext() {

        if (index >= chunks.length) {
            return;
        }


        const speech =
            new SpeechSynthesisUtterance(
                chunks[index]
            );


        // ----------------------------------------------------
        // FORCE SELECTED INDIAN VOICE
        // ----------------------------------------------------

        speech.voice =
            indianVoice;


        speech.lang =
            languageData.lang;


        // ----------------------------------------------------
        // Natural voice
        // ----------------------------------------------------

        speech.rate = 0.90;

        speech.pitch = 1.0;

        speech.volume = 1.0;


        speech.onstart =
            function () {

                console.log(
                    "Speaking:",
                    selectedLanguage,
                    indianVoice.name
                );

            };


        speech.onerror =
            function (event) {

                console.error(
                    "Speech error:",
                    event.error
                );

            };


        speech.onend =
            function () {

                index++;

                setTimeout(
                    speakNext,
                    80
                );

            };


        window.speechSynthesis.speak(
            speech
        );

    }


    speakNext();
}


// ------------------------------------------------------------
// STOP VOICE
// ------------------------------------------------------------

function stopVoice() {

    // Stop recognition

    if (recognition) {

        try {
            recognition.stop();
        }
        catch (error) {
            console.log(error);
        }

        recognition = null;

    }


    // Stop speech

    if (window.speechSynthesis) {

        window.speechSynthesis.cancel();

    }

}


// ------------------------------------------------------------
// LOAD VOICES
// ------------------------------------------------------------

function loadSpeechVoices() {

    if (!window.speechSynthesis) {
        return [];
    }

    const voices =
        window.speechSynthesis.getVoices();

    console.log(
        "Available browser voices:"
    );

    console.table(
        voices.map(
            function (voice) {

                return {
                    name: voice.name,
                    language: voice.lang,
                    default: voice.default
                };

            }
        )
    );

    return voices;
}


// ------------------------------------------------------------
// VOICES CHANGED
// ------------------------------------------------------------

if (window.speechSynthesis) {

    window.speechSynthesis.onvoiceschanged =
        function () {

            loadSpeechVoices();

        };

}


// ------------------------------------------------------------
// INITIAL VOICE LOAD
// ------------------------------------------------------------

setTimeout(
    function () {

        loadSpeechVoices();

    },
    500
);

// ======================================
// Clean Text Before Speaking
// Removes # * - bullets, markdown,
// URLs, emojis and unwanted symbols
// ======================================

function cleanSpeechText(text){

    if(!text){
        return "";
    }

    let clean = text;

    // Remove HTML
    clean = clean.replace(/<[^>]*>/g, " ");

    // Remove Markdown headings
    clean = clean.replace(/^#{1,6}\s*/gm, "");

    // Remove bold / italic markdown
    clean = clean.replace(/\*\*(.*?)\*\*/g, "$1");
    clean = clean.replace(/\*(.*?)\*/g, "$1");
    clean = clean.replace(/__(.*?)__/g, "$1");
    clean = clean.replace(/_(.*?)_/g, "$1");

    // Remove bullet points
    clean = clean.replace(/^\s*[-*+•]\s+/gm, "");

    // Remove numbered list symbols
    clean = clean.replace(/^\s*\d+[\.\)]\s+/gm, "");

    // Remove URLs
    clean = clean.replace(
        /https?:\/\/[^\s]+/gi,
        ""
    );

    // Remove email addresses
    clean = clean.replace(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
        ""
    );

    // Remove emojis and symbols
    clean = clean.replace(
        /[\u{1F300}-\u{1FAFF}]/gu,
        ""
    );

    clean = clean.replace(
        /[\u{2600}-\u{27BF}]/gu,
        ""
    );

    // Remove markdown code symbols
    clean = clean.replace(/`/g, "");

    // Remove horizontal separators
    clean = clean.replace(/-{3,}/g, " ");
    clean = clean.replace(/_{3,}/g, " ");
    clean = clean.replace(/\*{3,}/g, " ");

    // Remove brackets that should not be spoken
    clean = clean.replace(/[{}\[\]]/g, " ");

    // Remove excessive punctuation
    clean = clean.replace(/[|~^<>]/g, " ");

    // Replace multiple dots
    clean = clean.replace(/\.{2,}/g, ".");

    // Replace multiple spaces
    clean = clean.replace(/\s+/g, " ");

    // Clean beginning/end
    clean = clean.trim();

    return clean;
}


// ======================================
// Get Best Indian Voice
// ======================================

function getBestIndianVoice(languageCode){

    const voices = speechSynthesis.getVoices();

    if(!voices || voices.length === 0){
        return null;
    }

    const target = languageCode.toLowerCase();

    // First priority:
    // Exact Indian language voice
    let voice = voices.find(function(v){

        return v.lang &&
               v.lang.toLowerCase() === target;

    });

    if(voice){
        return voice;
    }


    // Second priority:
    // Same language + Indian region
    const languagePart = target.split("-")[0];

    voice = voices.find(function(v){

        const voiceLang =
            v.lang ? v.lang.toLowerCase() : "";

        return voiceLang.startsWith(languagePart) &&
               voiceLang.includes("-in");

    });

    if(voice){
        return voice;
    }


    // Third priority:
    // Any Indian voice for same language
    voice = voices.find(function(v){

        const voiceLang =
            v.lang ? v.lang.toLowerCase() : "";

        const voiceName =
            v.name ? v.name.toLowerCase() : "";

        return (
            voiceLang.startsWith(languagePart) ||
            voiceName.includes("india") ||
            voiceName.includes("indian")
        );

    });

    if(voice){
        return voice;
    }


    // Final fallback
    return voices.find(function(v){

        return v.lang &&
               v.lang.toLowerCase().startsWith(languagePart);

    }) || null;
}


// ======================================
// Read AI Answer
// ======================================

function readAnswer(){

    const result =
        document.getElementById("result");

    if(!result){
        return;
    }


    // Get visible AI answer
    let text = result.innerText || "";


    // Clean unwanted symbols
    text = cleanSpeechText(text);


    if(!text){

        alert("There is no answer to read.");

        return;
    }


    // Stop previous speech
    window.speechSynthesis.cancel();


    // Selected language
    const selectedLanguage =
        document.getElementById("language").value;


    const languageData =
        speechLanguages[selectedLanguage];


    if(!languageData){

        alert("Voice is not available for this language.");

        return;
    }


    const languageCode =
        languageData.lang;


    // Create speech
    const speech =
        new SpeechSynthesisUtterance(text);


    // Set selected language
    speech.lang = languageCode;


    // Find Indian voice
    const indianVoice =
        getBestIndianVoice(languageCode);


    if(indianVoice){

        speech.voice = indianVoice;

        speech.lang = indianVoice.lang;
    }


    // Natural speaking settings
    speech.rate = 0.92;

    speech.pitch = 1.0;

    speech.volume = 1;


    // Speak
    window.speechSynthesis.speak(speech);
}


// ======================================
// Load Browser Voices
// ======================================

window.speechSynthesis.onvoiceschanged =
    function(){

        speechSynthesis.getVoices();

    };



// ======================================
// CLEAR CHAT
// ======================================

function clearChat(){

    document.getElementById("question").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("officialLinks").innerHTML = "";


    // Stop recognition
    if(recognition){

        try{

            recognition.stop();

        }catch(error){

            console.log(error);

        }

        recognition = null;
    }


    // Stop speech
    if(window.speechSynthesis){

        window.speechSynthesis.cancel();

    }

}

// ============================================================
// COPY ANSWER
// ============================================================

async function copyAnswer() {

    const result =
        document.getElementById(
            "result"
        );


    if (!result) {

        return;

    }


    const text =
        result.innerText.trim();


    if (text === "") {

        alert(
            "Nothing to copy."
        );

        return;

    }


    try {

        await navigator.clipboard.writeText(
            text
        );

        alert(
            "Answer copied successfully."
        );

    }

    catch (error) {

        console.error(
            "Copy error:",
            error
        );

        alert(
            "Unable to copy answer."
        );

    }

}


// ============================================================
// WHATSAPP SHARE
// ============================================================

function shareWhatsapp() {

    const result =
        document.getElementById(
            "result"
        );


    if (!result) {

        return;

    }


    const text =
        result.innerText.trim();


    if (text === "") {

        alert(
            "Nothing to share."
        );

        return;

    }


    const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(text);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ============================================================
// PRINT ANSWER
// ============================================================

function printAnswer() {

    const result =
        document.getElementById(
            "result"
        );


    if (!result) {

        return;

    }


    const html =
        result.innerHTML;


    if (!html.trim()) {

        alert(
            "Nothing to print."
        );

        return;

    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the answer."
        );

        return;

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Nagrik Sathi AI
            </title>

            <style>

                body {

                    font-family: Arial, sans-serif;

                    padding: 40px;

                    line-height: 1.8;

                    color: #222;

                }

                h1 {

                    color: #0072ff;

                }

                h2,
                h3,
                h4 {

                    color: #0072ff;

                }

                li {

                    margin-bottom: 8px;

                }

                @media print {

                    body {

                        padding: 20px;

                    }

                }

            </style>

        </head>

        <body>

            <h1>
                Nagrik Sathi AI
            </h1>

            <hr>

            ${html}

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(function () {

        printWindow.print();

    }, 300);

}


// ============================================================
// ENTER KEY
// ENTER = ASK AI
// SHIFT + ENTER = NEW LINE
// ============================================================

function setupQuestionEnter() {

    const question =
        document.getElementById(
            "question"
        );


    if (!question) {

        return;

    }


    question.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                askAI();

            }

        }
    );

}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

function setupLanguageChange() {

    const languageBox =
        document.getElementById(
            "language"
        );


    if (!languageBox) {

        return;

    }


    updateQuestionPlaceholder();


    languageBox.addEventListener(
        "change",
        function () {

            updateQuestionPlaceholder();


            // If service page is open,
            // reload service information

            const servicePage =
                document.getElementById(
                    "servicePage"
                );


            if (
                servicePage &&
                servicePage.style.display !== "none"
            ) {

                currentPage = 1;

                loadServiceInfo(
                    currentService
                );

            }

        }
    );

}


// ============================================================
// UPDATE QUESTION PLACEHOLDER
// ============================================================

function updateQuestionPlaceholder() {

    const languageBox =
        document.getElementById(
            "language"
        );


    const questionBox =
        document.getElementById(
            "question"
        );


    if (!languageBox ||
        !questionBox) {

        return;

    }


    const language =
        languageBox.value;


    questionBox.placeholder =
        placeholders[language]
        || "Ask your question...";

}


// ============================================================
// MOBILE SIDEBAR
// ============================================================

function setupMobileSidebar() {

    document.addEventListener(
        "click",
        function (event) {

            const sidebar =
                document.getElementById(
                    "sidebar"
                );


            if (!sidebar) {

                return;

            }


            if (
                window.innerWidth < 900 &&
                sidebar.classList.contains("show")
            ) {

                const clickedInsideSidebar =
                    sidebar.contains(
                        event.target
                    );


                const clickedMenuButton =
                    event.target.closest(
                        ".mobileMenu"
                    );


                if (
                    !clickedInsideSidebar &&
                    !clickedMenuButton
                ) {

                    closeSidebar();

                }

            }

        }
    );


    // Escape key

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );

}


// ============================================================
// SCROLL TO TOP
// ============================================================

function scrollTopPage() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================================
// SHOW LOADING
// ============================================================

function showLoading() {

    const loading =
        document.getElementById(
            "loading"
        );


    if (loading) {

        loading.style.display =
            "block";

    }

}


// ============================================================
// HIDE LOADING
// ============================================================

function hideLoading() {

    const loading =
        document.getElementById(
            "loading"
        );


    if (loading) {

        loading.style.display =
            "none";

    }

}


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth >= 900) {

            const sidebar =
                document.getElementById(
                    "sidebar"
                );


            if (sidebar) {

                sidebar.classList.remove(
                    "show"
                );

            }

        }

    }
);


// END OF SCRIPT
