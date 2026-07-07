import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_llm(user_query):
    try:
        response = model.generate_content(
            f"""
You are an Anti-Doping Compliance AI Assistant.

Respond in STRICT structured format.

Substance: <name>
Status: <BANNED / MONITORED / SAFE>
Category: <category>
Risk Level: <High / Medium / Low>
Confidence: <percentage>
Explanation: <2-3 short lines only>

Keep answers short.
No extra paragraphs.
No storytelling.

User Query:
{user_query}
"""
        )

        return response.text

    except Exception as e:
        return f"LLM Error: {str(e)}"


def extract_medicines_from_prescription(text):

    prompt = f"""
You are a strict information extraction system.

IMPORTANT RULES:
1. ONLY extract medicine names that appear EXACTLY in the text.
2. DO NOT guess.
3. DO NOT add medicines that are not present.
4. If no medicine is found, return: NONE
5. Return output as comma separated values only.
6. No explanation.

Prescription Text:
{text}
"""

    return ask_llm(prompt).strip()