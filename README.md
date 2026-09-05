#  Nagrik Sathi AI

> **AI-Powered Government Scheme & Citizen Service Assistant for India**

## 🎯 Objective

Nagrik Sathi AI is an AI-based citizen assistance platform that helps Indian citizens understand government schemes and public services through simple natural-language questions.

## 📌 Overview

Users can select a category, enter their State/UT, and ask questions about government schemes and citizen services. The AI provides easy-to-understand responses based on the user's query and location.

## ✨ Features

- 🤖 AI-powered citizen assistant
- 🇮🇳 Government scheme information
- 📍 State/UT-based queries
- 👨‍🌾 Farmer schemes
- 🎓 Student & education schemes
- 👷 Labour-related schemes
- 👩 Women welfare schemes
- 🏥 Health information
- 💼 Jobs & employment information
- 🪪 Aadhaar, PAN, Passport & Driving Licence guidance
- 🍚 Ration Card information
- 👴 Senior Citizen services
- ♿ Disability-related assistance
- 📢 Complaint & citizen help
- 🌐 Multi-language support
- 🔊 Voice interaction
- 💻 Responsive web interface

## 🛠️ Technologies

- **Python**
- **Flask**
- **HTML5**
- **CSS3**
- **JavaScript**
- **Groq API**
- **Llama 3.3 70B**
- **JSON**
- **Flask-CORS**
- **python-dotenv**

## 🧠 AI Technology

The application uses the **Groq API** with the **Llama 3.3 70B Versatile** model to generate natural-language responses.

The Flask backend receives the user's location and question, processes the request, and returns the AI response to the frontend.

# 🇮🇳 Nagrik Sathi AI

Nagrik Sathi AI is an AI-powered citizen assistance system designed to help users understand government schemes, services, and other useful public information in a simple way.

## 📂 Project Structure

```text
Nagrik-Sathi-AI/
│
├── ai/
│   ├── groq_agent.py
│   └── search.py
│
├── data/
│   ├── data.json
│   ├── links.json
│   └── services.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── flag.jpg
│   └── logo.jpg
│
├── app.py
├── requirements.txt
├── test_groq.py
├── .gitignore
└── README.md
```

## ⚙️ How It Works

```text
User
  ↓
Select Category
  ↓
Enter State / UT
  ↓
Ask Question
  ↓
Flask Backend
  ↓
AI Processing
  ↓
Groq / Llama Model
  ↓
AI Response
  ↓
Frontend
```

1. The user selects a relevant category.
2. The user enters their State or Union Territory.
3. The user asks a question related to government schemes or citizen services.
4. The Flask backend receives the request.
5. The AI system processes the user's question.
6. Groq/Llama generates a relevant response.
7. The response is displayed on the frontend.

## 🔮 Future Improvements

* Retrieval-Augmented Generation (RAG)
* Integration with verified government sources
* Automatic scheme eligibility checking
* Personalized scheme recommendations
* Real-time government scheme updates
* Advanced document assistance
* Support for more Indian languages
* Improved voice assistant
* Mobile application
* Government API integration
* AI response verification
* Location-based service recommendations

## 🎯 Applications

Nagrik Sathi AI can be useful for:

* Students
* Farmers
* Workers
* Women
* Senior citizens
* Persons with disabilities
* Job seekers
* General citizens

## ⚠️ Disclaimer

Nagrik Sathi AI is an educational and project-based AI assistant. Users should verify important information such as eligibility requirements, required documents, deadlines, and application procedures through official government sources before taking any action.

## 👨‍💻 Author

**Md Arman**
