from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json

from ai.groq_agent import ask_ai



# Flask App

app = Flask(
    __name__,
    static_folder="frontend"
)

CORS(app)



# Load Official Links

try:
    with open("data/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
except:
    links = {}



# Home Page

@app.route("/")
def home():
    return send_from_directory("frontend", "index.html")



# Serve Static Files

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory("frontend", filename)



# Sidebar Information API

@app.route("/service-info", methods=["POST"])
def service_info():

    data = request.get_json()

    service = data.get("service", "Government Scheme")
    language = data.get("language", "English")

    prompt = f"""
Explain the Indian Government service:

{service}

Reply ONLY in {language}.

Give answer in this format:

## Information

## Eligibility

## Benefits

## Required Documents

## Application Process

## Official Website

Use simple language.

If official website is available,
mention it.

Do not ask any question to the user.
"""

    try:

        answer = ask_ai(prompt, language)

        return jsonify({
            "answer": answer
        })

    except Exception as e:

        return jsonify({
            "answer": str(e)
        }), 500




# Chat AI

@app.route("/ask", methods=["POST"])
def ask():

    data = request.get_json()

    state = data.get("location", "")
    service = data.get("service", "Government Scheme")
    question = data.get("question", "")
    language = data.get("language", "English")

    prompt = f"""
You are Nagrik Sathi AI.

State:
{state}

Service:
{service}

Question:
{question}

Reply ONLY in {language}.

Answer in this format:

## Information

## Eligibility

## Benefits

## Required Documents

## Application Process

## Official Website

Use simple language.

Never ask for:
OTP
Password
Bank Details
Aadhaar Number
"""

    try:

        answer = ask_ai(prompt, language)

        return jsonify({
            "answer": answer,
            "link": links.get(service, "")
        })

    except Exception as e:

        return jsonify({
            "answer": str(e),
            "link": ""
        }), 500



# Run

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )